import { useState, useEffect } from "react";
import { weatherService } from "../service/api";
import { CapitalsWeatherProps } from "../types/CapitalWeatherProps";

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
    <div>
      <h2>Capitais</h2>
      <div>
        {capitals.map((capital, index: number) => (
          <div key={index}>
            {capital.status === "fulfilled" ? (
              <div>
                <h4>{capital.value.name}</h4>
                <h4>{capital.value.temp_min.toFixed(0)}</h4>
                <h4>{capital.value.temp_max.toFixed(0)}</h4>
              </div>
            ) : (
              <div>
                <p>{capital?.reason?.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
