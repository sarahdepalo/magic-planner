import time
import os
import re
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from dotenv import load_dotenv
import psycopg2
import requests
import shutil #used to save files locally

def findAttractions():
    driver = webdriver.Chrome(ChromeDriverManager().install())

    driver.get('https://disneyworld.disney.go.com/attractions/')

    time.sleep(12)

    attractions = driver.find_elements_by_class_name('finderCard')

    attractions_list = []

    for a in attractions:
        dictionary = {}
        activity_name = a.find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//h2[@class="cardName"]')
        
        activity_type = a.find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]/span[2]')
            
        if ((activity_name != '') and ("Water Rides" not in activity_type)):

            dictionary['activity_name'] = activity_name.text.replace("'", "''").replace('"', '')
            dictionary['activity_type'] = activity_type.text.replace("'", "''")
            
            location = a.find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]//span[@aria-label="location"]')
            if 'Magic Kingdom Park' in location.text:
                dictionary['park_id'] = 1
            elif 'Animal Kingdom' in location.text:
                dictionary['park_id'] = 2
            elif 'Hollywood Studios' in location.text:
                dictionary['park_id'] = 3
            else: 
                dictionary['park_id'] = 4

            activity_height = a.find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]/span[1]')
            dictionary['activity_height'] = activity_height.text
            

            activity_learn_more_link = a.find_element_by_xpath(".//*[contains(@id, 'Attraction')]").get_attribute("href")
            dictionary['activity_learn_more_link'] = activity_learn_more_link
            
            activity_image_url = a.find_element_by_xpath('.//div[@class="cardLinkContainer"]//picture[@class="thumbnail"]/source[2]').get_attribute("src")
            filename = re.sub(r'[^A-Za-z]', '', activity_name.text.replace("'", "\\").replace('"', '')) + ".jpeg"
            r = requests.get(activity_image_url, stream = True)
            if r.status_code == 200:
                r.raw.decode_content = True
                
                with open(filename, 'wb') as f:
                    shutil.copyfileobj(r.raw, f)
                print('Image successfully Downloaded', filename)
            else:
                print('Image Couldn''t be retreived')
                
            dictionary['activity_image'] = filename
            
            # activity_hours = a.find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="metaInfo"]//div[@class="schedules"]//div[@class="hoursOfOperation"]//div[@class="regularHours"]/div[2]')
            # dictionary['activity_hours'] = activity_hours.text
            
            attractions_list.append(dictionary)

    print(attractions_list)
    addAttractionstoDB(attractions_list)
    
def addAttractionstoDB(attractions_list):
    try:
        load_dotenv()
        # Connects to the ElephantSQL DB
        conn = psycopg2.connect(f"dbname='{os.getenv('DB_NAME')}'user='{os.getenv('DB_USER')}' host='{os.getenv('DB_HOST')}' password='{os.getenv('DB_PASSWORD')}'")
        # Used to execute PostgreSQL statements
        cur = conn.cursor()
        for item in range(len(attractions_list)):  
            cur.execute(f"""INSERT INTO activities 
                    (activity_name, activity_type, activity_height, activity_learn_more_link, activity_image, park_id)
                    VALUES
                    ('{attractions_list[item]['activity_name']}', '{attractions_list[item]['activity_type']}', '{attractions_list[item]['activity_height']}','{attractions_list[item]['activity_learn_more_link']}', '{attractions_list[item]['activity_image']}', {attractions_list[item]['park_id']})
                    """)
            conn.commit()
            print("Successfully Inserted")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error whil inserting into DB: ", error)
    
    finally:
        if(conn):
            cur.close()
            conn.close()
            print("Connection closed")

findAttractions()