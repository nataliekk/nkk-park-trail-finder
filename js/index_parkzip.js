$(function() {
  let parks = [];
  let userCoordinates = [];
  $("form").submit(e => {
    e.preventDefault();
    // GET Lat/Long from submitted address
    // const user = { lat: 40.672298, lng: -73.964079 };
    // const park = [-77.5198549721228, 40.11248843537908];
    // console.log(haversine_distance(user, park));

    const userLocation = $("#location").val();
    search(userLocation);
    findParks();
    //  mapDistance(userCoordinates, parkData);
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
        // console.log(response.results[0].location);
        userCoordinates = response.results[0].location;
      })
      .fail(() => {
        // execute this function if request fails
        alert("error occurred");
      });
    // console.log(userCoordinates);
  }

  // load parks data to console
  function findParks() {
    $.ajax({
      url: "https://data.cityofnewyork.us/resource/enfh-gkve.json",
      type: "GET",
      data: {
        $limit: 10000,
        $$app_token: "cmiHbruuUoqPfSxhjiCnOrnSt"
      }
    })
      .done(data => {
        // make parks data the data return
        parks = data;
        console.log(parks);
        // get just the coordinates for each park
        //  const parkCoordinates = getParkCoordinates(data);

        // const userLocation = $("#location").val();
        // console.log(userLocation)
        // console.log(parkCoordinates);
        // let i;
        // let distance = [];
        // for (i = 0; i < parks.length; i++) {
        //   let indivDistance = mapDistance(userLocation, parkCoordinates[i]);
        //   distance.push(indivDistance);

        console.log(
          parks.map(park => {
            return getParkCoordinates(park);
          })
        );

        parks = parks.map(park => {
          return mapDistanceForOnePark(
            userCoordinates,
            getParkCoordinates(park)
          );
        });

        console.log(parks);
        const parksSorted = parks
          .slice()
          .sort((a, b) => {
            return b.distance - a.distance;
          })
          .reverse();
        console.log(parksSorted);
      })
      .fail(() => {
        alert("error occurred");
      });
  }

  function getParkCoordinates(park) {
    return park.multipolygon.coordinates[0][0][0];
  }

  function mapDistance(userLocation, parks) {
    return haversine_distance(userLocation, parks);
  }

  function mapDistanceForOnePark(userCoordinates, park) {
    const distance = haversine_distance(
      userCoordinates,
      getParkCoordinates(park)
    );
    park.distance = distance;
    // console.log(park);
    return park;
  }

  // to find distance between two lat/long
  function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    //  console.log(mk1.lat);

    var rlat2 = mk2[1] * (Math.PI / 180); // Convert degrees to radians
    // console.log(rlat2);
    //  console.log(mk2[1]);
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    // console.log(difflat);
    var difflon = mk2[0] - mk1.lng * (Math.PI / 180);
    // Radian difference (longitudes)
    // console.log(difflon);
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
