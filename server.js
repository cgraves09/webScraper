const express = require('express');
const exphbs = require('express-handlebars');
const logger= require('morgan');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI ||'mongodb://localhost/webScrapper'; 
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(MONGODB_URI);

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/', function(req,res){
    res.render('index');
});

require('./controllers/apiRoutes')(app);
require('./controllers/htmlRoutes')(app);

app.listen(PORT, function(){
    console.log('Listening on PORT: ' + PORT);
});

module.exports = app;

