const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');


//popraviti da se sessioja odmah updejta ne nakon ponovnog pristupa

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


app.get('/', (req, res) => {
    res.send("U home je");
})  
 
app.get("/api/get", (req,res) => {
    const sqlInsert = "SELECT * FROM osoba;";
    db.query(sqlInsert, (err, result) =>{
        res.send(result);
    }); 
});

app.get("/api/userSession1", (req,res) => {
    console.log("User pri get session kada funckiji je " + req.session.username+ "   " +req.session.name);
    res.send(req.session.username);  
});
 
app.post("/api/login", (req, res) => { 
    console.log("User name je: " + req.body.username)

    if (req.body.username) {
        var sqlGetLogin = 'SELECT * FROM osoba WHERE username =? AND password=?';
        db.query(sqlGetLogin, [req.body.username, req.body.password] ,(err, result) => {
            if(result.length!==0){
                req.session.username = req.body.username;
                req.session.name = result[0].name;
                res.send("true");
            }
            else{
                res.send("false");
            }
        });
    } else {
        console.log("elseeeeeeeeeee")
        res.status(401).send('Invalid username or password');
    }
 })
 
app.post("/api/insert", (req, res) => { 
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const sqlInsert = "INSERT INTO osoba (username, password, name) VALUES (?,?,?)";
    db.query(sqlInsert, [username, password, name], (err, result) =>{
        console.log(result);
    }); 
    req.session.username = req.body.username;
    req.session.name = name;
    res.send("postavljen user");
    req.session.save();
 });
 
app.post('/logout', function(req,res){
    req.session.destroy();
 });

 app.post('/posts/insert', function(req, res){
    const title = req.body.title;
    const postText = req.body.postText;
    const username = req.body.username; 
    const sqlInsert = 'INSERT INTO posts (title, postText, username) VALUES (?,?,?)';
    db.query(sqlInsert, [title, postText, username], (err, result) => {
        console.log(result);
    })
 });

 app.get('/posts/get', function(req,res){
    const sqlGet = 'SELECT * FROM posts;'
    db.query(sqlGet, (err, result) =>{
        res.send(result);
    }); 
 })

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
