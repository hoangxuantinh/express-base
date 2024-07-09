
## Description

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

**Fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org).**

## Installation

```bash
$ yarn install
```
## Running the app

```bash
# development
$ yarn dev

# seed user
$ yarn seed

## Test

```bash
# to simple i'm using a common db to test and run app
# unit tests
$ yarn test

### Postman Collection 
# get access token
POST login
http://localhost:3000/api/v1/auth/login

Body json
{
    "email": "account1@gmail.com",
    "password": "password1"
}

## Create Event
POST http://localhost:3000/api/v1/event

Authorization
Bearer Token
Token <token>
Body 
{
    "eventName": "event update",
    "startDate": "2022-03-25",
    "dueDate": "2024-08-25",
    "description": "description update"
}


## Update Event
PUT http://localhost:3000/api/v1/event?id

Authorization Bearer Token
Body 
{
    "eventName": "event update",
    "startDate": "2022-03-25",
    "dueDate": "2024-08-25",
    "description": "description update"
}



# Delete Event 
DELETE  http://localhost:3000/api/v1/event/668c068089b7f8e43add6b49
Authorization Bearer Token


# Get All
GET http://localhost:3000/api/v1/event?page=1&perPage=10
Authorization Bearer Token
