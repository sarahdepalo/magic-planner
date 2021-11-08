import time
import os
import re
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from dotenv import load_dotenv
import psycopg2
import requests
import shutil 

def findAttractions():
    driver = webdriver.Chrome(ChromeDriverManager().install())

    driver.get('https://disneyworld.disney.go.com/attractions/')

    time.sleep(10)

    attractions_list = []
    i = 0
    
    while i < 5:
        attractions = driver.find_elements_by_class_name('finderCard')
        for a in attractions:
            dictionary = {}
            
            activity_name = attractions[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//h2[@class="cardName"]')
            print('ACTIVITY NAME PASSED')
                
            activity_type = attractions[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]/span[2]')
            print('ACTIVITY TYPE PASSED')
                    
            if activity_name != '':
                dictionary['activity_name'] = activity_name.text.replace("'", "''").replace('"', '')
                dictionary['activity_type'] = activity_type.text.replace("'", "''")

                location = attractions[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]//span[@aria-label="location"]')
                if 'Magic Kingdom Park' in location.text:
                    dictionary['park_id'] = 1
                elif 'Animal Kingdom' in location.text:
                    dictionary['park_id'] = 2
                elif 'Hollywood Studios' in location.text:
                    dictionary['park_id'] = 3
                else: 
                    dictionary['park_id'] = 4

                print('ACTIVITY LOCATION PASSED')
                
                activity_height = attractions[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]/span[1]')
                dictionary['activity_height'] = activity_height.text
                
                print('ACTIVITY HEIGHT PASSED')
                    
                info_container = attractions[i].find_element_by_class_name('metaInfo')
                dictionary['activity_hours'] = info_container.text
            
                print('ACTIVITY HOURS PASSED')
            
                activity_image_url = attractions[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//picture[@class="thumbnail"]/source[2]').get_attribute("src")
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
                print('ACTIVITY IMAGE PASSED')
                    
                try:
                    attractions[i].click()
                    time.sleep(8)
                    story_card = driver.find_element_by_class_name('story-card')
                    description = story_card.find_element_by_class_name('dynamic-html')
                    dictionary['activity_description'] = description.text.replace("'", "''")
                    print('ACTIVITY DESCRIPTION PASSED')
                    driver.execute_script("window.history.go(-1)")
                    time.sleep(10)
                except:
                    pass
                i += 1
                attractions_list.append(dictionary)
                print('CURRENT ATTRACTIONS LIST', attractions_list)


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
                    (activity_name, activity_type, activity_height, activity_hours, activity_image, activity_description, park_id)
                    VALUES
                    ('{attractions_list[item]['activity_name']}', '{attractions_list[item]['activity_type']}', '{attractions_list[item]['activity_height']}','{attractions_list[item]['activity_hours']}', '{attractions_list[item]['activity_image']}', '{attractions_list[item]['activity_description']}', {attractions_list[item]['park_id']})
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