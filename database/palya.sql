DROP DATABASE IF EXISTS baim2115;
CREATE DATABASE baim2115;
USE baim2115;
CREATE USER IF NOT EXISTS 'anna'@'localhost' IDENTIFIED BY 'AnAn';
GRANT ALL PRIVILEGES ON *.* TO 'anna'@'localhost';

-- letrehozom a kert adattablakat
-- tipus, oraBer, cim, leiras
-- ----------------------------PALYA---------------------------------
CREATE TABLE IF NOT EXISTS palya(
        palyaID INT PRIMARY KEY AUTO_INCREMENT,
        tipus VARCHAR(50) NOT NULL,
        oraBer INT NOT NULL,
        cim VARCHAR(50) NOT NULL,
        leiras VARCHAR(150) NOT NULL
        );
-- ----------------------------FELHASZNALO---------------------------------
CREATE TABLE IF NOT EXISTS felhasznalo(
        felhID INT PRIMARY KEY AUTO_INCREMENT,
        hataskor VARCHAR(10),
        username VARCHAR(50) UNIQUE,
        password VARCHAR(100)
        );
-- ----------------------------FOGLALAS---------------------------------
CREATE TABLE IF NOT EXISTS foglalas(
        foglalasID INT PRIMARY KEY AUTO_INCREMENT,
        ora INT,
        nap INT,
        honap INT,
        palyaID INT,
        FOREIGN KEY(palyaID) REFERENCES palya(palyaID),
        username VARCHAR(50),
        FOREIGN KEY(username) REFERENCES felhasznalo(username)
        );
-- ----------------------------FENYEKEP---------------------------------
CREATE TABLE IF NOT EXISTS fenykep(
        kepID INT PRIMARY KEY AUTO_INCREMENT,
        files VARCHAR(1000),
        azonosito INT,
        FOREIGN KEY(azonosito) REFERENCES palya(palyaID)
        );

INSERT INTO felhasznalo(hataskor,username) VALUES ('admin','Daniel'),
('admin','Anna'), ('admin','Timi');