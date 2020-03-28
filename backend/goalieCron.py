import urllib.parse
import requests
from pymongo import MongoClient
# from dotenv import load_dotenv

# Connecting to mongoDB
client = MongoClient('mongodb+srv://<username>:<password>@goaliewatch-0mgxp.mongodb.net/test?retryWrites=true&w=majority')
db     = client.get_database('GoalieWatch')
collection = db.goalies

# Pulling data from NHL teams
team_api  = 'https://statsapi.web.nhl.com/api/v1/teams/'
team_url  = team_api + urllib.parse.urlencode({})
team_data = requests.get(team_url).json()

# Looping through all the teams
for i in range(len(team_data['teams'])):
    team_id   = team_data['teams'][i]['id']
    team_name = team_data['teams'][i]['name']
    print(team_name)

    # Pulling data from teams roster
    position_api  = 'https://statsapi.web.nhl.com/api/v1/teams/'+ str(team_id) +'/roster'
    position_url  = position_api + urllib.parse.urlencode({})
    position_data = requests.get(position_url).json()

    # Looping through all the players in each team, retrieving data
    for j in range(len(position_data['roster'])):
        position      = position_data['roster'][j]['position']['name']
        player_name   = position_data['roster'][j]['person']['fullName']
        player_id     = position_data['roster'][j]['person']['id']
        player_link   = position_data['roster'][j]['person']['link']
        jersey_number = position_data['roster'][j]['jerseyNumber']

        # Store each goalie into database
        if position == 'Goalie':            
            goalie = {
                "team_id": team_data['teams'][i]['id'],
                "team_name": team_data['teams'][i]['name'],
                "goalie_name": position_data['roster'][j]['person']['fullName'],
                "goalie_id": position_data['roster'][j]['person']['id'],
                "jersey_number": position_data['roster'][j]['jerseyNumber'],
                "player_link": position_data['roster'][j]['person']['link']
            }

            collection.insert_one(goalie)
            print(player_name + ' stored')

            # print(position)
            # print(player_name)
            # print(jersey_number)
            # print(player_id)
            # print(player_link)
