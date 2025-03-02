app.put('/users/ban/:id', authenticateToken, (req, res) => {
    const userId = req.params.id;

    db.query('UPDATE users SET is_banned = 1 WHERE id = ?', [userId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur' });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'Utilisateur bloqué' });
    });
});