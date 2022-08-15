const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    colorID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Color'
    }
}, {timestamps: true, versionKey: false});

module.exports = model('User', UserSchema);