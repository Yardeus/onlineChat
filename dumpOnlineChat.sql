-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: onlinechat
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(500) NOT NULL,
  `userId` int NOT NULL,
  `datetime` datetime NOT NULL,
  `roomId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_idx` (`userId`),
  KEY `fk_room_idx` (`roomId`),
  CONSTRAINT `fk_room` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'hi',1,'2021-09-16 18:53:19',1),(2,'hey',2,'2021-09-16 18:53:19',1),(3,'hh',3,'2021-09-16 18:57:38',2),(4,'hello',3,'2021-09-16 19:11:12',2),(9,'sdfsdf',1,'2021-09-17 19:45:34',1),(10,'fff',1,'2021-09-17 19:48:03',1),(11,'aaa',1,'2021-09-17 19:49:01',1),(12,'fg',1,'2021-09-17 19:50:07',1),(13,'dfg',1,'2021-09-17 19:50:08',1),(14,'dfg',1,'2021-09-17 19:50:09',1),(15,'dg',1,'2021-09-17 21:28:44',1),(16,'dfg',1,'2021-09-17 21:28:57',1),(17,'dfg',1,'2021-09-17 21:28:59',1),(18,'dfg',1,'2021-09-17 21:29:01',1),(19,'sf',1,'2021-09-17 21:35:17',1),(20,'hello my pussy',1,'2021-09-17 22:36:51',1),(21,'hey',2,'2021-09-17 22:58:26',1),(22,'hello',1,'2021-09-19 14:21:39',21),(23,'rth',2,'2021-09-19 14:22:00',1),(24,'test',2,'2021-09-19 14:45:34',1),(25,'dfg',1,'2021-09-19 15:02:18',1),(26,'dg',1,'2021-09-19 15:28:56',1),(27,'gdg',2,'2021-09-19 15:31:26',1),(28,'dfg',2,'2021-09-19 15:31:47',1),(29,'sdf',2,'2021-09-19 15:32:58',1),(30,'sf',2,'2021-09-19 15:33:06',1),(31,'dfg',1,'2021-09-19 15:34:42',1),(32,'hhhhhh',2,'2021-09-19 15:36:04',1),(33,'dfgdgdg',2,'2021-09-19 15:37:31',1),(34,'dfg',1,'2021-09-19 15:37:44',1),(35,'dgdgdfg',1,'2021-09-19 15:38:09',1),(36,'sdfsfd',1,'2021-09-19 15:38:33',1),(37,'fgh',1,'2021-09-19 15:39:01',1),(38,'heeeey',2,'2021-09-19 15:39:25',1),(39,'привет',2,'2021-09-19 15:39:42',1),(40,'привет максим',2,'2021-09-19 15:40:12',1),(41,'Hi clowns',1,'2021-09-19 16:16:46',34),(58,'start',1,'2021-09-19 16:39:47',33),(59,'Hello guys',2,'2021-09-19 16:47:35',34),(60,'Test a long message to chat',1,'2021-09-19 17:11:55',34),(61,'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',10,'2021-09-19 20:53:44',34),(62,'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',10,'2021-09-19 20:54:48',34),(63,'dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',10,'2021-09-19 21:16:28',34),(64,'asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',1,'2021-09-19 21:32:19',34),(65,'hello',2,'2021-09-19 21:37:01',34),(66,'hey, alex',1,'2021-09-19 21:37:08',34),(67,'hi',2,'2021-09-19 21:37:30',36),(68,'dd',1,'2021-09-19 21:50:50',34),(69,'hi',1,'2021-09-19 22:16:33',34);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'test'),(2,'test'),(3,'test2'),(4,'undefined'),(5,'undefined'),(6,'undefined'),(7,'testroom'),(8,'testroom'),(9,'testroom'),(10,'testroom'),(11,'testroom'),(12,'testroom'),(13,'testroom'),(14,'testroom'),(15,'testroom'),(16,'kent'),(17,'kent'),(18,'max'),(19,'max'),(20,'max'),(21,'max'),(22,'max'),(23,'max'),(24,'max'),(25,'max'),(26,'max'),(27,'max'),(28,'max'),(29,'max'),(30,'max'),(31,'testroom'),(32,'testroom'),(33,'my room'),(34,'Chilling Room'),(35,'Chippy'),(36,'new room');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'ale'),(2,'alex'),(5,'kent'),(1,'max'),(8,'maxis'),(3,'mike'),(10,'nickolas');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersonrooms`
--

DROP TABLE IF EXISTS `usersonrooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersonrooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roomId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq` (`roomId`,`userId`),
  KEY `user_idx` (`userId`),
  CONSTRAINT `room` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`),
  CONSTRAINT `user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersonrooms`
--

LOCK TABLES `usersonrooms` WRITE;
/*!40000 ALTER TABLE `usersonrooms` DISABLE KEYS */;
INSERT INTO `usersonrooms` VALUES (1,1,1),(2,1,2),(23,1,8),(16,2,2),(3,2,3),(24,11,2),(20,33,1),(29,34,1),(22,34,2),(26,34,10),(27,36,1);
/*!40000 ALTER TABLE `usersonrooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-19 22:30:38
