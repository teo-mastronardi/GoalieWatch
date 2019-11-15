#
# GOALIEWATCH SERVER PACKAGE INSTALLATION
# --------------------------------
#
# Installing required python and node packages for server migration to Pi
#

Write-Host "This may take a while..." -ForegroundColor Yellow

    # Upgrade pip
    python -m pip install --upgrade pip
    Write-Host "pip installed..." -ForegroundColor Green

    # Install pandas
    pip install pandas
    Write-Host "Pandas installed..." -ForegroundColor Green

    # Webscraping
    pip install selenium
    pip install webdriver-manager
    pip install BeatifulSoup4
    Write-Host "Webscraping packages installed..." -ForegroundColor Green

    # Install Mongoose for DB
    npm install mongoose --save
    Write-Host "Mongoose installed..." -ForegroundColor Green

    # Adding in all middleware
    npm install body-parser --save
    Write-Host "Middleware installed..." -ForegroundColor Green

    # Adding in session packages
    npm install --save express-session
    Write-Host "Session packages installed..." -ForegroundColor Green

    # Adding in cookie-Parser
    npm install --save cookie-parser
    Write-Host "Cookie package installed..." -ForegroundColor Green

    # Install Prompt --- ON HOLD
    # npm install prompt

Write-Host "All packages sucessfully installed!" -ForegroundColor Green