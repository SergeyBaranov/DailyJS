// Load Music

const playerWrapper = document.querySelector(".playerWrapper"); // создаем переменную для всего плеера
const coverImg = document.querySelector(".mainCover"); // создаем переменную для работы с обложкой
const songTitle = document.querySelector(".songTitle"); //переменная для работы с наименованием песни 
const songAuthor = document.querySelector(".songAuthor"); //переменная для работы с исполнителем песни
const playPauseBtn = document.querySelector(".playSong"); // переменная для работы со стартом и паузой 
const prevBtn = document.querySelector("#previousSong"); //переменная для предыдущей песни
const nextBtn = document.querySelector("#nextSong"); //переменная для следующей песни
const mainAudio = document.getElementById("mainAudio"); //переменная для контента
const progressBarArea = document.querySelector(".progressBarArea"); //переменная для области прокрутки аудиоконтента
const progressBar = progressBarArea.querySelector(".progressBar");//переменная для прогрессбара

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1); //индекс песни
isMusicPaused = true; //переменная для паузы

window.addEventListener("load", () => { //когда окно загружено  
  loadMusic(musicIndex); //загружаем песню
});

function loadMusic(indexNumber){ //функция для загрузки песни
  songTitle.innerText = allMusic[indexNumber - 1].songTitle; //выводим наименование песни
  songAuthor.innerText = allMusic[indexNumber - 1].songAuthor; //выводим исполнителя песни
  coverImg.src = `img/albumCovers/${allMusic[indexNumber - 1].mainCover}.jpg`; //выводим обложку песни
  mainAudio.src = `media/${allMusic[indexNumber - 1].src}.mp3` //выводим песню
}

function playMusic() {
  coverImg.classList.add('rotate');  
  playPauseBtn.classList.add("pauseSong");
  playPauseBtn.innerHTML = '<img src="img/icons/pauseIcon.svg" alt="pause song">';
  mainAudio.play();
}

function pauseMusic() {
  playPauseBtn.classList.remove("pauseSong");
  coverImg.classList.remove('rotate');
  playPauseBtn.innerHTML = '<img src="img/icons/playIcon.svg" alt="play song">';
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

playPauseBtn.addEventListener("click", () => { //когда нажимаем на кнопку старт/пауза
  const isMusicPlay = playerWrapper.classList.contains("pauseSong"); //проверяем, играет ли музыка
  isMusicPlay ? pauseMusic() : playMusic();//если музыка играет, то пауза, если нет, то играем
});

prevBtn.addEventListener("click", () => { //когда нажимаем на кнопку предыдущей песни
  prevSong();
});

nextBtn.addEventListener("click", () => { //когда нажимаем на кнопку следующей песни
  nextSong();
})

mainAudio.addEventListener("timeupdate", (e) => { //когда аудио обновляется
  const currentTime = e.target.currentTime; // текущее время
  const duration = e.target.duration; //длительность песни
  let progressWidth = (currentTime / duration) * 100; //выясняем ширину прогрессбара в процентах на основе текущего времени и длительности песни
  progressBar.style.width = `${progressWidth}%`; //присваиваем ширину прогрессбару

  let musicCurrentTime = playerWrapper.querySelector(".currentTime"); //переменная для текущего времени
  let musicDuration = playerWrapper.querySelector(".maxDuration"); //переменная для длительности песни

  mainAudio.addEventListener("loadedDate", () => { //добавляем событие, когда аудио загружено
    let mainAudioDuration = mainAudio.duration; //длительность песни
    let totalMin = Math.floor(mainAudioDuration / 60); //минуты
    let totalSec = Math.floor(mainAudioDuration % 60);//  секунды
    if(totalSec < 10) { //если секунды меньше 10
      totalSec = `0${totalSec}`; // добавляем 0
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`; // выводим длительность песни
  });

  let currentMin = Math.floor(currentTime / 60); // считаем текущие минуты
  let currentSec = Math.floor(currentTime % 60); // считаем текущие секунды
  if(currentSec < 10) { //если секунды меньше 10
    currentSec = `0${currentSec}`; // добавляем 0
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`; // выводим текущее время
})

progressBarArea.addEventListener("click", (e) => { //когда кликаем на область прогрессбара
  let progressWidth = progressBarArea.clientWidth; //ширина прогрессбара
  let clickedOffSetX = e.offsetX; // возможность кликнуть на прогрессбаре в люой момент времени
  let songDuration = mainAudio.duration; //длительность песни
  mainAudio.currentTime = (clickedOffSetX / progressWidth) * songDuration; //текущее время которое мы выбрали
  playMusic();
} )

mainAudio.addEventListener("ended", () => { //когда песня закончилась
  nextSong(); //переходим к следующей песне
})  

