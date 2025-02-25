// import { allMusic } from "./musicList";

const playerWrapper = document.querySelector(".playerWrapper"); // создаем переменную для всего плеера
const coverImg = document.querySelector("coverImg"); // создаем переменную для работы с обложкой
const songTitle = document.querySelector(".songTitle"); //переменная для работы с наименованием песни 
const songAuthor = document.querySelector(".songAuthor"); //переменная для работы с исполнителем песни
const playPauseBtn = document.querySelector(".playSong"); // переменная для работы со стартом и паузой 
const prevBtn = document.querySelector(".previousSong"); //переменная для предыдущей песни
const nextBtn = document.querySelector(".nextSong"); //переменная для следующей песни
const mainAudio = document.querySelector("#mainAudio"); //переменная для контента
const progressBarArea = document.querySelector(".progressBarArea"); //переменная для области прокрутки аудиоконтента
const progressBar = document.querySelector(".progressBar");//переменная для прогрессбара

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

function playMusic() {
  playerWrapper.classList.add("paused");
  coverImg.classList.add('rotate');
  playPauseBtn.innerHTML = `<img src="img/icons/playIcon.svg" alt="play song">`;
  mainAudio.play();
}

function pauseMusic() {
  playerWrapper.classList.remove("paused");
  coverImg.classList.remove('rotate');
  playPauseBtn.innerHTML = `<img src="img/icons/pauseIcon.svg" alt="pause song">`;
  mainAudio.pause();
}

function prevSong() {
  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  pauseMusic();
}

function nextSong() {
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  pauseMusic();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = playerWrapper.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
}
 )