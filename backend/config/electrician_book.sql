-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2026 at 12:37 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `electrician_book`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `electrician_id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `booking_time` time NOT NULL,
  `address` text NOT NULL,
  `problem_description` text NOT NULL,
  `payment_mode` enum('offline','online') DEFAULT 'offline',
  `status` enum('pending','accepted','rejected','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `electrician_id`, `booking_date`, `booking_time`, `address`, `problem_description`, `payment_mode`, `status`, `created_at`, `updated_at`) VALUES
(1, 13, 5, '2026-01-01', '19:20:00', 'rajkot , gujrat', 'fan not workig', 'offline', 'completed', '2025-12-31 06:15:22', '2026-01-01 07:02:13'),
(2, 13, 11, '2026-01-01', '03:40:00', 'ggggggggggggg', 'sssssss', 'offline', 'completed', '2025-12-31 10:10:28', '2026-01-01 07:41:26'),
(3, 12, 5, '2026-01-03', '14:42:00', 'bbbbbbbbbbbbbb', 'bbbbbbbbbbbbbb', 'offline', 'completed', '2026-01-01 07:12:43', '2026-01-01 07:28:01'),
(4, 14, 12, '2026-01-03', '14:00:00', 'usa', 'hdhhdakkh', 'offline', 'completed', '2026-01-01 08:08:19', '2026-01-01 08:09:58'),
(5, 15, 11, '2026-01-03', '02:59:00', 'kkkk', 'kkkkkk', 'offline', 'completed', '2026-01-01 09:29:21', '2026-01-01 09:56:07'),
(6, 15, 5, '2026-01-02', '13:39:00', 'ggggg', 'gggggg', 'offline', 'pending', '2026-01-01 11:09:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `mobile`, `email`, `message`, `is_read`, `created_at`) VALUES
(1, 'pradip chavda ', '9316778905', 'pradip@gmail.com', 'hiiiiitththtt', 1, '2025-12-25 11:54:11'),
(3, 'fffff', '9316071167', 'ret@gmail.com', 'rrerereeere\n', 0, '2025-12-25 12:00:04');

-- --------------------------------------------------------

--
-- Table structure for table `mcq_answers`
--

CREATE TABLE `mcq_answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `correct_option` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mcq_answers`
--

INSERT INTO `mcq_answers` (`id`, `question_id`, `correct_option`) VALUES
(3, 3, 1),
(4, 4, 2),
(5, 5, 2),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 2),
(10, 10, 1),
(11, 11, 1),
(12, 12, 3),
(13, 13, 1),
(14, 14, 1),
(15, 15, 1),
(16, 16, 2),
(17, 17, 0),
(18, 18, 1),
(19, 19, 0),
(20, 20, 0),
(21, 21, 2),
(22, 22, 2),
(23, 23, 1),
(24, 24, 1),
(25, 25, 0),
(26, 26, 1),
(27, 27, 0),
(28, 28, 1),
(29, 29, 1),
(30, 30, 2),
(31, 31, 0),
(32, 32, 0),
(33, 33, 0),
(34, 34, 1),
(35, 35, 1),
(36, 36, 0),
(37, 37, 2),
(38, 38, 0),
(39, 39, 2),
(40, 40, 1),
(41, 41, 2),
(42, 42, 1),
(43, 43, 0),
(44, 44, 1),
(45, 45, 1),
(46, 46, 0),
(48, 48, 0),
(49, 49, 1),
(50, 50, 3),
(51, 51, 2),
(52, 52, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mcq_options`
--

