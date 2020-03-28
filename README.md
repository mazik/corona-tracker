<p align="center">
  <img src="/src/icons/border-96.png" title="Corona Tracker" alt="Corona Tracker">
</p>

<h1 align="center">Corona Tracker</h1>
<p align="center">A Mozilla Firefox extension for tracking COVIDVIRUS - COVID-19 update</p>

## Introduction
Corona Tracker is developed by using the [COVID-19 API](https://github.com/mathdroid/covid-19-api) to see the latest update about the CORONAVIRUS - COVID-19. It was previously designed for OS level [CORONA: COVID-19](https://github.com/mazik/corona/) using Electron but there was some OS specific issue and code signing hasn't been done.

So, Corona Tracker was introduced as a Google Chrome extension so there's no more OS specific issue and can be run any operating system as long as you're running Google Chrome.

Last but not least, the extension is now available for Mozilla Firefox :)

## Interface
The interafce is developed by using the [Tailwind CSS](https://tailwindcss.com) to make it light and simple.
<p align="center">
  <img src="Corona-Tracker.png" width="350" title="Corona Tracker" alt="Corona Tracker Chrome Extension">
</p>

## Features
I have always wanted to make a Mozilla Firefox extension for learning purpose. So, I did it this time when I am in the home quarantine due to the CORONAVIRUS - COVID-19.

 - Total deaths
 - Total reported case
 - Total confirmed case
 - Sum of total reported case
 - Latest global deaths
 - Latest global confirmed case
 - Latest global recovered case
 - Automatic current country detection
 - Refresh data automatically to get the most recent update

 ## Installation
  - Firefox Addons marketplace
    CORONAVIRUS - COVID-19 extension is currently available in the [Firefox browser add-ons marketplace](https://addons.mozilla.org/en-US/firefox/addon/coronavirus-covid-19/). You can simple install it from the relevant extension page.

  - Manual installation
    - Clone the repository `git clone git@github.com:mazik/corona-tracker.git`
    - Run `yarn install` to install all the dependencies
    - Run `yarn production` for the production and minified build
    - Run `yarn build:firefox` that will create a `web-ext-artifacts` directory inside the project and the zip file of the extension build.
    - Go to `about:debugging` from your Firefox address bar
    - Go to the `This Firefox` menu from the left navigation on the debugging page
    - Use the `Load Temporary Add-on` button to select the generated `web-ext-artifacts/coronavirus_-_covid-19-11.0.zip` file

## Project setup
```shell
yarn install
```

### Compiles and hot-reloads for development
```shell
yarn hot
```

### Compiles and minifies for production
```shell
yarn production
```

### Run your unit tests
```shell
yarn test
```

### Run test and hot-reloads for development
```shell
yarn tdd
```

### Build for Mozilla Firefox
```shell
yarn build:firefox
```