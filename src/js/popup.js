import Chart from 'chart.js';
import doughnutlabel from 'chartjs-plugin-doughnutlabel';

var data = [{
  data: [502323, 45523, 44602],
  backgroundColor: [
    "#ECC94B",
    "#48BB78",
    "#F56565",
  ],
}];

var options = {
  tooltips: {
    enabled: false
  },
  hover: {
    mode: null
  },
  legend: {
    display: false
  },
  cutoutPercentage: 60,
  plugins: {
    doughnutlabel: {
      labels: [
        {
          text: '12',
          font: {
            size: '30'
          },
        },
        {
          text: 'Cases reported',
          font: {
            size: 15
          },
        }
      ]
    }
  }
};

var ctx = document.getElementById('chart');
new Chart(ctx, {
  type: 'doughnut',
  data: {
  labels: ['Confirmed', 'Recovered', 'Deaths',],
    datasets: data
  },
  options: options
});
