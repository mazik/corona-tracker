import Chart from 'chart.js';
import doughnutlabel from 'chartjs-plugin-doughnutlabel';
import country from './Country';
import corona from './Corona';

let countryCode;
let countryName;
let countryList;
let locationDeaths;
let locationNewDeaths;
let locationConfirmed;
let locationRecovered;
let statChart;


// bootstrap init definition
let init = () => {

    // get your own country info
    country.get()
        .then(region => {

            // set country name and code
            countryName = region.country;
            countryCode = region.countryCode;
        })
        .then(() => {

            // calling to get data of affected specific country by country code
            renderAffectedCountry(countryCode, countryName);
        })
        .then(() => {

            // get latest global information from wordometer source api
            corona.todayGlobalWordometer()
                .then(data => {

                    // render total global deaths
                    const deaths = document.getElementById('global-deaths');
                    deaths.appendChild(document.createTextNode(data.deaths.toLocaleString()));

                    // render total confirmed case
                    const confirmed = document.getElementById('global-confirmed');
                    confirmed.appendChild(document.createTextNode(data.cases.toLocaleString()));

                    // render total recovered case
                    const recovered = document.getElementById('global-recovered');
                    recovered.appendChild(document.createTextNode(data.recovered.toLocaleString()));

                    // render today's date
                    const date = document.getElementById('date');
                    date.appendChild(document.createTextNode(new Date(data.updated).toDateString()));

                })
                .catch(error => alert(error));

        })
        .then(() => {

            // populating all countries in side panel
            country.all()
                .then(countries => {
                    const countryListUL = document.getElementById('countryUL');

                    for (let i in countries) {

                        let li          = document.createElement("LI");             // Create a <li> element
                        li.innerHTML    = countries[i].name;                        // Insert text

                        var attr        = document.createAttribute("class");        // Create a "class" attribute
                        attr.value      = "country border border-solid " +
                                            "border-gray-300 -mt-px " +
                                            "bg-gray-100 p-12px no-underline " +
                                            "text-sm text-gray-700 block " +
                                            "hover:bg-gray-300";                    // Set the value of the class attribute
                        li.setAttributeNode(attr);                                  // append attribute to <li> element

                        var attr        = document.createAttribute("data-code");    // Create a "data-code" attribute
                        attr.value      = countries[i].iso2;                        // Set the value of the data-code attribute
                        li.setAttributeNode(attr);                                  // append attribute to <li> element


                        // binding click event listener for call specific country info
                        li.addEventListener("click", (el) => {

                            // closing side panel before calling
                            document.getElementById("menu").style.display               = 'none';
                            document.getElementById("countryListPanel").style.display   = 'none';

                            let code = el.target.getAttribute('data-code')          // get country code from attribute
                            let name = el.target.innerText                          // get the name of country

                            if (code != "" && name != "") {

                                // showing the loader
                                const loader = document.getElementById('loader');
                                loader.classList.remove('hidden');

                                // call to render info of a specific affected country
                                renderAffectedCountry(code, name);

                            }
                        });

                        // append list <li> item to <ul>
                        countryListUL.appendChild(li);
                    }

                })
                .catch(error => alert(error));

        })
        .catch(error => alert(error))
};

// calling the strap to boot.
init();

// function definition to get specific country
let renderAffectedCountry = (countryCode, countryName) => {

    // get latest global information from wordometer source api
    corona.todayLocationWordometer(countryCode).then(affected => {

        locationDeaths      = affected.deaths;          // no of deaths (upto now)
        locationConfirmed   = affected.cases;           // no of confirmed cases
        locationRecovered   = affected.recovered;       // no of recovered cases
        locationNewDeaths   = affected.todayDeaths;     // no of new deaths today

    })
        .then(() => {

            // render country name
            const location                      = document.getElementById('country');
            location.innerText                  = countryName;

            // render number of deaths
            const currentLocationDeaths         = document.getElementById('location-deaths');
            currentLocationDeaths.innerText     = locationDeaths;

            // const currentLocationNewDeaths      = document.getElementById('location-new-deaths');
            // currentLocationNewDeaths.innerText  =  locationNewDeaths;

            // render number of recovered
            const currentLocationRecovered      = document.getElementById('location-recovered');
            currentLocationRecovered.innerText  = locationRecovered;

            // render number of confirmed cases
            const currentLocationConfirmed      = document.getElementById('location-confirmed');
            currentLocationConfirmed.innerText  = locationConfirmed;

        })
        .then(() => {

            // check chart is already defined
            if (statChart === undefined ) {

                // init chart with value of deaths,cases & recovered number
                const ctx = document.getElementById('chart');
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


            // finally remove the loader to show the output
            const loader = document.getElementById('loader');
            loader.classList.add('hidden');

            // close the sidebar before loader disappear
            slideToggle(false);
        })
        .catch(error => alert(error))
};

// event driven operation handling
let slideToggle = (state) => {

    let countryListPanel = document.getElementById("countryListPanel");
    countryListPanel.style.display = 'block';

    // open slider if closed
    if (countryListPanel.classList.contains('-mr-200px') && state) {

        document.getElementById("cross").style.display  = 'block';
        document.getElementById("menu").style.display   = 'none';

        countryListPanel.classList.remove('-mr-200px');
        countryListPanel.classList.add('mr-0px');

        document.getElementById('searchInput').focus();
    }

    // close slider if already opened.
    else {

        countryListPanel.classList.add('-mr-200px');
        countryListPanel.classList.remove('mr-0px');

        document.getElementById("cross").style.display  = 'none';
        document.getElementById("menu").style.display   = 'block';

        // reset the search input & filter
        resetFilter();
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
        txtValue    = li[i].textContent || li[i].innerText;
        txtCode     = li[i].getAttribute('data-code');
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