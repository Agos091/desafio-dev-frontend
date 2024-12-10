# Weather App - Desafio de Programação Front-End

## Descrição do Projeto

Este projeto é uma aplicação web de previsão do tempo desenvolvida como parte do desafio técnico para a vaga de desenvolvedor front-end. A aplicação permite buscar informações climáticas, como:

- Temperatura atual, mínima e máxima do dia.
- Precipitação e vento.
- Previsão para os próximos dois dias.
- Ícones representando a condição climática (ensolarado, nublado, chuvoso, etc.).
- Lista persistente de cidades favoritas.
- Informações climáticas das principais capitais do mundo.

A aplicação foi construída utilizando **React** e **Material UI**, com atenção ao design responsivo (mobile first).

---

## Funcionalidades

1. **Busca de Previsão do Tempo:**
   - Permite buscar informações climáticas de qualquer cidade do mundo.
   - Exibe temperatura atual, mínima, máxima, precipitação e vento.

2. **Lista de Favoritos:**
   - Permite adicionar cidades à lista de favoritos.
   - Persiste os dados no `localStorage`, garantindo que a lista seja mantida ao recarregar a página.

3. **Capitais do Mundo:**
   - Exibe informações climáticas para as cinco principais capitais: Londres, Tóquio, Nova York, Paris e Sydney.

4. **Responsividade:**
   - Interface otimizada para desktop e mobile.

5. **Design e UX:**
   - Utilização da tipografia Montserrat.
   - Background dinâmico inspirado em condições climáticas.

6. **Testes Automatizados:**
   - Cobertura de testes para componentes principais utilizando React Testing Library.

---

## Tecnologias Utilizadas

- **Linguagens e Frameworks:**
  - React com TypeScript
  - Material UI
  - Axios para consumo de API

- **Testes:**
  - React Testing Library

- **API de Clima:**
  - [OpenWeatherMap API](https://openweathermap.org/api)

---

## Instalação e Execução

### Requisitos
- Node.js v16 ou superior
- Yarn ou NPM

### Passos para Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/Agos091/desafio-dev-frontend.git
   cd desafio-dev-frontend
   ```

2. Instale as dependências:
   ```bash
   yarn install
   ```

3. Configure a chave da API:
   - Crie um arquivo `.env` na raiz do projeto.
   - Adicione a seguinte linha:
     ```env
     REACT_APP_OPENWEATHER_API_KEY=SUA_API_KEY
     ```

4. Execute o projeto:
   ```bash
   yarn start
   ```

5. Para criar o build de produção:
   ```bash
   yarn build
   ```

---

## Testes

1. Para rodar os testes automatizados:
   ```bash
   yarn test
   ```
2. Testes incluídos:
   - `SearchBar`: Verifica renderização, funcionalidade de busca e interação.
   - `WeatherCard`: Testa a exibição de informações climáticas e interação com a lista de favoritos.

---

## Deploy

O projeto foi implantado no Vercel. Você pode acessá-lo pelo link:
[https://desafio-dev-frontend.vercel.app/](https://desafio-dev-frontend.vercel.app/)

---

## Estrutura de Pastas

```
/src
  /components
    SearchBar.tsx
    WeatherCard.tsx
    WorldCapitalsWeather.tsx
  /services
    weatherApi.ts
  /utils
    weatherIcons.ts
  App.tsx
  index.tsx
/public
  favicon.ico
  clear-sky.png
```

---

## Melhorias Futuras

1. Implementar autenticação para salvar dados do usuário em uma base remota.
2. Adicionar mais funcionalidades de previsão, como alertas climáticos.
3. Melhorar a interface de usuário com transições mais suaves.

---

## Agradecimentos

Agradeço pela oportunidade de participar deste desafio e espero que o projeto atenda às expectativas. Caso tenham dúvidas, estou à disposição para discutir o processo de desenvolvimento e melhorias futuras.

---

## Autor

Desenvolvido por **Agos Dalcin**.