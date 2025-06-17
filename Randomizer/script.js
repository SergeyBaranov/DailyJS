const apiKey = '4b915153cc4942e5bf4b3afe21791205'; 
   async function fetchData(url, quantity = 1) {
      const separator = url.includes('?') ? '&' : '?';
      const fullUrl = `${url}${quantity ? `${separator}quantity=${quantity}` : ''}`;

      const response = await fetch(fullUrl, {
    headers: {
      'X-Api-Key': apiKey
    }
      });
      return response.json();
    } 

    async function generateContent() {
      const count = Math.min(20, Math.max(1, parseInt(document.getElementById('count').value)));
      const userName = document.getElementById('name').checked;
      const userJob = document.getElementById('job').checked;
      const userAddress = document.getElementById('address').checked;
      const userEmail = document.getElementById('email').checked;

      const resultsToView = document.getElementById('results');
      const tableHeader = document.getElementById('tableHeader');
      resultsToView.innerHTML = '';
      tableHeader.innerHTML = '';

      if (!userName && !userJob && !userAddress && !userEmail) {
        resultsToView.innerHTML = '<div class="warning">Выберите из списка для генерации контента</div>';
        return;
      }
      

      let nameData = [], jobData = [], addressData = [], emailData = [];

      if (userName) tableHeader.innerHTML += '<div><b>Имя</b></div>';
      if (userJob) tableHeader.innerHTML += '<div><b>Работа</b></div>';
      if (userAddress) tableHeader.innerHTML += '<div><b>Адрес</b></div>';
      if (userEmail) tableHeader.innerHTML += '<div><b>Email</b></div>';

      resultsToView.innerHTML = '<div>Загрузка...</div>';

      try {
        const promises = [];

        if (userName) promises.push(fetchData('https://api.randommer.io/api/Name?nameType=firstname&quantity=' + count));
        if (userJob) promises.push(fetchData('https://api.randommer.io/api/BusinessName&cultureCode=en_US&quantity=' + count));
        if (userAddress) promises.push(fetchData('https://api.randommer.io/api/Address' + count));
        if (userEmail) promises.push(fetchData('https://api.randommer.io/api/Email'+ count));

        const results = await Promise.all(promises);

        let idx = 0;
        if (userName) nameData = results[idx++];
        if (userJob) jobData = results[idx++];
        if (userAddress) addressData = results[idx++];
        if (userEmail) emailData = results[idx++];

        resultsToView.innerHTML = '';

        for (let i = 0; i < count; i++) {
          let row = '<tr>';

          if (userName) {
            const [first, ...lastParts] = (nameData[i] || '').split(' ');
            const last = lastParts.join(' ');
            row += `<td>${first}</td><td>${last}</td>`;
          }

          if (userJob) row += `<td>${jobData[i] || '—'}</td>`;
          if (userAddress) row += `<td>${addressData[i] || '—'}</td>`;
          if (userEmail) row += `<td>${emailData[i] || '—'}</td>`;

          row += '</tr>';
          resultsToView.innerHTML += row;
        }
      } catch (err) {
        resultsToView.innerHTML = `<div>Ошибка: ${err.message}</div>`;
      }
    }