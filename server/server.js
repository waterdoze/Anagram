const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const WordbankModel = require('./models/Wordbank')
const SixLettersModel = require('./models/SixLetters')
const UserModel = require('./models/Users')
const GameModel = require('./models/Game')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001
const uri = process.env.ATLAS_URI

app.use(cors())
app.use(express.json())


mongoose.set('strictQuery', false)
mongoose.connect(uri)

//route checks if a certain word exists
app.get("/exists/:word", (req, res) => {
    WordbankModel.findOne({"word": req.params['word']}, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
})

//route adds a word into existing database
app.post("/createWord", async (req, res) => {
    const word = req.body
    const newWord = new WordbankModel(word)
    await newWord.save()

    res.json(word)
})

//choose random 6 letter word from database
app.get("/randomWord", (req, res) => {
    SixLettersModel.aggregate([{ $sample: { size: 1 } }], (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
})

//Checks if user exists in database and if password is correct
app.post("/userLogin", async (req, res) => {
    const { username, password } = req.body

    const user = await UserModel.findOne({ "username": username })

    if (!user) {
        return res.json({ status: "User Not Found" })
    }

    if (user.password === password) {
        return res.json({ status: "ok" })
    }
    else {
        return res.json({ status: "error" })
    }
})


//Creates a new user in database
app.post("/userRegister", async (req, res) => {
    const { username, password } = req.body

    try {
        await UserModel.create({
            username: username,
            password: password
        })

        res.send({ status: 'ok' })

    }
    catch (err) {
        console.log(err)
        res.send({ status: 'error' })
    }
})

//checks if username exists in database
app.get("/existsUser/:word", (req, res) => {
    UserModel.findOne({"username": req.params['word']}, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
})

//creates a new game in database
app.post("/createGame", async (req, res) => {
    const { sixLetterWord } = req.body //TODO: add Players
    try{
        let game = new GameModel({
            sixLetterWord: sixLetterWord.join(''),
        });

        let result = await game.save()

        res.json(result)

    }
    catch (err) {
        res.send({ status: 'error' })
    }
})
    
//get game data by id
app.get("/getGame/:id", (req, res) => {
    GameModel.findOne({"_id": req.params['id']}, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})