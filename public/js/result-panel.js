var source   = $('#result-add-template').html();
var template = Handlebars.compile(source);

// inserting stuff to "result list"
// $('#result-list').append(template({'content':'ää'}));

$('#clear-result').clickAsObservable()
    .subscribe(function(){
        $('#result-list').empty()
    })