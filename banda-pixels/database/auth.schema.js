const {Schema, model} = require('mongoose');

const AuthSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'user'
    },

    access_token: {
        type: String,
        required: true,
        trim: true
    },

    refresh_token: {
        type: String,
        required: true,
        trim: true
    }
}, {versionKey: false, timestamps: true});

module.exports = model('auth', AuthSchema);