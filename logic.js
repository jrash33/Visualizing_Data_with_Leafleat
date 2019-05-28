var myMap = L.map("map", {
  center: [39.09, -98.71],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


 // Create a legend to display information about our map
  var info = L.control({
    position: "bottomright"
  });

  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };

  // Add the info legend to the map
  info.addTo(myMap);



// Grabbing our GeoJSON data..
d3.json(link, function(data) {

  response = data.features;

  response.forEach(d => {
    var location = [d.geometry.coordinates[1], d.geometry.coordinates[0]]

    // Conditionals for countries points
    var color = "";
    if (d.properties.mag < 1) {
      color = "yellowgreen";
    }
    else if (d.properties.mag >= 1 && d.properties.mag < 2) {
      color = "olivedrab";
    }
    else if (d.properties.mag >= 2 && d.properties.mag < 3) {
      color = "orange";
    }
    else if (d.properties.mag >= 3 && d.properties.mag < 4) {
      color = "chocolate";
    }
    else if (d.properties.mag >= 4 && d.properties.mag < 5) {
      color = "maroon";
    }
    else if (d.properties.mag >= 5){
      color = "red";
    }

    // if (location){
    //   console.log(location)
    //   L.marker(location).addTo(myMap);
    // }
    if (location){
      L.circle(location, {
        fillOpacity: .9,
        color: "black",
        stroke: true,
        weight: 1,
        fillColor: color,
        radius: d.properties.mag * 16000
      }).addTo(myMap);
    }
    
  })


  //Update the legend
  updateLegend();

});

// Update the legend's innerHTML with the last updated time and station count
function updateLegend() {
  document.querySelector(".legend").innerHTML = [
    "<p><i style='background: yellowgreen'></i> 0-1</p>",
    "<p><i style='background: olivedrab'></i> 1-2</p>",
    "<p><i style='background: orange'></i> 2-3</p>",
    "<p><i style='background: chocolate'></i> 3-4</p>",
    "<p><i style='background: maroon'></i> 4-5</p>",
    "<p><i style='background: red'></i> 5+</p>",
  ].join("");
}