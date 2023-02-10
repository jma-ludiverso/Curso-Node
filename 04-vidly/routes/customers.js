const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('El cliente buscado no se ha encontrdo por el id facilitado');
    res.send(customer);
});

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send('El cliente buscado no se ha encontrdo por el id facilitado');
    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customer({name: req.body.name, phone: req.body.phone, isGold: req.body.isGold});
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold}, { new: true})
    if(!genre) return res.status(404).send('El cliente buscado no se ha encontrdo por el id facilitado');
    res.send(genre);
});

module.exports = router;