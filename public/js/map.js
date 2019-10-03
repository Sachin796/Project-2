$(document).ready(function() {
  //LOCALSTORAGE TEMP STORE, UNTIL LOGIN FUNCTIONALITY.
  localStorage.setItem("user", "testing123");

  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });

  //BUILD THE MAP
  let myMap = L.map("weatherMap").setView([43.6507, -79.347015], 9);
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiYWZ3ZWJkZXYiLCJhIjoiY2sxMDB2MTJyMDB6NDNocDJ5ZTRzem5yNCJ9.-GMQ7KKaj_kPsf4ONmj6uQ"
  }).addTo(myMap);

  fetch("/api/get/locations")
    .then(res => res.json())
    .then(result => {
      console.log(result);
      result.forEach(purchase => {
        let address = purchase.Location.address;
        let long = purchase.Location.longitude;
        let lat = purchase.Location.latitude;
        let item_name = purchase.item_name;
        let item_price = purchase.amount_spent;
        let table = $("tbody");
        table.append(`<tr><td>${address}</td><td>${item_name}</td><td>${item_price}</td></tr>`);

        var marker = L.marker([lat, long]).addTo(myMap);
        marker.bindPopup(
          `<b>${purchase.category}<div style="text-align: center;"></b><br><span>${purchase.item_name}</span><br><span>$${purchase.amount_spent}</span></div>`
        );
      });
    })
    .catch(err => {
      throw err;
    });
});
