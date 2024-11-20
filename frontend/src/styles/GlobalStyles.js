import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Estilização geral do body */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f3f3f3; /* Cinza claro */
    color: #333; /* Preto acinzentado */
    line-height: 1.6;
  }

  /* Links */
  a {
    text-decoration: none;
    color: #333; /* Roxo médio */
    transition: color 0.3s;

    &:hover {
      color: #4A00E0; /* Roxo escuro */
    }
  }

  /* Botões */
  button {
    cursor: pointer;
    background-color: #833ab4; /* Roxo médio */
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
      background-color: #4A00E0; /* Roxo escuro */
    }
  }

  /* Inputs */
  input {
    border: 1px solid #ddd;
    padding: 12px;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 15px;
    width: 100%;
    transition: border-color 0.3s;

    &:focus {
      border-color: #833ab4; /* Roxo médio */
      outline: none;
    }
  }

  /* Cabeçalhos */
  h1, h2, h3, h4, h5, h6 {
    color: #333;
    margin-bottom: 20px;
  }

  /* Parágrafos */
  p {
    margin-bottom: 15px;
    color: #555; /* Cinza médio */
  }

  /* Listas */
  ul {
    list-style: none;
    padding: 0;
  }
`;

export default GlobalStyles;
