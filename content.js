function getCurrentSong() {
    const songInfo = document.querySelector('.now-playing-bar__left .track-info__name a');
    const artistInfo = document.querySelector('.now-playing-bar__left .track-info__artists a');
    
    if (songInfo && artistInfo) {
      return {
        song: songInfo.textContent,
        artist: artistInfo.textContent
      };
    } else {
      return null;
    }
  }
  
  function sendSongInfo() {
    const songData = getCurrentSong();
    if (songData) {
      chrome.runtime.sendMessage({ action: "current-song", data: songData });
    }
  }
  
  setInterval(sendSongInfo, 5000); // Envoie des infos de la chanson toutes les 5 secondes
  