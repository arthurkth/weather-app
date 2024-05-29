import { ChangeEvent, useState } from "react";
import "./App.css";
import { weatherService } from "./service/api";
import { WeatherCard } from "./components/WeatherCard";
import { CapitalsWeather } from "./components/CapitalsWeather";
import { WeatherInfoProps } from "./types/WeatherInfoProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState<string>("");
  const [isErrorActive, setIsErrorActive] = useState(false);
  const [isWeatherCardVisible, setIsWeatherCardVisible] = useState(false);

  const handleCloseCard = () => {
    setIsWeatherCardVisible(false);
  };

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
      const city = await weatherService.getByCityName(searchValue.trimEnd());
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
      setIsWeatherCardVisible(true);
    } catch (error: any) {
      setWeatherInfo(null);
      setError(error.message);
      setIsErrorActive(true);
    } finally {
      setSearchValue("");
    }
  }

  return (
    <main className="main">
      <h1 className="search__title">Previsão do tempo</h1>
      <div className="main__container">
        {isWeatherCardVisible &&
        weatherInfo?.main &&
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
            onClose={handleCloseCard}
          />
        ) : (
          <p className={"main__error" + (isErrorActive ? " active" : "")}>
            {error}
          </p>
        )}
      </div>
      <div className="search">
        <form onSubmit={submitSearchValue} className="search__form">
          <div className="search__input-container">
            <input
              type="search"
              placeholder="Insira aqui o nome da cidade"
              value={searchValue}
              onChange={handleSearch}
              className="search__input"
            />
            <FontAwesomeIcon icon={faSearch} className="search__icon" />
          </div>
        </form>
      </div>
      <CapitalsWeather />
    </main>
  );
}

export default App;
