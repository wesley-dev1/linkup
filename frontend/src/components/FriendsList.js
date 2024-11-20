import React, { useState, useEffect } from 'react';
import api from '../api/api';
import styled from 'styled-components';

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

const AvailabilitySquare = styled.div`
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
  cursor: default;
  position: relative;

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
`;

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const userId = localStorage.getItem('userId');

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
      setFriends(response.data);
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
                >
                  {availability.diaSemana.charAt(0).toUpperCase()}
                </AvailabilitySquare>
              )
            )}
          </div>
        </FriendBox>
      ))}
    </FriendsListContainer>
  );
};

export default FriendsList;
