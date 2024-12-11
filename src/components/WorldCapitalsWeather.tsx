import { useEffect, useState } from 'react';
import { getWeatherByCity } from '../services/weatherApi';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityIcon from '@mui/icons-material/Opacity';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const capitals = ['London', 'Tokyo', 'New York', 'Paris', 'Sydney'];

interface CapitalWeather {
  city: string;
  tempMax: number;
  tempMin: number;
  condition: string;
}

const WorldCapitalsWeather: React.FC = () => {
  const [capitalsWeather, setCapitalsWeather] = useState<CapitalWeather[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCapitalsWeather = async () => {
      try {
        const weatherData: CapitalWeather[] = [];
        for (const city of capitals) {
          const data = await getWeatherByCity(city);
          weatherData.push({
            city,
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min,
            condition: data.weather[0]?.main || 'Unknown',
          });
        }
        setCapitalsWeather(weatherData);
      } catch (err) {
        console.error('Erro ao buscar clima para as capitais:', err);
        setError('Não foi possível carregar os dados climáticos das capitais.');
      }
    };

    fetchCapitalsWeather();
  }, []);

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
    <div
      style={{
        padding: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        marginTop: '20px',
        color: 'white',
      }}
    >
      <h3 style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        Clima nas Principais Capitais
      </h3>
      {error ? (
        <p style={{ color: 'red', textAlign: 'center', fontSize: '1rem' }}>
          {error}
        </p>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {capitalsWeather.map((capital) => (
            <li
              key={capital.city}
              style={{
                marginBottom: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '10px',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1rem',
              }}
            >
              <span>
                {capital.city} {getWeatherIcon(capital.condition)}
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <ArrowDownwardIcon style={{ color: 'blue' }} />
                {capital.tempMin}°C
                <ArrowUpwardIcon style={{ color: 'red' }} />
                {capital.tempMax}°C
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorldCapitalsWeather;
