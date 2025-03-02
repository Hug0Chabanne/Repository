// // serveur.js
// const express = require('express');
// const app = express();
// const bcrypt = require('bcryptjs');
// const password = 'hugo';  // mot de passe à hacher
// const saltRounds = 10;
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2');




// bcrypt.hash(password, saltRounds, (err, hash) => {
//     if (err) throw err;

//     // Insérez `hash` dans la base de données
//     const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
//     db.query(query, ['Hugo', hash], (err, result) => {
//         if (err) throw err;
//         console.log('Utilisateur ajouté');
//     });
// });


// const port = 3000;

// // Définir un port
// const PORT = 3000;


// app.use(express.json());


// // Middleware pour répondre à une requête GET
// app.get('/', (req, res) => {
//     res.send('jsp');
// });


// // Route pour "/test"
// app.get('/test', (req, res) => {
//     res.send('hello');
// });



// app.get('/login', (req, res) => {
//     res.send(token);
// });





// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root', // Remplacez par votre utilisateur MySQL
//     password: '', // Remplacez par votre mot de passe MySQL
//     database: 'projetexpress' // Remplacez par votre nom de base de données
// });

// // Vérifier la connexion à la base de données
// db.connect(err => {
//     if (err) {
//         console.error('Erreur de connexion à la base de données :', err.stack);
//     } else {
//         console.log('Connecté à la base de données');
//     }
// });

// // Route de connexion
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     // Vérification des informations d'identification dans la base de données
//     db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Erreur interne du serveur' });
//         }

//         // Si l'utilisateur n'existe pas
//         if (results.length === 0) {
//             return res.status(400).json({ message: 'Bad credentials / Incorrect user' });
//         }

//         const user = results[0];

//         // Vérification du mot de passe
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur interne du serveur' });
//             }

//             if (!isMatch) {
//                 return res.status(400).json({ message: 'mot de passe n est pas ok' });

//             }

//             // Création du token JWT
//             const token = jwt.sign(
//                 { userId: user.id, username: user.username },
//                 'gutentag', // Remplacez par une clé secrète robuste
//                 { expiresIn: '1h' }  // Expiration du token (ici 1 heure)
//             );

//             // Renvoi du token JWT
//             res.json({ token });
//         });





//     });
// });









// // Démarrer le serveur
// app.listen(PORT, () => {
//     console.log(`Serveur en écoute sur http://localhost:${PORT}`);
// });
























































const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const PORT = 3000;
const SECRET_KEY = 'votre_cle_secrete_tres_longue_et_complexe'; // À remplacer par une vraie clé sécurisée

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Remplacez par votre utilisateur MySQL
    password: '', // Remplacez par votre mot de passe MySQL
    database: 'projetexpress' // Remplacez par votre nom de base de données
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err.stack);
    } else {
        console.log('✅ Connecté à la base de données');
    }
});

// Page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API');
});

// Route de test
app.get('/test', (req, res) => {
    res.send('hello');
});

// Route pour s'inscrire (optionnelle)
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

// Route de connexion
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

        // Vérification du mot de passe
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur interne du serveur' });
            }

            if (!isMatch) {
                return res.status(400).json({ message: 'Mot de passe incorrect' });
            }

            // Création du token JWT
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.json({ token });
        });
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
