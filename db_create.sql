-- Created by Redgate Data Modeler (https://datamodeler.redgate-platform.com)
-- Last modification date: 2025-12-16 20:47:32.797

-- tables
-- Table: Gatunek
CREATE TABLE Gatunek (
    id int  NOT NULL AUTO_INCREMENT,
    nazwa varchar(64)  NOT NULL,
    CONSTRAINT Gatunek_pk PRIMARY KEY (id)
);

-- Table: Lowisko
CREATE TABLE Lowisko (
    id int  NOT NULL AUTO_INCREMENT,
    Typy_Lowisk_id int  NOT NULL,
    nazwa varchar(128)  NOT NULL,
    opis varchar(255)  NOT NULL,
    lokalizacja varchar(128)  NOT NULL,
    CONSTRAINT Lowisko_pk PRIMARY KEY (id)
);

-- Table: Polow
CREATE TABLE Polow (
    id int  NOT NULL AUTO_INCREMENT,
    Uzytkownik_id int  NOT NULL,
    Lowisko_id int  NOT NULL,
    Gatunek_id int  NOT NULL,
    waga int  NOT NULL,
    data date  NOT NULL,
    CONSTRAINT Polow_pk PRIMARY KEY (id)
);

-- Table: Rola
CREATE TABLE Rola (
    id int  NOT NULL AUTO_INCREMENT,
    nazwa varchar(32)  NOT NULL,
    CONSTRAINT Rola_pk PRIMARY KEY (id)
);

-- Table: Typy_Lowisk
CREATE TABLE Typy_Lowisk (
    id int  NOT NULL AUTO_INCREMENT,
    nazwa varchar(64)  NOT NULL,
    CONSTRAINT Typy_Lowisk_pk PRIMARY KEY (id)
);

-- Table: Uzytkownik
CREATE TABLE Uzytkownik (
    id int  NOT NULL AUTO_INCREMENT,
    imie varchar(64)  NOT NULL,
    nazwisko varchar(64)  NOT NULL,
    email varchar(128)  NOT NULL,
    Rola_id int  NOT NULL,
    haslo varchar(255)  NOT NULL,
    CONSTRAINT Uzytkownik_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Lowisko_Typy_Lowisk (table: Lowisko)
ALTER TABLE Lowisko ADD CONSTRAINT Lowisko_Typy_Lowisk FOREIGN KEY Lowisko_Typy_Lowisk (Typy_Lowisk_id)
    REFERENCES Typy_Lowisk (id);

-- Reference: Polow_Gatunek (table: Polow)
ALTER TABLE Polow ADD CONSTRAINT Polow_Gatunek FOREIGN KEY Polow_Gatunek (Gatunek_id)
    REFERENCES Gatunek (id);

-- Reference: Polow_Lowisko (table: Polow)
ALTER TABLE Polow ADD CONSTRAINT Polow_Lowisko FOREIGN KEY Polow_Lowisko (Lowisko_id)
    REFERENCES Lowisko (id);

-- Reference: Polow_Uzytkownik (table: Polow)
ALTER TABLE Polow ADD CONSTRAINT Polow_Uzytkownik FOREIGN KEY Polow_Uzytkownik (Uzytkownik_id)
    REFERENCES Uzytkownik (id);

-- Reference: Uzytkownik_Rola (table: Uzytkownik)
ALTER TABLE Uzytkownik ADD CONSTRAINT Uzytkownik_Rola FOREIGN KEY Uzytkownik_Rola (Rola_id)
    REFERENCES Rola (id);

-- End of file.

