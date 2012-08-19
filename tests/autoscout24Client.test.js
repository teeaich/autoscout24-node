var Autoscout24Client = require('../autoscout24');
var Authentication = require('../common/authentication');
var assert = require('assert');

describe('test autoscout24 api', function(){
	var savedToken;
	
	it('should get token without error',function(done){
		Authentication.requestToken(function(err,token){
			if (err) throw err;
			assert.ok(typeof token.data === 'string', 'no token');
			assert.ok(typeof token.expiryDate === 'string', 'no date');
			savedToken = token.data;
			done();
		});
	});
	it('should get car list from query on autoscout 24', function(done){

		var query = {
			"brands":{
				"brand_id":[13]
			},
			"address":{
				"countries":{
					"country_id":null
				},
				"radius":"100",
				"zip_code":"20359",
				"zip_country_id":"D"
			},
			"kilowatt":{
				"from":110,
				"to":null
			},
			"price_public":{
				"from":4800,
				"to":null,
				"vat_type_id":null
			}
		};

		Autoscout24Client.findArticles(savedToken,query, function(err,res){
			if (err) {
				console.log(err);
				throw err;
			}
			assert.ok(res.status.statusCode === '0000');
			assert.ok(res.response.vehicles instanceof Object);
			done();
		});
	});
	it('should get lookUp data without error',function(done){
		//var query = {};
		Autoscout24Client.findLookUpData(savedToken, function(err,res){
			if (err) {
				console.log(err);
				throw err;
			} 
			assert.ok(res.status.statusCode === '0000');
			done();
		});
	});
});
