const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/playground')
    .then(() => console.log('Connected to mongoDB'))
    .catch( err => console.log('Could not connect ...',err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: [ 'angular', 'frontend' ],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
};

async function getCourses(){
    // const courses = await Course.find();
    //const courses = await Course.find({ author: 'Mosh', isPublished: true});
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true})
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    // const courses = await Course
    //     .find()
    //     .or([{ author: 'Mosh'}, {isPublished: true}]);
    //const courses = await Course.find({price: { $gt: 10}});
    //const courses = await Course.find({price: { $gt: 10, $lt: 20}});
    //const courses = await Course.find({price: { $in: [10, 15, 20]}});
    console.log(courses);
};

// createCourse();
getCourses();