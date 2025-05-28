import { Button, Image } from "react-bootstrap"
import "./perfilUsuario.css"

export const PerfilUsuario = () => {
  return (
    <div className="perfil-container">
      <h2 className="perfil-title">Mi perfil:</h2>

      <div className="perfil-main-content">
        {/* Columna izquierda - Solo imagen */}
        <div className="perfil-left-section">
          <div className="perfil-image-container">
            <Image src="/placeholder.svg?height=280&width=280" alt="Foto de perfil" className="perfil-image" />
          </div>
        </div>

        {/* Columna derecha - Info y botones */}
        <div className="perfil-right-section">
          <div className="perfil-info">
            <div className="info-item">Nombre: Eren Yeager</div>
            <div className="info-item">Mail: erentitan@user.com</div>
            <div className="info-item">Celular: 9555555</div>
            <div className="info-item">RUT/ID: 15555555-5</div>
          </div>
        </div>
      </div>

      {/* Botones centrados */}
      <div className="perfil-buttons">
        <Button className="btn-azul">Editar perfil</Button>
        <Button className="btn-azul">Ordenes</Button>
        <Button className="btn-azul">Direcciones</Button>
        <Button className="btn-cerrar">Cerrar sesión</Button>
      </div>
    </div>
  )
}

export default PerfilUsuario
