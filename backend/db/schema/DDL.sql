-- Active: 1737596334296@@127.0.0.1@5432@proy001
CREATE DATABASE proy001;
\c proy001;
-- Crear tabla de roles
CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) UNIQUE NOT NULL,
    estado INT DEFAULT 1 NOT NULL
);

-- Crea tabla de carousel
CREATE TABLE carousel (
    id_carousel SERIAL PRIMARY KEY,
    img TEXT UNIQUE NOT NULL,
    estado INT DEFAULT 1 NOT NULL
);
-- Crear tabla de regiones
CREATE TABLE region(
    id_region SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) UNIQUE NOT NULL
);

-- Crear tabla de comunas
CREATE TABLE comuna(
    id_comuna SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) UNIQUE NOT NULL
);

-- Crear tabla de usuarios
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    rut VARCHAR(10),
    img TEXT,  
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_rol INT NOT NULL DEFAULT 2,
    estado INT DEFAULT 1 NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

-- Crear tabla de direcciones
CREATE TABLE direccion(
    id_direccion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, 
    direccion VARCHAR(100) NOT NULL,
    numero INT,
    anexo VARCHAR(100),
    id_region INT NOT NULL, 
    id_comuna INT NOT NULL, 
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_region) REFERENCES region(id_region),
    FOREIGN KEY (id_comuna) REFERENCES comuna(id_comuna)
);

-- Crear tabla de categorías
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    descripcion VARCHAR(100) UNIQUE NOT NULL,
    estado INT DEFAULT 1 NOT NULL
);

CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    id_categoria INT NOT NULL REFERENCES categoria(id_categoria),
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    idioma VARCHAR(50) NOT NULL,
    precio_venta NUMERIC(10, 0) NOT NULL,
    descuento NUMERIC(10, 0) NOT NULL DEFAULT 0,
    img MAX NOT NULL,
    estado TYPE VARCHAR(10) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE producto_mtg (
    id_producto INT PRIMARY KEY REFERENCES producto(id_producto) ON DELETE CASCADE,
    rareza VARCHAR(50) NOT NULL,
    edicion VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    foil BOOLEAN NOT NULL
);

-- Crear tabla de inventario
CREATE TABLE inventario(
    id_inventario SERIAL PRIMARY KEY,
    id_producto INT NOT NULL,
    precio_compra NUMERIC(10, 0) NOT NULL,
    cantidad INT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Crear tabla de productos por usuario
CREATE TABLE usuario_producto(
    id_usuario_producto SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Crear tabla de ventas
CREATE TABLE venta(
    id_venta SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Crear tabla de detalle de ventas
CREATE TABLE venta_detalle(
    id_venta_detalle SERIAL PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_venta INT NOT NULL,
    descuento INT NOT NULL,
    precio_final INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Insertar roles
INSERT INTO rol (descripcion) 
VALUES 
    ('Administrador'),
    ('Estandar');

-- Insertar categorías
INSERT INTO categoria (descripcion)
VALUES 
  ('single_mtg'),
  ('accesorios_tcg'),
  ('sellados_tcg'),
  ('figuras'),
  ('peluches_otros'),
  ('videojuegos_acc')
ON CONFLICT (descripcion) DO NOTHING; -- evita duplicados si ya existen

-- Nuevas categorías
INSERT INTO categoria (descripcion)
VALUES ('nombre_de_la_categoria')
ON CONFLICT (descripcion) DO NOTHING;

-- Insertar usuario admin
INSERT INTO usuario (nombre, apellido, rut, email, password)
VALUES  
    ('Juan', 'Pérez', '12345678-9', 'admin@admin.com', '123456');

-- Cambiar rol del usuario creado a Administrador
UPDATE usuario
SET id_rol = 1
WHERE id_usuario = 1;


--Pruebas:
-- Mostrar usuarios con su rol
SELECT 
    u.*,
    r.descripcion
FROM    
    usuario AS u 
    INNER JOIN rol AS r ON u.id_rol = r.id_rol;


SELECT * FROM rol;
SELECT * FROM usuario;
SELECT * FROM producto;

-- Insertar productos en producto:

INSERT INTO producto (id_categoria, nombre, descripcion, idioma, precio_venta, img, estado)
VALUES
(4, 'Rhystic Study', 'Whenever an opponent casts a spell, you may draw a card unless that player pays {1}.', 'Inglés EN', 110000, 'https://cards.scryfall.io/large/front/e/6/e6a06aad-6073-465b-89d0-8c4ae4307aff.jpg?1692933103', 'NM'),

(4, 'Cloud, Midgar Mercenary', 'When Cloud enters, search your library for an Equipment card, reveal it, put it into your hand, then shuffle. As long as Cloud is equipped, if an ability of Cloud or an Equipment attached to it triggers, that ability triggers an additional time.', 'Inglés EN', 21500, 'https://cards.scryfall.io/large/front/2/c/2cf7e8a3-fad7-413d-b17c-7519a9cf5fb5.jpg?1748705791', 'NM'),

(5, 'Commander box', 'Box para 100 cartas con hasta doble forro, también se puede colocar el comandante a la vista', 'N/A', 9990, 'https://img.kwcdn.com/product/fancy/5c86047e-91ea-4cfd-8cae-efa8543fe454.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp', 1),

(6, 'Bundle MTG Final Fantasy', 'Bundle con 9 sobres playboosters, 1 dado promocional y cartas promocionales', 'Inglés EN', 89990, 'https://cdnx.jumpseller.com/vudu-gaming/image/62983067/thumb/1079/1079?1745861019', 'NM'),

(7, 'Figura de Luffy', 'Figura coleccionable de luffy gear5 - no articulada, esta ehcha de PVC', 'N/A', 13990, 'https://down-cl.img.susercontent.com/file/sg-11134201-7qvfz-ljmoubsw12it3e', 1),

(8, 'Peluche de Pikachu', 'Peluche de 40cm de alto, hecho de algodón suave al tacto, ideal para cualquier edad', 'N/A', 19990, 'https://home.ripley.cl/store/Attachment/WOP/D175/2000400187835/2000400187835-4.jpg', 1),

(9, 'Zelda - Tears of the kingdom', 'The legend of Zelda - Tears of the kingdom, esta versión es la de Switch2, incluye mejoras visuales y de rendimiento', 'Multilenguaje', 79990, 'https://sniper.cl/cdn/shop/files/totknsw2.webp?v=1746163418', 1);

