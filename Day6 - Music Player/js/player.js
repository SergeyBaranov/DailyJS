let progress = document.getElementById('myRange'); // добавляем переменную, которая отвечает за прогресс бар
let song = document.getElementById('song'); // добавляем переменную, которая отвечает за аудио
let controlsIcon = document.getElementById('controlsIcon'); // добавляем переменную, за кнопку play/pause

song.onloadedmetadata = function() { // добавляем событие, которое отвечает за обновление длительности аудио
    progress.max = song.duration; // обновляем максимальное значение прогресс бара
    progress.value = song.currentTime; // обновляем текущее значение прогресс бара
}


function playPause() { // создаем функцию playPause
  if(controlsIcon.classList.contains('fa-play')) { // если у кнопки есть класс fa-play
    controlsIcon.classList.remove('fa-play'); // удаляем класс fa-play
    controlsIcon.classList.add('fa-pause'); // добавляем класс fa-pause
    song.play(); // запускаем аудио
  } else { // иначе
    controlsIcon.classList.remove('fa-pause'); // удаляем класс fa-pause
    controlsIcon.classList.add('fa-play'); // добавляем класс fa-play
    song.pause(); // останавливаем аудио
  }
}

if(song.play()) { // если аудио запущено
  setInterval(() => { // создаем интервал
    progress.value = song.currentTime; // обновляем текущее значение прогресс бара
  }, 500); // каждые 500 миллисекунд
} else { // иначе
  progress.value = 0; // текущее значение прогресс бара равно 0
}

progress.onchange = function() { // добавляем событие, которое отвечает за изменение прогресс бара
  song.play(); // запускаем аудио
  song.currentTime = progress.value; // обновляем текущее значение аудио
  controlsIcon.classList.remove('fa-play'); // удаляем класс fa-play
    controlsIcon.classList.add('fa-pause'); // добавляем класс fa-pause
}