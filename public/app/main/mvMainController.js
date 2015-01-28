function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

randomDate(new Date(2012, 0, 1), new Date())

angular.module('app').controller('mvMainController', function($scope) {
    $scope.courses = [
        {name: "C# for sociopaths", featured: true, published: randomDate(new Date(2012, 0, 1), new Date())},        
        {name: "R for normal people", featured: false, published: randomDate(new Date(2012, 0, 1), new Date())},
        {name: "Excel for complete tools", featured: true, published: randomDate(new Date(2012, 0, 1), new Date())},
        {name: "C for snobs", featured: false, published: randomDate(new Date(2012, 0, 1), new Date())},
        {name: "How to get laid - hacking the Real Life", featured: false, published: randomDate(new Date(2012, 0, 1), new Date())},
        {name: "Mind control and code reviews", featured: true, published: randomDate(new Date(2012, 0, 1), new Date())},
        {name: "Java for coffee lovers", featured: true, published: randomDate(new Date(2012, 0, 1), new Date())},        
        {name: "How to love SQL", featured: false, published: randomDate(new Date(2012, 0, 1), new Date())},
        {name: "Python for lizards", featured: true, published: randomDate(new Date(2012, 0, 1), new Date())},
        {name: "learn Ruby from idiot savants", featured: false, published: randomDate(new Date(2012, 0, 1), new Date())},
        {name: "Algorithms and data structures", featured: false, published: randomDate(new Date(2012, 0, 1), new Date())},
        {name: "Computer olfaction - because computer vision is so last millenium", featured: true, published: randomDate(new Date(2012, 0, 1), new Date())},
    ]
});