const API_KEY = "bf5f4141c26a39fe4f748f9a4f69a076";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
import { capitals } from "../data/capitals";

import { CapitalsWeatherProps } from "../types/CapitalWeatherProps";
export const weatherService = {
  getByCityName: async function (city: string) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&lang=pt&units=metric`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Falha ao buscar a cidade ${city}`);
    }
    const data = await res.json();
    return data;
  },
  getCapitals: async function () {
    const capitals_promise = capitals.map(async (city) => {
      const result = await this.getByCityName(city);
      const {
        name,
        main: { temp_max, temp_min },
      } = result;
      return { name, temp_max, temp_min };
    });
    const capitals_weather = await Promise.allSettled<
      CapitalsWeatherProps["value"]
    >(capitals_promise);
    return capitals_weather;
  },
};
