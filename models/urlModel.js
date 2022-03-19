const mongoose = require("mongoose");

const UrlSchema = mongoose.Schema({
    url: String
})

const Url = mongoose.model('Url' , UrlSchema)

module.exports = Url;