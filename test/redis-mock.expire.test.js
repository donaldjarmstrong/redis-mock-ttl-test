var redismock = require("redis-mock"),
	should = require("should"),
	events = require("events");

if (process.env['VALID_TESTS']) {
    redismock = require('redis'); 
}

describe("expire", function () {
    it("it should set expire", function (done) {
		var testKey = '/testKey';
        var r = redismock.createClient("", "", "");

        // it should put some data
        r.set(testKey, 'someValue', function (err) {
        	if (err) {
        		done(err);
        	}

        	r.expire(testKey, 600, function(err) {
        		if (err) {
        			done(err);
        		}

        		r.ttl(testKey, function(err, ttl) {
        			if (err) {
        				done(err);
        			}

        			ttl.should.be.within(0,600);

                    done();
        		});
        	});
        });
    });
});