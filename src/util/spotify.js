import config from './config';

const spotifyURI = 'https://accounts.spotify.com/authorize';
const spotifyAPI = 'https://api.spotify.com/v1/'

const clientID = config.clientID;
const redirectURI = 'http://localhost:3000/'

let accessToken;

const Spotify = {
    getAccessToken () {
        if (accessToken){
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    
        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const authorizeURI = `${spotifyURI}?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

            window.location = authorizeURI;
        }
    },

    search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        const uriToFetch = `${spotifyAPI}search?type=track&q=${searchTerm}`;

        return fetch(uriToFetch, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => { return response.json()
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(playlistName, trackURIs) {
        if(!playlistName || trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch(`${spotifyAPI}me`, {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`${spotifyAPI}users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
        }).then(response => response.json()
    ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`${spotifyAPI}users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackURIs})
            });
        });
    });
    }
};

export default Spotify;