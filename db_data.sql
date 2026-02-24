SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

INSERT INTO Rola (nazwa) VALUES 
('administrator'), 
('uzytkownik'),
('gosc');

INSERT INTO Typy_Lowisk (nazwa) VALUES 
('Jezioro'), 
('Rzeka'), 
('Staw Komercyjny'), 
('Zalew'), 
('Morze'),
('Glinianka');

INSERT INTO Gatunek (nazwa) VALUES 
('Szczupak'), 
('Karp'), 
('Okoń'), 
('Sandacz'), 
('Leszcz'), 
('Płoć'), 
('Sum'), 
('Węgorz'), 
('Amur'), 
('Tołpyga'), 
('Lin'), 
('Karaś'), 
('Pstrąg Potokowy'), 
('Łosoś'),
('Boleń');

-- wszystkie hasła: 123456
INSERT INTO Uzytkownik (imie, nazwisko, email, Rola_id, haslo) VALUES 
('Jan', 'Kowalski', 'jan.kowalski@poczta.pl', 1, '$2b$10$yikXDqJupz.6L3tS1ocsbOWIUsD6RKTuVttGJrLb70GXPttp7moHW'), -- Administrator
('Anna', 'Nowak', 'anna.nowak@poczta.pl', 2, '$2b$10$gqruBjYrzHVDp7RoUzjHX.dAEeGtU8RFuE8rdmqTrbvxkeQZLuygy'),
('Piotr', 'Wiśniewski', 'piotr.wisniewski@poczta.pl', 2, '$2b$10$S2.QMij6cwbv1prpcn5u3.z.Qz57SbOMpExtcWECTZMXKGNQjN.HC'),
('Krzysztof', 'Wójcik', 'krzysztof.wojcik@poczta.pl', 2, '$2b$10$8W1Hnr0aSqNMs8oBs123f.Pg2pNB0QfxT7i8jM2OUhq9knB6DDKjG'),
('Maria', 'Kamińska', 'maria.kaminska@poczta.pl', 2, '$2b$10$Nxff1LcvDupfx1wkiZjKz./BhQXPl9bARGuJg0nBz2hj7/rPbPgSq');

INSERT INTO Lowisko (Typy_Lowisk_id, nazwa, opis, lokalizacja) VALUES 
(1, 'Jezioro Śniardwy', 'Największe jezioro w Polsce, idealne na szczupaka.', 'Mazury'),
(2, 'Rzeka Wisła - Odcinek Warszawa', 'Dobre miejsce na sandacza i suma.', 'Warszawa'),
(4, 'Zalew Zegrzyński', 'Popularne miejsce wypoczynku i wędkarstwa.', 'Serock'),
(1, 'Jezioro Hańcza', 'Najgłębsze jezioro, czysta woda.', 'Suwalszczyzna'),
(2, 'Rzeka Odra', 'Odcinek graniczny, bogaty w ryby spokojnego żeru.', 'Słubice'),
(5, 'Bałtyk - Władysławowo', 'Połowy z kutra na dorsza (historycznie) i łososia.', 'Władysławowo'),
(3, 'Stawy Milickie', 'Rezerwat przyrody i hodowla karpia.', 'Dolina Baryczy'),
(2, 'Rzeka San', 'Kraina pstrąga i lipienia.', 'Bieszczady'),
(1, 'Jezioro Białe', 'Turystyczne jezioro, dużo pomostów.', 'Okuninka'),
(6, 'Glinianka Szczęśliwice', 'Miejski staw w parku.', 'Warszawa Ochota'),
(4, 'Zalew Soliński', 'Malowniczy zbiornik w górach.', 'Solina'),
(2, 'Rzeka Warta', 'Dobre spinningowanie.', 'Poznań'),
(3, 'Łowisko Specjalne "Okoń"', 'Płatne łowisko z gwarancją ryby.', 'Piaseczno'),
(1, 'Jezioro Drawsko', 'Drugie co do głębokości jezioro w Polsce.', 'Czaplinek'),
(2, 'Rzeka Dunajec', 'Spływy tratwami i wędkarstwo muchowe.', 'Pieniny');

INSERT INTO Polow (Uzytkownik_id, Lowisko_id, Gatunek_id, waga, data) VALUES 
(1, 1, 1, 3200, '2025-05-01'),
(2, 3, 2, 4500, '2025-06-15'),
(3, 2, 7, 12000, '2025-07-20'),
(4, 4, 4, 2800, '2025-08-10'),
(5, 8, 13, 950, '2025-04-25'),
(1, 11, 3, 600, '2025-09-12'),
(2, 5, 14, 8200, '2025-10-05'),
(3, 7, 2, 5100, '2025-08-20'),
(4, 10, 12, 550, '2025-05-30'),
(5, 6, 6, 200, '2025-04-10'),
(1, 13, 9, 7000, '2025-07-15'),
(2, 1, 1, 2100, '2025-05-20'),
(3, 14, 3, 400, '2025-06-05'),
(4, 15, 15, 2300, '2025-09-15'),
(5, 9, 11, 1400, '2025-07-01'),
(1, 2, 4, 3500, '2025-10-20'),
(2, 12, 1, 4100, '2025-11-05'),
(3, 5, 14, 6500, '2025-11-15'),
(4, 7, 2, 3900, '2025-08-01'),
(5, 4, 5, 1300, '2025-09-30'),
(1, 8, 13, 1100, '2025-05-10'),
(2, 3, 4, 2600, '2025-10-12');

