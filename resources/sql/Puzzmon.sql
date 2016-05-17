
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 17-05-2016 a las 18:19:07
-- Versión del servidor: 10.0.20-MariaDB
-- Versión de PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `u375670478_puzzm`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiencia`
--

CREATE TABLE IF NOT EXISTS `experiencia` (
  `nivel` int(11) NOT NULL,
  `experiencia` int(11) NOT NULL,
  PRIMARY KEY (`nivel`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `experiencia`
--

INSERT INTO `experiencia` (`nivel`, `experiencia`) VALUES
(1, 500),
(2, 1000),
(3, 1500),
(4, 2000),
(5, 2500),
(6, 3000),
(7, 3500),
(8, 4000),
(9, 4500),
(10, 5000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mapas`
--

CREATE TABLE IF NOT EXISTS `mapas` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Puzzmon_1` int(11) NOT NULL DEFAULT '1',
  `Puzzmon_2` int(11) DEFAULT NULL,
  `Puzzmon_3` int(11) DEFAULT NULL,
  `Nivel_1` int(11) NOT NULL DEFAULT '1',
  `Nivel_2` int(11) DEFAULT NULL,
  `Nivel_3` int(11) DEFAULT NULL,
  `Experiencia` int(11) NOT NULL,
  `Descripción` varchar(500) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Sin descripción.',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `mapas`
--

INSERT INTO `mapas` (`Id`, `Puzzmon_1`, `Puzzmon_2`, `Puzzmon_3`, `Nivel_1`, `Nivel_2`, `Nivel_3`, `Experiencia`, `Descripción`) VALUES
(1, 3, NULL, NULL, 1, NULL, NULL, 250, 'Sin descripción.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monstruos`
--

CREATE TABLE IF NOT EXISTS `monstruos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` int(11) NOT NULL,
  `Nombre` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Hp_Base` int(11) NOT NULL,
  `Atk_Base` int(11) NOT NULL,
  `Def_Base` int(11) NOT NULL,
  `Hp_Inc` float NOT NULL,
  `Atk_Inc` float NOT NULL,
  `Def_Inc` float NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `monstruos`
--

INSERT INTO `monstruos` (`Id`, `Type`, `Nombre`, `Hp_Base`, `Atk_Base`, `Def_Base`, `Hp_Inc`, `Atk_Inc`, `Def_Inc`) VALUES
(1, 1, 'Samuleaf', 14, 12, 8, 0.2, 0.4, 0.2),
(2, 2, 'Lampkin', 16, 10, 8, 0.4, 0.2, 0.2),
(3, 3, 'Droppentice', 12, 8, 8, 0.4, 0.3, 0.3),
(4, 4, 'Placeholder', 14, 10, 10, 0.3, 0.2, 0.2),
(5, 5, 'Wingskull', 18, 15, 10, 0.2, 0.1, 0.1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Contraseña` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Exp_actual` int(11) NOT NULL,
  `Nivel` int(11) NOT NULL,
  `Puzzmon_Id` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Usuario`, `Contraseña`, `Email`, `Exp_actual`, `Nivel`, `Puzzmon_Id`) VALUES
(1, 'User', 'Asdqwe123', 'user@gmail.com', 500, 1, 1),
(3, 'jomeral2', 'ptrueno123', 'Jomeral2@gmail.com', 0, 1, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
