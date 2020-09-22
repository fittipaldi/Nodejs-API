-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2020 at 06:14 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.0.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `api`
--

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `country_name` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `country_name`, `updated_at`) VALUES
(1, 'England', '2020-09-20 08:00:49'),
(2, 'Germany', '2020-09-20 08:00:42'),
(3, 'Spain', '2020-09-20 08:02:33'),
(4, 'Portuguese', '2020-09-20 10:44:22'),
(5, 'French', '2020-09-20 10:44:22'),
(6, 'Italian', '2020-09-20 10:44:37');

-- --------------------------------------------------------

--
-- Table structure for table `soccer_match`
--

CREATE TABLE `soccer_match` (
  `id` int(11) NOT NULL,
  `date_time` datetime NOT NULL,
  `team_a` int(11) NOT NULL,
  `score_a` int(11) DEFAULT '0',
  `team_z` int(11) NOT NULL,
  `score_z` int(11) DEFAULT '0',
  `status` char(1) NOT NULL DEFAULT '1',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `soccer_match`
--

INSERT INTO `soccer_match` (`id`, `date_time`, `team_a`, `score_a`, `team_z`, `score_z`, `status`, `updated_at`) VALUES
(1, '2020-09-21 21:00:00', 1, 2, 2, 1, '1', '2020-09-22 15:55:16'),
(2, '2020-10-01 19:00:00', 4, 0, 1, 0, '1', '2020-09-22 16:00:28'),
(3, '2020-09-27 18:00:00', 3, 0, 7, 0, '1', '2020-09-22 16:08:01'),
(4, '2020-09-22 17:00:00', 5, 0, 4, 0, '1', '2020-09-22 16:09:20'),
(5, '2020-09-30 10:00:00', 2, 0, 4, 0, '1', '2020-09-22 16:10:13');

-- --------------------------------------------------------

--
-- Table structure for table `soccer_team`
--

CREATE TABLE `soccer_team` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `flag_icon` varchar(255) DEFAULT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `soccer_team`
--

INSERT INTO `soccer_team` (`id`, `name`, `country`, `flag_icon`, `status`, `updated_at`) VALUES
(1, 'Manchester City FC', 'England', 'https://img.uefa.com/imgml/TP/teams/logos/70x70/52919.png', '1', '2020-09-20 08:07:23'),
(2, 'Everton', 'England', 'https://img.uefa.com/imgml/TP/teams/logos/70x70/52281.png', '1', '2020-09-20 08:11:32'),
(3, 'FC Bayern München', 'Germany', 'https://img.uefa.com/imgml/TP/teams/logos/70x70/50037.png', '1', '2020-09-20 20:53:44'),
(4, 'Liverpool FC', 'England', 'https://img.uefa.com/imgml/TP/teams/logos/70x70/7889.png', '1', '2020-09-22 15:51:02'),
(5, 'Crystal Palace FC', 'England', 'https://img.uefa.com/imgml/TP/teams/logos/70x70/52916.png', '1', '2020-09-22 15:52:34'),
(6, 'Hertha BSC Berlin', 'Germany', 'https://img.uefa.com/imgml/TP/teams/logos/70x70/5451.png', '1', '2020-09-22 15:53:42'),
(7, 'FC Augsburg', 'Germany', 'https://img.uefa.com/imgml/TP/teams/logos/70x70/2600978.png', '1', '2020-09-22 15:54:39');

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`id`, `token`, `status`, `updated_at`) VALUES
(1, '4A36C7F5D51F0DB74EAFADB20D40167B', '1', '2020-09-17 19:15:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `country_name` (`country_name`);

--
-- Indexes for table `soccer_match`
--
ALTER TABLE `soccer_match`
  ADD PRIMARY KEY (`id`),
  ADD KEY `soccer_match_fk1` (`team_a`),
  ADD KEY `soccer_match_fk2` (`team_z`);

--
-- Indexes for table `soccer_team`
--
ALTER TABLE `soccer_team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `soccer_team_fk1` (`country`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `soccer_match`
--
ALTER TABLE `soccer_match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `soccer_team`
--
ALTER TABLE `soccer_team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `soccer_match`
--
ALTER TABLE `soccer_match`
  ADD CONSTRAINT `soccer_match_fk1` FOREIGN KEY (`team_a`) REFERENCES `soccer_team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `soccer_match_fk2` FOREIGN KEY (`team_z`) REFERENCES `soccer_team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `soccer_team`
--
ALTER TABLE `soccer_team`
  ADD CONSTRAINT `soccer_team_fk1` FOREIGN KEY (`country`) REFERENCES `country` (`country_name`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
