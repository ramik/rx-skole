var subjectA = new Rx.Subject();
var subjectB = new Rx.Subject();
var subjectC = new Rx.Subject();

var addOne = function(x) { return x + 1; };
var add42 = function(x) { return x + 42; };

// select
subjectA.select(function (x) { return x + 1 }).subscribe(function(x) { console.log(['select1', x]); });
subjectA.select(addOne).subscribe(function(x) { console.log(['select2', x]); });

// merge
subjectA.merge(subjectB).subscribe(function(x) { console.log(['merge', x]); });

// where
subjectA.where(function (x) { return x > 1 }).subscribe(function(x) { console.log(['where', x]); });

// concat
subjectA.concat(subjectB).subscribe(function(x) { console.log(['concat', x]); });

// combining all
subjectA
    .select(addOne)
    .merge(subjectB.select(add42))
    .where(function(x){ return x % 2 === 0; })
    .concat(subjectC)
    .subscribe(function(x) { console.log(['all combined', x]); });


subjectA.onNext(1);
subjectA.onCompleted();
subjectB.onNext(2);
subjectC.onNext(3);
