var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
return{
	//getting appointment to specific question
	get_appointments: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log(results);
				res.json(results);
			}
		});
	},
	get_services: function(req, res){
		User.find({ _id : req.params.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log(results);
				res.json(results);
			}
		});
	},

	get_servicelist: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				res.json(results);
			}
		});
	},

	get_servicelist: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				res.json(results);
			}
		});
	},

	//for searching services drop down menu
	get_globalServices: function(req, res){
		User.find({}, function(err, results){
			if(err){
				res.send(err);
			} else{
				res.json(results);
			}
		})
	},

	add_appointment: function(req, res){
		// console.log(req.you);
		//this should be the id for the user/customer
		var query = { username:req.username };
		var new_appointment = {
			contractor: req.contractor,
			start_date: req.start_date,
			start_time: req.start_time,
			end_date: req.end_date,
			end_time: req.end_time,
			reason: req.reason,
			payment: req.payment,
			directions: req.directions,
			created_at: new Date()
		}
		User.update(query, { $addToSet : { appointments : new_appointment }}, function(err, status){
			if(err){
				res.send(err);
			}
			else{
				var new_service = {
					username: req.contractor,
					start_date: req.start_date,
					start_time: req.start_time,
					end_date: req.end_date,
					end_time: req.end_time,
					reason: req.reason,
					payment:  req.payment,
					directions: req.directions,
					created_at: new Date()
				}
				User.update({username: req.contractor}, { $addToSet: {services: new_service}}, function(err, status){
					if(err) {
					res.send(err);
					} 
					else {
						res.json(status);
					}
				});
			}
		});
	},

	add_service: function(req, res){
		var query = { _id :  req.user_id };
		var add_service = {
			service: req.service,
			details: req.details
		};
		User.update(query, { $addToSet : { resume : add_service }}, function(err, status){
			if(err){
				res.send(err);
			} else {
				res.json(status);
			}
		});
	},

	// //getting specific contractor
	get_contractor: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				res.json(results);
			}
		});
	},

	search_users: function(req, res){
		//first get all users at once select all resume and filter throught that
		User.find({}, function(err, results){
			if(err){
				res.send(err);
			} else{
				// console.log(results);
				res.json(results);
			}
		})
	},

	delete_appointment: function(req, res){
		// remove appointment from user in appointment array
		User.find({ _id: req.user_id}, function(err, results){
			for(var i=0; i<results[0].appointments.length; i++) {
				if(req.id == results[0].appointments[i]._id) {
					console.log(req.id);
					results[0].appointments.splice(i, 1)
					var newAppointments = results[0].appointments;
					// console.log("New appointments after deletion", newAppointments);
					User.update({ _id : req.user_id }, {$set: {appointments: newAppointments}}, function(err, results){
						if(err){
							res.send(err);
						} else {
							// remove service from contractors service array
							// User.update({ _id:req.contractor.id}, function(err, results){
								if(err){
									res.send(err);
								} else{
									res.json(results);
								}
							// })
						}
					});
				}
			}
		})
	}
}
})();
