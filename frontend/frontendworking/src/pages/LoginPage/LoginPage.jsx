import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateCredentials } from '../../components/Tools/loginRegisterTools';
import { UserContext } from '../../context/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext); // Traigo el método login del contexto.

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCredentials(email, password)) {
      await login(email, password); // Llamo al método login con las credenciales del usuario.
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="card p-3" style={{ width: '20rem' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
