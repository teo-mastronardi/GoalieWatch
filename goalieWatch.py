from notify import notify
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

#goalieFound = true

def isGoaliePlaying(goalies, map):
    for goalie in goalies:
        for key, val in map.items():
            if key == goalie:
                #
                # Notify(val, key) - Call function that checks whether or not we need to 
                # notify the user
                notify(val, goalie)
                
                # if val == 'Confirmed':
                #     print(goalie + ' is starting tonight.')
                #     #Contact user, can loop but how do we check we've sent the user a msg?
                #     #Maybe dont loop and check 30 minutes before gametime, then 15 if no confirmation
                # elif val == 'Likely':
                #     print(goalie + ' is likely starting tonight.')
                #     #If still likely 15 minutes before, contact user
                # else:
                #     print(goalie + ' has not been confirmed to start yet.')
                #     #If goalie name not found, before 15 mins, tell user not playing

#Store values in external file that we contacted user, file gets reset at midnight
# How to differientaite bewteen goalies

#Need to find what time goalie is playing at


myGoalies =['Carter Hart', 'Tuukka Rask']
isGoaliePlaying(myGoalies, goalieHashMap)

# def notify(val, goalie):
#     # Check before if we need to notify user
#     f= open("notify.txt","r")
#     if f.mode == 'r':
#         contents = f.read()
#         if goalie in contents:
#             print("goalie in")
#             return
#         #email 'goalie' is 'val' to play
#         f= open("notify.txt", 'w+')
#         # So we write goalie that we've notified the user about
#         f.write(goalie + ", ")
#         f.close()
            
    

#f = open('file.txt', 'r+')
#f.truncate(0)