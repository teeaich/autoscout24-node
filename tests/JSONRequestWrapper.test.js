var JSONRequestWrapper = require('../common/JSONRequestWrapper');
var Base64 = require('../common/lib/base64');
var settings = require('../autoscout24/settings');
var assert = require('assert');

describe('test wrapper functionality', function(){
	var token;
	
		it('should get twitter response with error',function(done){
			JSONRequestWrapper.doRequest('http://search.twitter.com/search.json?q=Twitter%20API&result_type=mixed', function(err, res){
				assert.ok(res instanceof Object);
				done();
			});
		});
		it('should get token from developerGarden without error', function(done){
			
			var	username =  settings.username;
			var	password =  settings.password;
			var auth = 'Basic ' + Base64.encode(username+':'+password);
			
			var options = {
				headers: {
					"Authorization" : auth
				}
			};
			JSONRequestWrapper.doRequest('https://sts.idm.telekom.com/rest-v1/tokens/odg',options, function(err,res){
				assert.ok(res.body.token !== undefined);
				token = res.body.token;
				done();
			});
		});

		it('with saved token and query should get a car list on autoscout24',function(done){
			var options = {
				headers: {
					"Authorization" : "TAuth realm='https://odg.t-online.de',tauth_token="+token
				},
				method: 'POST',
				params: {
					"culture_id":"de-DE",
					"vehicle_search_parameters" : {
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
					}
				}
			};
			JSONRequestWrapper.doRequest('https://gateway.developer.telekom.com/plone/autoscout24/rest/production/articles',options, function(err,res){
				assert.ok(res.body.response.vehicles instanceof Object);
				assert.ok(res.body.status.statusCode === '0000');
				done();
			});

		});

});
