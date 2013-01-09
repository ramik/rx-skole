var subjectA = new Rx.Subject();
var subjectB = new Rx.Subject();

var fromArray = Rx.Observable.fromArray([1, 2]);

// single -> to -> many
subjectA.selectMany(fromArray).subscribe(function(x) { console.log(['fromarray', x]); });
subjectA.onNext(1);

// difference in select && -many
subjectA
    .select(function() { return subjectB; })
    .subscribe(function(x) { console.log(['with select', x]); });

subjectA
    .selectMany(subjectB)
    .subscribe(function(x) { console.log(['with selectMany', x]); });

subjectA.onNext(1);
subjectB.onNext([2, 3]);

