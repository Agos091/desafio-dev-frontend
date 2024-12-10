import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('renderiza o campo de input e o botão de busca', () => {
    const mockOnSearch = jest.fn();
    const mockSetCity = jest.fn();

    render(<SearchBar city="" setCity={mockSetCity} onSearch={mockOnSearch} />);

    const input = screen.getByLabelText(/Digite a cidade/i);
    const button = screen.getByRole('button', { name: /Buscar/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('chama a função onSearch quando o botão é clicado', () => {
    const mockOnSearch = jest.fn();
    const mockSetCity = jest.fn();

    render(
      <SearchBar city="London" setCity={mockSetCity} onSearch={mockOnSearch} />,
    );

    const button = screen.getByRole('button', { name: /Buscar/i });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('atualiza o valor do input quando o usuário digita', () => {
    const mockOnSearch = jest.fn();
    const mockSetCity = jest.fn();

    render(<SearchBar city="" setCity={mockSetCity} onSearch={mockOnSearch} />);

    const input = screen.getByLabelText(/Digite a cidade/i);
    fireEvent.change(input, { target: { value: 'New York' } });

    expect(mockSetCity).toHaveBeenCalledWith('New York');
  });
});
