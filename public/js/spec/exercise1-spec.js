describe("Exercise 1", function() {
    var subject, secondSubject, thirdSubject;
    beforeEach(function(){
        subject = new Rx.Subject();
        secondSubject = new Rx.Subject();
        thirdSubject = new Rx.Subject();
    });

    afterEach(function(){
        subject.onCompleted();
        secondSubject.onCompleted();
        thirdSubject.onCompleted();
    });

    describe("simple filtering and mapping", function() {
        it("stream which filters values lower than 5", function() {
            var result = exercise1.greaterOrEqualThan5(subject);
            result.toArray().subscribe(function(x) {
                chai.assert.deepEqual(x, [6, 5]);
            });
            subject.onNext(1);
            subject.onNext(6);
            subject.onNext(5);
            subject.onNext(-1);
        });

        it("stream which maps values to + 1", function() {
            var result = exercise1.addsOneToItems(subject);
            result.toArray().subscribe(function(x) {
                chai.assert.deepEqual(x, [4, 3, 8]);
            });
            subject.onNext(3);
            subject.onNext(2);
            subject.onNext(7);
        });
    });

    describe("Merging and concatenation", function() {
        it("merging gets from both streams", function() {
            var result = exercise1.pickupFromBoth(subject, secondSubject);
            result.toArray().subscribe(function(x){
                chai.assert.deepEqual(x, [2, 5, 9, 1])
            });
            subject.onNext(2);
            subject.onNext(5);
            secondSubject.onNext(9);
            subject.onNext(1);
        });

        it("concatenation waits another to end", function(){
            var result = exercise1.streamConcatenation(subject, secondSubject);
            result.toArray().subscribe(function(x){
                chai.assert.deepEqual(x, [2, 5, 1, 8])
            });
            subject.onNext(2);
            subject.onNext(5);
            secondSubject.onNext(9);
            subject.onNext(1);
            subject.onCompleted();
            secondSubject.onNext(8);
        })
    });

    describe("Le Grande finale for exercise 1", function() {
        it("use all previous", function() {
            var result = exercise1.leGrandeFinale(subject, secondSubject, thirdSubject);
            result.toArray().subscribe(function(x){
                chai.assert.deepEqual(x, [6, 9, 1, 11])
            });
            subject.onNext(2);
            subject.onNext(5);
            secondSubject.onNext(9);
            thirdSubject.onNext(12);
            secondSubject.onNext(1);
            subject.onCompleted();
            secondSubject.onCompleted();
            thirdSubject.onNext(12);
        });

        it("use all previous, second scenario", function() {
            var result = exercise1.leGrandeFinale(subject, secondSubject, thirdSubject);
            result.toArray().subscribe(function(x){
                chai.assert.deepEqual(x, [12, 15, 9])
            });
            subject.onNext(4);
            subject.onNext(11);
            secondSubject.onNext(15);
            thirdSubject.onNext(12);
            subject.onCompleted();
            subject.onNext(16);
            secondSubject.onCompleted();
            thirdSubject.onNext(10);
        });
    });
});