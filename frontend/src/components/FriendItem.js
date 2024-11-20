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
  

  const sendInvitation = async (diaSemana) => {
    // Implemente a lógica para enviar convite
    alert(`Convite enviado para ${friend.nome} no dia ${diaSemana}`);
  };

  return (
    <FriendItemContainer>
      <div className="name">{friend.nome}</div>
      <div className="days">
        {daysOfWeek.map((day) => (
          <button
            key={day.value}
            className={availabilities[day.value] ? 'available' : 'unavailable'}
            onClick={() => availabilities[day.value] && sendInvitation(day.value)}
          >
            {day.name}
          </button>
        ))}
      </div>
    </FriendItemContainer>
  );
};

export default FriendItem;
