// Search Services controller
appointments.controller('Search', function($scope, $location, SearchFactory){
	// $scope.id = '55b7e44eeef1f8661dc15b48';

	//GETTING SERVICE LIST to display on profile page
	SearchFactory.getGlobalServices(function(data){
		function inArray(value, array){
		    for(var i=0;i<array.length;i++){
		        if(array[i]==value) {return false;}
		    }
		}

		var global_services = [];
		for(user in data){
			for(resume in data[user].resume){
				if (inArray(data[user].resume[resume].service, global_services) != false){
					global_services.push(data[user].resume[resume].service);
				}
			}
		}
		$scope.global_services = global_services;
		// console.log($scope.global_services);
	});

	$scope.searchUsers = function(selected_service){
		// console.log(service);
		SearchFactory.searchUsers(selected_service, function(data){
			//this data should have everything about this user

			function inArray(value, array){
		    for(var i=0;i<array.length;i++){
		        if(array[i]==value) {return false;}
		    	}
			}

			var users = []; //users that have that service
			for(user in data){
				for(service in data[user].resume){
					if(data[user].resume[service].service == selected_service){
						//should be username not you
						if(inArray(data[user], users) != false){
							users.push(data[user]);
						}
					}
				}
			}

			// $scope.users.average_rating = loop?//fix this	
			$scope.users = users;
			// console.log($scope.users);
		
		});
	}

	$scope.getCalendar = function(user){
		console.log(user);
		$location.path('/calendar/'+user._id);
	}

});