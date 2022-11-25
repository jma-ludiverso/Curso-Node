const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./logger');
const authenticator = require('./authenticator');
const express = require('express');
const Joi = require('joi');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded( { extended: true}));
//para servir contenido estático (css, imagenes, etc ..)
app.use(express.static('public'));
app.use(helmet());

//configuration
console.log('Application name ' + config.get('name'));
console.log('Mail server ' + config.get('mail.smtp'));
console.log('Mail password ' + config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled');
}

app.use(logger);

app.use(authenticator);

const genres = [
    { id: 1, name: 'terror'},
    { id: 2, name: 'acción'},
    { id: 3, name: 'comedia'}
];

app.delete('/api/genres/:id', (req, res) => {
    const genre = findById(req.params.id);
    if(!genre) return res.status(404).send('El género buscado no se ha encontrdo por el id facilitado');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = findById(req.params.id);
    if(!genre) return res.status(404).send('El género buscado no se ha encontrdo por el id facilitado');
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);

    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = findById(req.params.id);
    if(!genre) return res.status(404).send('El género buscado no se ha encontrdo por el id facilitado');

    const { error } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

function findById(id){
    return genres.find(g => g.id === parseInt(id));
}

function ValidateGenre(genre){
    //const schema = Joi.string().min(3).required;
    const schema = Joi.object({ name: Joi.string().min(3).required()});
    return schema.validate(genre);
};

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));