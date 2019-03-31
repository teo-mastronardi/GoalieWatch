from bs4 import BeautifulSoup
import requests

url = "https://www.dailyfaceoff.com/starting-goalies/"

page = BeautifulSoup(requests.get(url).text, "lxml")
goalies = []
status = []
i = 1
for headlines in page.find_all("h4"):
    i += 1
    if i % 3 != 0:
        goalies.append(headlines.text.strip())

goalies = goalies[1:] #Remove the first one 
#Get goalies statuses 
for headlines in page.find_all("h5"):
    status.append(headlines.text.strip())

# Store the goalies and their status in a hash map for easy comparing
goalieHashMap = {key: value for key, value in zip(goalies, status)}

def isGoaliePlaying(goalies, map):
    for goalie in goalies:
        for key, val in map.items():
            if key == goalie:
                if val == 'Confirmed':
                    print(goalie + ' is starting tonight.')
                elif val == 'Likely':
                    print(goalie + ' is likely starting tonight.')
                else:
                    print(goalie + ' has not been confirmed to start yet.')


myGoalies =['Carter Hart', 'Darcy Kuemper']
isGoaliePlaying(myGoalies, goalieHashMap)