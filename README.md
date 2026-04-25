CREATE TABLE usuarios (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS productos (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    preciodecosto DECIMAL(10,0) NOT NULL,
    preciodeventa DECIMAL(10,0) NOT NULL,
    cantidad INT(11) NOT NULL,
    fotografia VARCHAR(500) NOT NULL
);
