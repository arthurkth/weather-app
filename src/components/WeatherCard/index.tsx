import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WeatherCardProps } from "../../types/WeatherCardProps";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./style.css";

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
  onClose,
}: WeatherCardProps) {
  return (
    <div className="weather__card">
      <div className="weather__card__wrapper">
        <div className="weather__card__header">
          <h3 className="weather__card__header__title">
            {name}, {country}
          </h3>
          <button
            className="weather__card__header__close-button"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark as IconProp} />
          </button>
        </div>
        <div className="weather__card__content">
          <h2 className="weather__card__content__title">
            {temp.toFixed(0)}ºC {description}
          </h2>
          <ul className="weather__card__list">
            <li className="weather__card__list__item">
              <FontAwesomeIcon
                icon={faArrowDown as IconProp}
                className="weather__card__header__icon"
              />
              <b>{temp_min.toFixed(0)}º</b>

              <FontAwesomeIcon
                icon={faArrowUp as IconProp}
                className="weather__card__header__icon"
              />
              <b>{temp_max.toFixed(0)}º</b>
            </li>
            <li className="weather__card__list__item">
              Sensação: <b>{feels_like.toFixed(0)}º</b>
            </li>
            <li className="weather__card__list__item">
              Vento: <b>{wind_speed} km/h</b>
            </li>
            <li className="weather__card__list__item">
              Umidade: <b>{humidity}%</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
