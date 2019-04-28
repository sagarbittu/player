var app = angular.module('contactlist', ['ngRoute', 'ui.bootstrap', 'controller.module', 'player.module']);

app.config(function($routeProvider, $locationProvider) {

	$routeProvider
	
		.when('/contact', {
			controller : 'mainCtrl',
			templateUrl : 'views/main.html'
    })
    
    .when('/', {
			controller : 'playerCtrl',
			templateUrl : 'views/player.html'
		})

})

app.run();