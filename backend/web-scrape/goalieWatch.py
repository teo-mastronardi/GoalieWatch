from notify import notify
import Goalie
from bs4 import BeautifulSoup
import requests

url = "https://www.dailyfaceoff.com/starting-goalies/"

page = BeautifulSoup(requests.get(url).text, "lxml")
goalies = []
status = []
times = []
i = 1
for headlines in page.find_all("h4"):
    i += 1
    if i % 3 != 0: # Every 3rd h4 is goalie
        goalies.append(headlines.text.strip())

goalies = goalies[1:] #Remove the first one 
#Get goalies statuses 
for headlines in page.find_all("h5"):
    status.append(headlines.text.strip())

for headlines in page.find_all("span", {"class": "game-time"}):
    times.append(headlines.text.strip())


listOfGoalies = []
i = j = 0
while i < len(goalies):
    me = Goalie.Goalie(goalies[i], times[j], status[i])
    listOfGoalies.append(me)
    i += 1

    if i % 2 == 0:
        j +=1 # There are 1 times for 2 goalies, so we must insert a time every other loop

#Create function but to iterate through list of objects

def isMyGoaliePlaying(goalies, listOfPlaying):
    for starters in listOfPlaying:
        if starters.name in goalies:
            print("Found " + starters.name)
            notify(starters.status, starters.name, starters.time)


myGoalies =['Carter Hart', 'Cory Schneider']
isMyGoaliePlaying(myGoalies, listOfGoalies)

