appointments.controller('payment',function($rootScope,$scope, $window, AppointmentFactory){
	$window.Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

	$scope.stripeCallback = function (code, result) {

	    if (result.error) {
	        window.alert('it failed! error: ' + result.error.message);
	    } else {
	        window.alert('success! token: ' + result.id);
	        console.log($scope.number);
	        var info={
				id:result.id,
				amount:$scope.amount,

			}
	        AppointmentFactory.charge(info);	
		};
	}
});


