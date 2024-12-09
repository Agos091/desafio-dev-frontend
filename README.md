# Weather App

## Descrição do Projeto

Este projeto é um aplicativo de previsão do tempo desenvolvido com React, que permite ao usuário:

- Buscar o clima atual de qualquer cidade.
- Visualizar temperaturas mínimas e máximas, precipitação e velocidade do vento.
- Adicionar cidades aos favoritos para acesso rápido.
- Obter previsão do tempo para os próximos dois dias.
- Visualizar o clima em cinco capitais globais.

A interface é responsiva e adaptada tanto para dispositivos móveis quanto para desktops.

---

## Funcionalidades Principais

1. **Busca de Clima por Cidade**:

   - Permite ao usuário buscar informações detalhadas de uma cidade específica.

2. **Cidades Favoritas**:

   - Adicionar e remover cidades favoritas.
   - As cidades favoritas são salvas no localStorage para persistência.

3. **Previsão para os Próximos Dois Dias**:

   - Mostra a previsão para os dois dias seguintes, incluindo temperaturas mínimas, máximas, precipitação e vento.

4. **Clima nas Capitais Globais**:

   - Exibe o clima atual de cinco capitais: Londres, Tóquio, Nova York, Paris e Sydney.

5. **Interface Responsiva**:
   - Adaptada para diferentes dispositivos.

---

## Tecnologias Utilizadas

- **React**: Framework principal para o desenvolvimento da interface.
- **Material UI**: Biblioteca para componentes estilizados.
- **Axios**: Biblioteca para realizar chamadas à API.
- **OpenWeatherMap API**: Fonte dos dados climáticos.
- **TypeScript**: Para garantir segurança no código.
- **CSS Responsivo**: Garantia de uma boa experiência em dispositivos móveis e desktops.

---

## Estrutura do Projeto

```
/public
  - clear-sky.png (ícone utilizado no projeto)

src/
  - components/
    - FavoritesList.tsx (Lista de cidades favoritas)
    - Forecast.tsx (Previsão dos próximos dois dias)
    - SearchBar.tsx (Barra de busca)
    - WeatherCard.tsx (Exibição de clima atual)
    - WorldCapitalsWeather.tsx (Clima em capitais)
  - services/
    - weatherApi.ts (Serviço para chamadas à API)
  - styles/
    - global.css (Estilo global do projeto)
  - App.tsx (Componente principal do aplicativo)
  - index.tsx (Ponto de entrada do React)
```

---

## Como Rodar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/weather-app.git
   cd weather-app
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Adicione sua chave de API do OpenWeatherMap:

   - No arquivo `src/services/weatherApi.ts`, substitua `SUA_API_KEY` pela sua chave.

4. Rode o aplicativo em modo de desenvolvimento:

   ```bash
   yarn start
   ```

5. Abra no navegador:
   - Acesse `http://localhost:3000`.

---

## Considerações de Design

- O aplicativo utiliza uma paleta de cores inspirada no céu.
- Os componentes têm bordas arredondadas e efeitos de sombra para um visual moderno.
- O layout foi projetado para ser harmonioso e intuitivo.

---

## Autor

Desenvolvido por Agos Dalcin Rufino . Para dúvidas ou sugestões, entre em contato:

- **Email**: dalcinrufino.a@gmail.com

---
