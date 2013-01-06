var source   = $('#result-add-template').html();
var template = Handlebars.compile(source);

// inserting stuff to "result list"
// $('#result-list').append(template({'content':'ää'}));

var addResultData = function(data){
    $('#result-list').append(template({'content':data}))
};

$('#clear-result').clickAsObservable()
    .subscribe(function(){
        $('#result-list').empty()
    });