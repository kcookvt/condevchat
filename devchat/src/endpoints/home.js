module.exports = {
    index: function(req, res) {
        res.render('index', {session:req.session})
    }
}