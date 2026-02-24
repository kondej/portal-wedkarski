const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { imie, nazwisko, email, haslo } = req.body;

    try {
        const [existingUser] = await db.execute('SELECT id FROM Uzytkownik WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Użytkownik już istnieje!' });
        }

        const hashedPassword = await bcrypt.hash(haslo, 10);

        const [roleResult] = await db.query('SELECT id FROM Rola WHERE nazwa = ?', ['uzytkownik']);

        await db.execute('INSERT INTO Uzytkownik (imie, nazwisko, email, Rola_id, haslo) VALUES (?, ?, ?, ?, ?)', [imie, nazwisko, email, roleResult[0].id, hashedPassword]);

        res.status(201).json({ message: 'Rejestracja zakończona sukcesem!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas rejestracji!' });
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, haslo } = req.body;

    try {
        const [user] = await db.query(
            `SELECT u.id, u.email, u.haslo, r.nazwa as rola
             FROM Uzytkownik u
             JOIN Rola r ON u.Rola_id = r.id
             WHERE u.email = ?`,
            [email]
        );

        if (user.length === 0) {
            return res.status(401).json({ error: 'Nieprawidłowy email lub hasło!' });
        }

        const isPasswordValid = await bcrypt.compare(haslo, user[0].haslo);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Nieprawidłowy email lub hasło!' });
        }

        const token = jwt.sign(
            { 
                id: user[0].id, 
                email: user[0].email,
                rola: user[0].rola
                
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
            message: 'Logowanie zakończone sukcesem!', 
            token,
            user: {
                id: user[0].id,
                email: user[0].email,
                imie: user[0].imie,
                nazwisko: user[0].nazwisko,
                rola: user[0].rola
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas logowania!' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const [user] = await db.execute(
            `SELECT u.id, u.imie, u.nazwisko, u.email, r.nazwa as rola
             FROM Uzytkownik u
             JOIN Rola r ON u.Rola_id = r.id
             WHERE u.email = ?`,
            [req.user.email]
        );

        if (user.length === 0) {
            return res.status(404).json({ error: 'Użytkownik nie znaleziony!' });
        }

        res.json({ user: user[0] });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas pobierania danych użytkownika!' });
    }
}