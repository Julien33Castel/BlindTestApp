chrome.tabs.onUpdated.addListener(checkSpotifyTab);
chrome.tabs.onActivated.addListener(checkSpotifyTab);

function checkSpotifyTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0].url.includes("spotify.com")) {
      chrome.runtime.sendMessage({ action: "spotify-active" });
    } else {
      chrome.runtime.sendMessage({ action: "spotify-inactive" });
    }
  });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "current-song") {
    chrome.runtime.sendMessage({ action: "update-song", data: message.data });
  }
});
