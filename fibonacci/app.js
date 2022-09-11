const express = require('express');
const {urlencoded} = require('express');
const mongoose = require('mongoose');

const {configs} = require('./configs');
const {Ticket} = require('./batabase');

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));
mongoose.connect(configs.MONGO_URL);

app.post('/input', async (req, res) => {
    try {
        const {number} = req.body;

        const message = _numberChecker(number);

        if (message) {
            return res.status(400).end(message);
        }

        const fibonacciIndex = _fibonacci(number);
        const tickets = await Ticket.find();

        if (!tickets.length) {
            await _createAndSendTicket(fibonacciIndex, 1, res);
        } else {
            const lastTicket = tickets[tickets.length - 1].ticket;

            await _createAndSendTicket(fibonacciIndex, lastTicket + 1, res);
        }
    } catch (e) {
        res.end(e.toString()).status(400);
    }
});

app.get('/output', async (req, res) => {
    try {
        const {ticket} = req.query;

        const {fibonacciIndex} = await Ticket.findOne({ticket});

        if (!fibonacciIndex) {
            return res.end('Not found');
        }

        res.json({
            fibonacciIndex
        });
    } catch (e) {
        res.end(e.toString()).status(400);
    }
});

app.listen(configs.PORT, () => {
    console.log(`Server has start on port ${configs.PORT}`);
});

function _fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    return _fibonacci(n - 1) + _fibonacci(n - 2);
}

async function _createAndSendTicket(fibonacciIndex, ticket, res) {
    await Ticket.create({
        fibonacciIndex,
        ticket
    });

    res.json({
        ticket
    });
}

function _numberChecker(number) {
    if (!number) {
        return 'Number is required';
    }

    if (typeof number !== 'number') {
        return 'Passed data is not number';
    }

    if (number < 1) {
        return 'The number must be more than or equal 1';
    }

    if (number > 1000) {
        return 'The number must be less than or equal to 1000';
    }
}

