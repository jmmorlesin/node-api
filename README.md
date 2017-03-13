# Sample node.js API using Express and JWT

This project shows a sample of an API in node.js using Express and JWT to implement the security.
  
See more about JWT in [https://jwt.io](https://jwt.io)  

In the sample, it is used Mongo DB in order to do the proof of concept of the CRUD in a model.

Requirements
------------

Node.js  
MongoDB (You can get a database in mlab if you don't have MongoDB installed locally. See more in [https://mlab.com/](https://mlab.com/))   
Postman, curl or similar to run the calls to the API

Before you start
----------------
The application uses the config module to maintain the configurations for deployments in different environments. Only it is tracked on git the *sample.json*  

In the config folder, you can find the file *sample.json*   

```
{
  "application": {
    "environment": "test",
    "build": "1"
  },
  "database": {
    "mongodbUri": "mongodb://localhost:27017/api-test"
  },
  "jwt": {
    "secret": "jwt secret"
  },
  "credentials": {
    "username": "user",
    "password": "password"
  }
}
```

Copy this file into the next files:  
```
/config/default.json  
/config/test.json  
```

Now you can specify your values. Consider change the values, specifically the password in the credentials and the secret in the jwt object.  

 
Running the application and the tests
-------------------------------------

To run the application, clone the repository, create your *default.json* and *test.json* and use the following commands:

```
npm install
npm test
npm start

```

*npm install* will install the dependencies, *npm test* will launch the tests and *npm start* will launch the application on localhost on the port 3000 (The scripts are defined in the *package.json*)

When the application is running, you can access to the following endpoints:

/health (GET)   
/login (POST)  
/books (GET, POST)    
/books/:id (GET, PUT, DELETE)

Without credentials, you only will access to the health and login endpoints.  

Description of the health endpoint 
----------------------------------

GET  
/health

Response:  
```
{
  application: {
    name: "nodeAPI",
    version: "1.0.0",
    build: "1", 
    time: 1489436081787
  },
  request: {
    requestedUrl: "/health",
    id: "64cde43c-c0c8-456d-b9a9-f51d4ed3c149"
  },
  response: {
    version: "1",
    environment: "development",
    startTime: 1489436067937,
    upTime: 14279
  }
}
```
In this case, for example, the application.build property is task from the Continuous Integration tool to generate and replace it by the correct value.  

How to get a valid token
------------------------

Use the login endpoint with the valid credentials. In this sample, the unique user and password valid to get a token is defined in the *sample.json* in the credentials object.  

POST  
/login  
JSON Body content:  
```
{
  "username": "user",
  "password": "password"
}
```

Response:
```
{
  "username": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE0ODkzNDM2MzIsImV4cCI6MTQ4OTM0NzIzMn0.snbJCXU-wfBeD4Z0yFIysodrgYUzMeJfacP_93E0fiU"
}
```

Now you have a valid token that will be valid 1 hour (Defined in the *jwt-handler*).
With this valid token, you can access the resources in the /books endpoints adding the following header in the call: 

Key: Authorization  
Value: Bearer your_token


Project structure
-----------------

| Name                            | Description                                          |
|---------------------------------|------------------------------------------------------|
| **config**/sample.json          | Sample file to contain your keys and passwords       |
| **handlers**/book-handler.js    | Book handler with the CRUD operations                |
| **handlers**/db-handler.js      | Database handler                                     |
| **handlers**/health-handler.js  | Health handler to generate the status content        |
| **handlers**/jwt-handler.js     | JWT handler to generate new valid tokens             |
| **handlers**/login-handler.js   | Simple login handler to give credentials to the user |
| **models**/book.js              | Book model                                           |
| **routes**/book.js              | Routes for the REST endpoints of Book /books         |
| **routes**/health.js            | Route for the Health endpoint /health                |
| **test**/                       | Test folder                                          |
| app.js                          | Main application file                                |
| package.json                    | NPM dependencies                                     |


List of modules
---------------

| Module              | Description                                      |
|---------------------|--------------------------------------------------|
| body-parser         | Middleware to parse request bodies in req.body   |
| config              | Easy configurations for different environments   |
| express             | Node.js web framework                            |
| express-jwt         | Express middleware that validates a JWT token    |
| express-request-id  | Express middleware for setting unique request id |
| jsonwebtoken        | Json Web Tokens (JWT) implementation for node.js |
| mongoose            | MongoDB ODM                                      |
| chai                | BDD/TDD assertion library                        |
| chai-http           | HTTP call helper for chai                        |
| mocha               | Test framework                                   |


License
-------

May be freely distributed under the [MIT license](https://github.com/jmmorlesin/node-api/blob/master/LICENSE).

Copyright (c) 2017 Jose M. Morlesín 