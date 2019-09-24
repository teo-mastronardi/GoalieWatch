
def notify(val, goalie):
    # Check before if we need to notify user
    f= open("notify.txt","r")
    if f.mode == 'r':
        contents = f.read()
        if goalie in contents:
            return
    f.close()
    #email 'goalie' is 'val' to play
    f= open("notify.txt", 'w+')
    # So we write goalie that we've notified the user about
    f.write(goalie + ", ")
    f.close()
            

    