const mongoose = require('mongoose');

const TeaSchema = new mongoose.Schema({
    name: {type:String, required: true},
    image: {type: String},
    description: {type: String},
    keywords: {type: String},
    origin: {type: String},
    brew_time: {type: Number},
    temperature: {type: Number},
    comments: [{ text: {type: String}, date: {type: String, default: new Date()} }]
});

const TeaModel = mongoose.model('TeaModel', TeaSchema);
module.exports = TeaModel;