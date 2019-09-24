
def notify(val, goalie, time):
    # Check before if we need to notify user
    f= open("notify.txt","r")
    if f.mode == 'r':
        contents = f.read()
        if goalie in contents:
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

            

    