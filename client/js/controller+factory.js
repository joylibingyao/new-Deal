// // Lets create our angular module
// var appointments = angular.module('appointments', ['ngRoute']);


//asks passports to see if the user is authenticated



// hiCONTROLLER
appointments.controller('FriendsController', function($http, $scope, $location, FriendFactory, $rootScope) {

	// FriendFactory.getuserinfo(function(data){
	// 	console.log(data+'user info in fac');
	//  $rootScope.users =data;

	// });

		$scope.logout = function() {
		$http.get("/logout").success(function(){
		$rootScope.users == {}; 
		})
		location.reload();
	}//ends$scope.logout

	$scope.fpshow = function() {
		console.log('fac-fpshow1',$scope.new_friend);
		//console.log('fac-fpshow2',data);
		// $rootScope.users = data;
		// $rootScope.users.push(users.url);
		//FriendFactory.fpshow($rootScope.users._id, function(){});
		
	}//ends fpshow

	$scope.fpadd = function() {
		//console.log($scope.new_friend.url);//this is url

		info={
			id:$rootScope.users._id,
			url:$scope.new_friend.url
		}
		console.log('info',info);
		FriendFactory.fpadd(info, function(data){
			// console.log($rootScope.users,"rootScope users in con");

			 $rootScope.users = data;
			FriendFactory.getuserinfo(function(data){
				// console.log(data+'user info in fac');
			 $rootScope.users =data;

			});
			//$location.path('/your_profile');
		});
		console.log('inside fadd ready to path');
		$location.path('/your_profile');
	}//ends fpadd


	$scope.register = function() {

		if($scope.new_friend.password == $scope.new_friend.password2) {
			FriendFactory.register($scope.new_friend, function(data){
				console.log(data,"register success");
				 $rootScope.users = data;;
				 $rootScope.currentUser=data;
			});

			$location.path('/your_profile');
		}
		else {
			alert('password does not match');
		}
	}//ends register



	$scope.login = function() {

		FriendFactory.login($scope.new_friend, function(data){

			if (data) {
			$rootScope.users = data;
			$rootScope.currentUser=data;
			$location.path('/your_profile');
			}
			//$location.path('/profile', $scope.users);

		});		
	}//ends login

});//ends contoller 

// hiFACTORY
appointments.factory('FriendFactory', function($http, $location) {	
	var factory = {};
	var users = {};

	factory.getuserinfo = function(callback){
		$http.get('/loggedin').success(function(output){

			users = output;
			callback(users);
		})


	}

	factory.fpshow = function(callback) {
		$http.get('/showimg',data).success(function(output){

			users = output;
			callback({data});
		})//ends $http.get
	}//ends get

	factory.fpadd = function(info, callback){




		console.log('in fpadd fac info', info);
		$http.post('/uploadimg',info).success(function(output){
			console.log('in http fac');
			//console.log('fac-addfpimg-output',output);
		});//ends $http.post
	}//ends factory.addfpimg

	factory.register = function(data,callback){

		$http.post('/register',data).success(function(output){

			users=output;
			callback(users);

		});//ends $http.post
	}//ends factory.register

	factory.login = function(data, callback) {

		$http.post('/login',data).success(function(output) {
			users = output;

			callback(users);

		}); //ends $http.post
	}//ends factory.login

//console.log('yo factory.js-factory', factory);  
return factory;
});//ends factory
