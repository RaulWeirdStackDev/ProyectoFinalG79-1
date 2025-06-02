import { Form, Button, Container, Row, Col } from "react-bootstrap"

export const CrearProductos=()=> {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Container>
        <div style={{ backgroundColor: "#e9ecef", borderRadius: "0.5rem", padding: "2rem" }}>
          <Row className="mb-4">
            {/* Left Column */}
            <Col md={6}>
              {/* Nombre del producto */}
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Nombre del producto:</Form.Label>
                <Form.Control type="text" style={{ padding: "0.75rem" }} />
              </Form.Group>

              {/* Categoría */}
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Categoría:</Form.Label>
                <Form.Select style={{ padding: "0.75rem" }}>
                  <option>Seleccione una categoría</option>
                </Form.Select>
              </Form.Group>

              {/* Idioma */}
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Idioma:</Form.Label>
                <Form.Control type="text" style={{ padding: "0.75rem" }} />
              </Form.Group>

              {/* Rareza */}
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Rareza:</Form.Label>
                <Form.Control type="text" style={{ padding: "0.75rem" }} />
              </Form.Group>

              {/* Tipo */}
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Tipo:</Form.Label>
                <Form.Control type="text" style={{ padding: "0.75rem" }} />
              </Form.Group>

              {/* Foil */}
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Foil:</Form.Label>
                <Form.Select style={{ padding: "0.75rem" }}>
                  <option>Seleccione</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Right Column */}
            <Col md={6}>
              {/* URL de imagen */}
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "bold", color: "#000" }}>URL de imagen:</Form.Label>
                <Form.Control type="text" style={{ padding: "0.75rem" }} />
              </Form.Group>

              {/* Stock and Precio */}
              <Row className="mb-4">
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Stock:</Form.Label>
                    <Form.Control type="text" style={{ padding: "0.75rem" }} />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Precio:</Form.Label>
                    <Form.Control type="text" style={{ padding: "0.75rem" }} />
                  </Form.Group>
                </Col>
              </Row>

              {/* Estado */}
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Estado:</Form.Label>
                <Form.Control type="text" style={{ padding: "0.75rem" }} />
              </Form.Group>

              {/* Edición */}
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Edición:</Form.Label>
                <Form.Control type="text" style={{ padding: "0.75rem" }} />
              </Form.Group>

              {/* Color */}
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Color:</Form.Label>
                <Form.Select style={{ padding: "0.75rem" }}>
                  <option>Seleccione un color</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Descripción */}
          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "bold", color: "#000" }}>Descripción:</Form.Label>
            <Form.Control as="textarea" rows={6} style={{ padding: "0.75rem" }} />
          </Form.Group>

          {/* Submit Button */}
          <div className="d-flex justify-content-end">
            <Button
              style={{
                backgroundColor: "#1e3a8a",
                borderColor: "#1e3a8a",
                padding: "0.75rem 2rem",
                fontWeight: "bold",
              }}
              size="lg"
            >
              Crear publicación
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
