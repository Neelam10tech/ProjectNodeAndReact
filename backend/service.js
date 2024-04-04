const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
    {"email":"abc@gmail.com","username":"abc","id":1,"password":"122abc"},
    {"email":"new@gmail.com","username":"new","id":2,"password":"122new"},
    {"email":"siya@gmail.com","username":"sia","id":3,"password":"122siya"}
];

app.post("/api/login",(req,res) =>{
    const {email, password} = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if(user){
        const payload = {id: user.id};
        jwt.sign(payload, 'sss', {expiresIn:'10h'},(err,token) =>{
            if(err){
                console.error('Error generating JWT' , err);
                res.sendStatus(500);
            }else{
                res.json({token:token});
            }
        });
    }else{
        let errorMessage = '';
        const userWithEmail = users.find(user => user.email === email);
        if(!userWithEmail){
            errorMessage = "Invalid Email!";
        }else if(userWithEmail.password !== password){
            errorMessage = "Invalid password";
        }
        res.status(401).json({error:errorMessage});
    }
});

app.listen(8080,() =>{
    console.log("Server start on port 8080");
});
