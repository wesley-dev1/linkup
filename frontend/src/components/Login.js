import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
`;

const LoginContainer = styled.div`
  margin: auto;
  padding: 60px 40px;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  h2 {
    text-align: center;
    margin-bottom: 40px;
    color: #555;
    font-size: 32px;
    font-weight: 700;
    position: relative;
    z-index: 2;
  }

  form {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;

    input {
      border: none;
      border-bottom: 2px solid #ccc;
      padding: 15px 10px;
      margin-bottom: 30px;
      font-size: 16px;
      background: transparent;
      transition: border-color 0.3s;

      &:focus {
        outline: none;
        border-bottom: 2px solid #4A00E0;
      }
    }

    button {
      background: linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045);
      background-size: 200% 200%;
      color: #ffffff;
      padding: 15px;
      font-size: 18px;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: background-position 0.5s, transform 0.3s;

      &:hover {
        background-position: right center;
        transform: translateY(-5px);
      }
    }
  }

  p {
    margin-top: 30px;
    text-align: center;
    color: #555;
    position: relative;
    z-index: 2;

    a {
      color: #555;
      font-weight: bold;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 250px;
    height: 250px;
    background: linear-gradient(135deg, #833ab4, #fcb045);
    border-radius: 50%;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 250px;
    height: 250px;
    background: linear-gradient(135deg, #fd1d1d, #fcb045);
    border-radius: 50%;
    z-index: 1;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  // Método de login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        '/api/usuarios/login',
        { email, senha },
        {
          headers: {
            'Content-Type': 'application/json', // Define o tipo de conteúdo
          },
        }
      );

      // Salva os dados do usuário no localStorage
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('nomeUsuario', response.data.nome);

      // Redireciona para a página inicial
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Email ou senha incorretos.');
    }
  };

  return (
    <LoginPage>
      <LoginContainer>
        <h2>Bem-vindo de volta!</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <p>
          Não tem uma conta? <Link to="/register">Registre-se</Link>
        </p>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
