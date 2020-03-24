# Authorization Module

You can use this project on your app to Register,Login and authenticate Users through token`s

## Start 🚀

_These instructions will allow you to obtain a copy of the running project on your local machine_


### Pre-requirements📋

1. Install NodeJS

sudo apt-get update
sudo apt-get install node
sudo apt-get install nodejs

2. Verify the nodejs version and enter the console

nodejs -v
nodejs

3. Install NPM (Node Package Manager)

sudo apt-get install npm

4. Install express on global mode

sudo npm install -g express

__This project is implemented with Mysql client database
    Table model users : 
            *id(integer not null)
            *name(string(255))
            *password(string(255))
            *id_role(integer)

Create same table or modify service/database to implement methods for save and get data users

 Optional : 
            *You can install nodemon for watch server changes.
                -sudo npm install --save nodemon


### Install 🔧
-Open Terminal,then execute:
            -npm install

-If you install nodemon
            -npm run start

-Else   
            -node server/server.js


## Test ⚙️

    -First: 
            * Do POST request to YOUR_LOCALHOST:YOUR_PORT/api/auth/register
                . Put in body request: 
                {
                    "username":"YOUR_USER_NAME",
                    "password":"YOUR_PASSWORD",
                    "id_role"://integer to describe role
                            }
    -Second: 
            * Do POST request to YOUR_LOCALHOST:YOUR_PORT/api/auth/login
                . Put in body request: 
                {
                    "username":"YOUR_REGISTER_USER_NAME",
                    "password":"YOUR_REGISTER_PASSWORD",
                }
                    **On Response you will recibe an authentication token, you need save it and
    -Third: *Do GET request to YOUR_LOCALHOST:YOUR_PORT/api/auth/
            . Put in Header request :
                {   
                    authorization : SAVED_TOKEN

                }



## Build with 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [NODE JS](https://nodejs.org/es/) - Framework
* [NPM](https://www.npmjs.com/) - Handler dependencies



## Versioned 📌

Use[GITHUB](https://github.com) for versioned. To see avaiable versions go to (https://github.com/darioasaro/AuthenticationModule).

## Author ✒️

* **Dario Asaro** - *Develop api* - (https://github.com/darioasaro)
