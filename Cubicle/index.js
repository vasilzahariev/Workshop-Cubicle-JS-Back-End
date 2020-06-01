const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const router = require('./routes');
const app = require('express')();

require('./config/express')(app);
app.use('/', router);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));