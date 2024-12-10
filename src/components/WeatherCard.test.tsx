import { render, screen, fireEvent } from '@testing-library/react';
import WeatherCard from './WeatherCard';

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

  it('exibe o ícone correspondente à condição climática', () => {
    render(
      <WeatherCard
        weather={mockWeatherData}
        onAddFavorite={jest.fn()}
        isFavorite={false}
      />,
    );

    const icon = screen.getByTestId('weather-icon');
    expect(icon).toBeInTheDocument();
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

    const button = screen.getByRole('button');
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

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'remover dos favoritos');
  });
});
