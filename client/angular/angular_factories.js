//factories ///////////////////////////////////////////////////////////////////////////////////

//appointment factory
appointments.factory('AppointmentFactory', function($http){
	var factory = {};
	var appointments = [];
	factory.addAppointment = function(appointment, callback){
		$http.post('/add_appointment', appointment).success(function(output){
			//then send a message that appointment was added should take back to calendar view and display on list of scheduled appointments
			callback(output);
		})
	};

	factory.getContractor = function(id, callback) {
		$http.get('/get_contractor/'+ id).success(function(output){
			callback(output);
		})
	};

	return factory;
});


// Calendar factory
appointments.factory('CalendarFactory', function($http){
	var factory = {};
	//if there are errors-- add to message within the object
	var errors = {message: ''};

	factory.getAppointments = function(id, callback){
	$http.get('/get_appointments/'+ id).success(function(output){

		appointments = output[0].appointments;
		// console.log(appointments);
		callback(appointments);
		});
	};

	factory.getServices = function(id, callback) {
		$http.get('/get_services/'+ id).success(function(output){

			
			services = output[0].services;
			callback(services);
		});
	};

	factory.Delete = function(appointment, user_id, callback){
      var id = appointment._id;
      $http.get("/delete_appointment/" + user_id +"/"+ id).success(function(output){
      	// console.log("factory", output);
        	callback(output);
      })
    };

	return factory;
});

// Profile factory
appointments.factory('ProfileFactory', function($http){
	var factory = {};
	//if there are errors-- add to message within the object
	// var errors = {message: ''};

	factory.getAppointments = function(id, callback){
	$http.get('/get_appointments/'+ id).success(function(output){
		appointments = output[0].appointments;
		// console.log(appointments);
		callback(appointments);
		});
	};

	factory.getServices = function(id, callback) {
		$http.get('/get_services/'+ id).success(function(output){
			services = output[0].services;
			callback(services);
		});
	};

	factory.addService = function(service, callback) {
		$http.post('/add_service', service).success(function(output){
			callback(output);
		})
	};

	factory.getServiceList = function(id, callback) {
		$http.get('/get_servicelist/'+ id).success(function(output){
			service_list = output[0].resume;
			callback(service_list);
		});
	};

	factory.getUsers = function(id, callback) {
		$http.get('/get_users/'+ id).success(function(output){
			users = output[0];
			callback(users);
		});
	}

	return factory;
});

//Search Factory
appointments.factory('SearchFactory', function($http){
	var factory = {};

	factory.getGlobalServices = function(callback) {
		$http.get('/get_globalServices').success(function(output){
			callback(output);
		});
	};

	//seraching users based on service they can provide
	factory.searchUsers = function(service, callback){
		// console.log(service);
		$http.get('/search_users/'+ service).success(function(output){
			//this should be all users
			callback(output);
		})
	}
	return factory;
});
