export default class Country {
  static get() {
    return fetch('http://ip-api.com/json')
      .then(response => {
        if (response.ok) {
          return response.json().then(json => json)
        }

        throw new Error("Couldn't fetch country")
      })
  }

  static all() {
    return fetch('https://covid19.mathdro.id/api/countries')
      .then(response => {
        if (response.ok) {
          return response.json().then(json => json.countries)
        }

        throw new Error("Couldn't fetch country")
      })
  }
}

