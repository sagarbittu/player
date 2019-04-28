var mysql = require('mysql');
var pool  = mysql.createPool({
         
		host            : 'localhost',
		user            : 'root',
		password        : '',
		database        : 'contactlist',
		port  			: 3306,
		connectionLimit	: 15,
		queueLimit		: 30,
		acquireTimeout	: 8000

	});
	
module.exports = {

	'db_connect': function(req,res,db_callback)          
	{
        pool.getConnection(function(err, db_connection) {

         	if(err) {
				var response_data = {}; 
				response_data.success = "error";
				response_data.message = err;
				res.status(503).send({response_data});
				//  db_connection.release();
			}
			else {
				db_callback(err,db_connection);
			}

        });
	}
}