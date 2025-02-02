const apiKey = "e1c6c8f5f82c37ad3d8841177063612b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lang=ru,en&units=metric&q=";

  const searchBox = document.querySelector(".citySearch input");
  const searchBtn = document.querySelector(".citySearch button");
  const weatherIcon = document.querySelector(".weatherIcon");

  async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
      document.querySelector(".cityError").style.display = "block";
      document.querySelector(".weartherBox").style.display = "none";
    }
    else {
      var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clouds") {
      weatherIcon.src = "img/cloudy.png";
    }
    else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "img/clear.png";
    }
    else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "img/rainy.png";
    }
    else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "img/clear.png";
    }

    document.querySelector(".weatherBox").style.display = "block";
    document.querySelector(".cityError").style.display = "none";
    }
    
  }

  searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
  })

  checkWeather();