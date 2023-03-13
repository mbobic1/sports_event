const express = require('express');
const app = express();

app.use(express.json());
const db = require('./models');

//rute
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter) //ovo nam samo pravi api sa rutom /posts a sva ostala rutrianja vrsimo u routes Posts.js 
//ovaj nam dio kaze da svaki put kad startamo server db prolazi kroz sve modole i provjera da li ih ima  u bazi ako nema dodaje
db.sequelize.sync().then(() => {



    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
})