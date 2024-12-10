import axios from 'axios';

const API_KEY = '2d6201eec45cfd88fb8b9c93477d61cf';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};

export const getForecastByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });

  const currentDate = new Date();
  const nextTwoDays = [1, 2].map((offset) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + offset);
    return date.toISOString().split('T')[0];
  });

  const filteredForecast = response.data.list.filter((entry: any) => {
    const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
    return nextTwoDays.includes(entryDate);
  });

  const uniqueDailyForecast = nextTwoDays.map((day) =>
    filteredForecast.find((entry: any) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
      const entryHour = new Date(entry.dt * 1000).getUTCHours();
      return entryDate === day && entryHour === 12;
    }),
  );

  return {
    ...response.data,
    list: uniqueDailyForecast.filter(Boolean),
  };
};
