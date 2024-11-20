import React, { useState, useEffect } from 'react';
import api from '../api/api';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Garante que fique acima de outros elementos */
`;

const PendingRequestsContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

const RequestItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 500;
    color: #2c3e50;
  }

  button {
    padding: 8px 12px;
    background-color: #2ecc71;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #27ae60;
    }
  }
`;

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [visible, setVisible] = useState(true); // Controla a visibilidade do overlay
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchPendingRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await api.get(`/api/amizades/pendentes/${userId}`);
      setRequests(response.data);
    } catch (error) {
      console.error('Erro ao buscar solicitações pendentes:', error);
    }
  };

  const handleAccept = async (friendshipId) => {
    try {
      await api.post(`/api/amizades/aceitar/${friendshipId}`);
      alert('Solicitação aceita!');
      fetchPendingRequests();
    } catch (error) {
      console.error('Erro ao aceitar solicitação:', error);
    }
  };

  if (!visible || requests.length === 0) {
    return null; // Não renderiza nada se não houver solicitações ou se o modal estiver fechado
  }

  return (
    <Overlay>
      <PendingRequestsContainer>
        <CloseButton onClick={() => setVisible(false)}>&times;</CloseButton>
        <h3>Solicitações Pendentes</h3>
        {requests.map((request) => (
          <RequestItem key={request.id}>
            <span>{request.solicitanteNome || 'Usuário desconhecido'}</span>
            <button onClick={() => handleAccept(request.id)}>Aceitar</button>
          </RequestItem>
        ))}
      </PendingRequestsContainer>
    </Overlay>
  );
};

export default PendingRequests;
