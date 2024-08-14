document.getElementById('submit-button').addEventListener('click', function() {
    let artistName = document.getElementById('artist-name').value;
    alert('Vous avez soumis: ' + artistName);
  });
  
  chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "spotify-active") {
      document.getElementById('message').style.display = 'none';
      document.getElementById('artist-name').disabled = false;
      document.getElementById('submit-button').disabled = false;
    } else if (message.action === "spotify-inactive") {
      document.getElementById('message').style.display = 'block';
      document.getElementById('artist-name').disabled = true;
      document.getElementById('submit-button').disabled = true;
    } else if (message.action === "update-song") {
      const songInfo = message.data;
      document.getElementById('current-song').textContent = `Lecture en cours : ${songInfo.song} - ${songInfo.artist}`;
    }
  });
  
  // Vérifiez l'état initial lorsque la popup est ouverte
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0].url.includes("spotify.com")) {
      document.getElementById('message').style.display = 'none';
      document.getElementById('artist-name').disabled = false;
      document.getElementById('submit-button').disabled = false;
    } else {
      document.getElementById('message').style.display = 'block';
      document.getElementById('artist-name').disabled = true;
      document.getElementById('submit-button').disabled = true;
    }
  });
  