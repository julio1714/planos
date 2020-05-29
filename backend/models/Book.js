const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    imagePath: { type: String},
    created_at: { type: Date, default: Date.now },
    largo: { type: Number, required: true },
    ancho: { type: Number, required: true },
    alto: { type: Number, required: true }
});

module.exports = model('Book', BookSchema);