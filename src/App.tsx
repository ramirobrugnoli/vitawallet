import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ExchangePage from './pages/ExchangePage';
import { useAppContext } from './context/AppContext';

const App: React.FC = () => {
  const { user } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/exchange" element={user ? <ExchangePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
