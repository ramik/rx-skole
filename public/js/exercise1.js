var exercise1 = {
    greaterOrEqualThan5: function(stream) {
        return stream.where(function(x){ return x > 4; });
    },

    addsOneToItems: function(stream) {
        return stream.select(function (x) { return x + 1; });
    }
};
