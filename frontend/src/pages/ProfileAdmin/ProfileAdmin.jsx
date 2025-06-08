import { useContext, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import profilePhoto from "../../assets/images/Perfil_example.jpg";
import "../Profile/Profile.css";

const ProfileAdmin = () => {
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

          {/* Botón extra solo para admin */}
          <Button className="btn-azul" style={{ width: "100%", maxWidth: "280px", marginBottom: "1rem" }}>
            Administrar publicaciones
          </Button>
        </div>

        {/* Información a la derecha */}
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
        {/* Botón extra solo para admin */}
        <Button className="btn-verde">Crear publicación</Button>
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

export default ProfileAdmin;
