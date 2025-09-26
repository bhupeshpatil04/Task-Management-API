const pool = require('../config/db');

exports.createTask = async (req, res, next) => {
    try {
        const { title, description, status, deadline, userId } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO Tasks (title, description, status, deadline, user_id) VALUES (?, ?, ?, ?, ?)',
            [title, description, status, deadline, userId]
        );
        res.status(201).json({ id: result.insertId, title, description, status, deadline, userId });
    } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
    try {
        const [rows] = await pool.execute(\`
            SELECT t.id, t.title, t.description, t.status, t.deadline, u.id as user_id, u.name, u.email
            FROM Tasks t
            JOIN Users u ON t.user_id = u.id
        \`);
        res.json(rows);
    } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const fields = req.body;
        const sets = [];
        const values = [];
        for (let key in fields) { sets.push(\`\${key}=?\`); values.push(fields[key]); }
        values.push(id);
        const [result] = await pool.execute(\`UPDATE Tasks SET \${sets.join(', ')} WHERE id=?\`, values);
        res.json({ updatedRows: result.affectedRows });
    } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [result] = await pool.execute('DELETE FROM Tasks WHERE id=?', [id]);
        res.json({ deletedRows: result.affectedRows });
    } catch (err) { next(err); }
};