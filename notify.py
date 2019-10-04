from datetime import datetime 

def notify(val, goalie, time):

    preciseTime = time[:-4].replace(" ", "") # Chopping of timezone and removing whitespace
    #Timezone should be irrelevant, it will be hosted in eastern and check the time in eastern


    currentYMD = datetime.now()
    # Intepret game time as today's date so we can perform arithmetic on it properly
    gameTime = datetime.strptime(str(currentYMD.year)+' '+str(currentYMD.month)+' '+str(currentYMD.day)+' '+preciseTime,
                                     '%Y %m %d %I:%M%p')
    
    timeToGameTime = gameTime - datetime.now()

    minutesToGameTime = divmod(timeToGameTime.total_seconds(), 60)[0] # This is it


    # Check before if we need to notify user
    f= open("notify.txt","r")
    if f.mode == 'r':
        contents = f.read()
        if goalie in contents: # We've notified the user
            return
    f.close()
    if val == 'Confirmed':
        #email 'goalie' is 'val' to play
        f= open("notify.txt", 'a')
        # So we write goalie that we've notified the user about
        f.write(goalie + ", ")
        f.close()
    #if val =='Likely':
        # Check time, if it's 15 mins to gametime, msg user... add to file
        # or just message user regardless 20 minutes before about status

    #Run this program on bash ever quatre of minuite