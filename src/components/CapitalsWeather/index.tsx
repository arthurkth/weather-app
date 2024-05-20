import { useState, useEffect } from "react";
import { weatherService } from "../../service/api";
import { CapitalsWeatherProps } from "../../types/CapitalWeatherProps";
import "./style.css";

export function CapitalsWeather() {
  const [capitals, setCapitals] = useState<CapitalsWeatherProps[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchCapitalsWeather = async () => {
      try {
        const data = await weatherService.getCapitals();
        setCapitals(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCapitalsWeather();
  }, []);

  return (
    <div className="capitals">
      <div className="capitals__wrapper">
        <h2 className="capitals__title">Capitais</h2>
        <div className="capitals__grid">
          <span className="capitals__title--span">Min Máx</span>
          <span className="capitals__title--span capitals__title--span--desktop">
            Min Máx
          </span>
          {capitals.map((capital, index: number) => (
            <div key={index} className="capitals__container">
              {capital.status === "fulfilled" ? (
                <div className="capitals__title__container">
                  <h4 className="capitals__title--sm">
                    {capital.value.temp_min.toFixed(0)} ºC
                  </h4>
                  <h4 className="capitals__title--sm">
                    {capital.value.temp_max.toFixed(0)} ºC
                  </h4>
                  <h4 className="capitals__title--sm">{capital.value.name}</h4>
                </div>
              ) : (
                <div className="capitals__title--error">
                  erro
                  <p>{capital?.reason?.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
