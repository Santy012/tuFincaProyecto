CREATE DATABASE  IF NOT EXISTS `tufinca` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tufinca`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tufinca
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contraseña` varchar(255) NOT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr0jus8ywt1dl6snd357ie37j9` (`usuario`),
  UNIQUE KEY `UK571pycikd1pkkvboiav3f69gp` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etiqueta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tipoEtiqueta` enum('propiedad','categoria') NOT NULL DEFAULT 'categoria',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK18uj0p0ffr26vm9hc4voiwy3j` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `propiedad_id` int DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `tipo` enum('imagen','video') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_media_propiedad` (`propiedad_id`),
  CONSTRAINT `fk_media_propiedad` FOREIGN KEY (`propiedad_id`) REFERENCES `propiedad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=338 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mensaje`
--

DROP TABLE IF EXISTS `mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensaje` (
  `id` int NOT NULL AUTO_INCREMENT,
  `propiedad_id` int DEFAULT NULL,
  `apellidoCliente` varchar(255) NOT NULL,
  `celular` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `detalle` text,
  `nombreCliente` varchar(255) NOT NULL,
  `gestion` enum('porLeer','realizado') NOT NULL,
  `administrador_id` int DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_mensaje_propiedad` (`propiedad_id`),
  KEY `fk_mensaje_administrador` (`administrador_id`),
  CONSTRAINT `fk_mensaje_administrador` FOREIGN KEY (`administrador_id`) REFERENCES `administrador` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_mensaje_propiedad` FOREIGN KEY (`propiedad_id`) REFERENCES `propiedad` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `propiedad`
--

DROP TABLE IF EXISTS `propiedad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propiedad` (
  `administrador_id` int DEFAULT NULL,
  `areaConst` float DEFAULT NULL,
  `areaTotal` float DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `descripción` varchar(2000) DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `ubicación` varchar(255) DEFAULT NULL,
  `estado` enum('disponible','vendido') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKdo4ifshqs67ke7nksd9lhsil2` (`codigo`),
  KEY `fk_propiedad_administrador` (`administrador_id`),
  CONSTRAINT `fk_propiedad_administrador` FOREIGN KEY (`administrador_id`) REFERENCES `administrador` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `propiedadetiqueta`
--

DROP TABLE IF EXISTS `propiedadetiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propiedadetiqueta` (
  `etiqueta_id` int NOT NULL,
  `propiedad_id` int NOT NULL,
  PRIMARY KEY (`etiqueta_id`,`propiedad_id`),
  KEY `FKatyg6k2ail3fw6ua22xvx99vv` (`propiedad_id`),
  CONSTRAINT `FK5gekajb34a38xe1t9s0sa1uo9` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiqueta` (`id`),
  CONSTRAINT `FKatyg6k2ail3fw6ua22xvx99vv` FOREIGN KEY (`propiedad_id`) REFERENCES `propiedad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-21 14:59:02
