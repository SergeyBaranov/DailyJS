// Создаем счетчик клика кнопки
let createCounter = () => {
    let count = 0;
    return () => ++count;
};
//добавляем переменную для счетчика кликов по кнопке
let buttonClickCounter = createCounter();

// Функция для извлечения домена от email
let extractDomain = (...emails) => {
    return emails.map(email => {
        if (typeof email !== 'string') return 'проблема с доменом';
        let typeIndex = email.indexOf('@');
        return typeIndex !== -1 ? email.slice(typeIndex + 1) : email;
    });
};

// Функция для отображения результатов
let displayResult = (data, error = null) => {
  let outputVisible = document.getElementById('output');
  outputVisible.innerHTML = '';
  
  if (error) {
    outputVisible.innerHTML = `<p class="error">Ошибка: ${error}</p>`;
      return;
  }

  let resultHTML = '<p>Обработанные данные:</p>';
  
  for (const [name, domain] of Object.entries(data)) {
      resultHTML += `${name}: ${domain}<br>`;
  }

  let count = buttonClickCounter();
  resultHTML += `<p>Кнопка была нажата ${count} раз(а).</p>`;
  
  outputVisible.innerHTML = resultHTML;
};

// Основная асинхронная функция для обработки данных пользователей
const processUserData = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          alert("Ошибка запроса: Что-то пошло не так", error);
        }
        
        const users = await response.json();
        
        if (!Array.isArray(users)) {
          alert("Ошибка запроса: Что-то пошло не так", error);  
        }

        // Обрабатываем данные: создаем объект с именами и доменами
        const processedData = users.reduce((el, user) => {
            if (user.name && user.email) {
                const domain = extractDomain(user.email)[0];
                el[user.name] = domain;
            }
            return el;
        }, {});

        if (Object.keys(processedData).length === 0) {
            throw new Error('Не удалось обработать данные пользователей');
        }

        displayResult(processedData);
    } catch (error) {
        displayResult(null, error.message);
    }
};

// Добавляем обработчик события на кнопку
document.getElementById('processButton').addEventListener('click', processUserData);
