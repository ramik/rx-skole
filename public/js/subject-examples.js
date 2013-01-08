var showSubjectBehavior = function(subject){
    subject.subscribe(function(x){ console.log(['eka', x]); });
    subject.onNext(1);
    subject.onNext(2);
    subject.subscribe(function(x){ console.log(['toka', x]); });
    subject.onNext(3);
    subject.onNext(4);
};

console.log('Subject... ');
showSubjectBehavior(new Rx.Subject());

console.log('Behaviorsubject...');
showSubjectBehavior(new Rx.BehaviorSubject());

console.log('ReplaySubject...');
showSubjectBehavior(new Rx.ReplaySubject());

console.log('AsyncSubject...');
var async = new Rx.AsyncSubject();
showSubjectBehavior(async);
async.onCompleted();

