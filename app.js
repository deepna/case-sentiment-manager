
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , favicon = require('serve-favicon')
  
  , path = require('path')
  , JDBC = require('jdbc')
  , jinst = require('jdbc/lib/jinst');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/getData',routes.getData);
//app.get('/showData',routes.showData);

app.get('/', routes.index);
app.get('/users', user.list);


app.get('/showtest', function(req, res) {
	res.render('test.ejs');
});

app.get('/showResults', function(req, res) {
	res.render('showResults.ejs');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//**************************connection to Phoenix*******************************************************



if (!jinst.isJvmCreated()) {
  jinst.addOption("-Xrs");
  jinst.setupClasspath(['/Users/dbains/Desktop/phoenix/',
                        '/Users/dbains/Desktop/lib/phoenix-4.7.0.2.6.4.0-91-thin-client.jar',
                        '/Users/dbains/Desktop/lib/phoenix-server.jar',
                        '/Users/dbains/Desktop/lib/commons-lang-2.6.jar',
                        '/Users/dbains/Desktop/lib/phoenix-4.7.0.2.6.4.0-91-client.jar'
                        
                        ]);
}
 
var config = {
  // Required
  url: 'jdbc:phoenix:172.26.121.34:2181:/hbase-unsecure',
 
  // Optional
  drivername: 'org.apache.phoenix.jdbc.PhoenixDriver',
  minpoolsize: 10,
  maxpoolsize: 100
 
  // Note that if you sepecify the user and password as below, they get
  // converted to properties and submitted to getConnection that way.  That
  // means that if your driver doesn't support the 'user' and 'password'
  // properties this will not work.  You will have to supply the appropriate
  // values in the properties object instead.
  //user: 'SA',
  //password: '',
  //properties: {}
};
 
var hsqldb = new JDBC(config);

hsqldb.initialize(function(err) {
  if (err) {
    console.log(err);
  }
});


app.get('/home', function(req, res) {
	res.render('home.ejs');
});


var asyncjs = require('async');


 //*******************************************Display All Negative Sentiment Tables********************************
    // Adjust some connection options.  See connection.js for a full set of
    // supported methods.
 
hsqldb.reserve(function(err, connObj) {
	  // The connection returned from the pool is an object with two fields
	  // {uuid: <uuid>, conn: <Connection>}
	  if (connObj) {
	    console.log("Using connection: " + connObj.uuid);
	    // Grab the Connection for use.
	    var conn = connObj.conn;
	    
        
		console.log("entered app.get");
            	
            	conn.createStatement(function(err, statement) {
            		console.log("entered");
       
    
    //asyncjs.series([
    app.get('/showResult',function(req,res) {
    
    	       
                            	  console.log("Preparing select statement");
                                statement.executeQuery("select count(CASE_ID),CASE_ID,FINAL_SENTIMENT, CONTENT from CASE_ANALYTIC_RESULT where FINAL_SENTIMENT='negative' group by FINAL_SENTIMENT,CONTENT,CASE_ID",
                                                       function(err, resultset) {
                                  if (err) {
                                	  console.log (err);
                                   // callback(err);
                                  } else {
                                	  //console.log (resultset);
                                    resultset.toObjArray(function(err, results) {
                                      if (results.length > 0) {
                                        //console.log("ID: " + results[0].CASE_ID + " " + "CONTENT: "+results[0].CONTENT);
                                        res.render('home', {data:results});
                                      }
                                      else {console.log ("length is 0");}
                                      
                                      
                                    });
                                  }
                                });
                              });
    
    hsqldb.release(connObj, function(err) {
    if (err) {
    console.log(err.message);
     }});
    });
    }
  	});
    
    
    app.get('/addData',function(req,res) {
        
	       
  	res.render('services.ejs');
    });
    
 //****************************** Insert Data ************************************************   
    hsqldb.reserve(function(err, connObj) {
  	  // The connection returned from the pool is an object with two fields
  	  // {uuid: <uuid>, conn: <Connection>}
  	  if (connObj) {
  	    console.log("Using connection: " + connObj.uuid);
  	    // Grab the Connection for use.
  	    var conn = connObj.conn;
  	    
          
  		//console.log("entered app.get");
              	
              	conn.createStatement(function(err, statement) {
              		console.log("entered upsert");
         
      
    app.post('/addKeyword',function(req,res){
    	// res.render('services.ejs');
        
    	var keyword = req.body.keyword;
    	
    	var id = req.body.id;
    	var sentiment = req.body.sentiment;
    	console.log(keyword);
    	console.log("Preparing upsert statement");
    	//var post  = {keyword: req.param('keyword'), sentiment: req.param('sentiment')};
    	//var query = "upsert into TRAIN_UI_TEST (KEYWORD,SENTIMENT) values ('"+ keyword+"'"+','+"'" +sentiment+"'"+")";
    	var query = "upsert into ADD_DATA (ID,KEYWORD,SENTIMENT) values ("+id+','+"'"+ keyword+"'"+','+"'" +sentiment+"'"+")";
        
    	
   
    	console.log(query);
    	//console.log(connObj.uuid);
    	statement.execute("upsert into ADD_DATA (ID,KEYWORD,SENTIMENT) values ("+id+','+"'"+ keyword+"'"+','+"'" +sentiment+"'"+")", function(err,result){
        	
        	if (err) {//throw err;
        	
        	console.log(err);}
        	
        	
        		else {
        			
        			console.log(result);
                }
        });
        	//console.log(result);
        	
    
          });
    
    
    hsqldb.release(connObj, function(err) {
    	 console.log("released");
        if (err) {
        console.log(err.message);
         }});
        });
        }
      	});
        
  //***********************************************************************************
    
    
                      
             
                       
	 
	 
                    
                      
                      
                        

    	

                        
                     
                         
           





