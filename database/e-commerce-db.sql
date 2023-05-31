-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2023 at 08:20 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-commerce-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `first_name`, `last_name`, `total_price`, `address`, `city`, `country`, `payment_method`, `status`, `created_at`) VALUES
(1, 'Erezana', 'Berisha', 119.97, 'adresa', 'prishtine', 'kosove', 'Cash', '0', '2023-05-28 00:10:05'),
(2, 'ermira', 'sekiraqa', 199.95, 'adresa', 'prishtine', 'kosove', 'Cash', '0', '2023-05-28 00:12:50');

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `name`, `price`, `description`, `image_url`, `brand`, `category`, `created_at`) VALUES
(1, 'Sunglasses 2', 29.99, 'Description', 'sunglasses-2.JPG', 'Brand B', 'Men', '2023-05-27 23:51:08'),
(2, 'Sunglasses 3', 39.99, 'Description', 'sunglasses-3.JPG', 'Brand B', 'Women', '2023-05-27 23:51:08'),
(3, 'Sunglasses 4', 49.99, 'Description', 'sunglasses-4.JPG', 'Brand B', 'Men', '2023-05-27 23:51:08'),
(4, 'Sunglasses 5', 19.99, 'Description', 'sunglasses-5.JPG', 'Brand B', 'Women', '2023-05-27 23:51:08'),
(5, 'Sunglasses 6', 29.99, 'Description', 'sunglasses-6.JPG', 'Brand B', 'Men', '2023-05-27 23:51:08'),
(6, 'Sunglasses 7', 39.99, 'Description', 'sunglasses-7.JPG', 'Brand B', 'Women', '2023-05-27 23:51:08'),
(7, 'Sunglasses 8', 49.99, 'Description', 'sunglasses-8.JPG', 'Brand B', 'Men', '2023-05-27 23:51:08'),
(8, 'Sunglasses 9', 19.99, 'Description', 'sunglasses-9.JPG', 'Brand B', 'Women', '2023-05-27 23:51:08'),
(9, 'Sunglasses 10', 29.99, 'Description', 'sunglasses-1.JPG', 'Brand B', 'Men', '2023-05-27 23:51:08'),
(10, 'Sunglasses 11', 39.99, 'Description', 'sunglasses-2.JPG', 'Brand B', 'Women', '2023-05-27 23:51:08'),
(11, 'Sunglasses 12', 49.99, 'Description', 'sunglasses-3.JPG', 'Brand B', 'Men', '2023-05-27 23:51:08'),
(12, 'Sunglasses 13', 19.99, 'Description', 'sunglasses-4.JPG', 'Brand B', 'Women', '2023-05-27 23:51:08'),
(13, 'Sunglasses 14', 29.99, 'Description', 'sunglasses-5.JPG', 'Brand B', 'Men', '2023-05-27 23:51:08'),
(14, 'Sunglasses 15', 39.99, 'Description', 'sunglasses-6.JPG', 'Brand B', 'Women', '2023-05-27 23:51:08'),
(15, 'Sunglasses 16', 49.99, 'Description', 'sunglasses-7.JPG', 'Brand B', 'Men', '2023-05-27 23:51:08'),
(16, 'Sunglasses 17', 19.99, 'Description', 'sunglasses-8.JPG', 'Brand B', 'Women', '2023-05-27 23:51:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `last_name`, `email`, `password`, `phone_number`, `address`, `city`, `country`, `role`) VALUES
(1, 'admin', 'admin', 'admin@admin.com', '$2y$10$ucaJ7c7qHaiQJY3VuBwt/u78cEXzp4nbKwoKkj0IbX.VZEwsy2UT6', '1', 'address', 'city', 'country', 'admin'),
(4, 'Ermira', 'Sekiraqa', 'ermira@gmail.com', '$2y$10$LVeyy3CYRJJdlrmMQY8rR.u50vGn3lHY3lt9QFj/vngLXMgz6TC9q', '1111111', 'adresa', 'prishtine', 'kosove', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

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
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
