import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { getWeatherIcon } from '../utils/weatherIcons';

interface WeatherCardProps {
  weather: any;
  onAddFavorite: () => void;
  isFavorite: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  onAddFavorite,
  isFavorite,
}) => {
  const weatherCondition = weather.weather[0]?.main; 
  const weatherIcon = getWeatherIcon(weatherCondition);

  return (
    <Card
      style={{
        marginTop: '20px',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        color: 'white',
        backdropFilter: 'blur(5px)',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {weather.name}
          <IconButton
            onClick={onAddFavorite}
            style={{ color: 'gold', marginLeft: '10px' }}
          >
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Typography>
        <Typography variant="h6" style={{ fontSize: '2rem' }}>
          {weatherIcon}
        </Typography>
        <Typography variant="body2">
          Temperatura: {weather.main.temp}°C
        </Typography>
        <Typography variant="body2">
          Mínima: {weather.main.temp_min}°C
        </Typography>
        <Typography variant="body2">
          Máxima: {weather.main.temp_max}°C
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
