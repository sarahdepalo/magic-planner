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
    
    while i < 25:
        print("CURRENT NUMBER", i)
        load_check = WebDriverWait(driver, 11111160).until(EC.presence_of_element_located((By.ID, "disneyPicks-default")))
        
        dining_list = driver.find_element_by_id('disneyPicks-default')
        restaurants = dining_list.find_elements_by_class_name('finderCard')

        dictionary = {}
        
        restaurant_name = restaurants[i].find_element_by_xpath('.//div[@class="cardLinkContainer"]//div[@class="itemInfo"]//h2[@class="cardName"]')
        print('RESTUARANT NAME PASSED')
        
        dictionary['restaurant_name'] = restaurant_name.text.replace("'", "''").replace('"', '')
        restaurant_list.append(dictionary)
        i += 1
    print('RESTAURANT LIST:', restaurant_list)