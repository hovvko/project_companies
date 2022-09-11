const {Schema, model} = require('mongoose');

const TicketSchema = new Schema({
    fibonacciIndex: {
        type: Number,
        required: true
    },

    ticket: {
        type: Number,
        required: true
    }
}, {versionKey: false});

module.exports = model('Ticket', TicketSchema);