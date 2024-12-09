import Button from '@mui/material/Button';

const App = () => {
  return (
    <div
      style={{
        fontFamily: 'Montserrat',
        textAlign: 'center',
        marginTop: '20px',
      }}
    >
      <h1>Weather App</h1>
      <h2>Experimente o Material UI</h2>
      <Button variant="contained" color="primary" >
        Teste Material UI
      </Button>
    </div>
  );
};

export default App;
