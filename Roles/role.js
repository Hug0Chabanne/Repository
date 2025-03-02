app.put('/user/up/:id', authenticateToken, (req, res) => {
    const userId = req.params.id;

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès interdit' });
    }


    db.query('UPDATE users SET role = "admin" WHERE id = ?', [userId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur' });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'L utilisateur a changé de role' });
    });
});