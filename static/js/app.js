
var click_button = d3.select("#filter-btn");
var Area_1= d3.select("#datetime");
var Area_2 = d3.select("#city");
var body = d3.select("body");
var reset = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

var populate = (dataInput) => {

  dataInput.forEach(ufo_sightings => {
    var row = body.append("tr");
    columns.forEach(column => row.append("td").text(ufo_sightings[column])
    )
  });
}

populate(data);


click_button.on("click", () => {
  d3.event.preventDefault();
  var inputDate = inputArea_1.property("value").trim();
  var inputCity = Area_2.property("value").toLowerCase().trim();
  
  var filterDate = data.filter(data => data.datetime === inputDate);
  console.log(filterDate)
  var filterCity = data.filter(data => data.city === inputCity);
  console.log(filterCity)
  var filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity);
  console.log(filterData)

  
  body.html("");

  let response = {
    filterData, filterCity, filterDate
  }

  if (response.filterData.length !== 0) {
    populate(filterData);
  }
    else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
      populate(filterCity) || populate(filterDate);
  
    }
    else {
      body.append("tr").append("td").text("No results found!"); 
    }
})

reset.on("click", () => {
  body.html("");
  populate(data)
  console.log("Table reset")
})