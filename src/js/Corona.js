export default class Corona {
  static global() {
    return fetch('https://covid19.mathdro.id/api/daily')
    .then(response => {
      if (response.ok) {
        return response.json().then(json => json.pop())
      }

      throw new Error("Couldn't get daily global updates")
    })
  }

  static location(countryCode) {
    return fetch(`https://covid19.mathdro.id/api/countries/${countryCode.toLowerCase()}`)
    .then(response => {
      if (response.ok) {
        return response.json().then(json => json)
      }

      throw new Error("Couldn't get the CORONAVIRUS information from your location");
    })
  }


  // fetching from different source to get latest update
  static todayGlobalWordometer() {
    return fetch('https://corona.lmao.ninja/all')
    .then(response => {
      if (response.ok) {
        return response.json().then(json => json)
      }

      throw new Error("Couldn't get global updates upto today")
    })
  }

}

