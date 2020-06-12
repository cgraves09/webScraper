const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {
    app.get('/scraped', function(req, res){
        axios.get('https://www.wptv.com/').then(function(response){
            const $ = cheerio.load(response.data, {
                    xml: {
                    normalizeWhitespace: true,
                }
            });

            $('.ShowcasePromo').each(function(i, element){
                let result = {};
                result.title = $(element).find('.ShowcasePromo-title').text();
                result.category = $(element).find('.ShowcasePromo-category').text();
                result.link = $(element).parent().attr('href');
                result.image = $(element).find('.ShowcaseImageOverlay').css('background-image');
                db.Article.create(result).then(dbArticle => {}).catch(err => {console.log(err);});
            });             
        }).then(data => {res.sendStatus(200)}).catch(err => {if(err) throw err});
    });
    app.get('/articles', (req, res) => {
        db.Article.find({}).then(dbArticle => {res.json(dbArticle)}).catch(err => res.json(err));
    });
    app.get('/saved', (req, res) => {db.Saved.find({}).then(dbArticle => res.send(dbArticle)).catch(err => res.json(err))})
    app.post('/saved', (req, res, next) => {db.Saved.create(req.body).then(dbArticle => res.json(dbArticle))});
    app.delete('/delete/:id', (req, res) =>{ db.Saved.deleteOne({_id: req.params.id}, err => {
        if (err) throw err;
        console.log(req.params.id);
        console.log('Successfully Deleted');
        res.sendStatus(200);
        });
    });
        app.delete('/deleteArticle/:id', (req, res) =>{ db.Article.deleteOne({_id: req.params.id}, err => {
        if (err) throw err;
        console.log(req.params.id);
        console.log('Successfully Deleted Article');
        res.sendStatus(200);
        });
    });
};