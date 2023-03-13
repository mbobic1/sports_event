//nalaze se sve rute koje su relavantne za postove
const express = require('express');
const router = express.Router();
const { Posts } = require('../models') //Posts predstvalja model Posts te sve radi kao on

//kada god koristimo sequelize funkcije moramo dodati async i await ispred njih
router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

//sa sequelize moramo napraviti sve da je secret to radimo sa async
router.post("/", async (req, res) => {
    const post = req.body;
    await Posts.create(post); //ovaj Posts.create kreira model posts sa datim parametrima u bazi , await da bibili sigurni da se inseratlo u bazu
    res.json(post);
});
module.exports = router;