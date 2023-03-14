const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // replace with your client's origin URL
    credentials: true
  }));
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'uma6bobic',
    database: 'kosarka'
});

app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
 }));
const db = require('./models');

app.get('/', (req, res) => {
 
})
 
app.get("/api/get", (req,res) => {
    const sqlInsert = "SELECT * FROM osoba;";
    db.query(sqlInsert, (err, result) =>{
        res.send(result);
    }); 
});
 
app.get("/api/userSession", (req,res) => {
    console.log("User pri get session kada funckiji je " + req.session.username+req.session.name);
    res.send(req.session.username);  
 });
 
app.post("/api/login", (req, res) => { 
    console.log("User name je: " + req.body.data.username)
    if (req.body.data.username) {
        req.session.username = req.body.data.username;
    } else {
        console.log("elseeeeeeeeeee")
        res.status(401).send('Invalid username or password');
    }
    console.log("Userkk name je: " + req.session.username)
     
    var sqlGet = 'SELECT name FROM osoba WHERE username = ?';
    db.query(sqlGet, [req.body.data.username] ,(err, result) => { //asihrono izvrsiti
        
       //req.session.name = result[0].name;
        console.log("Postvljen"+req.session.name)
        res.send("dlkgjag")
    });
 })
 
app.post("/api/insert", (req, res) => { 
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const sqlInsert = "INSERT INTO osoba (username, password, name) VALUES (?,?,?)";
    db.query(sqlInsert, [username, password, name], (err, result) =>{
        console.log(result);
    }); 
    req.session.name = name;
    req.session.save();
 });
 
app.get("/api/isLoggedIn", (req, res) => {
    const usersession = req.session.user;
    if (!usersession) { // check if the user is not logged in
        res.send(false);
        return;
    }
    const sqlGet = 'SELECT name FROM osoba WHERE name = ' + usersession;
    console.log("Session je upisan" + usersession);
    console.log(sqlGet);
    db.query(sqlGet, (err, result) => {
        console.log(result);
        res.send(result);
     });
 });
 
app.post('/logout', function(req,res){
   //req.session.destroy();
    res.send(JSON.stringify('Obrisano je'));
 });

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
