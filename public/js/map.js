$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });
  $(".dropdown-trigger").dropdown();
  $("select").formSelect();
  //==============================

  //BUILD THE MAP
  let myMap = L.map("weatherMap").setView([43.6507, -79.347015], 9);
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiYWZ3ZWJkZXYiLCJhIjoiY2sxMDB2MTJyMDB6NDNocDJ5ZTRzem5yNCJ9.-GMQ7KKaj_kPsf4ONmj6uQ"
  }).addTo(myMap);

  //Define Global Vars
  let markerArray = [];

  //NEW layerGroup of lcation markers.
  let locGroup;

  //Table body Element
  let $table = $("tbody");

  //Get Data and endpoint using date
  const getData = date => {
    //If we have a group already, delete it.
    if (locGroup) {
      locGroup.clearLayers();
    }
    //Set default map view to last day.
    if (!date) {
      date = "day";
    }

    fetch(`/api/get/locations/${date}`)
      .then(res => res.json())
      .then(result => {
        result.forEach(purchase => {
          console.log(purchase);
          let total = purchase.total;
          let { address, longitude, latitude } = purchase.Location;
          console.log(address, longitude, latitude);

          //ADD TABLE DATA
          $table.append(`<tr><td>${address}</td><td>$${total}</td></tr>`);
          $($table).fadeIn();

          var marker = new L.Marker([latitude, longitude]);
          marker.bindPopup(`
        <div>
          <b><span>${address}</span></b>
          <br><span>Total Spent Here: $${total}</span>
        </div>`);
          markerArray.push(marker);
        });
      })
      .then(() => {
        locGroup = new L.layerGroup(markerArray).addTo(myMap);
      })
      .catch(err => {
        throw err;
      });
  };

  $(document).on("change", "#selectday", e => {
    $($table).fadeOut();
    let date = e.target.value;
    getData(date);
  });

  getData();
}); //END
