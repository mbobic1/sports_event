const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql2');
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


app.get('/', (req, res) => {
 
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
        req.session.username = req.body.username;
    } else {
        console.log("elseeeeeeeeeee")
        res.status(401).send('Invalid username or password');
    }
    console.log("Userkk name je: " + req.session.username)
     
    var sqlGet = 'SELECT name FROM osoba WHERE username = ?';
    db.query(sqlGet, [req.body.username] ,(err, result) => { //asihrono izvrsiti
        
        req.session.name = result[0].name;
        console.log("Postvljen"+req.session.name)
        res.send("asdasfas");
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
    req.session.username = req.body.username;
    req.session.name = name;
    res.send("postavljen user");
    req.session.save();
 });
 
app.post('/logout', function(req,res){
   //req.session.destroy();
    res.send(JSON.stringify('Obrisano je'));
 });

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
