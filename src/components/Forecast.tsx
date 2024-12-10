import React from 'react';

interface ForecastProps {
  forecast: any[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
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
      <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>
        Previsão para os Próximos Dois Dias
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {forecast.map((period, index) => (
          <li
            key={index}
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
            <span>{new Date(period.dt * 1000).toLocaleDateString()}</span>
            <span>🌡️ {period.main.temp}°C</span>
            <span>💨 {period.wind.speed} m/s</span>
            <span>☔ {Math.round(period.pop * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forecast;
