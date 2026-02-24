const db = require('../config/db');
const { validationResult } = require('express-validator');

exports.getAllPolowy = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        let [polowy] = await db.query(
          `SELECT 
                  p.id, p.data, p.waga, p.Lowisko_id,
                  u.imie, u.nazwisko,
                  l.nazwa as lowisko_nazwa,
                  g.nazwa as gatunek_nazwa
              FROM Polow p
              JOIN Uzytkownik u ON p.Uzytkownik_id = u.id
              JOIN Lowisko l ON p.Lowisko_id = l.id
              JOIN Gatunek g ON p.Gatunek_id = g.id
              ORDER BY p.data DESC 
              LIMIT ? OFFSET ?
          `, [limit, offset]
        );

        const [countResult] = await db.query(
          `SELECT COUNT(*) as total 
            FROM Polow`
        );
        const total = countResult[0].total;

        res.json({
            polowy,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
          }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas pobierania danych!' });
    }
};

exports.getAllUserPolowy = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const userId = req.user.id;

        let [polowy] = await db.query(
          `SELECT 
                  p.id, p.data, p.waga, p.Lowisko_id,
                  u.imie, u.nazwisko,
                  l.nazwa as lowisko_nazwa,
                  g.nazwa as gatunek_nazwa
              FROM Polow p
              JOIN Uzytkownik u ON p.Uzytkownik_id = u.id
              JOIN Lowisko l ON p.Lowisko_id = l.id
              JOIN Gatunek g ON p.Gatunek_id = g.id
              WHERE p.Uzytkownik_id = ?
              ORDER BY p.data DESC 
              LIMIT ? OFFSET ?
          `, [userId, limit, offset]
        );

        const [countResult] = await db.query(
          `SELECT COUNT(*) as total 
            FROM Polow p
            WHERE p.Uzytkownik_id = ?`,
          [userId]
        );
        const total = countResult[0].total;

        res.json({
            polowy,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
          }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas pobierania danych!' });
    }
};

exports.getPolow = async (req, res) => {
    try {
      const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.rola;

        const [polow] = await db.query(
          `
            SELECT 
                p.*, 
                u.imie, u.nazwisko, u.email,
                l.nazwa as lowisko_nazwa, l.lokalizacja as lowisko_lokalizacja,
                g.nazwa as gatunek_nazwa,
                t.nazwa as typ_lowiska
            FROM Polow p
            JOIN Uzytkownik u ON p.Uzytkownik_id = u.id
            JOIN Lowisko l ON p.Lowisko_id = l.id
            JOIN Gatunek g ON p.Gatunek_id = g.id
            JOIN Typy_Lowisk t ON l.Typy_Lowisk_id = t.id
            WHERE p.id = ?
        `, [id]);

        if (polow.length === 0) {
            return res.status(404).json({ error: 'Połów nie znaleziony!' });
        }

        if (userRole !== 'administrator' && polow[0].Uzytkownik_id !== userId) {
            return res.status(403).json({ error: 'Brak uprawnień do tego zasobu!' });
        }

        res.json({ polow: polow[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas pobierania danych!' });
    }
};

exports.createPolow = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { data, waga, lowisko, gatunek, uzytkownik } = req.body;

        const [result] = await db.query(
            `INSERT INTO Polow (data, waga, uzytkownik_id, lowisko_id, gatunek_id)
             VALUES (?, ?, ?, ?, ?)`,
            [data, waga, uzytkownik, lowisko, gatunek]
        );

        res.status(201).json({ 
            message: 'Połów został dodany!', 
            polowId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas tworzenia połowu!' });
    }
};

exports.updatePolow = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.rola;

    const [existing] = await db.query(
      'SELECT uzytkownik_id FROM Polow WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Połów nie znaleziony!' });
    }
    
    const { data, waga, lowisko, gatunek } = req.body;

    await db.query(
      `UPDATE Polow 
       SET data = ?, waga = ?, lowisko_id = ?, gatunek_id = ?
       WHERE id = ?`,
      [data, waga, lowisko, gatunek, id]
    );

    res.json({ message: 'Połów został zaktualizowany!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd serwera podczas aktualizacji połowu!' });
  }
};

exports.deletePolow = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.rola;

    const [existing] = await db.query(
      'SELECT uzytkownik_id FROM Polow WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Połów nie znaleziony!' });
    }

    await db.query('DELETE FROM Polow WHERE id = ?', [id]);

    res.json({ message: 'Połów został usunięty!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd serwera podczas usuwania połowu!' });
  }
};