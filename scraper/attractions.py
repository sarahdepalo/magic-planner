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

def findAttractions():
    driver = webdriver.Chrome(ChromeDriverManager().install())

    driver.get('https://disneyworld.disney.go.com/attractions/')
    
    attractions_list = []
    i = 0

    # While loop is being used since the scaper must visit a completely different webpage but still maintain spot within the list of attractions
    while i < 126:
        print('CURRENT NUMBER', i)
        load_check = WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, "hasSchedules-disneyPicks-default")))
        
        scheduled_attractions = driver.find_element_by_id('hasSchedules-disneyPicks-default')
        attractions = scheduled_attractions.find_elements_by_class_name('finderCard')

        dictionary = {}
            
        activity_name = attractions[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//h2[@class="cardName"]')
                
        activity_type = attractions[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]/span[2]')
        
        # Note: the Palais du Cinema ride location does not have a description which is why it is being skipped for now. The water park is being skipped since it will not be included in this app. 
        if activity_name.text != '' and activity_name.text != 'Palais du Cinéma' and "Water Rides" not in activity_type.text:
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
                
            activity_height = attractions[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]/span[1]')
            dictionary['activity_height'] = activity_height.text
                    
            info_container = attractions[i].find_element_by_class_name('metaInfo')
            dictionary['activity_hours'] = info_container.text
            
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

            try:
                attractions[i].click()
                load_check_details = WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.CLASS_NAME, "dynamic-html")))
                story_card = driver.find_element_by_class_name('story-card')
                description = story_card.find_element_by_class_name('dynamic-html')
                
                if description.text == '':
                    dictionary['activity_description'] = 'No description'
                else:
                    dictionary['activity_description'] = description.text.replace("'", "''").replace('"', '')
                driver.execute_script("window.history.go(-1)")

            except:
                pass
            i += 1
            attractions_list.append(dictionary)
        else:
            i += 1
            continue
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
        print("Error while inserting into DB: ", error)
    
    finally:
        if(conn):
            cur.close()
            conn.close()
            print("Connection closed")

findAttractions()