CREATE TABLE `mcq_options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_en` varchar(255) NOT NULL,
  `option_gu` varchar(255) NOT NULL,
  `option_index` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mcq_options`
--

INSERT INTO `mcq_options` (`id`, `question_id`, `option_en`, `option_gu`, `option_index`) VALUES
(9, 3, 'Resistor', 'રેસિસ્ટર', 0),
(10, 3, 'Fuse', 'ફ્યુઝ', 1),
(11, 3, 'Capacitor', 'કેપેસિટર', 2),
(12, 3, 'Inductor', 'ઇન્ડક્ટર', 3),
(13, 4, 'Volt', 'વોલ્ટ', 0),
(14, 4, 'Watt', 'વોટ', 1),
(15, 4, 'Ampere', 'એમ્પિયર', 2),
(16, 4, 'Ohm', 'ઓહ્મ', 3),
(17, 5, 'Neutral wire', 'ન્યુટ્રલ વાયર', 0),
(18, 5, 'Live wire', 'લાઇવ વાયર', 1),
(19, 5, 'Earth wire', 'અર્થ વાયર', 2),
(20, 5, 'Phase wire', 'ફેઝ વાયર', 3),
(21, 6, 'Diode', 'ડાયોડ', 0),
(22, 6, 'Capacitor', 'કેપેસિટર', 1),
(23, 6, 'Resistor', 'રેસિસ્ટર', 2),
(24, 6, 'Transistor', 'ટ્રાન્ઝિસ્ટર', 3),
(25, 7, 'Watt', 'વોટ', 0),
(26, 7, 'Ohm', 'ઓહ્મ', 1),
(27, 7, 'Henry', 'હેનરી', 2),
(28, 7, 'Volt', 'વોલ્ટ', 3),
(29, 8, 'Voltmeter', 'વોલ્ટમીટર', 0),
(30, 8, 'Ammeter', 'એમીટર', 1),
(31, 8, 'Ohmmeter', 'ઓહ્મમીટર', 2),
(32, 8, 'Wattmeter', 'વોટેમીટર', 3),
(33, 9, 'Copper', 'તાંબુ', 0),
(34, 9, 'Aluminium', 'એલ્યુમિનિયમ', 1),
(35, 9, 'Plastic', 'પ્લાસ્ટિક', 2),
(36, 9, 'Iron', 'લોખંડ', 3),
(37, 10, 'Kirchhoff’s Law', 'કિર્ચોફનો નિયમ', 0),
(38, 10, 'Ohm’s Law', 'ઓહ્મનો નિયમ', 1),
(39, 10, 'Faraday’s Law', 'ફેરાડેનો નિયમ', 2),
(40, 10, 'Lenz’s Law', 'લેન્ઝનો નિયમ', 3),
(41, 11, 'Transformer', 'ટ્રાન્સફોર્મર', 0),
(42, 11, 'Rectifier', 'રેક્ટિફાયર', 1),
(43, 11, 'Capacitor', 'કેપેસિટર', 2),
(44, 11, 'Inductor', 'ઇન્ડક્ટર', 3),
(45, 12, 'Red', 'લાલ', 0),
(46, 12, 'Yellow', 'પીળો', 1),
(47, 12, 'Black', 'કાળો', 2),
(48, 12, 'Blue', 'વાદળી', 3),
(49, 13, 'Ammeter', 'એમીટર', 0),
(50, 13, 'Voltmeter', 'વોલ્ટમીટર', 1),
(51, 13, 'Wattmeter', 'વોટેમીટર', 2),
(52, 13, 'Ohmmeter', 'ઓહ્મમીટર', 3),
(53, 14, '110V', '110 વોલ્ટ', 0),
(54, 14, '220V', '220 વોલ્ટ', 1),
(55, 14, '440V', '440 વોલ્ટ', 2),
(56, 14, '12V', '12 વોલ્ટ', 3),
(57, 15, 'Capacitor', 'કેપેસિટર', 0),
(58, 15, 'Resistor', 'રેસિસ્ટર', 1),
(59, 15, 'Inductor', 'ઇન્ડક્ટર', 2),
(60, 15, 'Diode', 'ડાયોડ', 3),
(61, 16, '1 sq mm', '1 સ્ક્વેર mm', 0),
(62, 16, '1.5 sq mm', '1.5 સ્ક્વેર mm', 1),
(63, 16, '4 sq mm', '4 સ્ક્વેર mm', 2),
(64, 16, '0.75 sq mm', '0.75 સ્ક્વેર mm', 3),
(65, 17, 'MCB', 'એમસિબી', 0),
(66, 17, 'Switch', 'સ્વિચ', 1),
(67, 17, 'Bulb', 'બલ્બ', 2),
(68, 17, 'Socket', 'સોકેટ', 3),
(69, 18, 'Chemical energy', 'રાસાયણિક ઊર્જા', 0),
(70, 18, 'Mechanical energy', 'યાંત્રિક ઊર્જા', 1),
(71, 18, 'Light energy', 'પ્રકાશ ઊર્જા', 2),
(72, 18, 'Heat energy', 'તાપ ઊર્જા', 3),
(73, 19, 'Tester', 'ટેસ્ટર', 0),
(74, 19, 'Ammeter', 'એમીટર', 1),
(75, 19, 'MCB', 'એમસિબી', 2),
(76, 19, 'Fuse', 'ફ્યુઝ', 3),
(77, 20, 'Light Emitting Diode', 'લાઇટ એમિટિંગ ડાયોડ', 0),
(78, 20, 'Long Electric Device', 'લોંગ ઇલેક્ટ્રિક ડીવાઈસ', 1),
(79, 20, 'Low Energy Diode', 'લો એનર્જી ડાયોડ', 2),
(80, 20, 'Light Energy Display', 'લાઇટ એનર્જી ડિસ્પ્લે', 3),
(81, 21, 'Neutral wire', 'ન્યુટ્રલ વાયર', 0),
(82, 21, 'Earth wire', 'અર્થ વાયર', 1),
(83, 21, 'Live wire', 'લાઇવ વાયર', 2),
(84, 21, 'Aluminium wire', 'એલ્યુમિનિયમ વાયર', 3),
(85, 22, 'Fan', 'પંખો', 0),
(86, 22, 'Heater', 'હીટર', 1),
(87, 22, 'Bulb', 'બલ્બ', 2),
(88, 22, 'Transformer', 'ટ્રાન્સફોર્મર', 3),
(89, 23, 'Rectifier', 'રેક્ટિફાયર', 0),
(90, 23, 'Transformer', 'ટ્રાન્સફોર્મર', 1),
(91, 23, 'Inductor', 'ઇન્ડક્ટર', 2),
(92, 23, 'Capacitor', 'કેપેસિટર', 3),
(93, 24, 'Diode', 'ડાયોડ', 0),
(94, 24, 'Battery', 'બેટરી', 1),
(95, 24, 'Inductor', 'ઇન્ડક્ટર', 2),
(96, 24, 'Switch', 'સ્વિચ', 3),
(97, 25, 'PVC tape', 'પીવીસી ટેપ', 0),
(98, 25, 'Screwdriver', 'સ્ક્રુડ્રાઈવર', 1),
(99, 25, 'Tester', 'ટેસ્ટર', 2),
(100, 25, 'Drill', 'ડ્રીલ', 3),
(101, 26, 'Iron', 'લોખંડ', 0),
(102, 26, 'Copper', 'તાંબુ', 1),
(103, 26, 'Gold', 'સોનું', 2),
(104, 26, 'Silver', 'ચાંદી', 3),
(105, 27, 'Short circuit', 'શોર્ટ સર્કિટ', 0),
(106, 27, 'Increase resistance', 'રોધ વધે', 1),
(107, 27, 'Decrease current', 'પ્રવાહ ઘટે', 2),
(108, 27, 'Nothing happens', 'કશું નહીં થાય', 3),
(109, 28, 'Transistor', 'ટ્રાન્ઝિસ્ટર', 0),
(110, 28, 'Diode', 'ડાયોડ', 1),
(111, 28, 'Resistor', 'રેસિસ્ટર', 2),
(112, 28, 'Capacitor', 'કેપેસિટર', 3),
(113, 29, 'Fuse', 'ફ્યુઝ', 0),
(114, 29, 'Insulation', 'ઇન્સ્યુલેશન', 1),
(115, 29, 'Bulb', 'બલ્બ', 2),
(116, 29, 'Switch', 'સ્વિચ', 3),
(117, 30, 'Ammeter', 'એમીટર', 0),
(118, 30, 'Voltmeter', 'વોલ્ટમીટર', 1),
(119, 30, 'Wattmeter', 'વોટેમીટર', 2),
(120, 30, 'Multimeter', 'મલ્ટીમીટર', 3),
(121, 31, 'AC', 'એસી', 0),
(122, 31, 'DC', 'ડીસી', 1),
(123, 31, 'Static current', 'સ્થિર પ્રવાહ', 2),
(124, 31, 'Variable voltage', 'પરિવર્તનશીલ વોલ્ટેજ', 3),
(125, 32, 'Motor', 'મોટર', 0),
(126, 32, 'Bulb', 'બલ્બ', 1),
(127, 32, 'Battery', 'બેટરી', 2),
(128, 32, 'Rectifier', 'રેક્ટિફાયર', 3),
(129, 33, 'Switch', 'સ્વિચ', 0),
(130, 33, 'Fuse', 'ફ્યુઝ', 1),
(131, 33, 'Capacitor', 'કેપેસિટર', 2),
(132, 33, 'Transformer', 'ટ્રાન્સફોર્મર', 3),
(133, 34, 'Copper', 'તાંબુ', 0),
(134, 34, 'Rubber', 'રબર', 1),
(135, 34, 'Iron', 'લોખંડ', 2),
(136, 34, 'Aluminum', 'એલ્યુમિનિયમ', 3),
(137, 35, 'Transformer', 'ટ્રાન્સફોર્મર', 0),
(138, 35, 'Rectifier', 'રેક્ટિફાયર', 1),
(139, 35, 'Inductor', 'ઇન્ડક્ટર', 2),
(140, 35, 'Relay', 'રિલે', 3),
(141, 36, 'Watt', 'વોટ', 0),
(142, 36, 'Volt', 'વોલ્ટ', 1),
(143, 36, 'Ampere', 'એમ્પિયર', 2),
(144, 36, 'Joule', 'જૂલ', 3),
(145, 37, 'Neutral wire', 'ન્યુટ્રલ વાયર', 0),
(146, 37, 'Earth wire', 'અર્થ વાયર', 1),
(147, 37, 'Live wire', 'લાઈવ વાયર', 2),
(148, 37, 'Aluminum wire', 'એલ્યુમિનિયમ વાયર', 3),
(149, 38, 'Tester', 'ટેસ્ટર', 0),
(150, 38, 'Fuse', 'ફ્યુઝ', 1),
(151, 38, 'Motor', 'મોટર', 2),
(152, 38, 'Relay', 'રિલે', 3),
(153, 39, 'Blue', 'વાદળી', 0),
(154, 39, 'Black', 'કાળો', 1),
(155, 39, 'Green/Yellow', 'લીલો/પીળો', 2),
(156, 39, 'Red', 'લાલ', 3),
(157, 40, 'Bulb', 'બલ્બ', 0),
(158, 40, 'MCB', 'એમસીબી', 1),
(159, 40, 'Relay', 'રિલે', 2),
(160, 40, 'Switch', 'સ્વિચ', 3),
(161, 41, 'Voltmeter', 'વોલ્ટમીટર', 0),
(162, 41, 'Ammeter', 'એમીટર', 1),
(163, 41, 'Ohmmeter', 'ઓહ્મમીટર', 2),
(164, 41, 'Rectifier', 'રેક્ટિફાયર', 3),
(165, 42, 'Switch', 'સ્વિચ', 0),
(166, 42, 'Relay', 'રિલે', 1),
(167, 42, 'Transformer', 'ટ્રાન્સફોર્મર', 2),
(168, 42, 'MCB', 'એમસીબી', 3),
(169, 43, 'Megger', 'મેગર', 0),
(170, 43, 'Ammeter', 'એમીટર', 1),
(171, 43, 'Tester', 'ટેસ્ટર', 2),
(172, 43, 'Multimeter', 'મલ્ટીમીટર', 3),
(173, 44, 'Short circuit', 'શોર્ટ સર્કિટ', 0),
(174, 44, 'Earth leakage', 'અર્થ લીકેજ', 1),
(175, 44, 'Overvoltage', 'ઓવર વોલ્ટેજ', 2),
(176, 44, 'Overload', 'ઓવરલોડ', 3),
(177, 45, '60 Hz', '60 હર્ટ્ઝ', 0),
(178, 45, '50 Hz', '50 હર્ટ્ઝ', 1),
(179, 45, '55 Hz', '55 હર્ટ્ઝ', 2),
(180, 45, '45 Hz', '45 હર્ટ્ઝ', 3),
(181, 46, 'Transformer', 'ટ્રાન્સફોર્મર', 0),
(182, 46, 'Rectifier', 'રેક્ટિફાયર', 1),
(183, 46, 'Relay', 'રિલે', 2),
(184, 46, 'Inductor', 'ઇન્ડક્ટર', 3),
(189, 48, 'Electrical to Mechanical', 'ઈલેક્ટ્રિક થી મિકેનિકલ', 0),
(190, 48, 'Mechanical to Electrical', 'મિકેનિકલ થી ઈલેક્ટ્રિક', 1),
(191, 48, 'Thermal to Mechanical', 'થર્મલ થી મિકેનિકલ', 2),
(192, 48, 'Chemical to Electrical', 'કેમિકલ થી ઈલેક્ટ્રિક', 3),
(193, 49, 'Gold', 'સોનું', 0),
(194, 49, 'Copper', 'તાંબુ', 1),
(195, 49, 'Iron', 'લોખંડ', 2),
(196, 49, 'Silver', 'ચાંદી', 3),
(197, 50, 'Voltage only', 'ફક્ત વોલ્ટેજ', 0),
(198, 50, 'Current only', 'ફક્ત કરંટ', 1),
(199, 50, 'Resistance only', 'ફક્ત રેસિસ્ટન્સ', 2),
(200, 50, 'Voltage, Current & Resistance', 'વોલ્ટેજ, કરંટ અને રેસિસ્ટન્સ', 3),
(201, 51, 'Rectifier', 'રેક્ટિફાયર', 0),
(202, 51, 'MCB', 'એમસીબી', 1),
(203, 51, 'VFD', 'વી એફ ડી', 2),
(204, 51, 'Relay', 'રિલે', 3),
(205, 52, 'Bulb', 'બલ્બ', 0),
(206, 52, 'Fuse', 'ફ્યુઝ', 1),
(207, 52, 'Tester', 'ટેસ્ટર', 2),
(208, 52, 'Switch', 'સ્વિચ', 3);

-- --------------------------------------------------------

--
-- Table structure for table `mcq_questions`
--

CREATE TABLE `mcq_questions` (
  `id` int(11) NOT NULL,
  `question_en` text NOT NULL,
  `question_gu` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mcq_questions`
