// FriendsList.js

import React, { useState, useEffect } from 'react';
import api from '../api/api';
import styled from 'styled-components';
import { daysOfWeek } from '../utils/daysOfWeek';

// Estilos para a listagem de amigos
const FriendsListContainer = styled.div`
  width: 250px;
  height: 100%; /* Ocupa toda a altura */
  background-color: #2C3E50;
  color: #ECF0F1;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; /* Permite rolagem interna */

  /* Estilos do Scrollbar Personalizado */
  scrollbar-width: thin;
  scrollbar-color: #4A00E0 #2C3E50;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #2C3E50;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4A00E0;
    border-radius: 10px;
    border: 2px solid #2C3E50;
  }

  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #FFFFFF;
  }
`;

const FriendBox = styled.div`
  background-color: #34495E;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-sizing: border-box;

  p {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    color: #ECF0F1;
  }

  .availability-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
  }
`;

const AvailabilitySquare = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 12px;
  color: #ECF0F1;
  font-weight: bold;
  background-color: ${(props) => (props.isAvailable ? '#27AE60' : '#E74C3C')};
  cursor: ${(props) => (props.isAvailable ? 'pointer' : 'default')};
  position: relative;
  border: none;
  
  &:hover::after {
    content: '${(props) => props.title}';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #2C3E50;
    color: #ECF0F1;
    padding: 5px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1;
  }

  &:disabled {
    cursor: default;
  }
`;

// Estilos para o Modal
const ModalOverlay = styled.div`
  position: fixed;
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

const ModalContent = styled.div`
  background-color: #2C3E50;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  color: #ECF0F1;

  h3 {
    margin-bottom: 15px;
    text-align: center;
  }

  input,
  textarea {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #34495E;
    color: #ECF0F1;

    &:focus {
      outline: none;
      background-color: #3B5998;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: #ECF0F1;

      &.send {
        background-color: #27AE60;

        &:hover {
          background-color: #2ECC71;
        }
      }

      &.cancel {
        background-color: #E74C3C;

        &:hover {
          background-color: #C0392B;
        }
      }
    }
  }
`;

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const userId = localStorage.getItem('userId');

  // Novos estados para o modal e convite
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [message, setMessage] = useState('');
  const [dateTime, setDateTime] = useState('');

  const diasSemana = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
  ];

  useEffect(() => {
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await api.get(`/api/amizades/usuario/${userId}`);
      setFriends(response.data); // Deve conter apenas amigos aceitos
    } catch (error) {
      console.error('Erro ao buscar amigos:', error);
    }
  };

  const completarDisponibilidades = (availabilities) => {
    const mapDiaSemana = {
      'domingo': 'domingo',
      'segunda-feira': 'segunda',
      'terça-feira': 'terca',
      'quarta-feira': 'quarta',
      'quinta-feira': 'quinta',
      'sexta-feira': 'sexta',
      'sábado': 'sabado',
    };

    return diasSemana.map((dia) => {
      const diaBackEnd = mapDiaSemana[dia.toLowerCase()];
      const disponibilidadeDia = availabilities.find(
        (availability) => availability.diaSemana === diaBackEnd
      );
      return {
        diaSemana: dia,
        disponivel: disponibilidadeDia ? disponibilidadeDia.disponivel : false,
      };
    });
  };

  const handleDayClick = (friend, diaSemana) => {
    if (diaSemana) {
      setSelectedFriend(friend);
      setSelectedDay(diaSemana);
      setIsModalOpen(true);
    }
  };

  const handleSendInvitation = async () => {
    if (!message || !dateTime) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await api.post('/api/convites/enviar', {
        remetenteId: parseInt(userId),
        destinatarioId: selectedFriend.amigoId,
        mensagem: message,
        diaSemana: selectedDay,
        dataHoraConvite: dateTime, // Formato ISO 8601: 'YYYY-MM-DDTHH:MM'
      });
      alert('Convite enviado com sucesso!');
      // Limpa os estados e fecha o modal
      setIsModalOpen(false);
      setSelectedFriend(null);
      setSelectedDay('');
      setMessage('');
      setDateTime('');
      // Opcional: Atualizar a lista de convites ou fazer outras ações
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      alert('Erro ao enviar convite.');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFriend(null);
    setSelectedDay('');
    setMessage('');
    setDateTime('');
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <FriendsListContainer>
      <h3>Amigos</h3>
      {friends.map((friend) => (
        <FriendBox key={friend.amigoId}>
          <p>{friend.amigoNome}</p>
          <div className="availability-grid">
            {completarDisponibilidades(friend.availabilities || []).map(
              (availability, index) => (
                <AvailabilitySquare
                  key={index}
                  isAvailable={availability.disponivel}
                  title={availability.diaSemana}
                  onClick={() => handleDayClick(friend, availability.disponivel ? availability.diaSemana : '')}
                  disabled={!availability.disponivel} // Desabilita o botão se não estiver disponível
                >
                  {availability.diaSemana.charAt(0).toUpperCase()}
                </AvailabilitySquare>
              )
            )}
          </div>
        </FriendBox>
      ))}

      {isModalOpen && selectedFriend && (
        <ModalOverlay>
          <ModalContent>
            <h3>Enviar Convite para {selectedFriend.amigoNome}</h3>
            <p>Dia: {capitalizeFirstLetter(selectedDay)}</p>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              placeholder="Selecione data e hora"
            />
            <textarea
              placeholder="Escreva uma mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="buttons">
              <button className="send" onClick={handleSendInvitation}>Enviar</button>
              <button className="cancel" onClick={handleCancel}>Cancelar</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </FriendsListContainer>
  );
};

export default FriendsList;
