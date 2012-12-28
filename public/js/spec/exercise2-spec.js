describe("Exercise 2", function() {
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

    describe("combining using combinelatest and zip", function() {
        it("streams combine, scenario 1", function() {
            var result = exercise2.combineStreams(subject, secondSubject);
            result.toArray().subscribe(function(x) {
                var first = { first: 'a', second: 'b' };
                var second = { first: 'c', second: 'b' };
                chai.assert.deepEqual(x, [first, second]);
            });
            subject.onNext('a');
            secondSubject.onNext('b');
            subject.onNext('c');
        });

        it("stream combine, scenario 2", function() {
            var stream = Rx.Observable.fromArray(['a', 'b']);
            var stream2 = Rx.Observable.fromArray(['c', 'd']);
            var result = exercise2.combineStreams(stream, stream2);
            result.toArray().subscribe(function(x) {
                var first = { first: 'b', second: 'c' };
                var second = { first: 'b', second: 'd' };
                chai.assert.deepEqual(x, [first, second]);
            });
        });

        it("streams zip, scenario 1", function() {
            var result = exercise2.zipStreams(subject, secondSubject);
            result.toArray().subscribe(function(x) {
                var first = { first: 'a', second: 'b' };
                chai.assert.deepEqual(x, [first]);
            });
            subject.onNext('a');
            secondSubject.onNext('b');
            subject.onNext('c');
        });

        it("stream zipping, scenario 2", function() {
            var stream = Rx.Observable.fromArray(['a', 'b']);
            var stream2 = Rx.Observable.fromArray(['c', 'd']);
            var result = exercise2.zipStreams(stream, stream2);
            result.toArray().subscribe(function(x) {
                var first = { first: 'a', second: 'c' };
                var second = { first: 'b', second: 'd' };
                chai.assert.deepEqual(x, [first, second]);
            });
        });
    });

    describe("stream initialization with startWith", function() {
        it("streams combine using startwith", function() {
            var result = exercise2.combineUsingStartWith(subject, secondSubject);
            result.toArray().subscribe(function(x) {
                var first = { first: '', second: '' };
                var second = { first: 'a', second: '' };
                var third = { first: 'a', second: 'b' };
                var fourth = { first: 'c', second: 'b'};
                chai.assert.deepEqual(x, [first, second, third, fourth]);
            });
            subject.onNext('a');
            secondSubject.onNext('b');
            subject.onNext('c');
        });

        it("stream zipping using startWith", function() {
            var stream = Rx.Observable.fromArray(['a', 'b', 'eee']);
            var stream2 = Rx.Observable.fromArray(['c', 'd']);
            var result = exercise2.zipUsingStartWith(stream, stream2);
            result.toArray().subscribe(function(x) {
                var first = { first: '', second: '' };
                var second = { first: 'a', second: 'c' };
                var third = { first: 'b', second: 'd' };
                chai.assert.deepEqual(x, [first, second, third]);
            });
        });
    });
});