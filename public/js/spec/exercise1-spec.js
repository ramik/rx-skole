describe("Exercise 1", function() {

    describe("simple filtering and mapping", function() {
        it("stream which filters values lower than 5", function() {
            var subject = new Rx.Subject();
            var result = exercise1.greaterOrEqualThan5(subject);
            result.toArray().subscribe(function(x) {
                chai.assert.deepEqual(x, [6, 5]);
            });
            subject.onNext(1);
            subject.onNext(6);
            subject.onNext(5);
            subject.onNext(-1);
            subject.onCompleted();
        });

        it("stream which maps values to + 1", function() {
            var subject = new Rx.Subject();
            var result = exercise1.addsOneToItems(subject);
            result.toArray().subscribe(function(x) {
                chai.assert.deepEqual(x, [4, 3, 8]);
            });
            subject.onNext(3);
            subject.onNext(2);
            subject.onNext(7);
            subject.onCompleted();
        });
    });

    describe("dummy test stubb", function() {
        it("does nothing", function() {

        });
    });
});