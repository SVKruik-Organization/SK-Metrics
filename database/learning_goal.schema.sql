CREATE TABLE `learning_goal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `week` tinyint(2) unsigned NOT NULL,
  `ticket` smallint(4) unsigned NOT NULL,
  `time_planned` smallint(4) unsigned NOT NULL DEFAULT 0,
  `time_taken` smallint(4) unsigned NOT NULL DEFAULT 0,
  `help_needed` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `qa_iterations` tinyint(1) unsigned DEFAULT NULL,
  `category` varchar(45) NOT NULL,
  `language` varchar(45) NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `ticket_UNIQUE` (`ticket`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci