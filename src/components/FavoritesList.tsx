import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getWeatherByCity } from '../services/weatherApi';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import AcUnitIcon from '@mui/icons-material/AcUnit';

interface FavoritesListProps {
  favorites: string[];
  onRemoveFavorite: (city: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onRemoveFavorite,
}) => {
  const [favoriteWeather, setFavoriteWeather] = useState<
    Record<string, { tempMin: number; tempMax: number; condition: string }>
  >({});

  useEffect(() => {
    const fetchWeatherForFavorites = async () => {
      const weatherData: Record<
        string,
        { tempMin: number; tempMax: number; condition: string }
      > = {};
      for (const city of favorites) {
        try {
          const data = await getWeatherByCity(city);
          weatherData[city] = {
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            condition: data.weather[0]?.main || 'Unknown',
          };
        } catch (error) {
          console.error(`Erro ao buscar o clima para ${city}:`, error);
          weatherData[city] = {
            tempMin: 0,
            tempMax: 0,
            condition: 'Unknown',
          };
        }
      }
      setFavoriteWeather(weatherData);
    };

    fetchWeatherForFavorites();
  }, [favorites]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Clear':
        return <WbSunnyIcon />;
      case 'Clouds':
        return <CloudIcon />;
      case 'Rain':
        return <OpacityIcon />;
      case 'Snow':
        return <AcUnitIcon />;
      default:
        return <CloudIcon />;
    }
  };

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
              {favorite}{' '}
              {getWeatherIcon(
                favoriteWeather[favorite]?.condition || 'Unknown',
              )}
              {favoriteWeather[favorite] && (
                <span style={{ marginLeft: '10px' }}>
                  {favoriteWeather[favorite].tempMin}°C /{' '}
                  {favoriteWeather[favorite].tempMax}°C
                </span>
              )}
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
