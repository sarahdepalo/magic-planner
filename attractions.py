from re import A
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import os
from dotenv import load_dotenv
import psycopg2
import time

load_dotenv()
# Connects to the ElephantSQL DB
conn = psycopg2.connect(f"dbname='{os.getenv('DB_NAME')}'user='{os.getenv('DB_USER')}' host='{os.getenv('DB_HOST')}' password='{os.getenv('DB_PASSWORD')}'")
# Used to execute statements
cur = conn.cursor()

driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get('https://disneyworld.disney.go.com/attractions/')

time.sleep(10)

attractions = driver.find_elements_by_xpath('//div[@class="cardLinkContainer"]')

attractions_list = []

for a in attractions:
    dictionary = {}
    activity_name = a.find_element_by_xpath('.//div[@class="itemInfo"]//h2[@class="cardName"]')
    if activity_name != '':
        dictionary['activity_name'] = activity_name.text
        location = a.find_element_by_xpath('.//div[@class="itemInfo"]//div[@class="descriptionLines"]//span[@aria-label="location"]')
        # Need to add statements to convert name to matching park number (1-4)
        dictionary['park_id'] = location.text
        attractions_list.append(dictionary)


print(attractions_list)


# attractions_list = []
# for attraction in range(len(attractions)):
#     attractions_list.append(attractions[attraction].text)

# cur.execute(f"""INSERT INTO activities 
#             (activity_name, activity_type, height, activity_hours, activity_image, activity_learn_more_link, park_id)
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