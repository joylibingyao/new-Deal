// Calendar controller

appointments.controller('Calendar', function($rootScope,$scope, $routeParams, $location, CalendarFactory, AppointmentFactory){

	var user_id=$rootScope.users._id;
	CalendarFactory.getAppointments( user_id, function(data){
		$scope.appointments = data;
	});

	contractor_id = $routeParams.id;

	AppointmentFactory.getContractor(contractor_id, function(contractor_data){
		$scope.contractor = contractor_data[0];
		// console.log("brians info", $scope.contractor);
	})

	CalendarFactory.getServices(contractor_id, function(data){
		$scope.services = data;
		// console.log('services', $scope.services);
		$(document).ready(function() {
		// console.log("jquery", $scope.services);
		var events = [];
		for(var i=0; i< $scope.services.length; i++){
			events.push({
				title: $scope.services[i].start_time + "-" + $scope.services[i].end_time,
				start: $scope.services[i].start_date,
				end: $scope.services[i].end_date
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
		});
	});

	$scope.Delete = function(appointment){
		// console.log(appointment);
		CalendarFactory.Delete(appointment, user_id, function(data){
			CalendarFactory.getAppointments(user_id, function(data){
				$scope.appointments = data;
			});
		});
	}
});