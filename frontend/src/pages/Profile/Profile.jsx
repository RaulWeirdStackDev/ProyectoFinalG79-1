import { useContext, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import profilePhoto from "../../assets/images/Perfil_example.jpg";
import "./profile.css";

const Profile = () => {
  const { logout, userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <h2 className="perfil-title">Mi perfil:</h2>

      <div className="perfil-main-content">
        {/* Imagen a la izquierda */}
        <div className="perfil-left-section">
          <div className="perfil-image-container">
            <Image
              src={userData.img ? userData.img : profilePhoto}
              alt="Foto de perfil"
              className="perfil-image"
            />
          </div>
        </div>

        <div className="perfil-right-section">
          <div className="perfil-info">
            <div className="info-item">
              Nombre: {userData.nombre} {userData.apellido}
            </div>
            <div className="info-item">Mail: {userData.email}</div>
            <div className="info-item">
              RUT/ID: {userData.rut ? userData.rut : "No disponible"}
            </div>
          </div>
        </div>
      </div>

      <div className="perfil-buttons">
        <Button className="btn-azul">Editar perfil</Button>
        <Button className="btn-azul">Ordenes</Button>
        <Button className="btn-azul">Direcciones</Button>
        <Button className="btn-cerrar" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default Profile;
