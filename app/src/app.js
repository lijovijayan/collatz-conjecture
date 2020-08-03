import { getRandomArbitrary, sleep } from "./utils";
var randomColor = require("randomcolor");
var Chart = require("chart.js");

var canvas = document.getElementById("chart");
let chart_data = basicChartData();

var collatzChart = new Chart(canvas, chart_data);
const generateChart = async () => {
  for (let i = 0; i < 5; i++) {
    let hailstone_sequence = [];
    let number = getRandomArbitrary(5, 100);
    let _number = number;
    let count = 0;
    while (number >= 1) {
      count++;
      hailstone_sequence.push(number);
      if (number === 1) {
        break;
      } else if (number % 2 === 0) {
        number = number / 2;
      } else {
        number = number * 3 + 1;
      }
    }
    console.log(hailstone_sequence, hailstone_sequence.length);
    addDataset(hailstone_sequence, _number);
    if (chart_data.data.labels.length < count) {
      chart_data.data.labels = [];
      for (let j = 1; j <= count; j++) {
        chart_data.data.labels.push(j);
      }
    }
    collatzChart.update();
    await sleep(1000);
  }
};
const addDataset = (sequence, number) => {
  chart_data.data.datasets.push({
    label: `${number} (${i + 1})`,
    borderColor: randomColor(),
    fill: false,
    data: [...sequence],
  });
};
function basicChartData() {
  return {
    type: "line",
    data: {
      labels: [1],
      datasets: [],
    },
    options: {
      title: {
        display: true,
        text: "COLLATZ CONJECTURE SEQUENCE VISUALIZATION",
      },
      elements: {
        line: {
          tension: 0.4,
        },
      },
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
}
generateChart();
