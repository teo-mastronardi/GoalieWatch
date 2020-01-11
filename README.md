# GoalieWatch
A python based application that allows users to receive emails on whether their goalie is starting that day for fantasy hockey.


### Setup Guide

If you'd like to run this locally while we work on making a website:

Step 1
- Make sure you have python3 installed

Step 2
- Install 

          GoalieWatchLocal.py
          GoalieLocal.py
          notifyLocal.py
          sendEmailLocal.py
          
Step 3
- In GoalieWatchLocal.py, enter your goalies in the 'myGoalies' list

  In sendEmailLocal.py, change 'receiver_email' to your email
  
Step 4
- Create a crontab to run the app every 15 minutes, starting at 10:00am to 11:45pm (Incase of early game times)

          To create a cron tab in terminal, type: 
          crontab -e
          
          and paste the following:
          */15    10-23        *     * *     /path/GoalieWatchLocal.py
          
          
