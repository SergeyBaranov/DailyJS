

//загружаем данные с сервера и проверяем на наличие ошибок
const fetchPosts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      alert("Ошибка запроса: Что-то пошло не так", error);
    }
    return await response.json();
  } catch (error) {
    alert("Ошибка запроса: Что-то пошло не так", error);
    return [];
  }
};

//выводим полученные данные в output
const outputData = document.getElementById('output');
const showOutput = (resultHTML) => {
  outputData.innerHTML = resultHTML;
  console.log(outputData);
};


const formatPosts = (posts) => {
  return posts.map((post) => { //перебираем массив полученный из json
    const { userId, id, title, body } = post;
    return `<b>${userId}</b><b>${id}</b>: <strong>${title}</strong><br>${body}<br><br>`;
  }).join(''); //join - объединяем массив в одну строку
};

//добавляем обработчик событий на кнопкуц показать все
const handleShowAll = async () => {
  const posts = await fetchPosts();
  showOutput(formatPosts(posts));
};


document.getElementById('showAll').addEventListener('click', handleShowAll);

//добавляем функцию на кнопку чтобы показать длинные посты
const ShowLongestPosts = async () => {
  showOutput(formatPosts(
    (await fetchPosts())
      .sort((a, b) => b.body.length - a.body.length) // сортируем от большего к меньшему
      .slice(0, 5) // показываем только первые пять
  ));
};
//добавляем обработчки событий на кнопку
document.getElementById('showLongest').addEventListener('click', ShowLongestPosts);

//делаем статистику по  общему количеству постов
//1 - создаем общую переменную которая будет отвечать за статистику
const allPosts = (posts) => {
  const allPostsNumber = posts.length; // все посты
  const averageTitleLength = Math.round(posts.map(a => a.title.length).reduce((a, b) => a + b) / allPostsNumber); // вычисляем среднюю длину заголовка
  const uniqUserID = new Set(posts.map(a => a.userID)).size; // вычисляем количество уникальных пользователей
  const uniqwords = new Set(posts.map(b => b.title) 
    .join(' ') //объединяем в одну строку все слова в заголовках
    .toLowerCase() // приводим к нижнему регистру
    .split(/\W+/) // разбиваем строку на массив значений
    .filter(Boolean) // убираем лишнее
);

console.log(uniqwords);


  //выводим в html
  outputData.innerHTML = `<p>Всего постов: ${allPostsNumber}</p>
  <p>Средняя длина заголовков: ${averageTitleLength}</p>
  <p>Количество уникальных пользователей: ${uniqUserID}</p>
  <p>Уникальные слова: ${[...uniqwords].join(', ')}</p>`;

};

//делаем событие на кнопку для вывода статистики
document.getElementById('showStats').addEventListener('click', async () => {
  const posts = await fetchPosts();
  allPosts(posts);
});