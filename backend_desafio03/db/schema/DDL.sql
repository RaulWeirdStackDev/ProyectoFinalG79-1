-- Active: 1737596334296@@127.0.0.1@5432@proy001
CREATE DATABASE proy001;
\c proy001;
CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) UNIQUE NOT NULL,
    estado INT DEFAULT 1 NOT NULL
);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    rut     VARCHAR(10) NOT NULL,
    img     VARCHAR(MAX),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_rol INT NOT NULL DEFAULT 2,
    estado INT DEFAULT 1 NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

CREATE TABLE direccion(
    id_direccion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL, 
    direccion VARCHAR(100) NOT NULL,
    numero INT,
    anexo   VARCHAR(100),
    id_region INT NOT NULL, 
    id_comuna INT NOT NULL, 
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    FOREIGN KEY (id_region) REFERENCES region(id_region)
    FOREIGN KEY (id_comuna) REFERENCES comuna(id_comuna)
);

CREATE TABLE region(
    id_direccion SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) UNIQUE NOT NULL
)

CREATE TABLE comuna(
    id_comuna SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) UNIQUE NOT NULL
)

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    descripcion VARCHAR(100) UNIQUE NOT NULL,
    estado INT DEFAULT 1 NOT NULL
);

CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    id_categoria INT NOT NULL, 
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    idioma VARCHAR(50) NOT NULL,
    rareza VARCHAR(50) NOT NULL,
    edicion VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    foil BOOLEAN NOT NULL,
    precio_venta NUMERIC(10, 0) NOT NULL,
    descuento NUMERIC(10, 0) NOT NULL DEFAULT 0,
    url VARCHAR(150) NOT NULL,
    estado INT NOT NULL DEFAULT 1,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE inventario(
    id_inventario SERIAL PRIMARY KEY,
    id_producto INT NOT NULL,
    precio_compra NUMERIC(10, 0) NOT NULL,
    cantidad INT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE usuario_producto(
    id_usuario_producto SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE venta(
    id_venta SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

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


INSERT INTO 
    rol (descripcion) 
VALUES 
    ('Administrador'),
    ('Estandar') ;

INSERT INTO 
    categoria (descripcion)
VALUES
    ('Video Juegos'),
    ('Cartas Magic'),
    ('Peluches');


INSERT INTO 
    usuario (nombre, apellido, email, password)
VALUES  
    ('juan', 'perez', 'admin@admin.com', '123456');

UPDATE usuario
SET id_rol = 1
WHERE id_usuario = 1

SELECT 
    u.*,
    r.descripcion
FROM    
    usuario as u 
    inner join rol as r ON u.id_rol = r.id_rol