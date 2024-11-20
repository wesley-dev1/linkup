import React, { useState, useEffect } from 'react';
import api from '../api/api';
import styled from 'styled-components';
import { daysOfWeek } from '../utils/daysOfWeek';

const FriendItemContainer = styled.div`
  margin-bottom: 20px;

  .name {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .days {
    display: flex;
    flex-wrap: wrap;

    button {
      width: 30%;
      margin: 5px;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: #fff;

      &.available {
        background-color: #42b72a;
      }

      &.unavailable {
        background-color: #f02849;
      }
    }
  }
`;

const FriendItem = ({ friend }) => {
  const [availabilities, setAvailabilities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [message, setMessage] = useState('');
  const [dateTime, setDateTime] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchAvailabilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const response = await api.get(`/api/disponibilidade/usuario/${friend.id}`);
      const data = {};
      response.data.forEach((item) => {
        data[item.diaSemana] = item.disponivel;
      });
      setAvailabilities(data);
    } catch (error) {
      console.error('Erro ao buscar disponibilidades do amigo:', error);
    }
  };
  
  const handleDayClick = (diaSemana) => {
    if (availabilities[diaSemana]) {
      setSelectedDay(diaSemana);
      setShowModal(true);
    }
  };
  const sendInvitation = async () => {
    try {
      await api.post('/api/convites/enviar', {
        remetenteId: parseInt(userId),
        destinatarioId: friend.amigoId,
        mensagem: message,
        diaSemana: selectedDay,
        dataHoraConvite: dateTime, // Certifique-se de que está no formato correto
      });
      alert('Convite enviado com sucesso!');
      setShowModal(false);
      setMessage('');
      setDateTime('');
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      alert('Erro ao enviar convite.');
    }
  };

  return (
    <FriendItemContainer>
      <div className="name">{friend.amigoNome}</div>
      <div className="days">
        {daysOfWeek.map((day) => (
          <button
            key={day.value}
            className={availabilities[day.value] ? 'available' : 'unavailable'}
            onClick={() => handleDayClick(day.value)}
          >
            {day.name}
          </button>
        ))}
      </div>

      {showModal && (
        <Modal>
          <div className="modal-content">
            <h3>Enviar Convite</h3>
            <p>Convite para {friend.amigoNome} no dia {selectedDay}</p>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
            <textarea
              placeholder="Escreva uma mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="buttons">
              <button onClick={sendInvitation}>Enviar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </Modal>
      )}
    </FriendItemContainer>
  );
};
const Modal = styled.div`
  /* Estilos para centralizar o modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-content {
    background-color: #2C3E50;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    color: #ECF0F1;

    h3 {
      margin-bottom: 15px;
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

        &:nth-child(1) {
          background-color: #27AE60;

          &:hover {
            background-color: #2ECC71;
          }
        }

        &:nth-child(2) {
          background-color: #E74C3C;

          &:hover {
            background-color: #C0392B;
          }
        }
      }
    }
  }
`;

export default FriendItem;
