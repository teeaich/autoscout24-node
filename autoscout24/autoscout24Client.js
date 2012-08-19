var settings = require('./settings');
var JSONRequestWrapper = require('../common/JSONRequestWrapper');

var Autoscout24Client = (function () {
	var URL_KEY = settings.api_base_url+settings.api_autoscout_rest_url+'/'+settings.environment;
	
/**
 * Constant of articles response key, used to build the request URL.
 */
var RESPONSE_KEY_ARTICLES = 'articles'; 
	
/**
 * Constant of look up data response key, used to build the request URL.
 */
	var RESPONSE_KEY_LOOKUP = 'lookUpData';
	
/**
 * Constant of model tree response key, used to build the request URL.
 */
	var RESPONSE_KEY_MODELTREE = 'makeModelTree';

	/** function findArticles
    * query the article database
    * @param  {string}   secureToken  Security token we can get from authentication module
    * @param  {object}   query        Search parameters including all set search data
    * @param  {function} callback     callback
    */
	
	function findArticles(secureToken, query, callback){
		if(typeof query === "function"){ callback = query; query = {}; }// incase no options passed in
		var options = {
			headers: {
				"Authorization" : "TAuth realm='https://odg.t-online.de',tauth_token="+secureToken
			},
			method: 'POST',
			params: {
				'culture_id' : settings.culture_id,
				'vehicle_search_parameters' : query
			}
		};
		JSONRequestWrapper.doRequest(URL_KEY+'/'+RESPONSE_KEY_ARTICLES, options, function(err, res){
			if (res.body.status.statusCode === '0000'){
				callback(false, res.body);
			} else {
				callback(res.body.status, false);
			}
		});

		
	}
	/** function findLookUpData
    * query the look up data
    * @param  {string}   secureToken  Security token we can get from authentication module
    * @param  {object}   query        Search parameters including all set search data
    * @param  {function} callback     callback
    */

	function findLookUpData(secureToken, callback){
		
		//if(typeof query === "function"){ callback = query; query = {}; }// incase no options passed in
		var options = {
			headers: {
				"Authorization" : "TAuth realm='https://odg.t-online.de',tauth_token="+secureToken
			},
			method: 'POST',
			params: {
				'culture_id' : settings.culture_id
			}
		};
		JSONRequestWrapper.doRequest(URL_KEY+'/'+RESPONSE_KEY_LOOKUP, options, function(err, res){
			if (res.body.status.statusCode === '0000'){
				callback(false, res.body);
			} else {
				callback(res.body.status, false);
			}
			
		});
	}
	/** function findModelTreeData
    * query the find model tree data
    * @param  {string}   secureToken  Security token we can get from authentication module
    * @param  {object}   query        Search parameters including all set search data
    * @param  {function} callback     callback
    */

	function findModelTreeData(secureToken, sendParameters, callback){
		
	}

	return {
		findArticles : findArticles,
		findLookUpData : findLookUpData,
		findModelTreeData : findModelTreeData
	};
})();

module.exports = Autoscout24Client;

