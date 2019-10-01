$(document).ready(function() {
  //INIT THE NAVBAR
  $(".sidenav").sidenav();
  $(".sidenav").css({ zIndex: 9999 });
});
fetch("api/expense")
  .then(res => res.json())
  .then(result => {
    console.log(result);
    createPieChart(result);
    createLineChart(result);
    createdoghnutChart(result);
  });

function createPieChart(result) {
  let varchart = document.getElementById("mychart").getContext("2d");

  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontFamily = 18;
  Chart.defaults.global.defaultFontFamily = "#777";

  let popchart = new Chart(varchart, {
    type: "pie", //bar horizontalBar pie line doughnut radar polarArea
    data: {
      labels: [
        result.categoryArr[0],
        result.categoryArr[1],
        result.categoryArr[2],
        result.categoryArr[3]
      ],
      datasets: [
        {
          label: "Population",
          data: [
            result.expenseArr[0],
            result.expenseArr[1],
            result.expenseArr[2],
            result.expenseArr[3]
          ],
          backgroundColor: ["green", "red", "yellow", "purple", "brown"],
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
}

function createLineChart(result) {
  let varchart1 = document.getElementById("mychart1").getContext("2d");

  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontFamily = 18;
  Chart.defaults.global.defaultFontFamily = "#777";

  let popchart1 = new Chart(varchart1, {
    type: "bar", //bar horizontalBar pie line doughnut radar polarArea
    data: {
      labels: [
        result.categoryArr[0],
        result.categoryArr[1],
        result.categoryArr[2],
        result.categoryArr[3]
      ],
      datasets: [
        {
          label: "Population",
          data: [
            result.expenseArr[0],
            result.expenseArr[1],
            result.expenseArr[2],
            result.expenseArr[3]
          ],
          backgroundColor: ["green", "red", "yellow", "purple", "brown"],
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
        display: true,
        position: "right",
        labels: {
          fontColor: "black"
        }
      },
      tooltips: {
        enabled: false
      }
    }
  });
}

function createdoghnutChart(result) {
  let varchart = document.getElementById("mychart2").getContext("2d");

  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontFamily = 18;
  Chart.defaults.global.defaultFontFamily = "#777";

  let popchart = new Chart(varchart, {
    type: "doughnut", //bar horizontalBar pie line doughnut radar polarArea
    data: {
      labels: [
        result.categoryArr[0],
        result.categoryArr[1],
        result.categoryArr[2],
        result.categoryArr[3]
      ],
      datasets: [
        {
          label: "Population",
          data: [
            result.expenseArr[0],
            result.expenseArr[1],
            result.expenseArr[2],
            result.expenseArr[3]
          ],
          backgroundColor: ["green", "red", "yellow", "purple", "brown"],
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
}
