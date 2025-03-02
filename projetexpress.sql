-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 02 mars 2025 à 22:41
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projetexpress`
--

-- --------------------------------------------------------

--
-- Structure de la table `table`
--

CREATE TABLE `table` (
  `id` int(100) NOT NULL,
  `jsp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'Hugo', 'hugo'),
(2, 'Hugo', '$2b$10$btmP829XPplk82VRTgE3B.WmXj/37j637VmKiMbOsRc2beiTFcPYe'),
(3, 'Hugo', '$2b$10$SmIYav3eCoc8s5DMGFn0q.jXwqdjBUd1NuGEpihC9p2l/Eg6J0SXa'),
(4, 'Hugo', '$2b$10$8GaErUWKavxN.wbEKjMXXO/I/EBL.fzF92gO49wOwNAGMk88/c31i'),
(5, 'Hugo', '$2b$10$TFbotsrU1CRXdmo8mBL7teobIGsGiknx8XYXaZRDriUEZX1ypF71W'),
(6, 'Hugo', '$2b$10$LcxHUKN5AdkpgCwyonwan.IypUoGrRfAuUvSYDTOBBaBUucWo.jAe'),
(7, 'Hugo', '$2b$10$ULPyAGOGQ.ELgAmGJ/yW..8ipUuPtjH.9.xo1QJx8rBm9qdJI35qW'),
(8, 'Hugo', '$2b$10$9EvjCXRD71kf1ixi5ChwjOAAaon2aw0pp.x21sQ.WdZzz1JWk2squ');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `table`
--
ALTER TABLE `table`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `table`
--
ALTER TABLE `table`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
