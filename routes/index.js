
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.spec = function(req, res){
    res.render('spec/runner');
};