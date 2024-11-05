-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2024 a las 04:58:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reservas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

CREATE TABLE `mesas` (
  `id_mesa` int(11) NOT NULL,
  `numero_mesa` int(11) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `estado` enum('disponible','ocupada','reservada') NOT NULL DEFAULT 'disponible',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mesas`
--

INSERT INTO `mesas` (`id_mesa`, `numero_mesa`, `capacidad`, `estado`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'disponible', '2024-10-17 00:17:12', '2024-10-17 00:17:12'),
(2, 2, 4, 'disponible', '2024-10-17 00:17:12', '2024-10-17 00:17:12'),
(3, 3, 4, 'disponible', '2024-10-17 00:17:12', '2024-10-17 00:17:12'),
(4, 4, 6, 'disponible', '2024-10-17 00:17:12', '2024-10-17 00:17:12'),
(5, 5, 2, 'disponible', '2024-10-17 00:17:12', '2024-10-17 00:17:12'),
(6, 6, 8, 'disponible', '2024-10-17 00:17:12', '2024-10-17 00:17:12'),
(7, 7, 4, 'disponible', '2024-10-17 00:17:12', '2024-10-17 00:17:12'),
(8, 8, 6, 'disponible', '2024-10-17 00:17:12', '2024-10-17 00:17:12'),
(9, 9, 2, 'disponible', '2024-10-17 00:17:12', '2024-10-17 00:17:12'),
(10, 10, 4, 'disponible', '2024-10-17 00:17:12', '2024-10-17 00:17:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos`
--

CREATE TABLE `platos` (
  `id_plato` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `num_personas` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_mesa` int(11) DEFAULT NULL,
  `id_turno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `nombre_cliente`, `fecha_hora`, `num_personas`, `created_at`, `updated_at`, `id_mesa`, `id_turno`) VALUES
(11, 'Carlos Rodríguez', '2024-11-15 22:30:00', 4, '2024-10-17 00:17:23', '2024-11-03 23:42:10', 2, 2),
(13, 'Familia Gómez', '2024-11-17 13:15:00', 6, '2024-10-17 00:17:23', '2024-10-17 00:17:23', 8, 1),
(14, 'juampiiii', '2024-11-16 01:30:00', 3, '2024-11-03 16:15:44', '2024-11-03 16:18:51', 3, 1),
(15, 'TOMAS VINOLI', '2024-11-16 01:30:00', 9, '2024-11-03 16:16:58', '2024-11-05 03:40:37', 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id_turno` int(11) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`id_turno`, `hora_inicio`, `hora_fin`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, '12:00:00', '16:00:00', 'Turno de almuerzo', '2024-10-17 00:17:19', '2024-11-05 03:31:20'),
(2, '18:00:00', '22:00:00', 'Turno de cena', '2024-10-17 00:17:19', '2024-10-17 00:17:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','usuario') NOT NULL DEFAULT 'usuario',
  `imagen` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `password`, `rol`, `imagen`, `created_at`, `updated_at`) VALUES
(8, 'Nuevo Administrador', 'admin@ejemplo.com', '$2b$10$dFUNUhzfmWqFizMmnweZXuU4DP6OD6O1JZf.IwkzGzQptnd0QI2I.', 'admin', NULL, '2024-11-03 16:53:32', '2024-11-03 23:45:17'),
(9, 'USUARIO ADMINISTRADOR 2', 'admin2@example2.com', '$2a$10$i5jWgOl3UOm61uQA2Q59qud6fXULWkIWr5meLlt6ITz3I9WUmLZNq', 'admin', NULL, '2024-11-03 22:37:20', '2024-11-03 22:37:20'),
(10, 'Administrado3', 'admin3@ejemplo3.com', '$2a$10$/Bar4VJn.tiysD0rICFDf..GgHutXg0qi86Z4CwbEz/gVXj9Kcd4.', 'admin', NULL, '2024-11-03 23:59:04', '2024-11-03 23:59:04'),
(11, 'Administrador4', 'admin3@example3.com', '$2b$10$1q3v7aEi.rqdQ1Y.ajOfD.1SSrvl2uc0za8a3tsTk5InDxvRKgYj6', 'admin', '1730679248655.jpg', '2024-11-04 00:14:08', '2024-11-04 00:14:08'),
(21, 'Administrador6', 'juann@hotmail.com', '$2b$10$M0HflZNleo9NoY93N6RUFOCdxRoiZUu7Q56/wyQMChgl9VK/3cuEC', 'admin', '1730679575325.jpg', '2024-11-04 00:19:35', '2024-11-04 00:19:35'),
(22, 'Administrador7', 'juannn@hotmail.com', '$2b$10$1XXXm1tVWQ4uskNfHYI58.nplU7WWD8CLWYkDzkVL2zqK72c0nETW', 'admin', '1730679588908.jpg', '2024-11-04 00:19:48', '2024-11-05 03:18:06'),
(23, 'Administrador8 ', 'juannnn@hotmail.com', '$2a$10$j6C3CpPkkqw7i3uoiQUvc.Ab2o7.GYt42x1Rrp.afxqRo3AMHwJiS', 'admin', NULL, '2024-11-05 03:08:56', '2024-11-05 03:08:56');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`id_mesa`);

--
-- Indices de la tabla `platos`
--
ALTER TABLE `platos`
  ADD PRIMARY KEY (`id_plato`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_mesa` (`id_mesa`),
  ADD KEY `id_turno` (`id_turno`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id_turno`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mesas`
--
ALTER TABLE `mesas`
  MODIFY `id_mesa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `platos`
--
ALTER TABLE `platos`
  MODIFY `id_plato` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id_turno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `platos`
--
ALTER TABLE `platos`
  ADD CONSTRAINT `platos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id_mesa`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_turno`) REFERENCES `turnos` (`id_turno`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
