app.get('/users/list', authenticateToken, (req, res) => {
    db.query('SELECT id, username, email, is_banned FROM users', (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur' });

        res.json({ users: results });
    });
});