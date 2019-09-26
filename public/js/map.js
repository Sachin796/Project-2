$(document).ready(function() {
  // Get references to page elements\

  //example data
  let expenses = [
    {
      item: "Shoes",
      price: 12.99,
      location: [43.6507, -79.307015],
      type: "Clothing"
    },
    {
      item: "food",
      price: 12.99,
      location: [43.6507, -79.327015],
      type: "Food"
    },
    {
      item: "SOCKS SOCKS SADSADSADSADASDASDSADASDSADAS",
      price: 12.99,
      location: [43.6507, -79.317015],
      type: "Clothing"
    }
  ];

  let myMap = L.map("weatherMap").setView([43.6507, -79.347015], 13);

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiYWZ3ZWJkZXYiLCJhIjoiY2sxMDB2MTJyMDB6NDNocDJ5ZTRzem5yNCJ9.-GMQ7KKaj_kPsf4ONmj6uQ"
  }).addTo(myMap);

  expenses.forEach(ele => {
    console.log(ele.type);
    if (ele.type === "Clothing") {
      var marker = L.marker(ele.location).addTo(myMap);
      marker.bindPopup(`<b>${ele.item}</b><br><span>$${ele.price}</span>`);
    }
  });

  //   var marker = L.marker([43.65207, -79.347015]).addTo(myMap);
  //   marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
});
