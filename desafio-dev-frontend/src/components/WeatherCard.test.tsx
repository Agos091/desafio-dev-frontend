import { render, screen, fireEvent } from '@testing-library/react';
import WeatherCard from './WeatherCard';
import { getWeatherIcon } from '../utils/weatherIcons';

describe('WeatherCard Component', () => {
  const mockWeatherData = {
    name: 'London',
    main: {
      temp: 15,
      temp_min: 10,
      temp_max: 20,
    },
    weather: [
      {
        main: 'Clear',
        description: 'clear sky',
      },
    ],
  };

  it('renderiza o nome da cidade e as temperaturas corretamente', () => {
    render(
      <WeatherCard
        weather={mockWeatherData}
        onAddFavorite={jest.fn()}
        isFavorite={false}
      />,
    );

    expect(screen.getByText(/london/i)).toBeInTheDocument();
    expect(screen.getByText(/15°C/i)).toBeInTheDocument();
    expect(screen.getByText(/10°C/i)).toBeInTheDocument();
    expect(screen.getByText(/20°C/i)).toBeInTheDocument();
  });

  it('exibe o ícone ou emoji correspondente à condição climática', () => {
    const expectedIcon = getWeatherIcon(mockWeatherData.weather[0]?.main);

    render(
      <WeatherCard
        weather={mockWeatherData}
        onAddFavorite={jest.fn()}
        isFavorite={false}
      />,
    );

    const icon = screen.getByTestId('weather-icon');
    expect(icon).toHaveTextContent(expectedIcon); // Testa dinamicamente o ícone
  });

  it('chama a função onAddFavorite quando o botão de adicionar aos favoritos é clicado', () => {
    const mockOnAddFavorite = jest.fn();

    render(
      <WeatherCard
        weather={mockWeatherData}
        onAddFavorite={mockOnAddFavorite}
        isFavorite={false}
      />,
    );

    const button = screen.getByRole('button', {
      name: /adicionar aos favoritos/i,
    });
    fireEvent.click(button);

    expect(mockOnAddFavorite).toHaveBeenCalledTimes(1);
  });

  it('exibe o botão de "Favoritado" quando a cidade já está nos favoritos', () => {
    render(
      <WeatherCard
        weather={mockWeatherData}
        onAddFavorite={jest.fn()}
        isFavorite={true}
      />,
    );

    const button = screen.getByRole('button', {
      name: /remover dos favoritos/i,
    });
    expect(button).toBeInTheDocument();
  });
});
