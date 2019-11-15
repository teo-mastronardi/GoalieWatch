#
# GOALIEWATCH BACKEND SERVER
# --------------------------------
#
# Installing required python and node packages for server migration to Pi
#

try:
    # Upgrade pip
    python -m pip install --upgrade pip

    # Install pandas
    pip install pandas

    # Webscraping
    pip install selenium
    pip install webdriver-manager
    pip install BeatifulSoup4

    # Install Prompt --- ON HOLD
    # npm install prompt

    # Install Mongoose for DB
    npm install mongoose --save

    # Adding in all middleware
    npm install body-parser --save

    # Adding in session packages
    npm install --save express-session

    # Adding in cookie-Parser
    npm install --save cookie-parser

print("All packages installed")

