const mongoose = require('mongoose');
const definitionSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    term:{
        type: String,
        required: true,
        unique: true
    },
    explication:{
        type: String,
        required: true
    },
    definition:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Definition', definitionSchema);