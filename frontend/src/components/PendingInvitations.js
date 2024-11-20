// PendingInvitations.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../api/api';

const InvitationsContainer = styled.div`
  /* Estilize conforme necessário */
  position: fixed;
  top: 60px; /* Ajuste conforme o layout */
  right: 20px;
  width: 300px;
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  h3 {
    margin-bottom: 15px;
    color: #2C3E50;
  }

  .invitation {
    margin-bottom: 15px;

    p {
      margin-bottom: 5px;
      color: #2C3E50;
    }

    textarea {
      width: 100%;
      margin-bottom: 10px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .buttons {
      display: flex;
      gap: 10px;

      button {
        flex: 1;
        padding: 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;

        &.accept {
          background-color: #27AE60;

          &:hover {
            background-color: #2ECC71;
          }
        }

        &.decline {
          background-color: #E74C3C;

          &:hover {
            background-color: #C0392B;
          }
        }
      }
    }
  }
`;

const PendingInvitations = () => {
  const [invitations, setInvitations] = useState([]);
  const [justifications, setJustifications] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchInvitations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInvitations = async () => {
    try {
      const response = await api.get(`/api/convites/pendentes/${userId}`);
      setInvitations(response.data);
    } catch (error) {
      console.error('Erro ao buscar convites pendentes:', error);
    }
  };

  const handleAccept = async (invitationId) => {
    try {
      await api.post(`/api/convites/aceitar/${invitationId}`);
      alert('Convite aceito!');
      fetchInvitations();
    } catch (error) {
      console.error('Erro ao aceitar convite:', error);
    }
  };

  const handleDecline = async (invitationId) => {
    const justificativa = justifications[invitationId] || '';
    try {
      await api.post(`/api/convites/recusar/${invitationId}`, { justificativa });
      alert('Convite recusado!');
      fetchInvitations();
    } catch (error) {
      console.error('Erro ao recusar convite:', error);
    }
  };

  const handleJustificationChange = (invitationId, value) => {
    setJustifications({ ...justifications, [invitationId]: value });
  };

  return (
    invitations.length > 0 && (
      <InvitationsContainer>
        <h3>Convites Pendentes</h3>
        {invitations.map((invitation) => (
          <div key={invitation.id} className="invitation">
            <p><strong>{invitation.remetente.nome}</strong> convidou você para sair no dia {invitation.diaSemana}</p>
            <p>Mensagem: {invitation.mensagem}</p>
            <textarea
              placeholder="Justificativa (opcional)"
              value={justifications[invitation.id] || ''}
              onChange={(e) => handleJustificationChange(invitation.id, e.target.value)}
            />
            <div className="buttons">
              <button className="accept" onClick={() => handleAccept(invitation.id)}>Aceitar</button>
              <button className="decline" onClick={() => handleDecline(invitation.id)}>Recusar</button>
            </div>
          </div>
        ))}
      </InvitationsContainer>
    )
  );
};

export default PendingInvitations;
