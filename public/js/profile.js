let colorArray = []; //array fo storing random color

//fetch json file
fetch("./js/colors.json")
  .then(response => response.json())
  .then(json => {
    colorArray = json.colors;
  });

$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });
  $(".dropdown-trigger").dropdown();
  $("select").formSelect();

  //Define global charts var(array of charts)
  let chartObjArr = [];

  //Ten color generate Array(Max categories?)
  const tenRandColors = () => {
    let tenColors = [];
    for (var i = 0; i < 10; i++) {
      tenColors.push(colorArray[Math.floor(Math.random() * colorArray.length)]);
    }
    return tenColors;
  };

  //initial call for data.
  fetch("/api/expense")
    .then(res => res.json())
    .then(result => {
      console.log(result.status);
      if (result.status == "ok") {
        createChart(result);
      } else {
        alert("NO data found");
      }
    });

  //Create all charts.
  function createChart(result) {
    //Chart Default Vals
    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontFamily = 18;
    Chart.defaults.global.defaultFontFamily = "#777";

    //What types of tables
    const charts = ["pie", "bar", "doughnut"];

    //Expense data to int.
    let expenseData = result.expenseArr.map(expense => {
      return parseInt(expense);
    });

    charts.forEach(chart => {
      let randomColorArray = tenRandColors();
      console.log(chart);
      let varChart = document.getElementById(chart).getContext("2d");

      let newChart = new Chart(varChart, {
        type: chart, //bar horizontalBar pie line doughnut radar polarArea
        data: {
          labels: result.categoryArr,
          datasets: [
            {
              data: expenseData,
              backgroundColor: randomColorArray,
              borderWidth: 1,
              borderColor: "darkblue",
              hoverBorderWidth: 3,
              hoverBorderColor: "black"
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Expenses",
            fontsize: 25
          },

          legend: {
            display: true,
            position: "right",
            labels: {
              fontColor: "black"
            }
          },
          options: {
            animation: {
              duration: 5000,
              onProgress: function(animation) {
                progress.value = animation.currentStep / animation.numSteps;
              }
            }
          },
          tooltips: {
            enabled: true
          }
        }
      });
      chartObjArr.push(newChart);
    });
  }

  //oncChange handler for date dropdown
  $(document).on("change", "select", function() {
    chartObjArr.forEach(chart => {
      chart.destroy();
    });

    let newdata = {
      newdata: this.value
    };

    fetch("/api/profile", {
      method: "post",
      body: JSON.stringify(newdata), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .then(res => {
        console.log(JSON.stringify(res));
        createChart(res);
      });
  });
}); //^^^EVERYTHING SHOULD BE IN HERE
