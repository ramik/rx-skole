exports.exercise = function(req, res){
    var exerId = req.route.params.id;
    res.render('exercises/exercise' + exerId, { title: 'Exercise' + exerId });
};

exports.presentation = function(req, res){
    var slide_id = parseInt(req.route.params.id);
    res.render('slides/slide' + slide_id,
        { previous_slide: Math.max(1, slide_id - 1),
          next_slide: slide_id + 1 });
};

exports.echo = function(req, res){
    var echoval = req.route.params.echo;

    if(echoval.indexOf("1") !== -1){
        res.send(500, 'riks raks poks');
    } else {
        var millisecondsToWait = (echoval.indexOf("2") !== -1) ? 5000 : 0;
        setTimeout(function() {
            res.send({ result: echoval + echoval });
        }, millisecondsToWait);
    }
};
