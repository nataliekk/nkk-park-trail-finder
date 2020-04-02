// $(document).ready(
//   $.ajax({
//     url: "https://data.cityofnewyork.us/resource/vjbm-hsyr.json",
//     type: "GET",
//     data: {
//       $limit: 5000,
//       $$app_token: "cmiHbruuUoqPfSxhjiCnOrnSt"
//     }
//   }).done(function(data) {
//     alert("Retrieved " + data.length + " records from the dataset!");
//     const surface = data.map(data => {
//       data.surface;
//     });
//     console.log(data);
//   })
// );

$(function() {
  let parks = [];
  let userCoordinates
  $("form").submit(e => {
    e.preventDefault();
    // GET Lat/Long from submitted address
    const userLocation = $("#location").val();
    userCoordinates = search(userLocation)
    makeParksDataAvailable();
    //  mapDistance(userLocation, parkData);
    // console.log("submit");
    // console.log($("#location").val());
    // mapDistance();
    // find park trail with shortest distance to start

    // load results into html
  });

  function search(query) {
    const url = "https://api.geocod.io/v1.4/geocode";
    const apiKey = "50ec507279f5c7f7730ffee07e20e3f7f8ec230";

    $.ajax({
      url: url,
      type: "GET",
      data: { api_key: apiKey, q: query }
    })
      .done(response => {
        // execute this function if request is successful
        console.log(response.results[0].location);
        // pass array of gifs as a parameter from API to displayResults() function
      })
      .fail(() => {
        // execute this function if request fails
        alert("error occurred");
      });
  }

  // load parks data to console
  function makeParksDataAvailable() {
    $.ajax({
      url: "https://data.cityofnewyork.us/resource/vjbm-hsyr.json",
      type: "GET",
      data: {
        $limit: 100,
        $$app_token: "cmiHbruuUoqPfSxhjiCnOrnSt"
      }
    })
    .done(data => {
      // alert("Retrieved " + data.length + " records from the dataset!");
      parks = data;
      console.log(parks);
      // just the coordinates
      const parkCoordinates = getParkCoordinates(data);

      const userLocation = $("#location").val();
      console.log(userLocation)
      console.log(parkCoordinates);
      let i;
      // let distance = [];
      // for (i = 0; i < parks.length; i++) {
      //   let indivDistance = mapDistance(userLocation, parkCoordinates[i]);
      //   distance.push(indivDistance);
      parks = parks.map(park => {
        return mapDistanceForOnePark(userCoordinates, getParkCoordinates(park));
      });
      console.log(parks)
    })
    .fail(() => {
      alert("error occurred");
    });
    //   distance.sort(function(a, b) {
    //     return b - a;
    //   });
    //   console.log(distance);
    // })

  //   function getParkCoordinates(data) {
  //     return data.map(data => {
  //       return data.shape.coordinates[0][0];
  //       // console.log(data.shape.coordinates[0]);
  //     });
  //     //    console.log(parkCoordinates);
  //   }
  // }

  function getParkCoordinates(park) {
    return park.shape.coordinates[0][0];
  }

  function mapDistance(userLocation, parks) {
    // calculate distance from user location -> park
    // console.log(userLocation);
    // console.log(parkData);
    // const distanceToParks = parkData.forEach(park => {
    //   return haversine_distance(userLocation, park);
    // });
    // console.log(distanceToParks);
    return haversine_distance(userLocation, parks);
  }

  function mapDistanceForOnePark(userLocation, park) {
    const distance = haversine_distance(userLocation, park);
    park.distance = distance;
    console.log(park)
    return park
  }

  // to find distance between two lat/long
  function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1[0] * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2[0] * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = mk2[1] - mk1[1] * (Math.PI / 180);
    // Radian difference (longitudes)

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  }
});
