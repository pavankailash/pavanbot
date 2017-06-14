const express = require('express');
const bodyParser = require('body-parser');
var https = require('https');
const restService = express();
var data1="";

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {

    
     var c = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."

     var obj="";
  //  //var api = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAbMVp_Kmi6Ixrh6RfVLAbW_mMAY0O7itQ&cx=013351406654656600973:5gj2eij-z1i&q=encodeURIComponent("+c+")";
    var api = "https://www.googleapis.com/customsearch/v1?key=AIzaSyA7KrUzoeYckZBtRThI4KB_obOHeAocJUw&cx=008329582271722688199:phx8k84jxow&q="+c;
    
  
         https.get(api, (response) => {
             var body = "";
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
               console.log("===================================================================================");   
                 //var bodya=body.items
                  console.log("body: "+body);
            //  var bodya = body.searchInformation.totalResults;
                  //return res.json(bodya);
              obj =JSON.parse(body);
               // var obj1=JSON.parse(obj).title;
             
                
                  //console.log(body
//.displayText.items[0].snipppet
//)
                // console.log("obj1 : "+obj1)
                return res.json({
            speech: obj.items[0].snippet,
             displayText: obj.items[0].snippet,
          source: 'webhook-echo-sample'
      });
   // return res.json(obj.items[0].snippet);
      //return res.json(obj);
              })
            })
    });

   // var q = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
  
  //var api = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDcpIw1u0qoDICOZsYMiKrxuLCHUstzIT4&cx=000792015022037580768:80cf2nj_1g0&q=encodeURIComponent(salman)";
//var response="";
//var content="";

// var data1=""
//   var body = "";
//             https.get(api, (response) => {
//               response.on('data', (chunk) => { body += chunk })
//               response.on('end', () => {
//                 data = JSON.parse(body);
//                 console.log("Data : "+data);
//                 data1=data;
//               })
//             })

//console.log(body);
//console.log(data);
  //try {

    // response = UrlFetchApp.fetch(api, {
    //  muteHttpExceptions: true
   // });
     // content = JSON.parse(response);
    //if (response.getResponseCode() == 200) {

     // var content = JSON.parse(response);
 
    //   // Did the search return any results?
    //   if (content.searchInformation.totalResults > 0) {

    //     var count = content.items.length;

    //     for (var i = 0; i < count; i++) {

    //       // Save the page title, description and hyperlink
    //       Logger.log(content.items[i].title);
    //       Logger.log(content.items[i].snippet);
    //       Logger.log(content.items[i].link);
    //     }
    //   }
   //}
 // } catch (f) {
   //Logger.log(f.toString());
  //}
  
  
  
    // return res.json({
    //     speech: "danish".concat(data1),
    //     displayText: "danish".concat(data1),
    //     source: 'webhook-echo-sample'
    // });
//});

restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});




restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});