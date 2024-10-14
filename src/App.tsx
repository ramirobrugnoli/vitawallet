import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ExchangePage from './pages/ExchangePage/ExchangePage';

const AppRoutes = () => {
  const { user } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/home" />} />
      <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/exchange" element={user ? <ExchangePage /> : <Navigate to="/login" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;
