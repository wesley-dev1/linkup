import React, { useState, useEffect } from 'react';
import api from '../api/api';
import styled from 'styled-components';
import { daysOfWeek } from '../utils/daysOfWeek';

const SelectorContainer = styled.div`
  margin-bottom: 30px;

  h3 {
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }

  .days {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    button {
      flex: 1 1 30%;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: #ECF0F1;
      font-size: 14px;
      transition: background-color 0.3s;

      &.available {
        background-color: #27AE60;

        &:hover {
          background-color: #2ECC71;
        }
      }

      &.unavailable {
        background-color: #7F8C8D;

        &:hover {
          background-color: #95A5A6;
        }
      }
    }
  }
`;

const AvailabilitySelector = () => {
  const [availabilities, setAvailabilities] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const response = await api.get(`/api/disponibilidade/usuario/${userId}`);
      const data = {};
      response.data.forEach((item) => {
        data[item.diaSemana] = item.disponivel;
      });
      setAvailabilities(data);
    } catch (error) {
      console.error('Erro ao buscar disponibilidades:', error);
    }
  };

  const toggleAvailability = async (diaSemana) => {
    const disponivel = !availabilities[diaSemana];
    try {
      await api.post('/api/disponibilidade/definir', null, {
        params: {
          userId,
          diaSemana,
          disponivel,
        },
      });
      setAvailabilities({ ...availabilities, [diaSemana]: disponivel });
    } catch (error) {
      console.error('Erro ao definir disponibilidade:', error);
    }
  };

  return (
    <SelectorContainer>
      <h3>Minha Disponibilidade</h3>
      <div className="days">
        {daysOfWeek.map((day) => (
          <button
            key={day.value}
            className={availabilities[day.value] ? 'available' : 'unavailable'}
            onClick={() => toggleAvailability(day.value)}
          >
            {day.name}
          </button>
        ))}
      </div>
    </SelectorContainer>
  );
};

export default AvailabilitySelector;
