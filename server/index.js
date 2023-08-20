const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');


const app = express();
app.use(cors({
    origin: ['http://localhost:3000/', 'https://sporteventfront.onrender.com/'], // replace with your client's origin URL
    credentials: true
  }));
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createPool({
    host: 'sql.freedb.tech',
    user: 'freedb_murisbob1',
    password: 'wscfE2gmpZtE*S4',
    database: 'freedb_diplomskiData'
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
    console.log("SEssion unutar sesess je " + req.session.username);
    let myObj = req.session.username;
    if(typeof myObj === "undefined"){
        console.log("Da li ulazi ovdje");
        res.send("false");
    }
    else{
        res.send(req.session.username);        
    }      
});
 
app.post("/api/login", (req, res) => { 
    console.log("User name je: " + req.body.username)
    if (req.body.username) {
        req.session.username = req.body.username;
        console.log("ime je " + req.session.username)
        var sqlGetLogin = 'SELECT * FROM osoba WHERE username =? AND password=?';
        db.query(sqlGetLogin, [req.body.username, req.body.password] ,(err, result) => {
            if(result.length!==0){
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
     var sqlGetLogin = 'SELECT * FROM osoba WHERE username =? AND password=? AND name=?';
        db.query(sqlGetLogin, [req.body.username, req.body.password, req.body.name] ,(err, result) => {
        if(result.length!==0){
            res.send("false");
        }else{
            const sqlInsert = "INSERT INTO osoba (username, password, name) VALUES (?,?,?)";
            db.query(sqlInsert, [username, password, name], (err, result1) =>{
                console.log(result1);
            }); 
            req.session.username = req.body.username;
            req.session.name = name;
            res.send("true");
            req.session.save();
        }
    })
 });
 
app.post('/logout', function(req,res){
    req.session.destroy();
    res.send("false");
 });

 app.post('/posts/insert', function(req, res){
    const title = req.body.title;
    const postText = req.body.postText;
    const username = req.body.name;
    console.log("Podatke koje saljemo su: " + title + " " + postText + " " + username); 
    const sqlInsert = 'INSERT INTO posts (title, postText, username) VALUES (?,?,?)';
    db.query(sqlInsert, [title, postText, username], (err, result) => {
        console.log(result);
        res.send("true");
    })
 });

 app.get('/posts/get', function(req,res){
    const sqlGet = 'SELECT * FROM posts;'
    db.query(sqlGet, (err, result) =>{
        res.send(result);
    }); 
 })

 app.get('/getPostbyId', function(req,res){
    const postId = req.query.postId;
    const sqlGet = "SELECT * FROM posts WHERE id = ?;"
    db.query(sqlGet, [postId] , (err, result) => {
        res.send(result);
    })
 });

 app.post('/insertComment', (req,res) =>{
    console.log("zove li se funkcija");
    const comment = req.body.comment;
    const postId = req.body.postId;
    console.log("COmment je dobat " + comment + " postIDe je dobar " + postId );
    const sqlInsert = 'INSERT INTO comments (comment, postId) VALUES (?,?)';
    db.query(sqlInsert, [comment, postId], (err, result) => {
        console.log(result);
        res.send("true");
    })
 })


 app.get('/getCommentsbyId', function(req,res){
    const postId = req.query.postId;
    const sqlGet = "SELECT * FROM comments WHERE postId = ?;"
    db.query(sqlGet, [postId] , (err, result) => {
        res.send(result);
    })
 });

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
