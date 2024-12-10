import { useEffect, useState } from 'react';
import { getWeatherByCity } from '../services/weatherApi';
import { getWeatherIcon } from '../utils/weatherIcons';

const capitals = ['London', 'Tokyo', 'New York', 'Paris', 'Sydney'];

interface CapitalWeather {
  city: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string; 
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
            icon: getWeatherIcon(data.weather[0]?.main || 'Unknown'),
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

  return (
    <div
      style={{
        padding: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        color: 'white',
        maxWidth: '600px',
        margin: '20px auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Clima nas Principais Capitais
      </h3>
      {error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
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
              }}
            >
              <span>
                <strong>{capital.city}</strong> {capital.icon}
              </span>
              <span>
                <em>
                  Min: {capital.tempMin}°C / Max: {capital.tempMax}°C
                </em>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorldCapitalsWeather;
