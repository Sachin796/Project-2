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
      console.log(result);
      // createChart(result);
    });
  function createChart(result) {
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
            backgroundColor: [
              "#5BC0EB",
              "#FDE74C",
              "#9BC53D",
              "#E55934",
              "#B3001B"
            ],
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

    //End of pi chart
    //Start of line Chart

    let varChart1 = document.getElementById("mychart1").getContext("2d");
    // console.log(result);
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
            backgroundColor: [
              "#5BC0EB",
              "#FDE74C",
              "#9BC53D",
              "#E55934",
              "#B3001B"
            ],
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
            backgroundColor: [
              "#5BC0EB",
              "#FDE74C",
              "#9BC53D",
              "#E55934",
              "#B3001B"
            ],
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
      console.log(e.target.value); //val
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
}); //^^^EVERYTHING SHOULD BE IN HERE
