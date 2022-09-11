import { Route, Routes } from 'react-router-dom';
import Login from '../screens/Login';
import Redirect from '../screens/Redirect';
import Register from '../screens/Register';
import Home from '../screens/Home';
import RegisterQuery from '../screens/RegisterQuery';
import FinancialManagement from '../screens/FinancialManagement';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Redirect /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/register-query" element={ <RegisterQuery /> } />
      <Route path="/financial-management" element={ <FinancialManagement /> } />
    </Routes>
  );
}
