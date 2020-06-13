const env = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
const config = require('./config/config')[env];
const router = require('./routes');
const authRouter = require('./routes/auth');
const cubesRouter = require('./routes/cubes');
const accessoriesRouter = require('./routes/accessories');
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

app.use('/', authRouter);
app.use('/', cubesRouter);
app.use('/', accessoriesRouter);
app.use('/', router);

router.get('*', (req, res) => {
    res.render('404');
});

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));