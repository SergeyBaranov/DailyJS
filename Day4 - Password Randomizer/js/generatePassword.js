// добавляем переменную для идентификации поля, где будет генерироваться пароль
const passwordBox = document.getElementById("password");

// добавляем переменную для длины пароля с заданым значением
const lengthPassword = 12;

//добавляем допустимые символы в теле пароля
const upperCaseLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetter = "abcdefghijklmnopqrstuvwxyz";
const numberLetter = "0123456789";
const specialSymbols = "~!@#$%^&*()_-+={[}]|:;'<,>.?/";

//добавляем переменную, которая соединяет все предыдущие

const allLetters = upperCaseLetter + lowerCaseLetter + numberLetter + specialSymbols;

//добавляем функцию которая будет генерировать пароль

function generatePassword(){
  let passwordDone = ""; // создаем пустую переменную
  passwordDone += upperCaseLetter[Math.floor(Math.random() * upperCaseLetter.length)];
  passwordDone += lowerCaseLetter[Math.floor(Math.random() * lowerCaseLetter.length)];
  passwordDone += numberLetter[Math.floor(Math.random() * numberLetter.length)];
  passwordDone += specialSymbols[Math.floor(Math.random() * specialSymbols.length)];

  while(lengthPassword > passwordDone.length) {
    passwordDone += allLetters[Math.floor(Math.random() * allLetters.length)];
  }

  passwordBox.value = passwordDone;
}


//создаем функцию копирования сгенерированного пароля

function copyPassword(){
  passwordBox.select();
  document.execCommand("copy");
}
