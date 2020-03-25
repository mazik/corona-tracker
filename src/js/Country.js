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
}
