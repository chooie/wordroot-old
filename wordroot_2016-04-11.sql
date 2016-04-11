# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.11)
# Database: wordroot
# Generation Time: 2016-04-11 09:53:15 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table languages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `languages`;

CREATE TABLE `languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;

INSERT INTO `languages` (`id`, `name`)
VALUES
	(1,'Greek'),
	(2,'Latin');

/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table roots
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roots`;

CREATE TABLE `roots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `word` varchar(64) DEFAULT NULL,
  `meaning` varchar(512) DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `language_id` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `roots` WRITE;
/*!40000 ALTER TABLE `roots` DISABLE KEYS */;

INSERT INTO `roots` (`id`, `word`, `meaning`, `language_id`)
VALUES
	(1,'autos','self',1),
	(2,'bios','life',1),
	(3,'graphein','to write',1),
	(4,'idios','private',1),
	(5,'sun','together',1);

/*!40000 ALTER TABLE `roots` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table word_parts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `word_parts`;

CREATE TABLE `word_parts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `part` varchar(32) DEFAULT NULL,
  `word_id` int(11) DEFAULT NULL,
  `position_index` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `word_id` (`word_id`),
  CONSTRAINT `word_id` FOREIGN KEY (`word_id`) REFERENCES `words` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `word_parts` WRITE;
/*!40000 ALTER TABLE `word_parts` DISABLE KEYS */;

INSERT INTO `word_parts` (`id`, `part`, `word_id`, `position_index`)
VALUES
	(1,'auto',1,0),
	(2,'bio',1,1),
	(3,'graphy',1,2),
	(4,'idio',2,0),
	(5,'syn',2,1),
	(6,'cracy',2,2);

/*!40000 ALTER TABLE `word_parts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table word_parts_roots
# ------------------------------------------------------------

DROP TABLE IF EXISTS `word_parts_roots`;

CREATE TABLE `word_parts_roots` (
  `word_part_id` int(11) NOT NULL,
  `root_id` int(11) DEFAULT NULL,
  KEY `word_part_id` (`word_part_id`),
  KEY `root_id` (`root_id`),
  CONSTRAINT `root_id` FOREIGN KEY (`root_id`) REFERENCES `roots` (`id`),
  CONSTRAINT `word_part_id` FOREIGN KEY (`word_part_id`) REFERENCES `word_parts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `word_parts_roots` WRITE;
/*!40000 ALTER TABLE `word_parts_roots` DISABLE KEYS */;

INSERT INTO `word_parts_roots` (`word_part_id`, `root_id`)
VALUES
	(1,1),
	(2,2),
	(3,3),
	(4,4),
	(5,5);

/*!40000 ALTER TABLE `word_parts_roots` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table words
# ------------------------------------------------------------

DROP TABLE IF EXISTS `words`;

CREATE TABLE `words` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `word` varchar(64) DEFAULT NULL,
  `meaning` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `words` WRITE;
/*!40000 ALTER TABLE `words` DISABLE KEYS */;

INSERT INTO `words` (`id`, `word`, `meaning`)
VALUES
	(1,'autobiography','the story that someone writes about their own life'),
	(2,'idiosyncracy','a mode of behaviour or way of thought peculiar to an individual');

/*!40000 ALTER TABLE `words` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
