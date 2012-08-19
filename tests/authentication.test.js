var Authentication = require('../common/authentication');
var assert = require('assert');

describe('test authentication functionality', function(){
	var savedToken;
	
		it('should get token without error',function(done){
			Authentication.requestToken(function(err,token){
				if (err) throw err;
				assert.ok(typeof token.data === 'string', 'no token');
				assert.ok(typeof token.expiryDate === 'string', 'no date');
				savedToken = token;
				done();
			});
		});
		it('should check for a valid token without an error',function(done){
			assert.ok(Authentication.isValidToken(savedToken));
			done();
		});
		it('should check for a valid token with an error that token is too old',function(done){
			var oldDate = new Date('2011/10/10');
			savedToken.expiryDate = oldDate;
			assert.ok(!Authentication.isValidToken(savedToken));			
			done();
		});
});
