import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default App;
