from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()
# Connects to the ElephantSQL DB
conn = psycopg2.connect(f"dbname='{os.getenv('DB_NAME')}'user='{os.getenv('DB_USER')}' host='{os.getenv('DB_HOST')}' password='{os.getenv('DB_PASSWORD')}'")
# Used to execute statements
cur = conn.cursor()

driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get('https://disneyworld.disney.go.com/attractions/')
# Find the attraction name, create an object with name location, type of ride, height, hours, picture to insert into the database
attractions = driver.find_elements_by_xpath('//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//h2[@class="cardName"]')
attractions_list = []
for attraction in range(len(attractions)):
    attractions_list.append(attractions[attraction].text)

print(attractions_list)
cur.close()
conn.close()
driver.quit()

# Activites schema: 
# INSERT INTO activites 
# (activity_name, activity_type, height, activity_hours, activity_image, activity_learn_more_link, park_id)
