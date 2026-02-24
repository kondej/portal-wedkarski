const db = require('../config/db');
const { validationResult } = require('express-validator');

exports.getAllGatunki = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [gatunki] = await db.query(
            `SELECT 
                    id, nazwa 
                FROM Gatunek
                LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        const [countResult] = await db.query('SELECT COUNT(*) as total FROM Gatunek');
        const total = countResult[0].total;

        res.json({ 
            gatunki,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas pobierania gatunków!' });
    }
};

exports.getGatunek = async (req, res) => {
  try {
    const { id } = req.params;

    const [gatunek] = await db.query('SELECT nazwa FROM Gatunek WHERE id = ?', [id]);

    if (gatunek.length === 0) {
        return res.status(404).json({ error: 'Gatunek nie znaleziony!' });
    }

    res.json({ 
        gatunek: gatunek[0], 
    });
  } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas pobierania gatunku!' });
  }
};

exports.createGatunek = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nazwa } = req.body;

    try {
        const [existingGatunek] = await db.query(
            'SELECT id FROM Gatunek WHERE nazwa = ?',
            [nazwa]
        );

        if (existingGatunek.length > 0) {
            return res.status(400).json({ error: 'Gatunek o podanej nazwie już istnieje!' });
        }

        await db.execute(
            'INSERT INTO Gatunek (nazwa) VALUES (?)',
            [nazwa]
        );

        res.status(201).json({ message: 'Gatunek został dodany!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas dodawania gatunku!' });
    }
};

exports.updateGatunek = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { nazwa } = req.body;

    try {
        const [existingGatunek] = await db.query(
            'SELECT 1 FROM Gatunek WHERE id = ?',
            [id]
        );

        if (existingGatunek.length === 0) {
            return res.status(404).json({ error: 'Gatunek nie znaleziony!' });
        }

        const [duplicate] = await db.query(
            'SELECT 1 FROM Gatunek WHERE nazwa = ? AND id != ?',
            [nazwa, id]
        );
        
        if (duplicate.length > 0) {
            return res.status(400).json({ 
                error: 'Gatunek o tej nazwie już istnieje!' 
            });
        }

        await db.query(
            'UPDATE Gatunek SET nazwa = ? WHERE id = ?',
            [nazwa, id]
        );

        res.json({ message: 'Gatunek został zaktualizowany!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas aktualizacji gatunku!' });
    }
};

exports.deleteGatunek = async (req, res) => {
    try {
        const { id } = req.params;

        const [existingGatunek] = await db.query(
            'SELECT id FROM Gatunek WHERE id = ?',
            [id]
        );

        if (existingGatunek.length === 0) {
            return res.status(404).json({ error: 'Gatunek nie znaleziony!' });
        }

        const [polowy] = await db.query(
            'SELECT COUNT(*) as count FROM Polow WHERE Gatunek_id = ?',
            [id]
        );

        if (polowy[0].count > 0) {
            return res.status(400).json({ 
                error: 'Nie można usunąć gatunku, który jest używany w połowach!' 
            });
        }

        await db.execute(
            'DELETE FROM Gatunek WHERE id = ?',
            [id]
        );

        res.json({ message: 'Gatunek został usunięty!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas usuwania gatunku!' });
    }
};