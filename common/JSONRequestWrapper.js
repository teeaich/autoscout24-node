// module dependencies
var http = require('http'),
https = require('https'),
url = require('url');


 /**
  * JSONRequestWrapper - Wraps the http.request function making it nice for unit testing APIs.
  * only consumes and responses JSON
  *
  */


  var JSONRequestWrapper = (function (){

    /** function _prepareResponse 
    * to check the response for empty body
    * @param  {object}   res      the response object from doRequest.
    */
    function _prepareResponse(res) {
        var body;

        if (res.body === '' || res.body === undefined){
            body = { errorMessage: 'no message from server'};
        } else {
            body = JSON.parse(res.body);
        }

        res = {
            headers: res.headers,
            body: body
        };

        return res;

    }

    /** function doRequest
    * make request with given options
    * @param  {string}   reqUrl     The required url
    * @param  {object}   options    The given header and body options (optional)
    * @param  {function} callback   callback
    */
    
    function doRequest(reqUrl, options, callback){
            if (reqUrl === '' || undefined) callback({ errorMessage: 'no url was given.'});
            options = options || {};
        if(typeof options === "function"){ callback = options; options = {}; }// incase no options passed in
        // parse url to chunks
        reqUrl = url.parse(reqUrl);

        // http.request settings
        var settings = {
            host: reqUrl.hostname,
            path: reqUrl.pathname,
            headers: options.headers || {},
            method: options.method || 'GET'
        };

        // if there are params:
        if(options.params){
            options.params = JSON.stringify(options.params);
            settings.headers['Content-Type'] = 'application/json';
            settings.headers['Accept'] = 'application/json';
            settings.headers['Content-Length'] = options.params.length;
        }

        // MAKE THE REQUEST
        var req = (reqUrl.protocol == 'https:' ? https.request(settings) : http.request(settings));

        // if there are params: write them to the request
        if(options.params){ req.write(options.params); }

        // when the response comes back
        req.on('response', function(res){

            res.body = '';
            res.setEncoding('utf-8');

            // concat chunks
            res.on('data', function(chunk){ res.body += chunk; });

            // when the response has finished
            res.on('end', function(){
                if (res.statusCode !== 200){
                    callback(true,_prepareResponse(res));
                    return;
                }

                // fire callback
                callback(false, _prepareResponse(res));
            });
        });

        // end the request
        req.end();
    }

    return {
        doRequest : doRequest
    };



})();

module.exports = JSONRequestWrapper;

