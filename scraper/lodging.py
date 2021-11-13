import os
import re
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from dotenv import load_dotenv
import psycopg2
import requests
import shutil 


def findLodging():
    driver = webdriver.Chrome(ChromeDriverManager().install())

    driver.get('https://disneyworld.disney.go.com/resorts/')
    
    lodging_list = []
    
    load_check = WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, "picks-default"))) 
    
    hotel_picks = driver.find_element_by_id('picks-default')
    hotels = hotel_picks.find_elements_by_class_name('resortCard')
    
    print("HOTEL TYPE", type(hotels))
    print("LENGTH: ", len(hotels))
    
    for h in hotels:
        dictionary = {}

        lodging_name = h.find_element_by_class_name('cardName')
        
        dictionary['lodging_name'] = lodging_name.text.replace("'", "''").replace('"', '')
        
        cardInfo = h.find_element_by_class_name('cardInfo')
        
        availability_link = cardInfo.find_element_by_class_name('resortOverview').get_attribute("href")
        dictionary['lodging_availability_link'] = availability_link
        
        lodging_location = cardInfo.find_element_by_class_name('experienceLocation').text
        
        if 'Animal Kingodom' in lodging_location:
            dictionary['park_id'] = 2
        elif 'Magic Kingdom' in lodging_location:
            dictionary['park_id'] = 1
        elif 'EPCOT' in lodging_location:
            dictionary['park_id'] = 4
        #No hotels were listed specifically for Hollywood studios so all other hotels will be given id of 3 and served as "Recommended Hotels Nearby" for now. 
        else:
            dictionary['park_id'] = 3
                   
        lodging_transportation = cardInfo.find_element_by_class_name('transportation').text
        dictionary['lodging_transportation'] = lodging_transportation
        
        image_container = h.find_element_by_class_name('cardThumbnail')
        image_url = image_container.find_element_by_xpath('.//img').get_attribute("src")
        filename = re.sub(r'[^A-Za-z]', '', lodging_name.text.replace("'", "\\").replace('"', '')) + ".jpeg"
        r = requests.get(image_url, stream = True)
        if r.status_code == 200:
            r.raw.decode_content = True
                     
            with open(filename, 'wb') as f:
                shutil.copyfileobj(r.raw, f)
            print('Image successfully Downloaded', filename)
        else:
            print('Image Couldn''t be retreived')
                        
        dictionary['lodging_image'] = filename
        lodging_list.append(dictionary)
    print('LODGING LIST: ', lodging_list)
    addLodgingToDB(lodging_list)

def addLodgingToDB(lodging_list):
    try:
        load_dotenv()
        # Connects to the ElephantSQL DB
        conn = psycopg2.connect(f"dbname='{os.getenv('DB_NAME')}'user='{os.getenv('DB_USER')}' host='{os.getenv('DB_HOST')}' password='{os.getenv('DB_PASSWORD')}'")
        # Used to execute PostgreSQL statements
        cur = conn.cursor()
        for item in range(len(lodging_list)):  
            cur.execute(f"""INSERT INTO lodging 
                    (lodging_name, lodging_transportation, lodging_availability_link, lodging_image, park_id)
                    VALUES
                    ('{lodging_list[item]['lodging_name']}', '{lodging_list[item]['lodging_transportation']}', '{lodging_list[item]['lodging_availability_link']}','{lodging_list[item]['lodging_image']}',  {lodging_list[item]['park_id']})
                    """)
            conn.commit()
            print("Successfully Inserted")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while inserting into DB: ", error)
    
    finally:
        if(conn):
            cur.close()
            conn.close()
            print("Connection closed")

findLodging()