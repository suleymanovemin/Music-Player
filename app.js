const playButton = document.querySelector(".playButton");
const pauseButton = document.querySelector(".pauseButton");
const playDiv = document.querySelector(".playDiv");
const musicName = document.querySelector(".musicName");
const musician = document.querySelector(".musician");
const playerDisk = document.querySelector(".playerDisk");
const presentTime = document.querySelector(".presentTime");
const endTime = document.querySelector(".endTime");
const musicRange = document.querySelector(".musicRange input");
const prevButton = document.querySelector(".prevButton");
const nextButton = document.querySelector(".nextButton");
const body = document.querySelector("#body");
const muteSound = document.querySelector(".fa-volume-xmark");
const maxSound = document.querySelector(".fa-volume-high");
const soundRange = document.querySelector("#soundRange");
const playerDiv = document.querySelector(".playerDiv");
const musicList = document.querySelector("#musicList");
const burger = document.querySelector(".list");
const aside = document.querySelector(".demo");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let track_list = [
  {
    name: "Gimme! Gimme! Gimme!",
    artist: "ABBA",
    image:
      "https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    path: "./music/abba.mp3",
    id: 0,
  },
  {
    name: "Brother Louie",
    artist: "Modern Talking",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    path: "./music/modernTalking.mp3",
    id: 1,
  },
  {
    name: "You're My Heart, You're My Soul",
    artist: "Modern Talking",
    image:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    path: "./music/modernTalking2.mp3",
    id: 2,
  },
  {
    name: "Ölürüm Hasretinle",
    artist: "Seksendört",
    image:
      "https://images.unsplash.com/photo-1677154522901-1e33953ffdca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    path: "./music/s.mp3",
    id: 3,
  },
];

let audio = new Audio(track_list[track_index].path);
window.addEventListener("load", () => {
  loadTrack(track_index);
});

const loadTrack = (track_index) => {
  clearInterval(updateTimer);

  audio.src = track_list[track_index].path;
  audio.load();
  musicName.textContent = track_list[track_index].name;
  musician.textContent = track_list[track_index].artist;
  playerDisk.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  audio.src = track_list[track_index].path;
  audio.addEventListener("loadedmetadata", () => {
    const durationInMinutes = Math.floor(audio.duration / 60); // dakika
    const durationInSeconds = Math.floor(
      audio.duration - durationInMinutes * 60
    ); // saniye
    const durationString =
      durationInMinutes.toString().padStart(2, "0") +
      ":" +
      durationInSeconds.toString().padStart(2, "0"); // dakika:saniye formatında süre
    endTime.textContent = durationString;
  });
  randomBackground();
};

audio.addEventListener("input", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  musicRange.value = (currentTime / duration) * 100;
});
audio.addEventListener("ended", () => {
  track_index++;
  loadTrack(track_index);
  playTrack()
});
musicRange.addEventListener("input",()=>{
  let newTime = audio.duration * (musicRange.value / 100);
  audio.currentTime = newTime
})

setInterval(() => {
  const currentMin = Math.floor(audio.currentTime / 60);
  const currentSec = Math.floor(audio.currentTime % 60);
  const currentTime =
    currentMin + ":" + (currentSec < 10 ? "0" : "") + currentSec.toFixed(0);
  presentTime.textContent = currentTime;
}, 1000);

setInterval(() => {
  musicRange.value = audio.currentTime;
}, 1000);

let rotationDeg = 0;

function rotateDisk() {
  if (isPlaying) {
    rotationDeg += 5;
    playerDisk.style.transform = `rotate(${rotationDeg}deg)`;
    setTimeout(rotateDisk, 100);
  }
}

const playTrack = () => {
  audio.play();
  isPlaying = true;
  playButton.style.display = "none";
  pauseButton.style.display = "block";
  rotateDisk();
};

const pauseTrack = () => {
  audio.pause();
  isPlaying = false;
  playButton.style.display = "block";
  pauseButton.style.display = "none";
};

const nextTrack = () => {
  track_index++;
  if (track_index > track_list.length - 1) {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
  musicRange.value = 0;
};
const prevTrack = () => {
  track_index--;
  if (track_index < 0) {
    track_index = track_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
};

muteSound.addEventListener("click", () => {
  audio.volume = 0;
  soundRange.value = 0;
});

maxSound.addEventListener("click", () => {
  audio.volume = 1;
  soundRange.value = 100;
});

soundRange.addEventListener("input", () => {
  audio.volume = (soundRange.value / 60).toFixed(1);
});

const randomBackground = () => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "aqua",
    "rebeccapurple",
    "BlueViolet",
    "Brown",
    "Chocolate",
    "CadetBlue",
    "Crimson",
    "DarkCyan",
    "DarkGoldenRod",
  ];

function generateRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  const color1 = generateRandomColor();
  const color2 = generateRandomColor();
  const direction = Math.floor(Math.random() * 360);
  body.style.background = `linear-gradient(${direction}deg, ${color1}, ${color2})`;
};

track_list.map((a, b) => {
  let musicName = document.createElement("li");
  let musicArtist = document.createElement("p");
  musicArtist.textContent = track_list[b].artist;
  musicName.textContent = track_list[b].name;
  musicName.setAttribute("id", track_list[b].id);
  musicName.append(musicArtist);
  musicList.append(musicName);

  musicName.addEventListener("click", () => {
    track_index = musicName.id;
    loadTrack(track_index);
    playTrack();
  });
});

burger.addEventListener("click", () => {
  aside.classList.toggle("active");
});

// musicList.addEventListener("click",(e)=>{
//   if(e.target.tagName == "LI"){

//   }
// }
// );
