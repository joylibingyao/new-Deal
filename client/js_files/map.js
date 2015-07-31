var myCenter=new google.maps.LatLng(51.508742,-0.120850);

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:2,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var marker=new google.maps.Marker({
  position:myCenter,
  });

	marker.setMap(map);
	
}
google.maps.event.addDomListener(window, 'load', initialize);

getLatLong("2805 Auga Vista Drive");

function getLatLong(address){
      var geo = new google.maps.Geocoder;

      geo.geocode({'address':address},function(results, status){
              if (status == google.maps.GeocoderStatus.OK) {
                console.log("This is the location ",results[0].geometry);
                return results[0].geometry.location;
              } else {
                alert("Geocode was not successful for the following reason: " + status);
              }

       });

  }
