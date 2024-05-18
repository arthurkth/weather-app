export type WeatherInfoProps = {
  city_info: {
    name: string;
    country: string;
  };
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
    feels_like: number;
  };
  weather: {
    description: string;
  };
  wind_speed: number;
};
