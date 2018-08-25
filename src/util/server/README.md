# Journey Server
A basic server built with node.js able to access to a mySQL DB.
The server runs by default on port 3700 and exposes few endpoints to get data by GET HTTP requests.

## Prerequisites
* Linux/MacOS
* Homebrew (for installing mysql)
* Node
* [NVM](https://github.com/creationix/nvm) (for installing Node)


## Install mySQL
```bash
# TERMINAL
# terminal
nvm i

# check your system for potential problems.
brew doctor

# install mysql locally
brew install mysql

# start mysql service
brew services start mysql

# This program enables you to improve the security of your MySQL installation.
# It will start the process to setup the credentials for your local DB.
sudo mysql_secure_installation

# Try to access to mysql console using the password you set above.
# When you will create the DB needed for your tests keep note of the name of the DB
# and the password; you will need them in the javascript server file.
mysql -uroot -p


#create config.js file that contains DB credentials
touch config.js
# {
#   host: 'host',
#   user: 'user',
#   password: 'password',
#   database: 'database'
# }
```
## Setup server
```bash
# clone the repository
git clone https://gitlab.com/macchitello/journey-server.git

# go into the folder
cd journey-server

# try it out!
node app.js
```