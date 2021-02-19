const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const moment = require('moment');
class searchPlaylist {
    async searchPlaylist(playlistURL, result) {
        if (!dotenv.parsed.YT_API_KEY) {
            // Check for API Key
            throw new Error('Youtube API Key not found. Enter your API key into a .env file such as: YT_API_KEY=MYAPIKEY');
        }
        if (!playlistURL) {
            // Check for playlistURL argument
            throw new Error('A playlist URL is needed.');
        }
        if (!/list=/.test(playlistURL)) {
            // Check if the list is defined
            throw new Error('Invalid playlist URL.');
        }
        let playlistID = playlistURL.split('list=')[1]; // Get playlist ID

        // Search for playlist
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${dotenv.parsed.YT_API_KEY}&part=snippet&playlistId=${playlistID}&maxResults=50`, {method: 'GET'})
        .then(res => res.json())
        .then(json => {
            if (!json) {
                throw new Error('JSON not recieved');
            }
            if (json.error && json.error.message == 'API key not valid. Please pass a valid API key.') {
                throw new Error('API key is invalid.');
            }
            let videoIDs = [];
            // Push video ID's into array
            Object.values(json.items).forEach(video => {
                videoIDs.push(video.snippet.resourceId.videoId);
            });
            fetch(`https://www.googleapis.com/youtube/v3/videos?key=${dotenv.parsed.YT_API_KEY}&id=${videoIDs.toString()}&part=contentDetails`, {method: 'GET'})
            .then(res => res.json())
            .then(videoJSON => {
                if (!videoJSON) {
                    throw new Error('JSON not recieved');
                }
                if (json.error && json.error.message == 'API key not valid. Please pass a valid API key.') {
                    throw new Error('API key is invalid.');
                }
                var videos = [];
                // Loop through results
                for (let i = 0; i < json.items.length; i++) {
                    let video = json.items[i].snippet;
                    let videoObject = {
                        channelName: video.channelTitle,
                        title: video.title,
                        thumbnails: video.thumbnails,
                        duration: moment.duration(Object.values(videoJSON.items)[i].contentDetails.duration, moment.ISO_8601).asSeconds(),
                        url: `https://youtube.com/watch?v=${video.resourceId.videoId}`
                    }
                    videos.push(videoObject);
                }
                return result(videos);
            });
        });
    }
}

module.exports = new searchPlaylist;