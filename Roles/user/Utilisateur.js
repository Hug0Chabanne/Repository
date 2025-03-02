app.get('/register', authenticateToken, (req, res) => {
    db.query('SELECT nom, prenom, email, username FROM users WHERE id = ?', [req.user.userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur' });

        if (results.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        res.json(results[0]);
    });
});
