from notify import notify
import Goalie
from bs4 import BeautifulSoup
import requests

url = "https://www.dailyfaceoff.com/starting-goalies/10-02-2019/"

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



# # Store the goalies and their status in a hash map for easy comparing
# goalieHashMap = {key: value for key, value in zip(goalies, status)}
# # Run through every hour starting at 12pm EST, ending at 10:30pm
# def isGoaliePlaying(goalies, map):
#     for goalie in goalies:
#         for key, val in map.items():
#             if key == goalie:
#                 #
#                 # Notify(val, key) - Call function that checks whether or not we need to 
#                 # notify the user
#                 #notify(val, goalie)
#                 print("Found " + goalie)
                
#                 # if val == 'Confirmed':
#                 #     print(goalie + ' is starting tonight.')
#                 #     #Contact user, can loop but how do we check we've sent the user a msg?
#                 #     #Maybe dont loop and check 30 minutes before gametime, then 15 if no confirmation
#                 # elif val == 'Likely':
#                 #     print(goalie + ' is likely starting tonight.')
#                 #     #If still likely 15 minutes before, contact user
#                 # else:
#                 #     print(goalie + ' has not been confirmed to start yet.')
#                 #     #If goalie name not found, before 15 mins, tell user not playing

#Store values in external file that we contacted user, file gets reset at midnight
# How to differientaite bewteen goalies

#Need to find what time goalie is playing at


myGoalies =['Braden Holtby', 'Mike Smith']
isMyGoaliePlaying(myGoalies, listOfGoalies)
           
    

#f = open('file.txt', 'r+')
#f.truncate(0)

#Create a Goalies data structure. Name, time, status