const db = require('../config/db');
const { validationResult } = require('express-validator');

exports.getAllLowiska = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [lowiska] = await db.query(
            `SELECT 
                    l.id, l.nazwa, l.lokalizacja, 
                    t.nazwa AS typ_lowiska 
                FROM Lowisko l 
                JOIN Typy_Lowisk t ON l.Typy_Lowisk_id = t.id 
                ORDER BY l.nazwa ASC
                LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        const [countResult] = await db.query('SELECT COUNT(*) as total FROM Lowisko');
        const total = countResult[0].total;
        
        res.json({
            lowiska,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas pobierania łowisk!' });
    }
};

exports.getLowisko = async (req, res) => {
    try {
        const { id } = req.params;

        const [lowisko] = await db.query(
            `SELECT 
                    l.id, l.nazwa, l.lokalizacja, l.opis, l.Typy_Lowisk_id,
                    t.nazwa AS typ_lowiska 
                FROM Lowisko l 
                JOIN Typy_Lowisk t ON l.Typy_Lowisk_id = t.id
                WHERE l.id = ?`,
            [id]
        );

        if (lowisko.length === 0) {
            return res.status(404).json({ error: 'Łowisko nie zostało znalezione!' });
        }

        res.json({
            lowisko: lowisko[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas pobierania łowiska!' });
    }
};

exports.createLowisko = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nazwa, lokalizacja, typ, opis } = req.body;
    
        const [existing] = await db.query(
            'SELECT id FROM Lowisko WHERE nazwa = ? AND lokalizacja = ?',
            [nazwa, lokalizacja]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: 'Łowisko o podanej nazwie i lokalizacji już istnieje!' });
        }

        const [result] = await db.execute(
            `INSERT INTO Lowisko (nazwa, lokalizacja, Typy_Lowisk_id, opis) 
             VALUES (?, ?, ?, ?)`,
            [nazwa, lokalizacja, typ, opis]
        );

        res.status(201).json({ 
            message: 'Łowisko zostało utworzone!', 
            lowiskoId: result.insertId 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas tworzenia łowiska!' });
    }
};  

exports.updateLowisko = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.rola;

        const [existing] = await db.query(
            'SELECT 1 FROM Lowisko WHERE id = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: 'Łowisko nie znalezione' });
        }

        const { nazwa, lokalizacja, typ, opis } = req.body;

        const [duplicate] = await db.query(
            'SELECT 1 FROM Lowisko WHERE nazwa = ? AND lokalizacja = ? AND id != ?',
            [nazwa, lokalizacja, id]
        );

        if (duplicate.length > 0) {
            return res.status(400).json({ 
                error: 'Łowisko o tej nazwie i lokalizacji już istnieje' 
            });
        }

        await db.execute(
            `UPDATE Lowisko SET nazwa = ?, lokalizacja = ?, Typy_Lowisk_id = ?, opis = ? WHERE id = ?`,
            [nazwa, lokalizacja, typ, opis, id]
        );

        res.json({ message: 'Łowisko zostało zaktualizowane!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas aktualizacji łowiska!' });
    }
};

exports.deleteLowisko = async (req, res) => {
    try {
        const { id } = req.params;

        const [existing] = await db.query(
            'SELECT 1 FROM Lowisko WHERE id = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: 'Łowisko nie znalezione' });
        }

        const [polowy] = await db.query(
            'SELECT COUNT(*) as count FROM Polow WHERE Lowisko_id = ?',
            [id]
        );

        if (polowy[0].count > 0) {
            return res.status(400).json({ 
                error: `Nie można usunąć łowiska, które używane jest w połowach!`,
            });
        }

        await db.query('DELETE FROM Lowisko WHERE id = ?', [id]);
        
        res.json({ message: 'Łowisko zostało usunięte!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas usuwania łowiska!' });
    }
};

exports.getTypyLowisk = async (req, res) => {
    try {
        const [typy] = await db.query(
            'SELECT id, nazwa FROM Typy_Lowisk ORDER BY nazwa ASC'
        );
        
        res.json({ typy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera podczas pobierania typów łowisk!' });
    }
};