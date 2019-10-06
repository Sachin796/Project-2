if (Meteor.isClient) {
  var userLatitude;
  var userLongitude;

  var map;

  Template.map.rendered = function() {
    // Setup map
    map = new L.map("map", {
      dragging: false,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      touchZoom: false
    });

    map.setView([52.35873, 4.908228], 17);
    //map.setView([51.9074877, 4.4550772], 17);

    L.tileLayer("http://{s}.tile.cloudmade.com/9950b9eba41d491090533c541f170f3e/997@2x/256/{z}/{x}/{y}.png", {
      maxZoom: 17
    }).addTo(map);

    // If user has location then place marker on map
    if (userLatitude && userLongitude) {
      var marker = L.marker([userLatitude, userLongitude]).addTo(map);
    }

    var playersList = players.find().fetch();
    playersList.forEach(function(players) {
      // Change position of all markers
      var marker = L.marker([players.latitude, players.longitude], (options = { id: 666 })).addTo(map);
    });
  };

  // If the collection of players changes (location or amount of players)
  Meteor.autorun(function() {
    var playersList = players.find().fetch();
    playersList.forEach(function(players) {
      // Change position of all markers
      var marker = L.marker([players.latitude, players.longitude]).addTo(map);
    });
  });
}
