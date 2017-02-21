-- phpMyAdmin SQL Dump
-- version 4.4.11
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Фев 21 2017 г., 05:38
-- Версия сервера: 5.6.25
-- Версия PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Flowers`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Events`
--

CREATE TABLE IF NOT EXISTS `Events` (
  `id` varchar(36) NOT NULL,
  `title` varchar(500) CHARACTER SET utf8 NOT NULL,
  `content` varchar(4000) CHARACTER SET utf8 NOT NULL,
  `dateCreate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `previewSrc` varchar(200) CHARACTER SET utf8 NOT NULL,
  `imagesFolderSrc` varchar(200) CHARACTER SET utf8 NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `dateActivation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `Events`
--

INSERT INTO `Events` (`id`, `title`, `content`, `dateCreate`, `previewSrc`, `imagesFolderSrc`, `isActive`, `dateActivation`) VALUES
('04c3df3c-8d94-b43d-3be4-cad1d7177d98', 'Свадьба Ирины и Сергея в отеле Скандинавия', '     Свадьба — одно из важнейших событий и в этот день все должно быть безупречно. Работая с парой, мы черпаем в ней вдохновение, чтобы каждая деталь стала отражением их чувств и неповторимого стиля. Мы знаем, что сегодняшнее торжество становится завтрашними воспоминаниями. Именно поэтому мы уделяем такое большое внимание мелочам, которые составляют целостную картину праздника.', '2017-02-19 11:36:51', 'DSC04193.jpg', 'Свадьба Ирины и Сергея в отеле Скандинавия', 1, '2017-02-19 11:36:51'),
('68bdc248-3a76-fcdd-07a6-ee19b2656f16', 'Свадьба Натальи и Станислава в замке Бип', '     Свадьба — одно из важнейших событий и в этот день все должно быть безупречно. Работая с парой, мы черпаем в ней вдохновение, чтобы каждая деталь стала отражением их чувств и неповторимого стиля. Мы знаем, что сегодняшнее торжество становится завтрашними воспоминаниями. Именно поэтому мы уделяем такое большое внимание мелочам, которые составляют целостную картину праздника.\r\n', '2017-02-19 11:18:06', 'DSC03329.jpg', 'Свадьба Натальи и Станислава в замке Бип', 1, '2017-02-19 11:18:06');

-- --------------------------------------------------------

--
-- Структура таблицы `Flowers`
--

CREATE TABLE IF NOT EXISTS `Flowers` (
  `id` varchar(36) NOT NULL,
  `content` varchar(2000) CHARACTER SET utf8 NOT NULL,
  `src` varchar(200) CHARACTER SET utf8 NOT NULL,
  `price` int(11) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `dateCreate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateActivation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `Flowers`
--

INSERT INTO `Flowers` (`id`, `content`, `src`, `price`, `isActive`, `dateCreate`, `dateActivation`) VALUES
('1049d0db-d0e0-37a1-a585-5a7cec328e77', '	Синие лизиантусы, кустарные белые розы, листья эвколипта, гартензия, веточки розы И еще чтонибудь лалалалалал лалалалалал лалалалалалал', '002.jpg', 2000, 1, '2017-02-14 22:36:13', '2017-02-18 14:01:53'),
('23769bed-4250-af64-c69a-ece13bce23bc', 'Синие лизиантусы, кустарные белые розы, листья эвколипта, гартензия, веточки розы И еще чтонибудь лалалалалал лалалалалал лалалалалалал Синие лизиантусы, кустарные белые розы, листья эвколипта, гартензия, веточки розы И еще чтонибудь лалалалалал лалалалалал лалалалалалал', '003.jpg', 2000, 1, '2017-02-18 15:39:05', '2017-02-18 15:39:05'),
('35dd7b52-e137-39c5-ae26-a0f648090f79', '001', '001.jpg', 1000, 1, '2017-02-18 15:51:00', '2017-02-18 15:51:00'),
('5af09c91-9291-9926-6cf8-b616c2d23e3a', 'Синие лизиантусы, кустарные белые розы, листья эвколипта, гартензия, веточки розы.', '001.jpg', 1700, 1, '2017-02-14 22:32:08', '2017-02-19 10:53:32'),
('863aab6d-e5b1-7d02-63d8-e6e830bc1816', 'тестовый', '004.jpg', 2100, 0, '2017-02-18 15:39:32', NULL),
('91f37351-0313-e906-d001-0b0036e372a3', '001', '001.jpg', 1000, 0, '2017-02-18 15:50:59', NULL),
('ca906455-c5b4-9dc7-8cf4-60c9e8e3671d', '001', '001.jpg', 1000, 0, '2017-02-18 15:51:01', NULL),
('e17b2fe9-03a9-abe7-a92d-1e9e75db54fd', '001', '001.jpg', 1000, 0, '2017-02-18 15:51:00', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `Flowers2`
--

CREATE TABLE IF NOT EXISTS `Flowers2` (
  `id` varchar(36) NOT NULL,
  `content` varchar(2000) CHARACTER SET utf8 NOT NULL,
  `src` varchar(200) CHARACTER SET utf8 NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `dateCreate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateActivation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `Flowers2`
--

INSERT INTO `Flowers2` (`id`, `content`, `src`, `isActive`, `dateCreate`, `dateActivation`) VALUES
('31e8f456-dc33-ab91-69ce-900feb7fbaa5', '0003.jpg', '0003.jpg', 1, '2017-02-18 14:54:05', '2017-02-19 10:51:36'),
('49296da0-5816-927a-8314-4ff6403f3fab', '0002', '0002.jpg', 1, '2017-02-18 14:53:56', '2017-02-18 14:53:56'),
('8a6e994a-3624-626d-5bc3-540e5da80b39', 'Синие лизиантусы, кустарные белые розы, листья эвколипта, гартензия, веточки розы И еще чтонибудь лалалалалал лалалалалал лалалалалалал', '00001.jpg', 1, '2017-02-18 14:53:00', '2017-02-18 14:53:00'),
('bb7b1845-e5c4-d3c7-d2fa-f866e560cb7e', '0007.jpg', '0007.jpg', 1, '2017-02-18 14:54:45', '2017-02-18 14:54:45'),
('d9269312-9e79-1043-e077-99d0590ab66e', 'asdasdasd', '00001.jpg', 1, '2017-02-18 19:21:10', '2017-02-18 19:21:10'),
('fadab628-73d7-8504-5128-068e212f3417', '	0004.jpg	0004.jpg	0004.jpg	0004.jpg	0004.jpg	0004.jpg', '0004.jpg', 1, '2017-02-19 00:48:04', '2017-02-19 00:48:04'),
('fe24fd10-a2f9-c137-501c-7c98bac9c50f', '	0004.jpg	0004.jpg	0004.jpg	0004.jpg	0004.jpg	0004.jpg', '0004.jpg', 1, '2017-02-19 00:48:06', '2017-02-19 00:48:06');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Flowers`
--
ALTER TABLE `Flowers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Flowers2`
--
ALTER TABLE `Flowers2`
  ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
