var subjectA = new Rx.Subject();
var subjectB = new Rx.Subject();

// zip
subjectA
    .zip(subjectB, function (x, y) { return [x, y]; })
    .subscribe(function(x) { console.log(['zip', x]); });

// combineLatest
subjectA
    .combineLatest(subjectB, function (x, y) { return [x, y]; })
    .subscribe(function(x) { console.log(['combineLatest', x]); });


// combineLatest && startWith
subjectA.startWith('')
    .combineLatest(subjectB.startWith(''), function (x, y) { return [x, y]; })
    .subscribe(function(x) { console.log(['combineLatest with start', x]); });

// toArray && takeLast requires onCompleted!
subjectA
    .toArray()
    .subscribe(function(x) { console.log(['toArray', x]); });

subjectA
    .takeLast(2)
    .toArray()
    .subscribe(function(x) { console.log(['takeLast', x]); });

// buffer do not require onCompleted
subjectB
    .bufferWithCount(2)
    .subscribe(function(x) { console.log(['bufferWith', x]); });

subjectB
    .windowWithCount(2)
    .selectMany(function(x){ return x; })
    .subscribe(function(x) { console.log(['windowWith', x]); });


subjectA.onNext(1);
subjectB.onNext(2);
subjectA.onNext(3);
subjectA.onNext(4);
subjectB.onNext(5);
subjectB.onNext(6);
subjectA.onCompleted();