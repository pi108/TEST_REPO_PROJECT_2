function buildMetadata(userData) {

  result = userData;
  console.log("result build meta\n", result);
  var PANEL = d3.select("#sample-metadata");
  PANEL.html("");

  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.  
  // Object.entries(result).forEach(([key, value]) => {
  //   PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
  // });  


  function sum(obj) {
    return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
  }
  
  console.log(`sum:${sum(result)}`);
  PANEL.append("h5").text(`${result[0].State_Name}`)
  PANEL.append("h6").text(`Cases:${result[93].Act_Total_Cases}`)
  PANEL.append("h6").text(`Deaths: ${result[93].Act_Total_Deaths}`)
  PANEL.append("h6").text(`Population: ${result[93].Population}`)


  buildGauge(result[0].data.Act_Total_Deaths * 1000000 / data.Population );

}

function buildCharts(sample) {
  
  // var dataUrl = `http://127.0.0.1:5000/api/v1.0/cases/${sample}`;
  var dataUrl = `/api/v1.0/cases/${sample}`;
  console.log(dataUrl)
  var userInfo;
  d3.json(dataUrl).then((data) => {
    //console.log(data)

    userInfo = data;

    console.log("POPULATION: ", userInfo)

    var deaths = data.map(info => info.Act_Total_Deaths);
    var cases  = data.map(info => info.Act_Total_Cases)
    console.log(deaths)
    console.log(deaths.length)
    
    // var otu_labels = resultArray.map(info => info.name);
    // var sample_values = resultArray.map(info => info.amount);

    // // Build a Bubble Chart
    // var bubbleLayout = {
    //   title: "Bacteria Cultures Per Sample",
    //   margin: { t: 0 },
    //   hovermode: "closest",
    //   xaxis: { title: "OTU ID" },
    //   margin: { t: 30}
    // };
    // var bubbleData = [
    //   {
    //     x: otu_ids,
    //     y: sample_values,
    //     text: otu_labels,
    //     mode: "markers",
    //     marker: {
    //       size: sample_values,
    //       color: otu_ids,
    //       colorscale: "Earth"
    //     }
    //   }
    // ];

    // Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    // var barData = [
    //   {
    //     y: yticks,
    //     x: sample_values.slice(0, 10).reverse(),
    //     text: otu_labels.slice(0, 10).reverse(),
    //     type: "bar",
    //     orientation: "h",
    //   }
    // ];

    // var barLayout = {
    //   title: "Top 10 Bacteria Cultures Found",
    //   margin: { t: 30, l: 150 }
    // };

    // Plotly.newPlot("bar", barData, barLayout);
    
    buildMetadata(userInfo);

  });

}

