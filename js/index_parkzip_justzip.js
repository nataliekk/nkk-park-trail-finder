$(function() {
  let parks = [];
  let userCoordinates = [];
  let userZip;
  $("form").submit(e => {
    e.preventDefault();
    userZip = $("#location").val();
    console.log(userZip);
    findParksinZip(userZip);
    clearField();
  });

  // load parks data to be available
  function findParksinZip(zipcode) {
    $.ajax({
      url: "https://data.cityofnewyork.us/resource/enfh-gkve.json",
      type: "GET",
      data: {
        $limit: 10000,
        $$app_token: "cmiHbruuUoqPfSxhjiCnOrnSt",
        zipcode: zipcode
      }
    })
      .done(data => {
        // make parks data the data return

        parks = data;
        console.log(parks);
        updateUi(parks);
        showDropDown(parks);
        // showDropDown(parks);
        //  findParksinZip(parks, zipcode);
      })
      .fail(() => {
        alert("error occurred");
      });
  }

  function updateUi(parks) {
    console.log(parks);
    const displayRows = parks.map(park => {
      if (park.signname !== undefined && park.signname !== "Park") {
        return `
      <tr>
      <td>${park.signname}</td>
      <td>${park.typecategory}</td>
      <td><a href="https://www.google.com/maps/place/${park.signname}" target="_blank">"Get Directions"</a></td>
      </tr>
      `;
      } else {
      }
    });
    console.log(displayRows);
    $("#resultsZip").html(`<h2>Park properties in ${userZip}</h2>`);
    $("#results").toggleClass("hidden");
    $("tbody").html(displayRows);
  }
  function clearField() {
    $("input").val("");
  }

  function reset() {
    $("#resultsZip").html("");
    $("#results").toggleClass("hidden");
    $("tbody").html("");
  }
  function showDropDown(parks) {
    $("#dropdownMenu").toggleClass("hidden");
    const parkValues = parks.map(park => {
      return park.typecategory;
    });
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const uniqueParkValues = parkValues.filter(distinct).sort();
    const dropdownHtml = uniqueParkValues.map(uniqueParkValue => {
      return `
            <option value="${uniqueParkValue}">${uniqueParkValue}</option>`;
    });
    console.log(dropdownHtml);
    $("#parkType").html(`<option value="All">All</option>` + `${dropdownHtml}`);
  }
  function clearUi() {
    $("#resultsZip").html("");
    $("#results").html("");
    $("tbody").html("");
  }
});
