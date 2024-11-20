import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AvailabilitySelector from './AvailabilitySelector';
import AddFriend from './AddFriend';

const SidebarContainer = styled.div`
width: 320px;
height: 100%; /* Ocupa toda a altura */
background-color: #2C3E50;
color: #ECF0F1;
display: flex;
flex-direction: column;
padding: 20px;
box-sizing: border-box;
overflow-y: auto; /* Permite rolagem interna se o conteúdo exceder a altura */

h2 {
  color: #fff;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 700;
}

button {
  margin-top: auto;
  padding: 10px;
  background-color: #E74C3C;
  color: #ECF0F1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #C0392B;
  }
}
`;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('nomeUsuario');
    navigate('/login');
  };

  return (
    <SidebarContainer>
      <h2>LinkUp</h2>
      <AvailabilitySelector />
      <AddFriend />
      <button onClick={handleLogout}>Sair</button>
    </SidebarContainer>
  );
};

export default Sidebar;
