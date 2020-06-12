module.exports = app => {
    // index
    app.get('/', (req, res) => {res.render('index');});
    // Saved Articles
    app.get('/savedArticles', (req,res) => {res.render('savedArticles')});
    // 404
    app.get('*', (req, res) => {res.render('404')});
}