--

INSERT INTO `mcq_questions` (`id`, `question_en`, `question_gu`, `created_at`) VALUES
(3, 'Which component is used to protect a circuit from overload?', 'કયો ઘટક સરકીટને ઓવરલોડથી બચાવવા માટે ઉપયોગમાં આવે છે?', '2025-11-20 10:21:56'),
(4, 'What is the unit of electric current?', 'વિદ્યુત પ્રવાહનું એકમ શું છે?', '2025-11-20 10:23:19'),
(5, 'Which wire is used for earthing?', 'કયો વાયર અર્થિંગ માટે ઉપયોગ થાય છે?', '2025-11-20 10:23:20'),
(6, 'A device that stores electric charge is called?', 'કયું ઉપકરણ વિદ્યુત ચાર્જ સંગ્રહ કરે છે?', '2025-11-20 10:23:20'),
(7, 'The SI unit of resistance is?', 'રોધનું SI એકમ શું છે?', '2025-11-20 10:23:20'),
(8, 'Which device is used to measure electric current?', 'વિદ્યુત પ્રવાહ માપવા માટે કયું સાધન વપરાય છે?', '2025-11-20 10:23:20'),
(9, 'Which material is used as an insulator?', 'કયું પદાર્થ ઇન્સ્યુલેટર તરીકે વપરાય છે?', '2025-11-20 10:23:20'),
(10, 'Which law states that V = IR?', 'કયો નિયમ કહે છે કે V = IR?', '2025-11-20 10:23:20'),
(11, 'Which component converts AC to DC?', 'કયો ઘટક AC ને DC માં રૂપાંતર કરે છે?', '2025-11-20 10:23:20'),
(12, 'What color wire is generally used as the neutral wire?', 'ન્યુટ્રલ વાયર સામાન્ય રીતે કયા રંગનો હોય છે?', '2025-11-20 10:23:20'),
(13, 'Which device is used to measure voltage?', 'વોલ્ટેજ માપવા માટે કયું સાધન વપરાય છે?', '2025-11-20 10:29:19'),
(14, 'What is the normal household voltage in India?', 'ભારતમાં સામાન્ય ઘરેલું વોલ્ટેજ કેટલું છે?', '2025-11-20 10:29:19'),
(15, 'Which component opposes the flow of current?', 'કયો ઘટક પ્રવાહના પ્રવાહને પ્રતિબંધિત કરે છે?', '2025-11-20 10:29:19'),
(16, 'Which cable is used for heavy load?', 'મોટા લોડ માટે કયો કેબલ વપરાય છે?', '2025-11-20 10:29:19'),
(17, 'Which device is used to break the circuit during fault?', 'ફોલ્ટ દરમિયાન સરકીટ તોડવા માટે કયું ઉપકરણ વપરાય છે?', '2025-11-20 10:29:19'),
(18, 'Which energy is converted into electrical energy in a generator?', 'જનરેટરમાં કઈ ઊર્જા વિદ્યુત ઊર્જામાં રૂપાંતરિત થાય છે?', '2025-11-20 10:29:19'),
(19, 'Which instrument detects electric leakage?', 'વિદ્યુત લીકેજ શોધવા માટે કયું સાધન વપરાય છે?', '2025-11-20 10:29:19'),
(20, 'What is the full form of LED?', 'LED નું સંપૂર્ણ નામ શું છે?', '2025-11-20 10:29:19'),
(21, 'Which wire carries current from supply?', 'કયો વાયર સપ્લાયમાંથી પ્રવાહ વહન કરે છે?', '2025-11-20 10:29:19'),
(22, 'Which device converts electrical energy into light?', 'કયું ઉપકરણ વિદ્યુત ઊર્જાને પ્રકાશમાં રૂપાંતરિત કરે છે?', '2025-11-20 10:29:19'),
(23, 'Which device increases or decreases AC voltage?', 'કયું ઉપકરણ AC વોલ્ટેજ વધારવા અથવા ઘટાડવા માટે વપરાય છે?', '2025-11-20 10:30:11'),
(24, 'Which device is used to store electrical energy?', 'કયું ઉપકરણ વિદ્યુત ઊર્જા સંગ્રહ કરે છે?', '2025-11-20 10:30:11'),
(25, 'What is used to join electrical wires?', 'વાયર જોડવા માટે શું વપરાય છે?', '2025-11-20 10:30:11'),
(26, 'Which metal is most commonly used in house wiring?', 'ઘરની વાયરિંગમાં સૌથી વધુ કયું ધાતુ વપરાય છે?', '2025-11-20 10:30:11'),
(27, 'What happens when a live wire touches a neutral wire?', 'લાઇવ વાયર ન્યુટ્રલ વાયરને સ્પર્શે ત્યારે શું થાય છે?', '2025-11-20 10:30:11'),
(28, 'Which component allows current in only one direction?', 'કયો ઘટક માત્ર એક જ દિશામાં પ્રવાહ પસાર થવા દે છે?', '2025-11-20 10:30:11'),
(29, 'What is used to protect humans from electric shock?', 'ઇલેક્ટ્રિક શૉકથી માનવને બચાવવા શું વપરાય છે?', '2025-11-20 10:30:11'),
(30, 'Which instrument measures power?', 'શક્તિ માપવા માટે કયું સાધન વપરાય છે?', '2025-11-20 10:30:11'),
(31, 'Which type of current changes direction periodically?', 'કયા પ્રકારનો પ્રવાહ સમયાંતરે દિશા બદલે છે?', '2025-11-20 10:30:11'),
(32, 'Which device converts electrical energy into mechanical energy?', 'કયું ઉપકરણ વિદ્યુત ઊર્જાને યાંત્રિક ઊર્જામાં બદલાવે છે?', '2025-11-20 10:30:11'),
(33, 'Which device is used to stop current flow?', 'કયું ઉપકરણ કરંટના પ્રવાહને અટકાવવા માટે વપરાય છે?', '2025-11-20 10:31:10'),
(34, 'Which material is used for electrical insulation?', 'ઇલેક્ટ્રિક ઇન્સ્યુલેશન માટે કયું મટિરિયલ વપરાય છે?', '2025-11-20 10:31:11'),
(35, 'Which device converts AC into DC?', 'કયું ઉપકરણ AC ને DC માં રૂપાંતરિત કરે છે?', '2025-11-20 10:31:11'),
(36, 'What is the unit of electrical power?', 'વિદ્યુત શક્તિનું એકમ શું છે?', '2025-11-20 10:31:11'),
(37, 'Which wire carries current to the appliance?', 'કયો વાયર ઉપકરણ સુધી કરંટ પહોંચાડે છે?', '2025-11-20 10:31:11'),
(38, 'Which device detects the presence of voltage?', 'કયું ઉપકરણ વોલ્ટેજની હાજરી શોધે છે?', '2025-11-20 10:31:11'),
(39, 'What color is typically used for earth wire?', 'અર્થ વાયર માટે સામાન્ય રીતે કયો રંગ વપરાય છે?', '2025-11-20 10:31:11'),
(40, 'Which device breaks the circuit automatically in overload?', 'ઓવરલોડ વખતે કયું ઉપકરણ આપમેળે સર્કિટ તોડે છે?', '2025-11-20 10:31:11'),
(41, 'Which device is used to measure resistance?', 'રોધ માપવા માટે કયું ઉપકરણ વપરાય છે?', '2025-11-20 10:31:11'),
(42, 'Which device is used for switching high current circuits?', 'ઉચ્ચ પ્રવાહ વાળા સર્કિટને સ્વિચ કરવા કયું ઉપકરણ વપરાય છે?', '2025-11-20 10:31:11'),
(43, 'Which instrument measures high AC voltage?', 'ઉચ્ચ AC વોલ્ટેજ માપવા માટે કયું ઉપકરણ વપરાય છે?', '2025-11-20 10:31:44'),
(44, 'What does RCCB protect against?', 'RCCB ક્યા જોખમથી રક્ષણ આપે છે?', '2025-11-20 10:31:44'),
(45, 'What is the frequency of AC supply in India?', 'ભારતમાં AC સપ્લાયની આવર્તન કેટલી છે?', '2025-11-20 10:31:44'),
(46, 'Which device increases or decreases AC voltage?', 'કયું ઉપકરણ AC વોલ્ટેજ વધારવા અથવા ઘટાડવા માટે વપરાય છે?', '2025-11-20 10:31:44'),
(48, 'Which energy is converted by an electric motor?', 'ઇલેક્ટ્રિક મોટર કઈ ઊર્જાનું રૂપાંતર કરે છે?', '2025-11-20 10:31:44'),
(49, 'Which conductor material is most commonly used in house wiring?', 'ઘરેલુ વાયરિંગમાં સૌથી સામાન્ય કયું મટિરિયલ વપરાય છે?', '2025-11-20 10:31:44'),
(50, 'What does a multimeter measure?', 'મલ્ટીમીટર શું માપી શકે છે?', '2025-11-20 10:31:44'),
(51, 'Which device is used to control motor speed?', 'મોટરની ગતિ નિયંત્રિત કરવા કયું ઉપકરણ વપરાય છે?', '2025-11-20 10:31:44'),
(52, 'Which device protects against short circuit?', 'શોર્ટ સર્કિટથી રક્ષણ કયું ઉપકરણ આપે છે?', '2025-11-20 10:31:44');

