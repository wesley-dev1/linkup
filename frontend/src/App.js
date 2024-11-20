import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Login from './components/Login';
import Register from './components/Register';
import PendingRequests from './components/PendingRequests';
import HomePage from './pages/HomePage';


const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/pending-requests" element={<PendingRequests />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
