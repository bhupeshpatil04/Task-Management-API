const pool = require('../config/db');

exports.createUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const [result] = await pool.execute('INSERT INTO Users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) { next(err); }
};

exports.getUsers = async (req, res, next) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Users');
        res.json(rows);
    } catch (err) { next(err); }
};