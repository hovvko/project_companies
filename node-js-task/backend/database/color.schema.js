const {Schema, model} = require('mongoose');

const ColorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
}, {versionKey: false});

module.exports = model('Color', ColorSchema);