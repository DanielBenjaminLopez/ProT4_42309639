-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-08-2024 a las 02:38:01
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_biblioteca`
--
CREATE DATABASE IF NOT EXISTS `db_biblioteca` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_biblioteca`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `autor` varchar(30) NOT NULL,
  `categoria` varchar(30) NOT NULL,
  `añopublicacion` date NOT NULL,
  `ISBN` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `nombre`, `autor`, `categoria`, `añopublicacion`, `ISBN`) VALUES
(1, 'El Quijote', 'Miguel de Cervantes', 'Novela', '1605-01-16', '9781234567890'),
(2, 'Cien Años de Soledad', 'Gabriel García Márquez', 'Realismo Mágico', '1967-05-30', '9781234567891'),
(3, 'La Odisea', 'Homero', 'Épico', '0800-01-01', '9781234567892'),
(4, '1984', 'George Orwell', 'Distopía', '1949-06-08', '9781234567893'),
(5, 'Crimen y Castigo', 'Fiódor Dostoyevski', 'Filosófico', '1866-01-01', '9781234567894'),
(6, 'Matar a un Ruiseñor', 'Harper Lee', 'Ficción', '1960-07-11', '9781234567895'),
(8, 'Don Quijote', 'Miguel de Cervantes', 'Novela', '1605-01-16', '9781234567897'),
(9, 'Orgullo y Prejuicio', 'Jane Austen', 'Romántico', '1813-01-28', '9781234567898'),
(10, 'En Busca del Tiempo Perdido', 'Marcel Proust', 'Modernismo', '1913-11-14', '9781234567899'),
(15, 'Mil Años de Soledad', 'Gabi García Márquez', 'FANTASIA Mágico', '1968-05-30', '9781234567333');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
