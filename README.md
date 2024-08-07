### YouTube Looper

A simple tool that loops a specified section of a YouTube video.

## How to use

**Update `config.js`**

In the `config.js` file, you need to specify the YouTube video URL and the start and end times for the loop. The file should look like this:

```javascript
const videoUrl =
  "https://www.youtube.com/watch?v=_38sG8ANXKw&ab_channel=TheOtherSide";
const startTime = "1:40";
const endTime = "2:29";
```

## Features

• Allows users to specify a start and end time for looping a video section.

• Automatically seeks to the start time and loops the video when it reaches the end time.

## Note

This tool will only work for those YouTube videos that allow embedding. Videos with embedding disabled can only be viewed directly on YouTube (youtube.com).
