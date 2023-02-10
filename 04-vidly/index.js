const mongoose = require('mongoose');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const authenticator = require('./authenticator');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const def = require('./routes/default');
const express = require('express');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded( { extended: true}));
//para servir contenido estático (css, imagenes, etc ..)
app.use(express.static('public'));
app.use(helmet());
app.use('/api/customers', customers);
app.use('/api/genres', genres); // para cualquier /api/genres usar el router genres
app.use('/', def);

//configuration
console.log('Application name ' + config.get('name'));
console.log('Mail server ' + config.get('mail.smtp'));
console.log('Mail password ' + config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    //console.log('Morgan enabled');
    startupDebugger('Morgan enabled ...')   //console.log
}

mongoose.connect('mongodb://127.0.0.1/vidly')
    .then(() => console.log('Connected to mongoDB'))
    .catch( err => console.log('Could not connect ...',err));

//db work ....
//(aplicando a la variable de entorno DEBUG=app:startup, DEBUG=app:db o DEBUG=app:startup,app:db; utilizaremos dos, uno o ningun logger)
dbDebugger('Connected to db');

app.set('view engine', 'pug') // para usar pug no hace falta require
app.set('views', './views')   //opcional para sobreescribir la ubicación de las vistas, por defecto en ./views

app.use(logger);

app.use(authenticator);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));