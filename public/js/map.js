$(document).ready(function() {
  //LOCALSTORAGE TEMP STORE, UNTIL LOGIN FUNCTIONALITY.
  localStorage.setItem("user", "testing123");

  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });

  //example data, to be replaced by API call of expenses.

  const getExpense = () => {
    let user = localStorage.getItem("user");
    fetch(`/api/expense/${user}`)
      .then(res => {
        //RESPONSE FROM SERVER
        console.log(res);
      })
      .catch(err => {
        throw err;
      });
  };

  let myMap = L.map("weatherMap").setView([43.6507, -79.347015], 13);

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiYWZ3ZWJkZXYiLCJhIjoiY2sxMDB2MTJyMDB6NDNocDJ5ZTRzem5yNCJ9.-GMQ7KKaj_kPsf4ONmj6uQ"
  }).addTo(myMap);

  // expenses.forEach(ele => {
  //   console.log(ele.type);
  //   if (ele.type === "Clothing") {
  //     var marker = L.marker(ele.location).addTo(myMap);
  //     marker.bindPopup(`<b>${ele.item}</b><br><span>$${ele.price}</span>`);
  //   }
  // });

  //   var marker = L.marker([43.65207, -79.347015]).addTo(myMap);
  //   marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
});
