require('dotenv').config();
const express = require('express');
const {urlencoded} = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const {configs} = require('./configs');
const {authRouter, userRouter} = require('./routes');

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));

mongoose.connect(configs.MONGO_URL);

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.get('/latency', async (req, res) => {
    const start = Date.now();
    await axios.get(configs.GOOGLE_URL);
    const finish = Date.now();

    const time = (finish - start) / 1000;

    res.end(time.toString()+ ' sec');
});

app.use('*', (req, res) => {
    res.status(404).json('Page not found');
});

app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .json(error.message || 'Unknown error')
});

app.listen(configs.PORT, () => {
    console.log(`Server has start on port ${configs.PORT}`);
});

