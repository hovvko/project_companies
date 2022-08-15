require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const {urlencoded} = require('express');
const cors = require('cors');

const {configs} = require('./configs');
const {userRouter} = require('./routes');

const app = express();

mongoose.connect(configs.MONGO_URL);

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use(cors(_configureCors()));
app.use('/users', userRouter);

app.use((error, req, res, next) => {
    res
        .json(error.message || 'Unknown error')
});

app.listen(configs.PORT, async () => {
    console.log(`Server has started on port ${configs.PORT}`);

    //TODO create color list
    // await colorService.createColor('blue');
    //   await colorService.createColor('red');
    //   await colorService.createColor('black');
    //   await colorService.createColor('white');
    //   await colorService.createColor('purple');
    //   await colorService.createColor('pink');
    //   await colorService.createColor('orange');
    //   await colorService.createColor('green');
    //   await colorService.createColor('brown');
    //   await colorService.createColor('gray');
    //   await colorService.createColor('yellow');
});

function _configureCors() {
    const whitelist = configs.WHITE_LIST.split(';');

    return {
        origin: (origin, callback) => {
            if (whitelist.includes(origin)) {
                return callback(null, true);
            }

            callback(new Error('Not allowed by CORS'));
        }
    };
}