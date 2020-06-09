const env = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
const config = require('./config/config')[env];
const router = require('./routes');
const app = require('express')();

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);

        throw err;
    }

    console.log('Database is setup and running!');
});

require('./config/express')(app);
app.use('/', router);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));