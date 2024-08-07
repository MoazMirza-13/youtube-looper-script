// Extract video ID from YouTube URL
function extractVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|v\/|e(?:mbed|xternal)\/|watch\?v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Convert time in "minutes:seconds" format to seconds
function convertToSeconds(time) {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
}

let player;

// Function called when the YouTube IFrame API is ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: extractVideoId(videoUrl),
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// Function to handle player readiness
function onPlayerReady(event) {
  const startTimeInSeconds = convertToSeconds(startTime);
  const endTimeInSeconds = convertToSeconds(endTime);

  // Use a timeout to ensure the player is ready
  setTimeout(() => {
    player.seekTo(startTimeInSeconds);
    player.playVideo();
  }, 1000); // Adjust delay as needed
}

// Function to handle player state changes
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    checkTime();
  }
}

// Function to check the current time and loop the video
function checkTime() {
  const currentTime = player.getCurrentTime();
  if (currentTime >= convertToSeconds(endTime)) {
    player.seekTo(convertToSeconds(startTime));
  }
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    setTimeout(checkTime, 1000);
  }
}

// Create a div element for the player
const playerDiv = document.createElement("div");
playerDiv.id = "player";
document.body.appendChild(playerDiv);

// Load the YouTube IFrame API
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
