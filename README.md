# autoscout24-node

A simple client implementation to access autoscout24 api for/in node.js

## Installation

```bash
npm install autoscout24-node
```

## Usage

Please consider that two of the three main 'REST Methods' are implemented.

- findArticles
- getLookUpData
- getMakeModelTree (not implemented yet)

### Getting Started
Before getting started make sure you put your 'developer garden' credentials in settings.js. 
Then just include/require autoscout24client.js and authentication.js in your project/module/code. 

#### get the token from authentication.js

``` js 
  Authentication.requestToken(function(err,token){
      // get error/token
    });
```

#### get data with query from autoscout24client.js

``` js 

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
      // get error/response
    });
```

For a detailed Descriptions how the query should look like for successfull response take a look at the official developer garden REST api documentation.

http://www.developergarden.com/fileadmin/microsites/ApiProject/Dokumente/Dokumentation/Api_Doc_4_0/telekom-api-rest-4.0/html/as24.html


## Roadmap

Include missing api method with available query  

## Run Tests

You can find tests for Mocha in folder tests. Just run it with:


``` bash
  . Makefile
```

Remember to put your credentials in settings.js

