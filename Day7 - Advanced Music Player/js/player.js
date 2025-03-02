// Load Music

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

window.addEventListener("load", () => { //когда окно загружено  
  loadMusic(musicIndex); //загружаем песню
})

function loadMusic(indexNumber){ //функция для загрузки песни
  songTitle.innerText = allMusic[indexNumber - 1].songTitle; //выводим наименование песни
  songAuthor.innerText = allMusic[indexNumber - 1].songAuthor; //выводим исполнителя песни
  coverImg.src = `img/albumCovers/${allMusic[indexNumber - 1].mainCover}.jpg`; //выводим обложку песни
  mainAudio.src = `media/${allMusic[indexNumber - 1].src}.mp3` //выводим песню
}

function playMusic() {
  coverImg.classList.add('rotate');  
  playPauseBtn.classList.add("pauseSong");
  playPauseBtn.innerHTML = '<img src="img/icons/pauseIcon.svg" alt="play song">';
  mainAudio.play();
}

function pauseMusic() {
  playPauseBtn.classList.add("playSong");
  playPauseBtn.classList.remove('pauseSong');
  coverImg.classList.remove('rotate');
  playPauseBtn.innerHTML = '<img src="img/icons/playIcon.svg" alt="pause song">';
  mainAudio.pause();
}

function prevSong() { //функция для предыдущей песни  
  musicIndex--; //уменьшаем индекс на 1
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex; //если индекс меньше 1, то индекс равен длине массива
  loadMusic(musicIndex); //загружаем песню
  playMusic(); //запускаем песню
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

prevBtn.addEventListener("click", () => { //когда нажимаем на кнопку предыдущей песни
  prevSong();
})

nextBtn.addEventListener("click", () => { //когда нажимаем на кнопку следующей песни
  nextSong();
})

// mainAudio.addEventListener("timeupdate", (e) => { //когда аудио обновляется
//   const currentTime = e.target.currentTime; // текущее время
//   const duration = e.target.duration; //длительность песни
//   let progressWidth = (currentTime/duration)*100; //ширина прогрессбара
//   progressBar.computedStyleMap.width = `${progressWidth}%`; //присваиваем ширину прогрессбару

//   let musicCurrentTime = playerWrapper.querySelector(".currentTime"); //переменная для текущего времени
//   let musicDuration = playerWrapper.querySelector(".maxDuration"); //переменная для длительности песни

//   mainAudio.addEventListener("loadedData", () => { //когда аудио загружено
//     let mainAudioDUration = mainAudio.duration; //длительность песни
//     let totalMin = Math.floor(mainAudioDUration / 60); //минуты
//     let totalSec = Math.floor(mainAudioDUration % 60);//  секунды
//     if(totalSec < 10) { //если секунды меньше 10
//       totalSec = `0${totalSec}`; // добавляем 0
//     }
//     musicDuration.innerText = `${totalMin}:${totalSec}`; // выводим длительность песни
//   })
// })