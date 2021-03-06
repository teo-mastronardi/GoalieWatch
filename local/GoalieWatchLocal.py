from notifyLocal import notifyLocal
import GoalieLocal
from bs4 import BeautifulSoup
import requests

def beginScrape():
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


    listOfScrapeGoalies = []
    i = j = 0
    while i < len(goalies):
        me = GoalieLocal.Goalie(goalies[i], times[j], status[i])
        listOfScrapeGoalies.append(me)
        i += 1

        if i % 2 == 0:
            j +=1 # There are 1 times for 2 goalies, so we must insert a time every other loop

    #Enter you goalies here
    #Ex: ['Goalie 1', 'Goalie 2']
    myGoalies =['Andrei Vasilevskiy', 'Adin Hill', 'John Gibson']

    isMyGoaliePlaying(myGoalies, listOfScrapeGoalies)

#Create function but to iterate through list of objects
#Call this function on success of uploading into database?
def isMyGoaliePlaying(myGoalies, scrapedGoalies):
    for starters in scrapedGoalies:
        if starters.name in myGoalies:
            print("Found " + starters.name)
            notifyLocal(starters.status, starters.name, starters.time)

            

beginScrape()
