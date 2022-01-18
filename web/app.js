const express = require('express');

module.exports = async(client) => {
    let app = express();
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views')
    app.set('view engine', 'ejs')
    app.get('/', async(req, res) => {
        res.render('index', {req, res, client});

    });

    app.listen(1337);
console.log("Web Server - Started")
}