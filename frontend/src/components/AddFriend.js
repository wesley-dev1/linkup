import React, { useState } from 'react';
import api from '../api/api';
import styled from 'styled-components';

const AddFriendContainer = styled.div`
  margin-bottom: 30px;

  h3 {
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }

  .search-bar {
    display: flex;
    align-items: center; /* Alinha verticalmente */
    margin-bottom: 15px;

    input,
    button {
      margin: 0; /* Remove margens */
      padding: 10px; /* Padding consistente */
      font-size: 14px;
      line-height: 1;
      box-sizing: border-box; /* Inclui padding e borda no cálculo de largura/altura */
    }

    input {
      flex: 1;
      border: 1px solid #34495e;
      border-right: none; /* Remove a borda direita para evitar borda dupla */
      border-radius: 4px 0 0 4px;
      background-color: #34495e;
      color: #ecf0f1;

      &::placeholder {
        color: #95a5a6;
      }
    }

    button {
      border: 1px solid #34495e;
      border-left: none; /* Remove a borda esquerda para evitar borda dupla */
      border-radius: 0 4px 4px 0;
      background-color: #2980b9;
      color: #ecf0f1;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #3498db;
      }
    }
  }

  .results {
    .user {
      padding: 10px;
      border-bottom: 1px solid #34495e;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ecf0f1;

      &:hover {
        background-color: #34495e;
      }

      button {
        padding: 6px 12px;
        background-color: #27ae60;
        color: #ecf0f1;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #2ecc71;
        }
      }
    }
  }
`;

const AddFriend = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const userId = localStorage.getItem('userId');

  const searchUsers = async () => {
    try {
      const response = await api.get('/api/usuarios/search', {
        params: { query },
      });
      setResults(response.data.filter((user) => user.id.toString() !== userId));
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const sendFriendRequest = async (receiverId) => {
    try {
      await api.post('/api/amizades/solicitar', null, {
        params: {
          senderId: userId,
          receiverId,
        },
      });
      alert('Solicitação de amizade enviada!');
    } catch (error) {
      console.error('Erro ao enviar solicitação de amizade:', error);
    }
  };

  return (
    <AddFriendContainer>
      <h3>Adicionar Amigos</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar usuários..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchUsers}>Buscar</button>
      </div>
      <div className="results">
        {results.map((user) => (
          <div key={user.id} className="user">
            <span>{user.nome}</span>
            <button onClick={() => sendFriendRequest(user.id)}>Adicionar</button>
          </div>
        ))}
      </div>
    </AddFriendContainer>
  );
};

export default AddFriend;
