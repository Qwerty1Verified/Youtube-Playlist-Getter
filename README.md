# YouTube Playlist Getter
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ffbagjug%2FYoutube-Playlist-Getter.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ffbagjug%2FYoutube-Playlist-Getter?ref=badge_shield)


YouTube Playlist Getter is an API wrapper dedicated to getting the videos inside a playlist and returning them in an array.

## Installation


```bash
npm install youtube-playlist-getter
```

## Usage
You will need to create a .env file in your project folder and inside will be your YouTube API Key, get this API key by creating/logging into a google account by going to: [Google Developer Console](https://console.cloud.google.com/apis/), creating a project and opting into the YouTube Data API. In the developer console credentials section you should see an API key, copy that and paste it into your .env file like so: `YT_API_KEY=8UW0Gnh70xHuBZbs3oHEolo7YpZZIZQNF8mc2Ka`
```
const ytlist = require('youtube-playlist-getter');

ytlist.searchPlaylist('https://www.youtube.com/watch?v=l0U7SxXHkPY&list=PLbpi6ZahtOH7eFIp5Cc15AnhiIdkjgmdC', res => {
    console.log(res);
})
```
## Response
```
[
  {
    channelName: 'YouTube',
    title: 'Future - Life Is Good (Official Music Video) ft. Drake',
    thumbnails: {
      default: [Object],
      medium: [Object],
      high: [Object],
      standard: [Object],
      maxres: [Object]
    },
    duration: 336,
    url: 'https://youtube.com/watch?v=l0U7SxXHkPY'
  },
  {
    channelName: 'YouTube',
    title: '6IX9INE- GOOBA (Official Music Video)',
    thumbnails: {
      default: [Object],
      medium: [Object],
      high: [Object],
      standard: [Object]
    },
    duration: 149,
    url: 'https://youtube.com/watch?v=pPw_izFr5PA'
  }
]
...
```
## Note
The YouTube API doesn't return a maxres thumbnail for every video, you will need to account for this if you want to use the thumbnails as you will be told "maxres" is undefined.
## License
[MIT](https://choosealicense.com/licenses/mit/)


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ffbagjug%2FYoutube-Playlist-Getter.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ffbagjug%2FYoutube-Playlist-Getter?ref=badge_large)