import time
import os
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from dotenv import load_dotenv
import psycopg2

load_dotenv()
# Connects to the ElephantSQL DB
conn = psycopg2.connect(f"dbname='{os.getenv('DB_NAME')}'user='{os.getenv('DB_USER')}' host='{os.getenv('DB_HOST')}' password='{os.getenv('DB_PASSWORD')}'")
# Used to execute PostgreSQL statements
cur = conn.cursor()

driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get('https://disneyworld.disney.go.com/attractions/')

time.sleep(10)

attractions = driver.find_elements_by_class_name('finderCard')

attractions_list = []

for a in attractions:
    dictionary = {}
    activity_name = a.find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//h2[@class="cardName"]')
    if activity_name != '':
        dictionary['activity_name'] = activity_name.text
        
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
        
        activity_type = a.find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//div[@class="descriptionLines"]/span[2]')
        dictionary['activity_type'] = activity_type.text
        
        activity_image = a.find_element_by_xpath('.//div[@class="cardLinkContainer"]//picture[@class="thumbnail"]/source[2]').get_attribute("src")
        dictionary['activity_image'] = activity_image
        
        activity_learn_more_link = a.find_element_by_css_selector('a.cardLinkOverlay').get_attribute("href")
        dictionary['activity_learn_more_link'] = activity_learn_more_link
        
        attractions_list.append(dictionary)


print(attractions_list)


# attractions_list = []
# for attraction in range(len(attractions)):
#     attractions_list.append(attractions[attraction].text)

# cur.execute(f"""INSERT INTO activities 
#             (activity_name, activity_type, activity_height, activity_hours, activity_image, activity_learn_more_link, park_id)
#             VALUES
#             ()
#             """)

cur.close()
conn.close()
driver.quit()

# dataList = [{'a': 1}, {'b': 3}, {'c': 5}]
# for index in range(len(dataList)):
#     for key in dataList[index]:
#         print(dataList[index][key])