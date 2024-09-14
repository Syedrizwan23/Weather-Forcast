const apiKey = '30cd201ddc8f195fb35bcf40447d2021';

        async function getWeather(city) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error('City not found');
                }
                const data = await response.json();

                document.getElementById('city').textContent = data.name;
                document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
                document.getElementById('condition').textContent = data.weather[0].main;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `Wind speed: ${Math.round(data.wind.speed * 3.6)}km/h`;
                document.getElementById('error').textContent = '';
            } catch (error) {
                console.error('Error fetching weather data:', error);
                document.getElementById('error').textContent = error.message;
                document.getElementById('city').textContent = 'City not found';
                document.getElementById('temperature').textContent = '';
                document.getElementById('condition').textContent = '';
                document.getElementById('humidity').textContent = '';
                document.getElementById('windSpeed').textContent = '';
            }
        }

        document.getElementById('searchBtn').addEventListener('click', function() {
            const city = document.getElementById('cityInput').value;
            if (city) {
                getWeather(city);
            }
        });

        document.getElementById('cityInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const city = document.getElementById('cityInput').value;
                if (city) {
                    getWeather(city);
                }
            }
        });