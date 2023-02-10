const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genre');

// const genres = [
//     { id: 1, name: 'terror'},
//     { id: 2, name: 'acción'},
//     { id: 3, name: 'comedia'}
// ];

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('El género buscado no se ha encontrdo por el id facilitado');
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    res.send(genre);
});

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    //const genre = findById(req.params.id);
    if(!genre) return res.status(404).send('El género buscado no se ha encontrdo por el id facilitado');
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({name: req.body.name});
    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, { new: true})

    if(!genre) return res.status(404).send('El género buscado no se ha encontrdo por el id facilitado');

    res.send(genre);
});

// function findById(id){
//     return genres.find(g => g.id === parseInt(id));
// }

module.exports = router;