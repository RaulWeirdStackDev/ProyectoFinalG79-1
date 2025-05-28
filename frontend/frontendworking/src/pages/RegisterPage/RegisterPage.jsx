import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateCredentials } from '../../components/Tools/loginRegisterTools';
import { UserContext } from '../../context/UserContext';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(UserContext); // Obtengo el método register del contexto.

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCredentials(email, password, confirmPassword)) {
      await register(email, password); // Llamo al método register con las credenciales.
    }
  };

  return (
    <div className="d-flex mt-3 align-items-center justify-content-center">
      <div className="card p-3" style={{ width: '20rem' }}>
        <h2 className="text-center mb-4">Registro</h2>
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
          <div className="mb-3">
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
