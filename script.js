// Code to fetch weather data from OpenWeatherMap API and display it on the dashboard

async function fetchWeather(cityName) {
    document.getElementById('getWeatherBtn').addEventListener('click', function () {
        const city = document.getElementById('cityInput').value;
        const apiKey = config.OPENWEATHERMAP_API_KEY; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    document.getElementById('cityName').textContent = data.name;
                    document.getElementById('weatherDescription').textContent = data.weather[0].description;
                    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
                    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
                    document.getElementById('weatherInfo').classList.remove('d-none');
                } else {
                    alert('City not found!');
                }
            })
            .catch(error => console.error('Error fetching weather data:', error));
    });
    
    function displayWeather(data) {
        // Code to display weather data on the dashboard
    }
}

async function fetchCalendarEvents() {
    gapi.load('client:auth2', initClient);

    function initClient() {
        gapi.client.init({
            apiKey: config.GOOGLE_API_KEY, // Replace with your Google API key',
            clientId: config.GOOGLE_CLIENT_ID, // Replace with your Google Client ID
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: "https://www.googleapis.com/auth/calendar.readonly"
        }).then(function () {
            gapi.auth2.getAuthInstance().signIn().then(() => {
                gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                }).then(function(response) {
                    const events = response.result.items;
                    displayEvents(events);
                });
            });
        });
    }
}

function displayEvents(events) {
    // Code to display calendar events on the dashboard
}

