
        // Добавляем счетчик нажатия кнопки
        let clickCount = 0;

        // Функция для получения домена из email
        function getDomainFromEmail(email) {
            const getAt = email.indexOf('@');
            if (getAt === -1) return email;
            return email.slice(getAt + 1);
        }

        // Функция для вывода результата
        function showResult(data, error) {
          const outputDiv = document.getElementById('output');
          const counterResult = document.getElementById('counterResult');
          
          if (error) {
            alert("Ошибка запроса: Что-то пошло не так", error);
          }

          let resultText = '<p>Обработанные данные:</p>';
          
          // Перебираем все имена и домены
          for (const name in data) {
              resultText += `${name}: ${data[name]}<br>`;
          }

          outputDiv.innerHTML = resultText;

          // Увеличиваем счетчик и добавляем его в вывод рядом с кнопкой
          clickCount++;
          counterResult.innerHTML = `<p>Количество нажатий: ${clickCount}</p>`;
        }

        // Основная функция для получения и обработки данных
        async function getUserData() {
            try {
                // Получаем данные с сервера
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                
                if (!response.ok) {
                  alert("Ошибка запроса: Что-то пошло не так", error);
                }
                
                const users = await response.json();
                
                // Создаем объект для результата
                const result = {};
                
                // Обрабатываем каждого пользователя
                users.forEach(user => {
                    if (user.name && user.email) {
                        result[user.name] = getDomainFromEmail(user.email);
                    }
                });
                
                // Показываем результат
                showResult(result);
            } catch (error) {
              alert("Ошибка запроса: Что-то пошло не так", error);
            }
        }

        // Назначаем обработчик клика на кнопку
        document.getElementById('processButton').addEventListener('click', getUserData);
    