import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface SearchBarProps {
  city: string;
  setCity: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, onSearch }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <TextField
        label="Digite a cidade"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginRight: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSearch}
        disabled={!city.trim()}
      >
        Buscar Clima
      </Button>
    </div>
  );
};

export default SearchBar;
