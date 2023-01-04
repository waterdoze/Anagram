const mongoose = require('mongoose')

const WordbankSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    }
})

const WordbankModel = mongoose.model("wordbank", WordbankSchema)
module.exports = WordbankModel