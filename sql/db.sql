drop database if exists examen;
create database examen;
use examen;

CREATE TABLE Usuario
(
    ID         INT auto_increment PRIMARY KEY,
    Nombre     VARCHAR(20)        NOT NULL,
    Apellido   VARCHAR(30)        NOT NULL,
    Usuario    VARCHAR(10) UNIQUE NOT NULL,
    Contraseña VARBINARY(60000)   NOT NULL,
    Edad       INT DEFAULT 0,
    Correo     VARCHAR(20) UNIQUE NOT NULL,
    PassSalt   VARBINARY(8)       NOT NULL
) COMMENT 'Contiene toda la información del usuario.';

DROP PROCEDURE IF EXISTS NuevoUsuario;
CREATE PROCEDURE NuevoUsuario(
    IN p_nombre VARCHAR(20),
    IN p_apellido VARCHAR(30),
    IN p_usuario VARCHAR(10),
    IN p_contra VARBINARY(60000),
    IN p_edad INT,
    IN p_correo VARCHAR(20),
    IN p_salt VARBINARY(8)
)
BEGIN
    IF p_edad IS NULL THEN
        INSERT INTO Usuario(Nombre, Apellido, Usuario, contraseña, Correo, PassSalt)
            VALUE (p_nombre, p_apellido, p_usuario, p_contra, p_correo, p_salt);
    ELSE
        INSERT INTO Usuario(Nombre, Apellido, Usuario, contraseña, Correo, Edad, PassSalt)
            VALUE (p_nombre, p_apellido, p_usuario, p_contra, p_correo, p_edad, p_salt);
    END IF;
END;

DROP PROCEDURE IF EXISTS VerificarUsuario;
CREATE PROCEDURE VerificarUsuario(
    IN p_usuario VARCHAR(10),
    IN p_contra VARBINARY(60000)
)
BEGIN
    DECLARE v_contra VARBINARY(60000);

    SELECT Contraseña
    INTO v_contra
    FROM Usuario
    WHERE Usuario = p_usuario;

    SELECT p_contra LIKE v_contra AS authed;
END;

DROP PROCEDURE IF EXISTS UserSalt;
CREATE PROCEDURE UserSalt(
    IN p_username VARCHAR(10)
)
BEGIN
    SELECT PassSalt
    FROM Usuario
    WHERE Usuario = p_username;
end;

DROP PROCEDURE IF EXISTS ExisteUsuario;
CREATE PROCEDURE ExisteUsuario(
    IN p_username VARCHAR(10)
)
BEGIN
    SELECT COUNT(*) as authed
    FROM Usuario
    WHERE Usuario = p_username;
END;

DROP PROCEDURE IF EXISTS ExisteCorreo;
CREATE PROCEDURE ExisteCorreo(
    IN p_correo VARCHAR(20)
)
BEGIN
    SELECT COUNT(*) as authed
    FROM Usuario
    WHERE Correo = p_correo;
END;

DROP PROCEDURE IF EXISTS BorrarUsuario;
CREATE PROCEDURE BorrarUsuario(
    IN p_username VARCHAR(10)
)
BEGIN
    DELETE
    FROM Usuario
    WHERE Usuario = p_username;
END;

DROP PROCEDURE IF EXISTS BuscarUsuario;
CREATE PROCEDURE BuscarUsuario(
    IN p_user VARCHAR(10)
)
BEGIN
    SELECT CONCAT(Nombre, ' ', Apellido) AS Name,
           Usuario                       AS Username,
           Edad                          AS Age
    FROM Usuario
    WHERE Usuario = p_user;
END;

DROP VIEW IF EXISTS InfoUsuario;
CREATE VIEW InfoUsuario AS
SELECT Nombre   AS Name,
       Apellido AS Surname,
       Usuario  AS Username,
       Edad     AS Age,
       Correo   AS Email
FROM Usuario;

DROP PROCEDURE IF EXISTS ModificarUsuario;
CREATE PROCEDURE ModificarUsuario(
    IN p_user VARCHAR(20),
    IN p_newName VARCHAR(20),
    IN p_newSurname VARCHAR(30),
    IN p_newUser VARCHAR(10),
    IN p_newAge INT,
    IN p_newMail VARCHAR(20)
)
BEGIN
    UPDATE Usuario
    SET Nombre   = IFNULL(p_newName, Nombre),
        Apellido = IFNULL(p_newSurname, Apellido),
        Usuario  = IFNULL(p_newUser, Usuario),
        Edad     = IFNULL(p_newAge, Edad),
        Correo   = IFNULL(p_newMail, Correo)
    WHERE Usuario = p_user;
END;
