require('rootpath')();

module.exports = function (app) {

	app.use('/main', require('controller/main'));
	
};