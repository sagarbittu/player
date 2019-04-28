angular.module('controller.module', [])

.controller('mainCtrl', function($scope, $http) {

	$scope.getAllContacts = function() {
	
		$http.get('/main/getAllContacts').then(function successCallback(response) { 
			$scope.contacts = response.data.contacts;
		}, function errorCallback(err) {});
			
	}
	
	$scope.add_contact = {};
	$scope.addContact = function() {
		
		$scope.error_msg = "";
		$scope.success_msg = "";
		$http.post('/main/addContact', $scope.add_contact).then(function successCallback(response) { 
			if(response.data.status) {
				$scope.success_msg = response.data.message;
				$scope.error_msg = "";
				$scope.add_contact = {};
				$scope.getAllContacts();
			} else {
				$scope.error_msg = response.data.message;
				$scope.success_msg = "";
			}
		}, function errorCallback(err) {});
		
	}

})