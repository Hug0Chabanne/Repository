


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const PORT = 3000;
const SECRET_KEY = 'votre_cle_secrete_tres_longue_et_complexe'; 


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'projetexpress' 
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err.stack);
    } else {
        console.log('✅ Connecté à la base de données');
    }
});


app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API');
});


app.get('/test', (req, res) => {
    res.send('hello');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur et un mot de passe' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors du hashage du mot de passe' });
        }

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hash], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
            }
            res.json({ message: 'Utilisateur inscrit avec succès' });
        });
    });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur et un mot de passe' });
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur interne du serveur' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Bad credentials / Incorrect user' });
        }

        const user = results[0];

      
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur interne du serveur' });
            }

            if (!isMatch) {
                return res.status(400).json({ message: 'Mot de passe incorrect' });
            }

          
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.json({ token });
        });
    });
});


app.listen(PORT, () => {
    console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
