const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let SavedSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

let Saved = mongoose.model('Saved', SavedSchema);

module.exports = Saved;