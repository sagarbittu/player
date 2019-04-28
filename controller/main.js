var express = require('express');
var app = express();
var router = express.Router(); 
var db_connect = require('dbconnection.js');

require('rootpath')();

router.route('/getAllContacts')
.get(function(req, res) {

	var async = require('async');
	var response = {};	
		
	try {
		async.series([
			function(callback) {
				db_connect.db_connect(req,res,function(err,db_connection){
					connection = db_connection;
					callback();
				})
            },
			function(callback){
				var sql = "SELECT * FROM contacts";
				connection.query(sql, function(err, data) {
					response.contacts = data;
					connection.release();
					callback();
				});
			}
		],function(err) {
			response.success = true;
			response.message = "Successful.";
			res.status(200).send(response);
		});
	} catch(err) {
		res.send(err);
		if(connection != '') {
            connection.release();
        }
	}

})

router.route('/addContact')
.post(function(req, res) {

	var async = require('async');
	var response = {};	
		
	try {
		async.series([
			function(callback) {
				db_connect.db_connect(req,res,function(err,db_connection){
					connection = db_connection;
					callback();
				})
            },
			function(callback){
				var sql = "INSERT INTO contacts(contact_name, contact_email, contact_number) VALUES(?, ?, ?)";
				connection.query(sql, [req.body.contact_name, req.body.contact_email, req.body.contact_number], function(err, data) {
					if(!err) {
						response.status = true;
						response.message = "Data inserted successfuly";
					} else {
						response.status = false;
						response.message = "Data insertion failed";
					}
					connection.release();
					callback();
				});
			}
		],function(err) {
			res.status(200).send(response);
		});
	} catch(err) {
		res.send(err);
		if(connection != '') {
            connection.release();
        }
	}

})

module.exports = router;