# Shopline Badges
[![Build Status](https://travis-ci.org/BagzieGracious/shopline.svg?branch=develop)](https://travis-ci.org/BagzieGracious/shopline)  [![Maintainability](https://api.codeclimate.com/v1/badges/9139b77619b785766124/maintainability)](https://codeclimate.com/github/BagzieGracious/shopline/maintainability)  [![Coverage Status](https://coveralls.io/repos/github/BagzieGracious/shopline/badge.svg?branch=develop)](https://coveralls.io/github/BagzieGracious/shopline?branch=develop)
                                                            
# Shopline
This application enables users to buy cheap and affordable computers from China by using the internet, and the transfer of money and data to execute these transactions.

**Application Features**

* user attendant can search and add products to buyer’s cart.
* user attendant can see his/her sale records but can’t modify them.
* App should show available products, quantity and price.
* Admin can see sales and can filter by attendants.
* Admin can add, modify and delete products.


# A user can perform the following :
 User:
 - User can search and add products to buyer’s cart.
 - User can see his/her sale records but can’t modify them.
 
 Administrator:
- Admin can see sales and can filter by attendants
- Admin owner can add, modify and delete products

 Use the following endpoints to perform the specified tasks 
    
    EndPoint                                           | Functionality
    ------------------------                           | ----------------------
    GET /users                                         | Fetch all users
    GET /users/<user_id>                               | Fetch specific user
    POST /users/signup                                 | Signup User
    POST /users/login                                  | Login User
    PUT /users/<users_id>                              | Update User
    DELETE /users/<users_id>                           | Delete User
    
**Getting started with the app**

**Technologies used to build the application**

* [Javascript ES6](https://www.w3schools.com/js/js_es6.asp)

* [Node.js](https://nodejs.org/dist/latest-v10.x/docs/api/)

# Installation

Create a new directory and initialize git in it. Clone this repository by running
```sh
$ git clone https://github.com/BagzieGracious/shopline.git
```

Install the dependencies
```sh
$ npm install or yarn install
```

Start the application by running
```sh
$ npm start
```

Test application by running
```sh
$ npm test
```

Test your api using a client app like postman
