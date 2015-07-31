// Profile controller
appointments.controller('Profile', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory){
	user_id = $rootScope.users._id;
	// console.log();
	// console.log('root user', $rootScope.users);
	//get appointments for current us
	ProfileFactory.getAppointments( user_id, function(data){
		$scope.appointments = data;
	});

	ProfileFactory.getUsers( user_id, function(data){

		$rootScope.users = data;
		
	});

	//GETTING SERVICE LIST to display on profile page
	ProfileFactory.getServiceList( user_id, function(data){
		$scope.services_list = data;
	});

	//show your services and appointments where user is working 
	ProfileFactory.getServices(user_id, function(data){
		$scope.services = data;
		$(document).ready(function() {
			var events = [];
			//services 
			for(var i=0; i< $scope.services.length; i++){
				events.push({
					title: "Service "+$scope.services[i]._id,
					start: $scope.services[i].start_date,
					end: $scope.services[i].end_date
				});
			}
			//appointments
			for(var i=0; i< $scope.appointments.length; i++){
				events.push({
					// title: $scope.appointments[i]._id,
					title: "Appointment "+$scope.appointments[i]._id,
					start: $scope.appointments[i].start_date,
					end: $scope.appointments[i].end_date
				});
			}
			$('#calendar').fullCalendar({
					header: {
						left: 'prev,next today',
						center: 'title',
						right: 'month,basicWeek,basicDay'
					},
					defaultDate: '2015-07-01',
					editable: true,
					eventLimit: true, // allow "more" link when too many events
					events: events
				});
			$(document).on("click",'.fc-title', function(){
	 			 	string = $(this).html().split(' ');
	 			 	// alert(string[0]);
	 			 	// console.log(string[1]);
	 			 	if(string[0] == "Service"){
	 			 		service_id = string[1];
	 			 		// qeury for this service to display
	 			 		$http.get('/get_services/'+ user_id).success(function(output){
	 			 			for(var i=0; i<output[0].services.length; i++){
	 			 			 if(output[0].services[i]._id == service_id){
	 			 			 	$('.pop_up').html("<table><tr><td>"+
	 			 			 			output[0].services[i].username+		
	 			 			 			"</td></tr><tr><td>"+output[0].services[i].start_date+" to "+output[0].services[i].end_date+"</td></tr><tr><td>"+output[0].services[i].start_time+" - "+output[0].services[i].end_time+"</td></tr><tr><td></td>"+output[0].services[i].reason+"</tr><tr><td>"+output[0].services[i].directions+"</td></tr></table>");
	 			 			 } 
	 			 			}
						});
	 			 	}

	 			 	if (string[0] == "Appointment"){
	 			 		// alert('helooooooo appointment');
	 			 		appointment_id = string[1];
	 			 		// query for this appt to display
	 			 		$http.get('/get_appointments/'+ user_id).success(function(output){
	 			 			appointment = output[0].appointments;
							for(var i=0; i<output[0].appointments.length; i++){
								// console.log('bracket',output[0].appointments[i]);
	 			 			 	if(output[0].appointments[i]._id == appointment_id){

	 			 			 		$('.pop_up').html("<table><tr><td>"+
	 			 			 			output[0].appointments[i].contractor+		
	 			 			 			"</td></tr><tr><td>"+output[0].appointments[i].start_date+" to "+output[0].appointments[i].end_date+"</td></tr><tr><td>"+output[0].appointments[i].start_time+" - "+output[0].appointments[i].end_time+"</td></tr><tr><td></td>"+output[0].appointments[i].reason+"</tr><tr><td>"+output[0].appointments[i].directions+"</td></tr></table>");
	 			 			 	} 
	 			 			}
						});
	 			 	}
	 		});
		});
	});

	// add service
	$scope.addService = function(){
		profile = $scope.profile;
		profile.user_id = $rootScope.users._id;
		ProfileFactory.addService(profile, function(data){
			// update service list
			ProfileFactory.getServiceList( user_id, function(data){
				$scope.services_list = data;
			});
		});
		$scope.profile={};
	};

});




