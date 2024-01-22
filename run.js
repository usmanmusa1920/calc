var express = require('express');
const nunjucks = require('nunjucks')
var app = express();
const path = require('path');
var dt = require('./toolkit_box');


app.use(express.static(__dirname + '/static'));
app.set('view engine', 'html');

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});


curr_dt = `The date and time are currently: ${dt.myDateTime()}`;


function tmp_dir(f){
    /** Relative path to template directory */

    return path.join(__dirname, 'templates/' + f);
};


app.get('/', function(req, res){
    context = {
        welcome: 'Start calculating your result now!',
    };
    res.render(tmp_dir('index.html'), context);
});


app.get('/about', function(req, res){
    res.send("I am about page! " + curr_dt);
});


app.listen(3000);
