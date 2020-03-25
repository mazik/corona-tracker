import Chart from 'chart.js';
import doughnutlabel from 'chartjs-plugin-doughnutlabel';
import country from './Country';
import corona from './Corona';

let countryCode;
let locationDeaths;
let locationConfirmed;
let locationRecovered;

country.get().then(region => {
  const location = document.getElementById('country');
  location.appendChild(document.createTextNode(region.country));
  
  countryCode = region.countryCode;
}).then(() => {
  corona.global().then(data => {
    const deaths = document.getElementById('global-deaths');
    deaths.appendChild(document.createTextNode(data.deaths.total.toLocaleString()));

    const confirmed = document.getElementById('global-confirmed');
    confirmed.appendChild(document.createTextNode(data.totalConfirmed.toLocaleString()));

    const recovered = document.getElementById('global-recovered');
    recovered.appendChild(document.createTextNode(data.recovered.total.toLocaleString()));

    const date = document.getElementById('date');
    date.appendChild(document.createTextNode(new Date(data.reportDate).toDateString()));
  }).catch(error => alert(error));
}).then(() => {
  corona.location(countryCode).then(affected => {
    locationDeaths = affected.deaths.value;
    locationConfirmed = affected.confirmed.value;
    locationRecovered = affected.recovered.value;
  }).then(() => {
    const currentLocationDeaths = document.getElementById('location-deaths');
    currentLocationDeaths.appendChild(document.createTextNode(locationDeaths));

    const currentLocationRecovered = document.getElementById('location-recovered');
    currentLocationRecovered.appendChild(document.createTextNode(locationRecovered));

    const currentLocationConfirmed = document.getElementById('location-confirmed');
    currentLocationConfirmed.appendChild(document.createTextNode(locationConfirmed));
  }).then(() => {
    const ctx = document.getElementById('chart');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Deaths', 'Confirmed', 'Recovered'],
        datasets: [{
          data: [
            locationConfirmed,
            locationRecovered,
            locationDeaths,
          ],
          backgroundColor: [
            '#ECC94B',
            '#48BB78',
            '#F56565',
          ],
        }],
      },
      options: {
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
                text: locationDeaths + locationConfirmed + locationRecovered,
                font: {
                  size: '30',
                },
              },
              {
                text: 'Cases reported',
                font: {
                  size: '15'
                }
              }
            ]
          }
        }
      }
    })
  }).then(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
  }).catch(error => alert(error))
}).catch(error => alert(error))
