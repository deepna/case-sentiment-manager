/*var  JDBC = require('jdbc');
var jinst = require('jdbc/lib/jinst');

//var app = express();

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
		  drivername: 'org.apache.phoenix.jdbc.PhoenixDriver',
		  minpoolsize: 10,
		  maxpoolsize: 100
		 		  
		};

var jdbc = new JDBC(config);

//jdbc.initialize(config, function(err, res){ if (err){ console.log(err); } });

//jdbc.initialize(function(err) {
//  if (err) {
   // console.log(err);
 // }
//});


exports.getData = function(callback){
	
	var query = 'Select * from CASE_ANALYTIC where CASE_ID=00173041;';
	jdbc.open(function(err,conn){
		jdbc.executeQuery(query, function(err, rows) {
			console.log(rows);
			
			
	        	callback(err, rows);
			
			//return callback;
	});
		
	});
			
};

/*
var asyncjs = require('async');

jdbc.open(function(err,conn){
  // The connection returned from the pool is an object with two fields
  // {uuid: <uuid>, conn: <Connection>}
  if (conn) {
    console.log("Using connection");
    // Grab the Connection for use.
    //var conn = connObj.conn;
    jdbc.executeQuery ('Select * from CASE_ANALYTIC where CASE_ID=00173041;', function (err,results){
    	
    	if (err){ console.log(err); }
        else if (results) { console.log(results); }
      });
    
    }
    });
   
    /*asyncjs.series([
                    function(callback) {
                    	
                    	conn.createStatement(function(err, statement) {
                    		console.log("entered");
                
                        if (err) {
                        	console.log("Inside error block");
                            callback(err);
                          } else {
                        	  console.log("Inside else block");
                            // Adjust some statement options before use.  See statement.js for
                            // a full listing of supported options.
                            statement.setFetchSize(100, function(err) {
                              if (err) {
                                callback(err);
                              } else {
                            	  console.log("Preparing select statement");
                                statement.executeQuery("select * from CASE_ANALYTIC where CASE_ID=173900 AND CONTENT like '%916%'",
                                                       function(err, resultset) {
                                  if (err) {
                                	  console.log (err);
                                    callback(err);
                                  } else {
                                	  //console.log (resultset);
                                    resultset.toObjArray(function(err, results) {
                                      if (results.length > 0) {
                                        console.log("ID: " + results[0].CASE_ID + " " + "CONTENT: "+results[0].CONTENT);
                                        
                                      }
                                      callback(null, resultset);
                                      
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                    }
                      
                      function(err, results) {
                          // Results can also be processed here.
                          // Release the connection back to the pool.
                          hsqldb.release(connObj, function(err) {
                            if (err) {
                              console.log(err.message);
                            }
                          });
                        });
                      };*/
               