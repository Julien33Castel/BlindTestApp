from flask import Flask, request, jsonify, render_template
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

app = Flask(__name__)

# Configure Spotipy with your Spotify API credentials
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='YOUR_SPOTIFY_CLIENT_ID', client_secret='YOUR_SPOTIFY_CLIENT_SECRET'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/playlist', methods=['POST'])
def get_playlist():
    playlist_url = request.form['playlist_url']
    playlist_id = playlist_url.split('/')[-1]
    playlist = sp.playlist(playlist_id)
    tracks = [{'name': track['track']['name'], 'artist': track['track']['artists'][0]['name']} for track in playlist['tracks']['items']]
    return jsonify(tracks)

if __name__ == '__main__':
    app.run(debug=True)
