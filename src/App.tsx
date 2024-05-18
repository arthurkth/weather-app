import { ChangeEvent, useState } from "react";
import "./App.css";
import { weatherService } from "./service/api";
import { WeatherCard } from "./components/WeatherCard";
import { CapitalsWeather } from "./components/CapitalsWeather";
import { WeatherInfoProps } from "./types/WeatherInfoProps";
function App() {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoProps | null>(null);

  async function submitSearchValue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchValue) {
      return false;
    }
    try {
      const city = await weatherService.getByCityName(searchValue);
      const {
        name,
        sys: { country },
        main,
        weather: [weatherValue],
        wind: { speed },
      } = city;

      setWeatherInfo({
        city_info: {
          name,
          country,
        },
        main,
        weather: weatherValue,
        wind_speed: parseFloat((speed * 3.6).toFixed(2)),
      });
    } catch (error) {
      setWeatherInfo(null);
      setError(error.message);
    } finally {
      setSearchValue("");
    }
  }

  return (
    <div>
      <div>
        <h1>Previsão do tempo</h1>
        <form onSubmit={submitSearchValue}>
          <input
            type="search"
            placeholder="Insira aqui o nome da cidade"
            value={searchValue}
            onChange={handleSearch}
          />
        </form>
      </div>
      <div>
        <div>
          <div>
            {weatherInfo?.main &&
            weatherInfo.weather &&
            weatherInfo.city_info &&
            weatherInfo.wind_speed ? (
              <WeatherCard
                name={weatherInfo.city_info.name}
                country={weatherInfo.city_info.country}
                description={weatherInfo.weather.description}
                temp={weatherInfo.main.temp}
                temp_max={weatherInfo.main.temp_max}
                temp_min={weatherInfo.main.temp_min}
                feels_like={weatherInfo.main.feels_like}
                humidity={weatherInfo.main.humidity}
                wind_speed={weatherInfo.wind_speed}
              />
            ) : (
              <p>{error}</p>
            )}
          </div>
        </div>
        <div>
          <CapitalsWeather />
        </div>
      </div>
    </div>
  );
}

export default App;
