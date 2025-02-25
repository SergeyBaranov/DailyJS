// import { allMusic } from "./musicList";

const playerWrapper = document.querySelector(".playerWrapper"); // создаем переменную для всего плеера
const coverImg = playerWrapper.querySelector(".mainCover"); // создаем переменную для работы с обложкой
const songTitle = playerWrapper.querySelector(".songTitle"); //переменная для работы с наименованием песни 
const songAuthor = playerWrapper.querySelector(".songAuthor"); //переменная для работы с исполнителем песни
const playPauseBtn = playerWrapper.querySelector(".playSong"); // переменная для работы со стартом и паузой 
const prevBtn = playerWrapper.querySelector("#previousSong"); //переменная для предыдущей песни
const nextBtn = playerWrapper.querySelector("#nextSong"); //переменная для следующей песни
const mainAudio = document.getElementById("mainAudio"); //переменная для контента
const progressBarArea = playerWrapper.querySelector(".progressBarArea"); //переменная для области прокрутки аудиоконтента
const progressBar = progressBarArea.querySelector(".progressBar");//переменная для прогрессбара

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load" , () => {
  loadMusic(musicIndex)
});

function loadMusic(indexNumber){
  songTitle.innerText = allMusic[indexNumber - 1].songTitle;
  songAuthor.innerText = allMusic[indexNumber - 1].songAuthor;
  coverImg.src = `img/albumCovers/${allMusic[indexNumber - 1].src}.jpg`
  mainAudio.src = `media/${allMusic[indexNumber - 1].src}.mp3`
}


function playMusic() { // создаем функцию playPause
  if(playPauseBtn.classList.contains('playSong')) { 
    coverImg.classList.add('rotate');
    playPauseBtn.classList.remove('playSong');
    playPauseBtn.classList.add('pauseSong');   
    playPauseBtn.innerHTML = '<img src="img/icons/pauseIcon.svg" alt="play song">';
    mainAudio.play(); // запускаем аудио
  } else { // иначе
    playPauseBtn.classList.remove('pauseSong'); 
    coverImg.classList.remove('rotate');
    playPauseBtn.classList.add('playSong');
    playPauseBtn.innerHTML = '<img src="img/icons/playIcon.svg" alt="play song">';
    mainAudio.pause(); // останавливаем аудио
  }
}

// function playMusic() {
//   coverImg.classList.add('rotate');  
//   playPauseBtn.classList.add("pauseSong");
//   playPauseBtn.innerHTML = '<img src="img/icons/pauseIcon.svg" alt="play song">';
//   mainAudio.play();
// }

// function pauseMusic() {
//   playPauseBtn.classList.add("playSong");
//   playPauseBtn.classList.remove('pauseSong');
//   coverImg.classList.remove('rotate');
//   playPauseBtn.innerHTML = '<img src="img/icons/playIcon.svg" alt="pause song">';
//   mainAudio.pause();
// }

function prevSong() {
  musicIndex--;
  musicIndex = musicIndex < 1 ? allMusic.length : musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

function nextSong() {
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = playerWrapper.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
}
 )

prevBtn.addEventListener("click", () => {
  prevSong();
})

nextBtn.addEventListener("click", () => {
  nextSong();
})

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime/duration)*100;
  progressBar.computedStyleMap.width = `${progressWidth}%`;

  let musicCurrentTime = playerWrapper.querySelector(".currentTime"); // Assuming formatTime is a function to format the time
  let musicDuration = playerWrapper.querySelector(".maxDuration");

  mainAudio.addEventListener("loadedData", () => {
    let mainAudioDUration = mainAudio.duration;
    let totalMin = Math.floor(mainAudioDUration / 60);
    let totalSec = Math.floor(mainAudioDUration % 60);
    if(totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  })
})