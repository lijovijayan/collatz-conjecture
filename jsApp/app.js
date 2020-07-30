var Chart = require("chart.js");
var ctx = document.getElementById("myChart");
colors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
let chart_data = {
  type: "line",
  data: {
    labels: [1],
    datasets: [],
  },
  options: {
    title: {
      display: true,
      text: 'COLLATZ CONJECTURE SEQUENCE VISUALIZATION'
    },
    lineTension: 0,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};
var myChart = new Chart(ctx, chart_data);
generateChart = async () => {
  for (let i = 0; i < 20; i++) {
    hailstone_sequence = [];
    let number = getRandomArbitrary(10000, 20000);
    let _number = number;
    let count = 0;
    while (number !== 1) {
      count++;
      hailstone_sequence.push(number);
      if (number % 2 === 0) {
        number = number / 2;
      } else {
        number = number * 3 + 1;
      }
    }
    console.log(hailstone_sequence, hailstone_sequence.length);
    count++;
    hailstone_sequence.push(1);
    chart_data.data.datasets.push({
      label: `${_number} (${i + 1})`,
      borderColor: getRandomColor(),
      fill: false,
      data: [...hailstone_sequence],
    });
    if (chart_data.data.labels.length < count) {
      chart_data.data.labels = [];
      for (let j = 1; j <= count; j++) {
        chart_data.data.labels.push(j);
      }
    }
    myChart.update();
    await sleep(1000);
  }
};
generateChart();
console.log(chart_data);
// setTimeout(() => {
//   chart_data.data.datasets[0].data.push(10);
//   chart_data.data.labels.push("test");
//   myChart.update();
//   console.log("Hello");
// }, 3000);
