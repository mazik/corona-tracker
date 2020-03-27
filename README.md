<p align="center">
  <img src="/src/icon/icon.png" width="128" title="Corona Tracker" alt="Corona Tracker">
</p>

<h1 align="center">Corona Tracker</h1>
<p align="center">A Google Chrome extension for tracking COVIDVIRUS - COVID-19 update</p>

## Introduction
Corona Tracker is developed by using the [COVID-19 API](https://github.com/mathdroid/covid-19-api) to see the latest update about the CORONAVIRUS - COVID-19. It was previously designed for OS level [CORONA: COVID-19](https://github.com/mazik/corona/) using Electron but there was some OS specific issue and code signing hasn't been done.

So, Corona Tracker was introduced as a Google Chrome extension so there's no more OS specific issue and can be run any operating system as long as you're running Google Chrome.

## Interface
The interafce is developed by using the [Tailwind CSS](https://tailwindcss.com) to make it light and simple.
<p align="center">
  <img src="Corona-Tracker.png" width="350" title="Corona Tracker" alt="Corona Tracker Chrome Extension">
</p>

## Features
I have always wanted to make a Google Chrome extension for learning purpose. So, I did it this time when I am in the home quarantine due to the CORONAVIRUS - COVID-19.

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
  - From Google [Chrome Webstore](https://chrome.google.com/webstore/)
    - Go to the [CORONAVIRUS - COVID-19 Chrome Webstore page](https://chrome.google.com/webstore/detail/coronavirus-covid-19/ikijbjphceaapcgigpdejijgphdcnide/?fbclid=IwAR23UjDqwo7kFBprDoKJyg4RkRyCCg2kGR0_lUoRX7bifKTcQnJnhxRfex0) and install it from Google Chrome.

  - Manual Installation
    - Clone the repository
    - Run `yarn install` to install all the dependencies
    - Run `yarn production` that will create a `dist` directory inside the project
    - Go to Chrome Extensions from your browser settings
    - Enable Developer mode from the top right corner of the Extensions page
    - Use Load unpacked option to select the generated `dist` directory

## Note
  There's a difference between the code in the `master` branch and `webstore` branch. When the `master` branch was submitted to Google Chrome webstore, it was pending for a review and it was quite a long time. This is because of the `broadHost` permission on the `content.js` that requires to switch extesion icon between the browser light and dark mode.

  Since the review process was taking so long, I decided to remove the relevant feature that also removed the `broadHost` permission. This is how the extension is now live on Google Chrome webstore. If everything goes fine, I might add the relevant feature again in a future update.

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
