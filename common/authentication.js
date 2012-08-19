// module dependencies
var JSONRequestWrapper = require('./JSONRequestWrapper');
var Base64 = require('./lib/base64');
var settings = require('../autoscout24/settings');


 /**
  * UrlReq - Wraps the http.request function making it nice for unit testing APIs.
  *
  * @param  {string}   reqUrl   The required url in any form
  * @param  {object}   options  An options object (this is optional)
  * @param  {Function} callback       This is passed the 'res' object from your request
  *
  */


  var Authentication = (function (){

    var token = {};

    function generateOptions(){
        var username = settings.username;
        var password = settings.password;
        var auth = 'Basic ' + Base64.encode(username+':'+password);

        return {
            headers: {
                "Authorization" : auth
            }
        };
    }

    function isValidToken(token){
        var date = new Date();
        //console.log('expiryDate: '+token.expiryDate);
        //console.log('date: '+date);
        if (!token.data) return false;
        if(token.expiryDate < date){
            console.log('token too old');
            return false;
        } else {
            return true;
        }
    }
    function requestToken (callback){
        JSONRequestWrapper.doRequest(settings.api_auth_url,generateOptions(),function(err,res){
            if(err){
                callback(true,{ errorMessage: 'request failure'});
                return;    
            }
            var token = { 
                data: res.body.token,
                encoding: res.body.tokenEncoding,
                format: res.body.tokenFormat,
                expiryDate: res.headers.expires
            };  
            callback(false,token);
        });
    }
    

    return {
        isValidToken : isValidToken,
        requestToken : requestToken
    };



})();

module.exports = Authentication;

