const mongoose = require('mongoose')

const WordbankSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    }
})

const SixLettersModel = mongoose.model("sixletters", WordbankSchema)
module.exports = SixLettersModel