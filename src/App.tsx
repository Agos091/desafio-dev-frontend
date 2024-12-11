import { useState, useEffect } from 'react';
import { getWeatherByCity, getForecastByCity } from './services/weatherApi';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import FavoritesList from './components/FavoritesList';
import WorldCapitalsWeather from './components/WorldCapitalsWeather';
import Forecast from './components/Forecast';
import Alert from '@mui/material/Alert';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      localStorage.removeItem('favorites');
    }
  }, [favorites]);

  const fetchWeather = async () => {
    try {
      setError(null);
      const weatherData = await getWeatherByCity(city);
      const forecastData = await getForecastByCity(city);
      setWeather(weatherData);
      setForecast(forecastData.list.slice(0, 5));
    } catch (error: any) {
      console.error('Erro ao buscar o clima:', error);
      if (error.response && error.response.status === 404) {
        setError('Cidade não encontrada. Por favor, tente novamente.');
      } else {
        setError(
          'Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.',
        );
      }
    }
  };

  const addToFavorites = () => {
    if (weather && !favorites.includes(weather.name)) {
      setFavorites([...favorites, weather.name]);
    }
  };

  const removeFavorite = (city: string) => {
    setFavorites(favorites.filter((favorite) => favorite !== city));
  };

  return (
    <div className="app-container" style={{ padding: '20px' }}>
      <header
        className="app-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/clear-sky.png`}
          alt="Clear Sky Icon"
          style={{ width: '40px', height: '40px' }}
        />
        <h1
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '2rem',
          }}
        >
          Weather App
        </h1>
      </header>

      <main
        className="app-content"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <section className="search-section">
          <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />
          {error && <Alert severity="error">{error}</Alert>}
          {weather && (
            <WeatherCard
              weather={weather}
              onAddFavorite={addToFavorites}
              isFavorite={favorites.includes(weather.name)}
            />
          )}
          {forecast.length > 0 && <Forecast forecast={forecast} />}
        </section>
        <section className="favorites-section">
          <FavoritesList
            favorites={favorites}
            onRemoveFavorite={removeFavorite}
          />
        </section>
        <section className="capitals-section">
          <WorldCapitalsWeather />
        </section>
      </main>
    </div>
  );
};

export default App;
