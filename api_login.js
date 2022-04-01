const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const jwtfile= require('./jwttokenfile');
const res = require('express/lib/response');
const server= http.createServer(app);
const dotenv = require('dotenv');
dotenv.config();


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

const db=require("./dbmodel").userDB
app.post('/login', async (req, res) => {
    try{  let foundUser = db.find((data) => req.body.username === data.username && req.body.password === data.password 
        );
      
        if (foundUser){
           
            const token =  jwtfile.generateAccessToken({name:foundUser.username})
console.log(token)

            res.status(200).json ({message:'successfull', token:token});
        

        }
        else {
            res.status(400).send("user not available")
    }
    } catch(error){
        res.send(error);
    }
});

app.get('/userdetail',jwtfile.authenticateToken,async (req, res) => {
    try{   
        console.log("token")
        let foundUser = db.find((data) => req.user.name)
     res.status(200).json  ({message:'successfull', data:foundUser});  
        
    }
     catch(error){
        res.send(error);
    }
});
server.listen(3000, function(){
    console.log("server is listening on port:3000");

});