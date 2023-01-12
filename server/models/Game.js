const mongoose = require('mongoose')
const SixLettersModel = require('./SixLetters')
const UserModel = require('./Users')

const GameSchema = new mongoose.Schema({
    sixLetterWord: {
        type: String,
        required: true
    },
    // Player1: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'UserModel',
    //     score:{
    //         type: Number,
    //         default: 0,
    //         required: true
    //     },
    //     required: true
    // },

    /*TODO: create two player interaction*/

    // Player2: {
    //     type: UserModel,
    //     score:{
    //         type: Number,
    //         default: 0,
    //         required: true
    //     },
    //     required: true
    // },

    // Winner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'UserModel',
    //     required: false
    // }
})


const GameModel = mongoose.model("games", GameSchema)
module.exports = GameModel
