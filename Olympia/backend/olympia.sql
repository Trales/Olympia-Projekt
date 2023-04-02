-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2023 at 09:01 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `olympia`
--

-- --------------------------------------------------------

--
-- Table structure for table `athleten`
--

CREATE TABLE `athleten` (
  `athletenID` int(3) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `landID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `athleten`
--

INSERT INTO `athleten` (`athletenID`, `Name`, `landID`) VALUES
(1, 'John Doe', 1),
(2, 'Max Mustermann', 2),
(3, 'Chantal Schoe', 3),
(4, 'Bela Schettina', 5),
(5, 'Ash Ketchum', 6),
(6, 'Baldur Popescu', 7),
(7, 'Bakari Strickland', 4),
(8, 'Andre Kim', 8),
(9, 'Devon Frye', 9),
(10, 'Wally Foster', 11),
(11, 'Alyce Rush', 10),
(12, 'Juanita Baxter', 12),
(13, 'Joan Pruitt', 13),
(14, 'Lyndon Dunlap', 15),
(15, 'Kathy Wells', 14),
(16, 'Filiberto Juarez', 11),
(17, 'Beverly Wallace', 16),
(18, 'Arline Maxwell', 17),
(19, 'Olive Vaughn', 18),
(20, 'Edward David', 19),
(21, 'Eula Miles', 20),
(22, 'Guy Taylor', 22),
(23, 'Mikel Dickson', 23),
(24, 'Miles Mccann', 25),
(25, 'Maxwell Frederick', 21),
(26, 'Peggy Woods', 26),
(27, 'Isaias Garza', 1),
(28, 'Delores Dorsey', 2),
(29, 'Kyle Cox', 3),
(30, 'Galen Friedman', 5),
(31, 'Larry Hickman', 10);

-- --------------------------------------------------------

--
-- Table structure for table `bewertung`
--

CREATE TABLE `bewertung` (
  `bewertungID` int(10) NOT NULL,
  `athletenID` int(10) NOT NULL,
  `sportartID` int(10) NOT NULL,
  `punktzahl` varchar(10) DEFAULT NULL,
  `medaille` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `bewertung`
--

INSERT INTO `bewertung` (`bewertungID`, `athletenID`, `sportartID`, `punktzahl`, `medaille`) VALUES
(1, 1, 5, '70', 'Gold'),
(28, 25, 1, NULL, NULL),
(29, 2, 3, NULL, NULL),
(30, 3, 2, NULL, NULL),
(31, 4, 3, NULL, NULL),
(32, 5, 4, NULL, NULL),
(33, 6, 1, NULL, NULL),
(34, 7, 2, NULL, NULL),
(35, 8, 2, NULL, NULL),
(36, 9, 3, NULL, NULL),
(37, 10, 4, NULL, NULL),
(38, 11, 5, NULL, NULL),
(39, 12, 1, NULL, NULL),
(40, 13, 2, NULL, NULL),
(41, 14, 3, NULL, NULL),
(42, 15, 3, NULL, NULL),
(43, 16, 4, NULL, NULL),
(44, 17, 5, NULL, NULL),
(45, 18, 1, NULL, NULL),
(46, 19, 2, NULL, NULL),
(47, 20, 3, NULL, NULL),
(48, 21, 4, NULL, NULL),
(49, 22, 4, NULL, NULL),
(50, 23, 5, NULL, NULL),
(51, 24, 1, NULL, NULL),
(52, 25, 2, NULL, NULL),
(53, 26, 1, NULL, NULL),
(54, 27, 4, NULL, NULL),
(55, 28, 4, NULL, NULL),
(56, 29, 5, NULL, NULL),
(57, 30, 1, NULL, NULL),
(58, 31, 2, NULL, NULL),
(59, 4, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `land`
--

CREATE TABLE `land` (
  `landID` int(3) NOT NULL,
  `land` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `land`
--

INSERT INTO `land` (`landID`, `land`) VALUES
(1, 'Armenien'),
(2, 'Belgien'),
(3, 'Bulgarien'),
(4, 'Daenemark'),
(5, 'Deutschland'),
(6, 'Frankreich'),
(7, 'Griechenland'),
(8, 'Vereinigtes Koenigreich'),
(9, 'Irland'),
(10, 'Italien'),
(11, 'Kroatien'),
(12, 'Niederlande'),
(13, 'Norwegen'),
(14, 'Polen'),
(15, 'Serbien'),
(16, 'Slowakei'),
(17, 'Spanien'),
(18, 'Schweden'),
(19, 'Schweiz'),
(20, 'Tschechien'),
(21, 'Tuerkei'),
(22, 'Ukraine'),
(23, 'Bolivien'),
(24, 'Brasilien'),
(25, 'Dominikanische Republik'),
(26, 'Ecuador');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(4) NOT NULL,
  `user` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sportart`
--

CREATE TABLE `sportart` (
  `sportartID` int(3) NOT NULL,
  `sportart` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sportart`
--

INSERT INTO `sportart` (`sportartID`, `sportart`) VALUES
(1, 'Weitsprung'),
(2, '100m - Sprint'),
(3, 'Sprungreiten'),
(4, 'Fechten'),
(5, 'Schwimmen');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `athleten`
--
ALTER TABLE `athleten`
  ADD PRIMARY KEY (`athletenID`),
  ADD KEY `Athleten Land` (`landID`);

--
-- Indexes for table `bewertung`
--
ALTER TABLE `bewertung`
  ADD PRIMARY KEY (`bewertungID`),
  ADD KEY `Bewertung Athleten` (`athletenID`),
  ADD KEY `Bewertung Sportart` (`sportartID`);

--
-- Indexes for table `land`
--
ALTER TABLE `land`
  ADD PRIMARY KEY (`landID`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loginPsst` (`password`);

--
-- Indexes for table `sportart`
--
ALTER TABLE `sportart`
  ADD PRIMARY KEY (`sportartID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bewertung`
--
ALTER TABLE `bewertung`
  MODIFY `bewertungID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `athleten`
--
ALTER TABLE `athleten`
  ADD CONSTRAINT `Athleten Land` FOREIGN KEY (`landID`) REFERENCES `land` (`landID`);

--
-- Constraints for table `bewertung`
--
ALTER TABLE `bewertung`
  ADD CONSTRAINT `Bewertung Athleten` FOREIGN KEY (`athletenID`) REFERENCES `athleten` (`athletenID`),
  ADD CONSTRAINT `Bewertung Sportart` FOREIGN KEY (`sportartID`) REFERENCES `sportart` (`sportartID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
