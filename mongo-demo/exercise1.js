const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/mongo-exercises')
    .then(() => console.log('Connected to mongoDB'))
    .catch( err => console.log('Could not connect ...',err));

const courseSchema = new mongoose.Schema({
    _id: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    __v: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
    const courses = await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({name: 1})
        .select({name: 1, author: 1});
    console.log(courses);
};

getCourses();