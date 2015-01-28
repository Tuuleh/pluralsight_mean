module.exports = function(app) {
    app.get('/partials/*', function(req, res) {
        console.log("path with req.params[0] is: " + '/../public/app/' + req.params[0]);
        res.render('../../public/app/' + req.params[0]);
    });

    app.get('*', function(req, res) {
        res.render('index');
    });
}

