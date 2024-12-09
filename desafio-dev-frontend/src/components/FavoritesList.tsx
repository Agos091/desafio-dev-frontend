import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getWeatherByCity } from '../services/weatherApi';
import { getWeatherIcon } from '../utils/weatherIcons';

interface FavoritesListProps {
  favorites: string[];
  onRemoveFavorite: (city: string) => void;
}

interface FavoriteWeather {
  tempMax: number;
  tempMin: number;
  icon: string;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onRemoveFavorite,
}) => {
  const [favoriteWeather, setFavoriteWeather] = useState<
    Record<string, FavoriteWeather>
  >({});

  useEffect(() => {
    const fetchWeatherForFavorites = async () => {
      const weatherData: Record<string, FavoriteWeather> = {};
      for (const city of favorites) {
        try {
          const data = await getWeatherByCity(city);
          const condition = data.weather[0]?.main || 'Unknown';
          weatherData[city] = {
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min,
            icon: getWeatherIcon(condition),
          };
        } catch (error) {
          console.error(`Erro ao buscar o clima para ${city}:`, error);
          weatherData[city] = {
            tempMax: 0,
            tempMin: 0,
            icon: '🌍',
          };
        }
      }
      setFavoriteWeather(weatherData);
    };

    fetchWeatherForFavorites();
  }, [favorites]);

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h3>Cidades Favoritas</h3>
      <ul style={{ padding: '0', listStyle: 'none' }}>
        {favorites.map((favorite) => (
          <li
            key={favorite}
            style={{
              marginBottom: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '10px',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>
              {favorite} {favoriteWeather[favorite]?.icon || ''} -{' '}
              {favoriteWeather[favorite]?.tempMin}°C /{' '}
              {favoriteWeather[favorite]?.tempMax}°C
            </span>
            <IconButton
              onClick={() => onRemoveFavorite(favorite)}
              style={{ color: 'red' }}
            >
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
