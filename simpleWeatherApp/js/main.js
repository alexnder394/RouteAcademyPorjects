// Fetch API Data
async function getWeatherData(cityName) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ba69d793a2a345df83d221831230809&q=${cityName}&days=6`
  );
  return await response.json();
}

// Get DOM Elements
function getDOMElements() {
  return {
    today: {
      name: document.getElementById("today_date_day_name"),
      number: document.getElementById("today_date_day_number"),
      month: document.getElementById("today_date_month"),
      location: document.getElementById("today_location"),
      temp: document.getElementById("today_temp"),
      conditionImg: document.getElementById("today_condition_img"),
      conditionText: document.getElementById("today_condition_text"),
      humidity: document.getElementById("humidity"),
      wind: document.getElementById("wind"),
      windDirection: document.getElementById("wind_direction"),
    },
    nextDays: {
      day: document.getElementsByClassName("next_day_name"),
      maxTemp: document.getElementsByClassName("next_max_temp"),
      minTemp: document.getElementsByClassName("next_min_temp"),
      conditionImg: document.getElementsByClassName("next_condition_img"),
      conditionText: document.getElementsByClassName("next_condition_text"),
    },
    searchInput: document.getElementById("search"),
  };
}

// Display Today's Data
function displayTodayData(data, elements) {
  const {
    name,
    number,
    month,
    location,
    temp,
    conditionImg,
    conditionText,
    humidity,
    wind,
    windDirection,
  } = elements.today;
  const todayDate = new Date();
  name.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" });
  number.innerHTML = todayDate.getDate();
  month.innerHTML = todayDate.toLocaleDateString("en-US", { month: "long" });
  location.innerHTML = data.location.name;
  temp.innerHTML = data.current.temp_c;
  conditionImg.setAttribute("src", data.current.condition.icon);
  conditionText.innerHTML = data.current.condition.text;
  humidity.innerHTML = `${data.current.humidity}%`;
  wind.innerHTML = `${data.current.wind_kph}km/h`;
  windDirection.innerHTML = data.current.wind_dir;
}

// Display Next Days' Data
function displayNextData(data, elements) {
  const { day, maxTemp, minTemp, conditionImg, conditionText } =
    elements.nextDays;
  const forecastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    const nextDate = new Date(forecastData[i + 1].date);
    day[i].innerHTML = nextDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    maxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
    minTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
    conditionImg[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
    conditionText[i].innerHTML = forecastData[i + 1].day.condition.text;
  }
}

// Initialize App
async function startApp(city = "alexandria") {
  const weatherData = await getWeatherData(city);
  if (!weatherData.error) {
    const elements = getDOMElements();
    displayTodayData(weatherData, elements);
    displayNextData(weatherData, elements);
  }
}

// Event Listener for Search Input
function addSearchEventListener() {
  const { searchInput } = getDOMElements();
  searchInput.addEventListener("input", function () {
    startApp(searchInput.value);
  });
}

// Start the App
startApp();
addSearchEventListener();
