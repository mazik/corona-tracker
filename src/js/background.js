chrome.runtime.onMessage.addListener(function (request) {
  if (request.scheme === "dark") {
    chrome.browserAction.setIcon({
      path: {
        "16": "../icon/corona-white@16.png",
        "32": "../icon/corona-white@32.png",
        "48": "../icon/corona-white@48.png",
        "128": "../icon/corona-white@128.png",
      }
    })
  }
})
