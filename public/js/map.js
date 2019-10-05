$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });
  $(".dropdown-trigger").dropdown();
  $("select").formSelect();

  //BUILD THE MAP
  let myMap = L.map("weatherMap").setView([43.6507, -79.347015], 9);
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiYWZ3ZWJkZXYiLCJhIjoiY2sxMDB2MTJyMDB6NDNocDJ5ZTRzem5yNCJ9.-GMQ7KKaj_kPsf4ONmj6uQ"
  }).addTo(myMap);

  //Get locations spent at.
  fetch("/api/get/locations")
    .then(res => res.json())
    .then(result => {
      console.log(result);
      result.forEach(purchase => {
        console.log(purchase);
        let total = purchase.total;
        let address = purchase.Location.address;
        let long = purchase.Location.longitude;
        let lat = purchase.Location.latitude;

        let table = $("tbody");
        table.append(`<tr><td>${address}</td><td>${total}</td></tr>`);

        var marker = L.marker([lat, long]).addTo(myMap);
        marker.bindPopup(
          `<b>${address}<div style="text-align: center;"></b><br><span>Total Spent To Date Here:</span><span><br>$${total}</span><br></div>`
        );
      });
    })
    .catch(err => {
      throw err;
    });
});
