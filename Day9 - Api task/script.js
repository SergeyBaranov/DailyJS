

//загружаем данные с сервера и проверяем на наличие ошибок
const fetchPosts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      alert("Ошибка запроса: Что-то пошло не так", error);
    }
    return await response.json();
  } catch (error) {
    showOutput(`❌ Ошибка: ${error.message}`);
    return [];
  }
};

//выводим полученные данные в output
const outputData = document.getElementById('output');
const showOutput = (resultHTML) => {
  outputData.innerHTML = resultHTML;
};

const formatPosts = (posts) => {
  return posts.map((post) => {
    const { id, title, body } = post;
    return `<b>${id}</b>: <strong>${title}</strong><br>${body}<br><br>`;
  }).join('');
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