function makeBubble(state){
  console.log("MAKE BUBBLE")
  // var dataUrl = `http://127.0.0.1:5000/api/v1.0/cases/${state}`;
  var dataUrl = `/api/v1.0/cases/${state}`;
  console.log(dataUrl)
  var userInfo;
  d3.json(dataUrl).then((data) => {
    //console.log(data)

    userInfo = data[0].Population;

    console.log("POPULATION: ", userInfo)

    var deaths = data.map(info => info.Act_Total_Deaths);
    var deathspred = data.map(d=>d.Est_Total_Deaths);
    
    var cases  = data.map(info => info.Act_New_Cases);
    var casespred = data.map(d=>d.Est_New_Cases);

    var dailydeaths  = data.map(info => info.Act_New_Deaths);
    var preddailydeaths = data.map(d=>d.Estimated_New_Deaths);



    var dates  = data.map(info => info.Date);
    var states = data.map(info => info.State_Name);
    var states_abbr = data.map(info => info.State_Abbr);

    var lat = data.map(d=>d.Latitude);
    var lon = data.map(d=>d.Longitude);
    // console.log("LATITUDE: ", lat[0]);
    // console.log("LONGITUDE: ", lon[0]);

    // console.log(states_abbr)
    // console.log(deaths)
    // console.log(deaths.length)
    // Build a Bar Chart
    var barData = [
      {
        x: dates,
        y: deaths,
        text:"",
        type: "bar",
        markder: {color:'lightblue'}
        //orientation: "h",
      }
    ];
    var barData2 = [
      {
        x: dates,
        y: deathspred,
        text:"",
        type: "bar",
        marker: {color:"green"}
        //orientation: "h",
      }
    ];
  
    var barLayout = {
      title: data[0].State_Name + ': Total Actual Deaths',
      margin: { t: 30, l: 150 }
    };

    var barLayout2 = {
      title: data[0].State_Name + ': Total Predicted Deaths',
      margin: { t: 30, l: 150 }, 
      color:deaths, 
      //yaxis: {range: [2,5]}
    };
  
    Plotly.newPlot("alldeath", barData, barLayout);
    Plotly.newPlot("preddeath", barData2, barLayout2);



    var barData = [
      {
        x: dates,
        y: cases,
        text:"",
        type: "bar",
        markder: {color:'lightblue'}
        //orientation: "h",
      }
    ];
    var barData2 = [
      {
        x: dates,
        y: casespred,
        text:"",
        type: "bar",
        marker: {color:"green"}
        //orientation: "h",
      }
    ];
  
    var barLayout = {
      title: data[0].State_Name + ': Daily Actual Cases',
      margin: { t: 30, l: 150 }
    };

    var barLayout2 = {
      title: data[0].State_Name + ': Daily Predicted Cases',
      margin: { t: 30, l: 150 }, 
      color:deaths
    };
  
    Plotly.newPlot("allcases", barData, barLayout);
    Plotly.newPlot("predcases", barData2, barLayout2);



    var barData = [
      {
        x: dates,
        y: dailydeaths,
        text:"",
        type: "bar",
        markder: {color:'lightblue'}
        //orientation: "h",
      }
    ];
    var barData2 = [
      {
        x: dates,
        y: preddailydeaths,
        text:"",
        type: "bar",
        marker: {color:"green"}
        //orientation: "h",
      }
    ];
  
    var barLayout = {
      title: data[0].State_Name + ': Daily Actual Deaths',
      margin: { t: 30, l: 150 }
    };

    var barLayout2 = {
      title: data[0].State_Name + ': Daily Predicted Deaths',
      margin: { t: 30, l: 150 }, 
      color:deaths
    };
  
    Plotly.newPlot("dailydeaths", barData, barLayout);
    Plotly.newPlot("preddailydeaths", barData2, barLayout2);



    //MAP
    var mapdata = [{
      type: "choroplethmapbox", 
      name: "US states", 
      geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json", 
      locations: [ "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" ],
      ///NEEDS REAL DATA  
      z: [ 141, 55, 147, 32, 146, 151, 7, 146, 136, 145, 141, 49, 151, 38, 158, 164, 141, 146, 145, 142, 150, 155, 160, 156, 161, 147, 164, 150, 152, 155, 167, 145, 146, 151, 154, 161, 145, 155, 150, 151, 162, 172, 169, 170, 151, 152, 173, 160, 176 ],
     zmin: 25, zmax: 280,  colorscale:'Greys', opacity:.8,
     colorbar: {y: 0, yanchor: "bottom", title: {text: "Deaths", side: "left"}}}
    
      ];
     
     var layout = {mapbox: {style: "light", center: {lon: lon[0], lat: lat[0]}, zoom: 4}, 
     width: 600, height: 400, margin: {t: 0, b: 100}};
     
     var config = {mapboxAccessToken: "pk.eyJ1IjoiYW5ubWNuYW1hcmEiLCJhIjoiY2s5YTNiOXI0MDNvOTNlbDdwOXdtejRiYSJ9.W1SBSUR6jrI3YgWdhDV2sA"};
     
     Plotly.newPlot('map', mapdata, layout, config);


     var element = document.querySelector('#guage-chart')
     d3.select("#guage-chart").html("");
      /// NEED TO GET RANKING
     needle = data.Act_Total_Deaths * 1000000 / data.Population;
     midNo = needle.toString()
     // Properties of the gauge
     let gaugeOptions = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(44, 151, 222)', 'lightgray'],
      arcDelimiters: [needle],
      rangeLabel: ['0', '1542'],
      centralLabel: midNo,
    }

     // Drawing and updating the chart
     // element, chartwidth )(height is always 0.5 * chartWidth), options, value
     // needle value is a number from 0 to 100.
     // NEEDS REAL DATA
     GaugeChart.gaugeChart(element, 300, gaugeOptions).updateNeedle(needle);

    buildMetadata(data);


  });




}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/api/v1.0/ids").then((data) => {
    var sampleNames = data;
    console.log(sampleNames)
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    console.log(firstSample)
    makeBubble(firstSample)
    //var userData = buildCharts(firstSample);
    buildCharts(firstSample);

  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log(`change ${{newSample}}`)
  makeBubble(newSample);
  buildCharts(newSample)

}

// Initialize the dashboard
init();
