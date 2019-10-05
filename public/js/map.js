$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });
  $(".dropdown-trigger").dropdown();
  $("select").formSelect();
  //==============================

  //Define Global Vars
  let markers = [];

  //BUILD THE MAP
  let myMap = L.map("weatherMap").setView([43.6507, -79.347015], 9);
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiYWZ3ZWJkZXYiLCJhIjoiY2sxMDB2MTJyMDB6NDNocDJ5ZTRzem5yNCJ9.-GMQ7KKaj_kPsf4ONmj6uQ"
  }).addTo(myMap);

  const getNewData = () => {
    markers = [];
    fetch("/api/get/locations")
      .then(res => res.json())
      .then(result => {
        result.forEach(purchase => {
          console.log(purchase);
          let total = purchase.total;
          let { address, longitude, latitude } = purchase.Location;
          console.log(address, longitude, latitude);
          markers.push([latitude, longitude, { address: address, total: total }]);
          let table = $("tbody");
          table.append(`<tr><td>${address}</td><td>$${total}</td></tr>`);
        });

        for (var i = 0; i < markers.length; i++) {
          let lat = markers[i][0];
          let lon = markers[i][1];
          let { address, total } = markers[i][2];
          console.log(address, total);

          var markerLocation = new L.LatLng(lat, lon);
          var marker = new L.Marker(markerLocation);

          myMap.addLayer(marker);
          marker.bindPopup(`<div><b><span>${address}</span></b><br><span>Total Spent Here: $${total}</span></div>`);
        }
      })
      .catch(err => {
        throw err;
      });
  }; //GET DATA FUNC
  getNewData();

  //NEW

  fetch("/api/get/locations")
    .then(res => res.json())
    .then(result => {
      result.forEach(purchase => {
        console.log(purchase);
        let total = purchase.total;
        let { address, longitude, latitude } = purchase.Location;
        console.log(address, longitude, latitude);
      });
    })
    .catch(err => {
      throw err;
    });
});
