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

def findDining():
    driver = webdriver.Chrome(ChromeDriverManager().install())

    driver.get('https://disneyworld.disney.go.com/dining/')
    
    restaurant_list = []
    
    i = 0
    
    while i <= 344:
        print("CURRENT NUMBER", i)
        load_check = WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, "disneyPicks-default")))
        
        dining_list = driver.find_element_by_id('disneyPicks-default')
        restaurants = dining_list.find_elements_by_class_name('finderCard')
        print('TOTAL RESTAURANTS:', len(restaurants)) 

        dictionary = {}
        
        dining_name = restaurants[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//h2[@class="cardName"]')
        
        dining_location = restaurants[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]//span[@aria-label="location"]')
        
        if 'Magic Kingdom' in dining_location.text or 'Animal Kingdom' in dining_location.text or 'Hollywood Studios' in dining_location.text or 'EPCOT' in dining_location.text:
            if 'Magic Kingdom' in dining_location.text:
                dictionary['park_id'] = 1
            elif 'Animal Kingdom' in dining_location.text:
                dictionary['park_id'] = 2
            elif 'Hollywood Studios' in dining_location.text:
                dictionary['park_id'] = 3
            else: 
                dictionary['park_id'] = 4    
            dictionary['dining_name'] = dining_name.text.replace("'", "''").replace('"', '')
            
            dining_type = restaurants[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]/span[1]')
            dictionary['dining_type'] = dining_type.text
            
            dining_price = restaurants[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]/span[2]')
            dictionary['dining_price'] = dining_price.text
            
            dining_image_url = restaurants[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//picture[@class="thumbnail"]/source[2]').get_attribute("src")
            filename = re.sub(r'[^A-Za-z]', '', dining_name.text.replace("'", "\\").replace('"', '')) + ".jpeg"
            r = requests.get(dining_image_url, stream = True)
            if r.status_code == 200:
                r.raw.decode_content = True
                        
                with open(filename, 'wb') as f:
                    shutil.copyfileobj(r.raw, f)
                print('Image successfully Downloaded', filename)
            else:
                print('Image Couldn''t be retreived')
                        
            dictionary['dining_image'] = filename
            
            restaurant_list.append(dictionary)
            i += 1
        else:
            i += 1
            continue

    print('RESTAURANT LIST:', restaurant_list)
    print('RESTAURANT LIST LENGTH:', len(restaurant_list))
    addDiningToDB(restaurant_list)
    
def addDiningToDB(restaurant_list):
    try:
        load_dotenv()
        # Connects to the ElephantSQL DB
        conn = psycopg2.connect(f"dbname='{os.getenv('DB_NAME')}'user='{os.getenv('DB_USER')}' host='{os.getenv('DB_HOST')}' password='{os.getenv('DB_PASSWORD')}'")
        # Used to execute PostgreSQL statements
        cur = conn.cursor()
        for item in range(len(restaurant_list)):  
            cur.execute(f"""INSERT INTO dining 
                    (dining_name, dining_type, dining_price, dining_image, park_id)
                    VALUES
                    ('{restaurant_list[item]['dining_name']}', '{restaurant_list[item]['dining_type']}', '{restaurant_list[item]['dining_price']}','{restaurant_list[item]['dining_image']}',  {restaurant_list[item]['park_id']})
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

    
findDining()