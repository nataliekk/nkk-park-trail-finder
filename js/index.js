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

$(function () {
  // $.ajax({
  //   url: "https://data.cityofnewyork.us/resource/vjbm-hsyr.json",
  //   type: "GET",
  //   data: {
  //     $limit: 100,
  //     $$app_token: "cmiHbruuUoqPfSxhjiCnOrnSt"
  //   }
  // }).done((data) => {
  //   alert("Retrieved " + data.length + " records from the dataset!");
  //   renderResults(data)
  // }).fail(() => {
  //   alert('error occurred')
  // })
  // function renderResults(data) {
  //   console.log(data)
  //   data.map((data) => {
  //     console.log(data["park_name"])
  //   })
  // }
})
