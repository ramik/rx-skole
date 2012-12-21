exports.exercise = function(req, res){
    var exerId = req.route.params.id;
    res.render('exercises/exercise' + exerId, { title: 'Exercise' + exerId });
};

exports.presentation = function(req, res){
    var slide_id = parseInt(req.route.params.id);
    res.render('slides/slide' + slide_id,
        { previous_slide: Math.max(0, slide_id - 1),
          next_slide: slide_id + 1 });
};
