const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));


function validateGenre(genre){
    //const schema = Joi.string().min(3).required;
    const schema = Joi.object({ name: Joi.string().min(5).required()});
    return schema.validate(genre);
};

exports.Genre = Genre;
exports.validate = validateGenre;