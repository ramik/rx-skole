exports.list = function(req, res){
    var exerId = req.route.params.id
    res.render('exercise' + exerId, { title: 'Exercise' + exerId });
};

