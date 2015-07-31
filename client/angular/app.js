
 var appointments = angular.module('appointments',['angularPayments','ngRoute']);

appointments.config(function($routeProvider){

	$routeProvider
	.when('/',{ templateUrl: 'partials/login.html' })
	.when('/login',{ templateUrl: 'partials/login.html', resolve: { logincheck: checkLoggedin } })
	.when('/your_profile',{ templateUrl: 'partials/your_profile.html' })
	.when('/register',{ templateUrl: 'partials/register.html' })
	.when('/search', { templateUrl: "partials/search_view.html"})
	.when('/pay', { templateUrl: "partials/pay_page.html"})
	.when('/add_appointment/:id', { templateUrl: "partials/add_appointment.html"})
	.when('/calendar/:id', { templateUrl: "partials/calendar_view.html"})
	.otherwise( { redirectTo: "/" });
});

var checkLoggedin = function($q, $location, $rootScope, $http) {
	var deferred = $q.defer();
	$http.get('/loggedin').success(function(user){
		console.log('checkLoggedin',user);
		if (user) {
			console.log('yes loggedin',user);
			$rootScope.users = user;
			$rootScope.currentUser = user; //$rootScope.currentUser is used ng-show- see index nav
			deferred.resolve();
			$location.path('/your_profile');
		}//ends if
		else {
			console.log('no loggedin');
			deferred.reject();
			$location.path('/login');
		}
	})
};