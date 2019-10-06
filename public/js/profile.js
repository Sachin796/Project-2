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
  function createChart(result) {
    let randomColorArray = [];
    for (let i = 0; i < result.expenseArr.length; i++) {
      randomColorArray.push(colorArray[Math.floor(Math.random() * colorArray.length)]);
    }

    //Start of Pi Chart
    let expenseData = result.expenseArr.map(expense => {
      return parseInt(expense);
    });
    let varChart = document.getElementById("mychart").getContext("2d");

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontFamily = 18;
    Chart.defaults.global.defaultFontFamily = "#777";

    let popchart = new Chart(varChart, {
      type: "pie", //bar horizontalBar pie line doughnut radar polarArea
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

    //CREATE BAR GRAPH
    function createLineChart(result) {
      let expenseData = result.expenseArr.map(expense => {
        return parseInt(expense);
      });
      console.log(expenseData);
      let varChart = document.getElementById("mychart1").getContext("2d");
      console.log(result);
      Chart.defaults.global.defaultFontFamily = "Lato";
      Chart.defaults.global.defaultFontFamily = 18;
      Chart.defaults.global.defaultFontFamily = "#777";

      let popchart1 = new Chart(varChart1, {
        type: "bar", //bar horizontalBar pie line doughnut radar polarArea
        data: {
          labels: result.categoryArr,
          datasets: [
            {
              data: [...expenseData],
              backgroundColor: randomColorArray,
              borderWidth: 1,
              borderColor: "#777",
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
            display: false,
            position: "right",
            labels: {
              fontColor: "black"
            }
          },
          tooltips: {
            enabled: true
          }
        }
      });

      //End of line chart
      // Start of doughnut Chart

      let varChart2 = document.getElementById("mychart2").getContext("2d");

      Chart.defaults.global.defaultFontFamily = "Lato";
      Chart.defaults.global.defaultFontFamily = 18;
      Chart.defaults.global.defaultFontFamily = "#777";

      let popchart2 = new Chart(varChart2, {
        type: "doughnut", //bar horizontalBar pie line doughnut radar polarArea
        data: {
          labels: result.categoryArr,
          datasets: [
            {
              label: "Population",
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

      $(document).on("change", "select", function(e) {
        popchart.destroy();
        popchart1.destroy();
        popchart2.destroy();
      });
    }

    //oncChange handler for date dropdown
    $(document).on("change", "select", function() {
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
  }
}); //^^^EVERYTHING SHOULD BE IN HERE
