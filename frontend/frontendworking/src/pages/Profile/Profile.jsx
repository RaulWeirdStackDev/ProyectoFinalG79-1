import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './Profile.css';
import profilePhoto from '../../assets/images/Perfil_example.jpg';

const Profile = () => {
  const { token, logout } = useContext(UserContext); // Traigo el token y el método logout del contexto.
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Error al obtener el perfil del usuario.');

        const data = await response.json();
        setEmail(data.email); // Guardo el mail del usuario ya autenticado.
      } catch (error) {
        console.error('Error al obtener el perfil:', error.message);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <img src={profilePhoto} alt="Foto de usuario" className="profile-img" />
      <h2>Perfil de usuario</h2>
      {email ? <p>Email: {email}</p> : <p>Cargando perfil...</p>}
      <button className="btn btn-danger mt-3" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
