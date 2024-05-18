import { WeatherCardProps } from "../types/WeatherCardProps";
export function WeatherCard({
  name,
  country,
  description,
  temp,
  temp_max,
  temp_min,
  feels_like,
  humidity,
  wind_speed,
}: WeatherCardProps) {
  return (
    <div>
      <h2>
        {name}, {country}
      </h2>
      {temp.toFixed(0)} - {description}
      <br />
      máxima: {temp_max.toFixed(0)} - mínima: {temp_min.toFixed(0)}
      <br />
      sensação: {feels_like.toFixed(0)}
      <br />
      umidade:{humidity}
      <br />
      vento: {wind_speed} km/h
    </div>
  );
}
