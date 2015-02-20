var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required!'},
    featured: {type: Boolean, required: '{PATH} is required!'},
    published: {type: Date, required: '{PATH} is required!'},
    tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

exports.createDefaultCourses = function() {
    Course.find({}).exec(function(err, collection) {
        randomDate = function(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }
        if(collection.length === 0) {
            Course.create({title: "C# for sociopaths", featured: true, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['mental health']}), 
            Course.create({title: "R for normal people", featured: false, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['statistics','desperation']}),
            Course.create({title: "Excel for complete tools", featured: true, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['noob-friendly', 'Microsoft']}),
            Course.create({title: "C for snobs", featured: false, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['desperation','no-life','pointers']}),
            Course.create({title: "How to get laid - hacking the Real Life", featured: false, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['no-life','desperation']}),
            Course.create({title: "Mind control and code reviews", featured: true, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['super powers']}),
            Course.create({title: "Java for coffee lovers", featured: true, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['caffeine']}),         
            Course.create({title: "Learn to love PHP", featured: false, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ["Valentine's day special"]}),
            Course.create({title: "Python for lizards", featured: true, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['discount for amphibians']}),
            Course.create({title: "learn Ruby from idiot savants", featured: false, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['anyone can do it']}),
            Course.create({title: "Algorithms and data structures", featured: false, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['revision','advanced basics']}),
            Course.create({title: "Computer olfaction - because computer vision is so last millenium", featured: true, published: randomDate(new Date(2012, 0, 1), new Date()), tags: ['mad science', 'mental health']})
        }
    })
}