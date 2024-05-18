export type CapitalsWeatherProps = {
  status: string;
  reason?: {
    message: string;
  };
  value: {
    name: string;
    temp_min: number;
    temp_max: number;
  };
};
