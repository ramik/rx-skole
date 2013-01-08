var never = Rx.Observable.never();
// ei tulosta, onX functioita ei kutsuta
never.subscribe(console.log);
// ei tulosta, onX functioita ei kutsuta
never.subscribe(console.log);


var empty = Rx.Observable.empty();
// ei tulosta
empty.subscribe(console.log);
// tulostaa: []
empty.toArray().subscribe(console.log);

var returnval = Rx.Observable.returnValue('a');
// tulostaa a
returnval.subscribe(console.log);
// tulostaa ["a"]
returnval.toArray().subscribe(console.log);


var fromarray = Rx.Observable.fromArray(['a', 'b']);
// tulostaa
// a
// b
fromarray.subscribe(console.log);
// tulostaa ["a", "b"]
fromarray.toArray().subscribe(console.log);



var interval = Rx.Observable.interval(1000);
// tulostaa 0, 1, 2 .. sekunnin välein
interval.subscribe(console.log);
// ei tulosta, toArray() ei 'toimi', koska onCompletea ei koskaan kutsuta
interval.toArray().subscribe(console.log);


// jqueryn ...AsObservablesta
$.ajaxAsObservable( { type : 'get', url : '/exercises/services/echo/' + x } );

$('#inputbox').keyupAsObservable();

$('.classdec').clickAsObservable();