import Chart from 'chart.js';
import doughnutlabel from 'chartjs-plugin-doughnutlabel';
import country from './Country';
import corona from './Corona';

let countryCode;
let countryName;
let locationDeaths;
let locationConfirmed;
let locationRecovered;
let statChart;

// bootstrap init definition
let init = () => {
  country.get()                                             // get your own country info
  .then(region => {
    countryName = region.country;                           // set country name and code
    countryCode = region.countryCode;
  })
  .then(() => {
    renderAffectedCountry(countryCode, countryName);        // calling to get data of affected specific country by country code
  })
  .then(() => {
    corona.todayGlobalWordometer()                          // get latest global information from wordometer source api
    .then(data => {
      const deaths = document.getElementById('global-deaths');                              // render total global deaths
      deaths.appendChild(document.createTextNode(data.deaths.toLocaleString()));

      const confirmed = document.getElementById('global-confirmed');                        // render total confirmed case
      confirmed.appendChild(document.createTextNode(data.cases.toLocaleString()));

      const recovered = document.getElementById('global-recovered');                        // render total recovered case
      recovered.appendChild(document.createTextNode(data.recovered.toLocaleString()));

      const date = document.getElementById('date');                                         // render today's date
      date.appendChild(document.createTextNode(new Date(data.updated).toDateString()));

    })
    .catch(error => alert(error));
  })
  .then(() => {
    country.all()                                                 // populating all countries in side panel
    .then(countries => {
      const countryListUL = document.getElementById('countryUL');

      for (let i in countries) {
        let li = document.createElement("LI");                    // Create a <li> element
        li.innerHTML = countries[i].name;                         // Insert text

        var attr = document.createAttribute("class");             // Create a "class" attribute
        attr.value = "country border border-solid " +
          "border-gray-300 -mt-px " +
          "bg-gray-100 p-12px no-underline " +
          "text-sm text-gray-700 block " +
          "hover:bg-gray-300";                                    // Set the value of the class attribute
        li.setAttributeNode(attr);                                // append attribute to <li> element

        var attr = document.createAttribute("data-code");         // Create a "data-code" attribute
        attr.value = countries[i].iso2;                           // Set the value of the data-code attribute
        li.setAttributeNode(attr);                                // append attribute to <li> element

        li.addEventListener("click", (el) => {                    // binding click event listener for call specific country info
          document.getElementById("menu").style.display = 'none'; // closing side panel before calling
          document.getElementById("countryListPanel").style.display = 'none';

          let code = el.target.getAttribute('data-code');         // get country code from attribute
          let name = el.target.innerText;                         // get the name of country

          if (code != "" && name != "") {
            const loader = document.getElementById('loader');
            loader.classList.remove('hidden');

            renderAffectedCountry(code, name);                    // call to render info of a specific affected country
          }
        });

        countryListUL.appendChild(li);                            // append list <li> item to <ul>
      }

    })
    .catch(error => alert(error));

  })
  .catch(error => alert(error))
};

init();       // calling the strap to boot.

let renderAffectedCountry = (countryCode, countryName) => {     // function definition to get specific country
  corona.location(countryCode).then(affected => {               // get latest global information from wordometer source api
    locationDeaths = affected.deaths.value;                     // no of deaths (upto now)
    locationConfirmed = affected.confirmed.value;               // no of confirmed cases
    locationRecovered = affected.recovered.value;               // no of recovered cases

  })
  .then(() => {
    const location = document.getElementById('country');                               // render country name
    location.innerText = countryName;

    const currentLocationDeaths = document.getElementById('location-deaths');          // render number of deaths
    currentLocationDeaths.innerText = locationDeaths;

    const currentLocationRecovered = document.getElementById('location-recovered');    // render number of recovered
    currentLocationRecovered.innerText = locationRecovered;

    const currentLocationConfirmed = document.getElementById('location-confirmed');    // render number of confirmed cases
    currentLocationConfirmed.innerText = locationConfirmed;
  })
  .then(() => {
    if (statChart === undefined) {                              // check chart is already defined

      const ctx = document.getElementById('chart');             // init chart with value of deaths,cases & recovered number
      statChart = new Chart(ctx, {
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
    }
    else {
      // update numbers if already initialized
      statChart.data.datasets[0].data[0] = locationConfirmed;
      statChart.data.datasets[0].data[1] = locationRecovered;
      statChart.data.datasets[0].data[2] = locationDeaths;
      statChart.options.plugins.doughnutlabel.labels[0].text = locationDeaths + locationConfirmed + locationRecovered;
      statChart.update();
    }
  })
  .then(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');

    slideToggle(false);            // close the sidebar before loader disappear
  })
  .catch(error => alert(error))
};

let slideToggle = (state) => {                                            // event driven operation handling
  let countryListPanel = document.getElementById("countryListPanel");
  countryListPanel.style.display = 'block';

  if (countryListPanel.classList.contains('-mr-200px') && state) {        // open slider if closed
    document.getElementById("cross").style.display = 'block';
    document.getElementById("menu").style.display = 'none';

    countryListPanel.classList.remove('-mr-200px');
    countryListPanel.classList.add('mr-0px');

    document.getElementById('searchInput').focus();
  }
  else {
    countryListPanel.classList.add('-mr-200px');
    countryListPanel.classList.remove('mr-0px');

    document.getElementById("cross").style.display = 'none';
    document.getElementById("menu").style.display = 'block';

    resetFilter();               // reset the search input & filter
  }
};
// binding the event for open/close panel
document.getElementById("menu").addEventListener("click", slideToggle);
document.getElementById("cross").addEventListener("click", slideToggle);

// filter list of country based on search keyword
let filterCountry = () => {
  // Declare variables
  let input, filter, ul, li, i, txtValue, txtCode;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("countryUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    txtCode = li[i].getAttribute('data-code');
    if (txtValue.toUpperCase().indexOf(filter) > -1 || txtCode.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      console.log('lol')
    } else {
      li[i].style.display = "none";
      console.log('lola')
    }
  }
};
// binding the event for search filter
document.getElementById("searchInput").addEventListener("keyup", filterCountry);

// reset country filter in the list
let resetFilter = () => {
  // Declare variables
  let ul, li, i;

  // reset search input
  document.getElementById('searchInput').value = "";
  ul = document.getElementById("countryUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    li[i].style.display = "";
  }
};
