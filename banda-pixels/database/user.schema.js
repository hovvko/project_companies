const {Schema, model} = require('mongoose');

const passwordService = require('../services/password.service');

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
    },

    idType: {
        type: String,
        required: true
    }
}, {timestamps: true, versionKey: false});

UserSchema.static({
    createUserWithHashPassword: async function ({id, idType, password}) {
        const hashedPassword = await passwordService.hashPassword(password);


        return this.create({id, idType, password: hashedPassword});
    }
});

module.exports = model('user', UserSchema);