-- --------------------------------------------------------

--
-- Table structure for table `mcq_results`
--

CREATE TABLE `mcq_results` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `lang` varchar(8) DEFAULT 'en',
  `total` int(11) DEFAULT NULL,
  `correct` int(11) DEFAULT NULL,
  `wrong` int(11) DEFAULT NULL,
  `percentage` int(11) DEFAULT NULL,
  `duration_seconds` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_timeout` tinyint(4) DEFAULT 0,
  `is_violation` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mcq_results`
--

INSERT INTO `mcq_results` (`id`, `user_id`, `lang`, `total`, `correct`, `wrong`, `percentage`, `duration_seconds`, `created_at`, `is_timeout`, `is_violation`) VALUES
(7, 5, 'gu', 30, 6, 24, 20, 44, '2025-11-23 14:23:40', 0, 0),
(8, 5, 'en', 30, 5, 25, 17, 39, '2025-11-23 14:55:03', 0, 0),
(9, 5, 'en', 30, 6, 24, 20, 61, '2025-11-24 04:31:55', 0, 0),
(10, 5, 'gu', 30, 8, 22, 27, 56, '2025-11-24 04:56:27', 0, 0),
(11, 5, 'en', 30, 7, 23, 23, 69, '2025-12-07 06:19:10', 0, 0),
(12, 5, 'en', 30, 7, 23, 23, 54, '2025-12-12 07:33:37', 0, 0),
(13, 5, 'en', 30, 10, 20, 33, 45, '2025-12-12 07:42:01', 0, 0),
(14, 5, 'gu', 30, 4, 26, 13, 47, '2025-12-12 07:48:30', 0, 0),
(15, 5, 'gu', 30, 11, 19, 37, 51, '2025-12-12 07:58:21', 0, 0),
(16, 5, 'en', 30, 6, 24, 20, 54, '2025-12-12 08:37:14', 0, 0),
(17, 5, 'gu', 30, 3, 27, 10, 43, '2025-12-12 09:29:39', 0, 0),
(18, 8, 'gu', 30, 6, 24, 20, 46, '2025-12-12 09:38:14', 0, 0),
(19, 5, 'gu', 30, 9, 21, 30, 46, '2025-12-17 10:40:50', 0, 0),
(20, 9, 'gu', 30, 7, 23, 23, 48, '2025-12-22 09:30:34', 0, 0),
(21, 10, 'gu', 30, 6, 24, 20, 90, '2025-12-25 09:28:24', 0, 0),
(22, 5, 'en', 30, 10, 20, 33, 57, '2025-12-27 09:12:52', 0, 0),
(23, 11, 'gu', 30, 5, 25, 17, 58, '2025-12-27 09:38:39', 0, 0),
(24, 12, 'en', 30, 6, 24, 20, 41, '2025-12-30 12:07:10', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `mcq_result_items`
--

CREATE TABLE `mcq_result_items` (
  `id` int(11) NOT NULL,
  `result_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `user_answer` int(11) DEFAULT NULL,
  `correct_option` int(11) NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mcq_result_items`
--

INSERT INTO `mcq_result_items` (`id`, `result_id`, `question_id`, `user_answer`, `correct_option`, `is_correct`) VALUES
(181, 7, 4, 0, 2, 0),
(182, 7, 5, 1, 2, 0),
(183, 7, 6, 3, 1, 0),
(184, 7, 7, 2, 1, 0),
(185, 7, 8, 1, 1, 1),
(186, 7, 11, 0, 1, 0),
(187, 7, 12, 3, 3, 1),
(188, 7, 17, 3, 0, 0),
(189, 7, 19, 1, 0, 0),
(190, 7, 22, 2, 2, 1),
(191, 7, 23, 3, 1, 0),
(192, 7, 26, 0, 1, 0),
(193, 7, 27, 3, 0, 0),
(194, 7, 28, 2, 1, 0),
(195, 7, 29, 0, 1, 0),
(196, 7, 31, 3, 0, 0),
(197, 7, 32, 1, 0, 0),
(198, 7, 34, 3, 1, 0),
(199, 7, 35, 2, 1, 0),
(200, 7, 36, 1, 0, 0),
(201, 7, 39, 2, 2, 1),
(202, 7, 40, 0, 1, 0),
(203, 7, 41, 1, 2, 0),
(204, 7, 42, 2, 1, 0),
(205, 7, 43, 3, 0, 0),
(206, 7, 44, 1, 1, 1),
(207, 7, 45, 2, 1, 0),
(208, 7, 49, 3, 1, 0),
(209, 7, 51, 2, 2, 1),
(210, 7, 52, 2, 1, 0),
(211, 8, 7, 0, 1, 0),
(212, 8, 8, 1, 1, 1),
(213, 8, 9, 2, 2, 1),
(214, 8, 10, 3, 1, 0),
(215, 8, 11, 0, 1, 0),
(216, 8, 12, 2, 3, 0),
(217, 8, 13, 2, 1, 0),
(218, 8, 18, 3, 1, 0),
(219, 8, 19, 1, 0, 0),
(220, 8, 21, 3, 2, 0),
(221, 8, 22, 2, 2, 1),
(222, 8, 24, 0, 1, 0),
(223, 8, 25, 3, 0, 0),
(224, 8, 26, 2, 1, 0),
(225, 8, 27, 1, 0, 0),
(226, 8, 31, 3, 0, 0),
(227, 8, 34, 2, 1, 0),
(228, 8, 35, 3, 1, 0),
(229, 8, 36, 1, 0, 0),
(230, 8, 37, 3, 2, 0),
(231, 8, 38, 2, 0, 0),
(232, 8, 40, 1, 1, 1),
(233, 8, 43, 3, 0, 0),
(234, 8, 44, 2, 1, 0),
(235, 8, 46, 3, 0, 0),
(236, 8, 48, 0, 0, 1),
(237, 8, 49, 3, 1, 0),
(238, 8, 50, 2, 3, 0),
(239, 8, 51, 3, 2, 0),
(240, 8, 52, 3, 1, 0),
(241, 9, 5, 0, 2, 0),
(242, 9, 6, 1, 1, 1),
(243, 9, 8, 2, 1, 0),
(244, 9, 9, 1, 2, 0),
(245, 9, 10, 2, 1, 0),
(246, 9, 11, 1, 1, 1),
(247, 9, 13, 3, 1, 0),
(248, 9, 14, 2, 1, 0),
(249, 9, 15, 1, 1, 1),
(250, 9, 16, 0, 2, 0),
(251, 9, 18, 3, 1, 0),
(252, 9, 20, 2, 0, 0),
(253, 9, 21, 1, 2, 0),
(254, 9, 25, 3, 0, 0),
(255, 9, 27, 2, 0, 0),
(256, 9, 30, 1, 2, 0),
(257, 9, 32, 0, 0, 1),
(258, 9, 33, 3, 0, 0),
(259, 9, 34, 2, 1, 0),
(260, 9, 36, 1, 0, 0),
(261, 9, 37, 2, 2, 1),
(262, 9, 38, 1, 0, 0),
(263, 9, 40, 2, 1, 0),
(264, 9, 42, 3, 1, 0),
(265, 9, 44, 1, 1, 1),
(266, 9, 45, 2, 1, 0),
(267, 9, 48, 3, 0, 0),
(268, 9, 49, 2, 1, 0),
(269, 9, 50, 2, 3, 0),
(270, 9, 51, 1, 2, 0),
(271, 10, 5, 0, 2, 0),
(272, 10, 6, 2, 1, 0),
(273, 10, 7, 0, 1, 0),
(274, 10, 8, 1, 1, 1),
(275, 10, 10, 2, 1, 0),
(276, 10, 11, 1, 1, 1),
(277, 10, 12, 2, 3, 0),
(278, 10, 14, 1, 1, 1),
(279, 10, 15, 2, 1, 0),
(280, 10, 16, 1, 2, 0),
(281, 10, 20, 2, 0, 0),
(282, 10, 25, 3, 0, 0),
(283, 10, 26, 2, 1, 0),
(284, 10, 29, 1, 1, 1),
(285, 10, 30, 0, 2, 0),
(286, 10, 31, 3, 0, 0),
(287, 10, 32, 2, 0, 0),
(288, 10, 33, 1, 0, 0),
(289, 10, 34, 2, 1, 0),
(290, 10, 38, 1, 0, 0),
(291, 10, 40, 3, 1, 0),
(292, 10, 41, 1, 2, 0),
(293, 10, 42, 3, 1, 0),
(294, 10, 43, 2, 0, 0),
(295, 10, 44, 1, 1, 1),
(296, 10, 45, 0, 1, 0),
(297, 10, 46, 1, 0, 0),
(298, 10, 50, 3, 3, 1),
(299, 10, 51, 2, 2, 1),
(300, 10, 52, 1, 1, 1),
(301, 11, 4, 3, 2, 0),
(302, 11, 5, 1, 2, 0),
(303, 11, 6, 2, 1, 0),
(304, 11, 10, 2, 1, 0),
(305, 11, 11, 1, 1, 1),
(306, 11, 13, 1, 1, 1),
(307, 11, 14, 3, 1, 0),
(308, 11, 15, 2, 1, 0),
(309, 11, 16, 1, 2, 0),
(310, 11, 18, 1, 1, 1),
(311, 11, 20, 3, 0, 0),
(312, 11, 21, 2, 2, 1),
(313, 11, 26, 3, 1, 0),
(314, 11, 27, 2, 0, 0),
(315, 11, 28, 1, 1, 1),
(316, 11, 29, 0, 1, 0),
(317, 11, 32, 2, 0, 0),
(318, 11, 33, 2, 0, 0),
(319, 11, 34, 0, 1, 0),
(320, 11, 35, 3, 1, 0),
(321, 11, 36, 2, 0, 0),
(322, 11, 37, 1, 2, 0),
(323, 11, 39, 2, 2, 1),
(324, 11, 40, 3, 1, 0),
(325, 11, 41, 1, 2, 0),
(326, 11, 44, 3, 1, 0),
(327, 11, 46, 3, 0, 0),
(328, 11, 48, 3, 0, 0),
(329, 11, 49, 2, 1, 0),
(330, 11, 50, 3, 3, 1),
(331, 12, 4, 1, 2, 0),
(332, 12, 5, 2, 2, 1),
(333, 12, 6, 1, 1, 1),
(334, 12, 7, 1, 1, 1),
(335, 12, 10, 2, 1, 0),
(336, 12, 14, 3, 1, 0),
(337, 12, 17, 1, 0, 0),
(338, 12, 20, 0, 0, 1),
(339, 12, 21, 1, 2, 0),
(340, 12, 24, 2, 1, 0),
(341, 12, 25, 1, 0, 0),
(342, 12, 26, 0, 1, 0),
(343, 12, 27, 3, 0, 0),
(344, 12, 28, 2, 1, 0),
(345, 12, 29, 1, 1, 1),
(346, 12, 31, 1, 0, 0),
(347, 12, 32, 2, 0, 0),
(348, 12, 33, 1, 0, 0),
(349, 12, 34, 2, 1, 0),
(350, 12, 35, 3, 1, 0),
(351, 12, 37, 2, 2, 1),
(352, 12, 40, 2, 1, 0),
(353, 12, 41, 1, 2, 0),
(354, 12, 42, 0, 1, 0),
(355, 12, 43, 1, 0, 0),
(356, 12, 44, 2, 1, 0),
(357, 12, 48, 3, 0, 0),
(358, 12, 49, 1, 1, 1),
(359, 12, 50, 1, 3, 0),
(360, 12, 52, 2, 1, 0),
(361, 13, 3, 1, 1, 1),
(362, 13, 4, 2, 2, 1),
(363, 13, 5, 2, 2, 1),
(364, 13, 7, 1, 1, 1),
(365, 13, 8, 3, 1, 0),
(366, 13, 9, 2, 2, 1),
(367, 13, 10, 1, 1, 1),
(368, 13, 12, 0, 3, 0),
(369, 13, 15, 3, 1, 0),
(370, 13, 17, 2, 0, 0),
(371, 13, 20, 1, 0, 0),
(372, 13, 21, 2, 2, 1),
(373, 13, 26, 3, 1, 0),
(374, 13, 27, 1, 0, 0),
(375, 13, 28, 0, 1, 0),
(376, 13, 29, 2, 1, 0),
(377, 13, 31, 1, 0, 0),
(378, 13, 32, 1, 0, 0),
(379, 13, 33, 2, 0, 0),
(380, 13, 34, 3, 1, 0),
(381, 13, 36, 0, 0, 1),
(382, 13, 39, 1, 2, 0),
(383, 13, 41, 2, 2, 1),
(384, 13, 42, 3, 1, 0),
(385, 13, 43, 2, 0, 0),
(386, 13, 44, 1, 1, 1),
(387, 13, 45, 2, 1, 0),
(388, 13, 48, 1, 0, 0),
(389, 13, 49, 2, 1, 0),
(390, 13, 51, 1, 2, 0),
(391, 14, 5, 3, 2, 0),
(392, 14, 8, 3, 1, 0),
(393, 14, 9, 1, 2, 0),
(394, 14, 11, 1, 1, 1),
(395, 14, 12, 2, 3, 0),
(396, 14, 13, 2, 1, 0),
(397, 14, 15, 3, 1, 0),
(398, 14, 17, 2, 0, 0),
(399, 14, 21, 1, 2, 0),
(400, 14, 22, 1, 2, 0),
(401, 14, 23, 3, 1, 0),
(402, 14, 26, 2, 1, 0),
(403, 14, 27, 1, 0, 0),
(404, 14, 28, 1, 1, 1),
(405, 14, 29, 3, 1, 0),
(406, 14, 30, 2, 2, 1),
(407, 14, 31, 1, 0, 0),
(408, 14, 32, 2, 0, 0),
(409, 14, 33, 2, 0, 0),
(410, 14, 34, 3, 1, 0),
(411, 14, 36, 2, 0, 0),
(412, 14, 37, 1, 2, 0),
(413, 14, 38, 2, 0, 0),
(414, 14, 40, 3, 1, 0),
(415, 14, 41, 0, 2, 0),
(416, 14, 42, 1, 1, 1),
(417, 14, 44, 2, 1, 0),
(418, 14, 46, 3, 0, 0),
(419, 14, 48, 2, 0, 0),
(420, 14, 49, 3, 1, 0),
(421, 15, 3, 2, 1, 0),
(422, 15, 5, 2, 2, 1),
(423, 15, 6, 3, 1, 0),
(424, 15, 8, 2, 1, 0),
(425, 15, 9, 1, 2, 0),
(426, 15, 10, 3, 1, 0),
(427, 15, 13, 2, 1, 0),
(428, 15, 15, 2, 1, 0),
(429, 15, 16, 2, 2, 1),
(430, 15, 17, 1, 0, 0),
(431, 15, 19, 3, 0, 0),
(432, 15, 20, 3, 0, 0),
(433, 15, 22, 2, 2, 1),
(434, 15, 23, 1, 1, 1),
(435, 15, 25, 3, 0, 0),
(436, 15, 26, 1, 1, 1),
(437, 15, 27, 0, 0, 1),
(438, 15, 28, 2, 1, 0),
(439, 15, 30, 3, 2, 0),
(440, 15, 31, 2, 0, 0),
(441, 15, 33, 1, 0, 0),
(442, 15, 36, 0, 0, 1),
(443, 15, 38, 3, 0, 0),
(444, 15, 40, 2, 1, 0),
(445, 15, 41, 2, 2, 1),
(446, 15, 42, 1, 1, 1),
(447, 15, 43, 0, 0, 1),
(448, 15, 45, 3, 1, 0),
(449, 15, 48, 2, 0, 0),
(450, 15, 49, 1, 1, 1),
(451, 16, 3, 1, 1, 1),
(452, 16, 8, 2, 1, 0),
(453, 16, 9, 3, 2, 0),
(454, 16, 10, 2, 1, 0),
(455, 16, 14, 1, 1, 1),
(456, 16, 17, 0, 0, 1),
(457, 16, 18, 3, 1, 0),
(458, 16, 20, 2, 0, 0),
(459, 16, 21, 1, 2, 0),
(460, 16, 23, 3, 1, 0),
(461, 16, 26, 2, 1, 0),
(462, 16, 28, 1, 1, 1),
(463, 16, 29, 0, 1, 0),
(464, 16, 30, 2, 2, 1),
(465, 16, 31, 2, 0, 0),
(466, 16, 32, 1, 0, 0),
(467, 16, 33, 2, 0, 0),
(468, 16, 34, 3, 1, 0),
(469, 16, 36, 2, 0, 0),
(470, 16, 37, 3, 2, 0),
(471, 16, 38, 2, 0, 0),
(472, 16, 39, 0, 2, 0),
(473, 16, 40, 2, 1, 0),
(474, 16, 42, 2, 1, 0),
(475, 16, 43, 1, 0, 0),
(476, 16, 44, 3, 1, 0),
(477, 16, 45, 2, 1, 0),
(478, 16, 46, 3, 0, 0),
(479, 16, 51, 2, 2, 1),
(480, 16, 52, 3, 1, 0),
(481, 17, 3, 2, 1, 0),
(482, 17, 8, 2, 1, 0),
(483, 17, 9, 1, 2, 0),
(484, 17, 13, 3, 1, 0),
(485, 17, 14, 2, 1, 0),
(486, 17, 15, 1, 1, 1),
(487, 17, 16, 3, 2, 0),
(488, 17, 19, 2, 0, 0),
(489, 17, 22, 1, 2, 0),
(490, 17, 23, 2, 1, 0),
(491, 17, 24, 3, 1, 0),
(492, 17, 25, 3, 0, 0),
(493, 17, 27, 2, 0, 0),
(494, 17, 28, 1, 1, 1),
(495, 17, 30, 0, 2, 0),
(496, 17, 31, 2, 0, 0),
(497, 17, 32, 3, 0, 0),
(498, 17, 33, 2, 0, 0),
(499, 17, 34, 3, 1, 0),
(500, 17, 35, 2, 1, 0),
(501, 17, 37, 1, 2, 0),
(502, 17, 39, 0, 2, 0),
(503, 17, 40, 2, 1, 0),
(504, 17, 43, 2, 0, 0),
(505, 17, 44, 3, 1, 0),
(506, 17, 45, 3, 1, 0),
(507, 17, 48, 2, 0, 0),
(508, 17, 49, 3, 1, 0),
(509, 17, 51, 2, 2, 1),
(510, 17, 52, 3, 1, 0),
(511, 18, 3, 1, 1, 1),
(512, 18, 4, 2, 2, 1),
(513, 18, 5, 3, 2, 0),
(514, 18, 8, 3, 1, 0),
(515, 18, 9, 2, 2, 1),
(516, 18, 12, 1, 3, 0),
(517, 18, 14, 2, 1, 0),
(518, 18, 15, 3, 1, 0),
(519, 18, 17, 2, 0, 0),
(520, 18, 19, 3, 0, 0),
(521, 18, 22, 2, 2, 1),
(522, 18, 23, 3, 1, 0),
(523, 18, 24, 2, 1, 0),
(524, 18, 26, 1, 1, 1),
(525, 18, 27, 3, 0, 0),
(526, 18, 28, 2, 1, 0),
(527, 18, 31, 1, 0, 0),
(528, 18, 32, 2, 0, 0),
(529, 18, 35, 3, 1, 0),
(530, 18, 36, 2, 0, 0),
(531, 18, 38, 1, 0, 0),
(532, 18, 39, 2, 2, 1),
(533, 18, 43, 1, 0, 0),
(534, 18, 44, 2, 1, 0),
(535, 18, 45, 3, 1, 0),
(536, 18, 46, 2, 0, 0),
(537, 18, 48, 3, 0, 0),
(538, 18, 49, 2, 1, 0),
(539, 18, 51, 1, 2, 0),
(540, 18, 52, 2, 1, 0),
(541, 19, 3, 1, 1, 1),
(542, 19, 4, 3, 2, 0),
(543, 19, 5, 2, 2, 1),
(544, 19, 8, 2, 1, 0),
(545, 19, 10, 1, 1, 1),
(546, 19, 11, 0, 1, 0),
(547, 19, 12, 3, 3, 1),
(548, 19, 14, 2, 1, 0),
(549, 19, 17, 1, 0, 0),
(550, 19, 18, 0, 1, 0),
(551, 19, 19, 3, 0, 0),
(552, 19, 22, 2, 2, 1),
(553, 19, 23, 1, 1, 1),
(554, 19, 24, 3, 1, 0),
(555, 19, 25, 2, 0, 0),
(556, 19, 26, 1, 1, 1),
(557, 19, 27, 3, 0, 0),
(558, 19, 28, 2, 1, 0),
(559, 19, 31, 3, 0, 0),
(560, 19, 34, 2, 1, 0),
(561, 19, 38, 1, 0, 0),
(562, 19, 39, 3, 2, 0),
(563, 19, 41, 2, 2, 1),
(564, 19, 43, 1, 0, 0),
(565, 19, 44, 0, 1, 0),
(566, 19, 45, 3, 1, 0),
(567, 19, 46, 2, 0, 0),
(568, 19, 49, 1, 1, 1),
(569, 19, 51, 3, 2, 0),
(570, 19, 52, 2, 1, 0),
(571, 20, 5, 1, 2, 0),
(572, 20, 7, 3, 1, 0),
(573, 20, 8, 2, 1, 0),
(574, 20, 10, 1, 1, 1),
(575, 20, 11, 3, 1, 0),
(576, 20, 12, 1, 3, 0),
(577, 20, 13, 3, 1, 0),
(578, 20, 14, 2, 1, 0),
(579, 20, 15, 3, 1, 0),
(580, 20, 16, 1, 2, 0),
(581, 20, 17, 3, 0, 0),
(582, 20, 18, 3, 1, 0),
(583, 20, 20, 2, 0, 0),
(584, 20, 21, 1, 2, 0),
(585, 20, 22, 3, 2, 0),
(586, 20, 23, 2, 1, 0),
(587, 20, 24, 3, 1, 0),
(588, 20, 27, 0, 0, 1),
(589, 20, 28, 2, 1, 0),
(590, 20, 29, 1, 1, 1),
(591, 20, 30, 3, 2, 0),
(592, 20, 33, 2, 0, 0),
(593, 20, 34, 1, 1, 1),
(594, 20, 35, 0, 1, 0),
(595, 20, 40, 1, 1, 1),
(596, 20, 42, 2, 1, 0),
(597, 20, 46, 1, 0, 0),
(598, 20, 49, 3, 1, 0),
(599, 20, 51, 2, 2, 1),
(600, 20, 52, 1, 1, 1),
(601, 21, 3, 1, 1, 1),
(602, 21, 5, 2, 2, 1),
(603, 21, 6, 1, 1, 1),
(604, 21, 7, 3, 1, 0),
(605, 21, 9, 0, 2, 0),
(606, 21, 10, 2, 1, 0),
(607, 21, 12, 1, 3, 0),
(608, 21, 15, 2, 1, 0),
(609, 21, 16, 1, 2, 0),
(610, 21, 20, 2, 0, 0),
(611, 21, 21, 3, 2, 0),
(612, 21, 25, 3, 0, 0),
(613, 21, 26, 1, 1, 1),
(614, 21, 27, 2, 0, 0),
(615, 21, 28, 1, 1, 1),
(616, 21, 30, 3, 2, 0),
(617, 21, 33, 1, 0, 0),
(618, 21, 34, 0, 1, 0),
(619, 21, 35, 3, 1, 0),
(620, 21, 36, 2, 0, 0),
(621, 21, 38, 2, 0, 0),
(622, 21, 40, 1, 1, 1),
(623, 21, 42, 3, 1, 0),
(624, 21, 43, 1, 0, 0),
(625, 21, 45, 0, 1, 0),
(626, 21, 46, 3, 0, 0),
(627, 21, 49, 2, 1, 0),
(628, 21, 50, 1, 3, 0),
(629, 21, 51, 3, 2, 0),
(630, 21, 52, 2, 1, 0),
(631, 22, 4, 1, 2, 0),
(632, 22, 5, 2, 2, 1),
(633, 22, 7, 3, 1, 0),
(634, 22, 10, 1, 1, 1),
(635, 22, 12, 3, 3, 1),
(636, 22, 15, 2, 1, 0),
(637, 22, 17, 2, 0, 0),
(638, 22, 19, 1, 0, 0),
(639, 22, 21, 3, 2, 0),
(640, 22, 25, 2, 0, 0),
(641, 22, 26, 1, 1, 1),
(642, 22, 27, 3, 0, 0),
(643, 22, 28, 0, 1, 0),
(644, 22, 29, 3, 1, 0),
(645, 22, 30, 2, 2, 1),
(646, 22, 31, 1, 0, 0),
(647, 22, 32, 3, 0, 0),
(648, 22, 33, 2, 0, 0),
(649, 22, 34, 1, 1, 1),
(650, 22, 37, 3, 2, 0),
(651, 22, 38, 1, 0, 0),
(652, 22, 40, 1, 1, 1),
(653, 22, 41, 2, 2, 1),
(654, 22, 42, 3, 1, 0),
(655, 22, 44, 1, 1, 1),
(656, 22, 46, 0, 0, 1),
(657, 22, 48, 3, 0, 0),
(658, 22, 49, 2, 1, 0),
(659, 22, 50, 1, 3, 0),
(660, 22, 52, 3, 1, 0),
(661, 23, 3, 2, 1, 0),
(662, 23, 4, 3, 2, 0),
(663, 23, 5, 1, 2, 0),
(664, 23, 6, 3, 1, 0),
(665, 23, 10, 2, 1, 0),
(666, 23, 11, 1, 1, 1),
(667, 23, 12, 3, 3, 1),
(668, 23, 13, 0, 1, 0),
(669, 23, 15, 3, 1, 0),
(670, 23, 17, 1, 0, 0),
(671, 23, 18, 2, 1, 0),
(672, 23, 19, 1, 0, 0),
(673, 23, 20, 3, 0, 0),
(674, 23, 21, 2, 2, 1),
(675, 23, 22, 3, 2, 0),
(676, 23, 25, 2, 0, 0),
(677, 23, 26, 2, 1, 0),
(678, 23, 28, 1, 1, 1),
(679, 23, 29, 3, 1, 0),
(680, 23, 34, 2, 1, 0),
(681, 23, 36, 1, 0, 0),
(682, 23, 38, 2, 0, 0),
(683, 23, 39, 1, 2, 0),
(684, 23, 40, 0, 1, 0),
(685, 23, 41, 2, 2, 1),
(686, 23, 42, 2, 1, 0),
(687, 23, 43, 1, 0, 0),
(688, 23, 44, 3, 1, 0),
(689, 23, 45, 2, 1, 0),
(690, 23, 50, 2, 3, 0),
(691, 24, 3, 3, 1, 0),
(692, 24, 4, 2, 2, 1),
(693, 24, 5, 3, 2, 0),
(694, 24, 7, 2, 1, 0),
(695, 24, 9, 1, 2, 0),
(696, 24, 10, 3, 1, 0),
(697, 24, 11, 2, 1, 0),
(698, 24, 12, 1, 3, 0),
(699, 24, 13, 3, 1, 0),
(700, 24, 14, 3, 1, 0),
(701, 24, 15, 2, 1, 0),
(702, 24, 16, 1, 2, 0),
(703, 24, 17, 3, 0, 0),
(704, 24, 19, 2, 0, 0),
(705, 24, 20, 1, 0, 0),
(706, 24, 22, 3, 2, 0),
(707, 24, 25, 2, 0, 0),
(708, 24, 26, 1, 1, 1),
(709, 24, 28, 3, 1, 0),
(710, 24, 30, 3, 2, 0),
(711, 24, 33, 2, 0, 0),
(712, 24, 34, 1, 1, 1),
(713, 24, 39, 3, 2, 0),
(714, 24, 41, 2, 2, 1),
(715, 24, 43, 3, 0, 0),
(716, 24, 46, 3, 0, 0),
(717, 24, 49, 3, 1, 0),
(718, 24, 50, 3, 3, 1),
(719, 24, 51, 2, 2, 1),
(720, 24, 52, 3, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `shop_verifications`
--

CREATE TABLE `shop_verifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `shop_name` varchar(255) NOT NULL,
  `shop_address` text NOT NULL,
  `shop_city` varchar(120) DEFAULT NULL,
  `shop_mobile` varchar(20) NOT NULL,
  `gst_number` varchar(32) DEFAULT NULL,
  `shop_photo` varchar(512) DEFAULT NULL,
  `id_proof` varchar(512) DEFAULT NULL,
  `license_file` varchar(512) DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `admin_note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop_verifications`
--

INSERT INTO `shop_verifications` (`id`, `user_id`, `shop_name`, `shop_address`, `shop_city`, `shop_mobile`, `gst_number`, `shop_photo`, `id_proof`, `license_file`, `status`, `admin_note`, `created_at`, `updated_at`) VALUES
(7, 5, 'pradip shop', 'rajkot , gujrat,idia', 'rajkot ', '9316071778', '931607199612345', '/uploads/verification/shopPhoto-1766826852333-106666388.jpg', '/uploads/verification/idProof-1766826852341-219918726.jpg', '/uploads/verification/license-1766826852731-290750314.png', 'approved', 'good you ar efirst electrician .....', '2025-12-27 09:14:12', '2025-12-27 09:15:16'),
(8, 11, 'gggggg', 'gggggggg', 'gggggggg', '9876543210', '931607199612345', '/uploads/verification/shopPhoto-1766828367768-380614886.jpg', '/uploads/verification/idProof-1766828368709-477748432.jpg', '/uploads/verification/license-1766828368814-509448600.jpg', 'approved', 'good job buddy', '2025-12-27 09:39:29', '2025-12-27 09:44:18'),
(9, 12, 'het goriya shop', 'rajkot,gujrat,india', 'rajkot', '9316077565', NULL, '/uploads/verification/shopPhoto-1767096547263-613419984.jpg', '/uploads/verification/idProof-1767096547263-197009193.png', '/uploads/verification/license-1767096547435-845605667.jpg', 'approved', NULL, '2025-12-30 12:09:07', '2026-01-01 10:00:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `location` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isActive` tinyint(1) DEFAULT 1,
  `profile_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `mobile`, `email`, `password`, `location`, `isAdmin`, `created_at`, `isActive`, `profile_image`) VALUES
(2, 'pradip', '1234567832', 'admin123@gmail.com', '$2b$10$R0JCptlXGnXJuyT4wEoQ3.HhwgZOPPzmbjTsFVdJy/gnv0rrbO71m', 'ajkot', 0, '2025-11-04 12:18:57', 1, NULL),
(3, 'pradip', '9316071998', 'admin123222@gmail.com', '$2b$10$FVojf0KiTtfWPuPocpznCejWqETZh8kEagizF1eQD/kWlMy/c3QTC', 'ajkot', 0, '2025-11-04 12:22:12', 1, NULL),
(5, 'pppppp', '9316071998', 'pradip@gmail.com', '$2b$10$IrsDe81IvKZuCWrHLGmhCO8C5s0XlwqaFoSpVsqZJ1U.nwC9FCpki', 'Rajkot', 0, '2025-11-05 11:32:47', 1, '/uploads/profile/1767096279129-6370d80ede452i9.jfif'),
(6, 'Pradip Chavada', '9316071998', 'pradipchavada096@gmail.com', '$2b$10$RaU/Q2EwFQUYSVTW5fuqYeRMVn0MCDvqM/CPnZezYXwTgh4tPgodu', 'Rajot', 1, '2025-11-05 11:57:53', 1, NULL),
(11, 'naim kadivar ', '9316071221', 'naim@gmail.com', '$2b$10$agPnbftOrwIJuhkKK0RF6.gXVxkUmGcQGnJ4XNLuQCRen8sNF2.nS', 'vankaner', 0, '2025-12-27 09:36:53', 1, '/uploads/profile/1767095777555-6370cb535f90ai3.jfif'),
(12, 'het goriya', '9315673445', 'het@gmail.com', '$2b$10$aUnkLCtxLCqyKJpZpyrGTOgfbLIO..OfMpkzcRjkjTPTSlhyQyZuO', 'banglor', 0, '2025-12-30 12:06:00', 1, '/uploads/profile/1767096697982-6370dafc6cf2fi13.jfif'),
(13, 'dhruv khnat', '9315622345', 'dhryv@gmail.com', '$2b$10$eW2wdUEeRfh.2zvrilNU.uAL8rnSOmrz1CmOqm4qAgdbusDg7Xv4q', 'jamnagar', 0, '2025-12-31 05:57:08', 1, '/uploads/profile/1767160690082-IMG_20220630_144857_919.jpg'),
(14, 'jcole ', '9345673356', 'jcole@gmail.com', '$2b$10$DWYOfuFcznwQ2WqEs7lVIutbPlxQmCqCeYR5Oecyuy6sPMi8oDyVy', 'USA', 0, '2026-01-01 08:05:07', 1, '/uploads/profile/1767254839828-images (1).jpg'),
(15, 'gggggg', '9314567889', 'ggg@gmail.com', '$2b$10$FoluWQuzmcPUZz1Qbk4rZ.UK.Z6DJRmMKTk2hjp1XtZmWlH/iq7S.', 'ggggg', 0, '2026-01-01 08:35:34', 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mcq_answers`
--
ALTER TABLE `mcq_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `mcq_options`
--
ALTER TABLE `mcq_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `mcq_questions`
--
ALTER TABLE `mcq_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mcq_results`
--
ALTER TABLE `mcq_results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mcq_result_items`
--
ALTER TABLE `mcq_result_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_mcq_result_items_result` (`result_id`);

--
-- Indexes for table `shop_verifications`
--
ALTER TABLE `shop_verifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `mcq_answers`
--
ALTER TABLE `mcq_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `mcq_options`
--
ALTER TABLE `mcq_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT for table `mcq_questions`
--
ALTER TABLE `mcq_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `mcq_results`
--
ALTER TABLE `mcq_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `mcq_result_items`
--
ALTER TABLE `mcq_result_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=721;

--
-- AUTO_INCREMENT for table `shop_verifications`
--
ALTER TABLE `shop_verifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mcq_answers`
--
ALTER TABLE `mcq_answers`
  ADD CONSTRAINT `mcq_answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `mcq_questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mcq_options`
--
ALTER TABLE `mcq_options`
  ADD CONSTRAINT `mcq_options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `mcq_questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mcq_result_items`
--
ALTER TABLE `mcq_result_items`
  ADD CONSTRAINT `mcq_result_items_ibfk_1` FOREIGN KEY (`result_id`) REFERENCES `mcq_results` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shop_verifications`
--
ALTER TABLE `shop_verifications`
  ADD CONSTRAINT `fk_shopverif_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
