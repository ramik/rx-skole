describe("Exercise 3", function() {
    var subject, secondSubject, thirdSubject, ajaxParam;
    beforeEach(function(){
        subject = new Rx.Subject();
        ajaxParam = [];
    });

    afterEach(function(){
        subject.onCompleted();
    });

    var ajaxfunc = function(x){
        ajaxParam.push(x);
        if(x === 'change'){
            thirdSubject = new Rx.AsyncSubject();
            return thirdSubject;
        }
        secondSubject = new Rx.AsyncSubject();
        return secondSubject;
    };

    describe("simulating and testing using fake ajax calls", function() {
        it("simple result should be mapped", function() {
            var result = exercise3.selectChoises(subject, ajaxfunc);
            result.toArray().subscribe(function(x) {
                chai.assert.deepEqual(x, ['aa?', 'bb?']);
                chai.assert.deepEqual(['a'], ajaxParam);
            });
            subject.onNext('a');
            secondSubject.onNext(['aa?', 'bb?']);
            secondSubject.onCompleted();
        });

        it("main stream should keep alive on error cases", function(done){
            var result = exercise3.exceptionAware(subject, ajaxfunc);
            result.bufferWithCount(3).subscribe(function(x) {
                chai.assert.deepEqual(x, ['aa?', 'bb?', 'cc?']);
                chai.assert.deepEqual(['a', 'b', 'c'], ajaxParam);
                done();
            });
            subject.onNext('a');
            secondSubject.onNext(['aa?', 'bb?']);
            secondSubject.onCompleted();
            subject.onNext('b');
            secondSubject.onError('lol');
            subject.onNext('c');
            secondSubject.onNext(['cc?']);
            secondSubject.onCompleted();
        });
    });

    describe("Switchlatest demonstration", function(){

        it("switches to latest request", function(){
            var result = exercise3.exceptionAware(subject, ajaxfunc);
            result.toArray().subscribe(function(x) {
                chai.assert.deepEqual(x, ['1?', '2?']);
                chai.assert.deepEqual(['a', 'change'], ajaxParam);
            });

            subject.onNext('a');
            subject.onNext('change');
            thirdSubject.onNext(['1?', '2?']);
            thirdSubject.onCompleted();
            secondSubject.onNext(['aa?', 'bb?']);
            secondSubject.onCompleted();
        });

        it("switches to latest request and is exception aware", function(){
            var result = exercise3.exceptionAware(subject, ajaxfunc);
            result.toArray().subscribe(function(x) {
                chai.assert.deepEqual(x, ['1?', '2?']);
                chai.assert.deepEqual(['a', 'b', 'change'], ajaxParam);
            });

            subject.onNext('a');
            secondSubject.onError('lulz');
            subject.onNext('b');
            subject.onNext('change');
            thirdSubject.onNext(['1?', '2?']);
            thirdSubject.onCompleted();
            secondSubject.onNext(['aa?', 'bb?']);
            secondSubject.onCompleted();
        });
    });
});