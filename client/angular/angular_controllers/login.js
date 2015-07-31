var users_array = [];

//Login/customer controller
appointments.controller('User', function($rootScope,$scope, $location, CustomerFactory){
	
	//adding a new user
	$scope.addCustomer = function(){
		// console.log($scope.new_customer);
		CustomerFactory.addCustomer($scope.new_customer);
		// console.log($scope.new_customer);
		// console.log($scope.errors);
		if ($scope.errors.message == ""){
			message = true;
			console.log('no error and now going to redirect');
			$location.path('/');
		}
		else {
			console.log('there is an error');
			message = false;
			return false; 
		}
	};

	$scope.Login = function(){

	}
	// $scope.Login = function(){
	// 	console.log($scope.customer);
	// }
	$scope.errors = CustomerFactory.getErrors();
});