-- Create a new database called 'GDA00567_OT_Jairo_Castro'
-- Connect to the 'master' database to run this snippet
USE master

-- Create the new database if it does not exist already
IF NOT EXISTS (     
    SELECT name
FROM sys.databases
WHERE name = N'GDA00567_OT_Jairo_Castro'
)
CREATE DATABASE GDA00567_OT_Jairo_Castro
GO

USE GDA00567_OT_Jairo_Castro;

-- Create a new table called 'status' in schema 'GDA00567_OT_Jairo_Castro'
-- Drop the table if it already exists
IF OBJECT_ID('status', 'U') IS NOT NULL
DROP TABLE status

-- Create the table in the specified schema
CREATE TABLE status
(
    id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name VARCHAR(45) NOT NULL
);
GO


-- Create a new table called 'role' in schema 'GDA00567_OT_Jairo_Castro'
-- Drop the table if it already exists
IF OBJECT_ID('role', 'U') IS NOT NULL
DROP TABLE role

-- Create the table in the specified schema
CREATE TABLE role
(
    id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
);
GO

-- Create a new table called 'clients' in schema 'GDA00567_OT_Jairo_Castro'
-- Drop the table if it already exists
IF OBJECT_ID('clients', 'U') IS NOT NULL
DROP TABLE clients

-- Create the table in the specified schema
CREATE TABLE clients
(
    id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    social_reason VARCHAR(245) NOT NULL,
    comertial_name VARCHAR(245) NOT NULL,
    delivery_address VARCHAR(45) NOT NULL,
    phone_number VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
);
GO



-- Create a new table called 'users' in schema 'GDA00567_OT_Jairo_Castro'
-- Drop the table if it already exists
IF OBJECT_ID('users', 'U') IS NOT NULL
DROP TABLE users
-- Create the table in the specified schema
CREATE TABLE users
(
    id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    role_id INT NOT NULL,
    status_id INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
    phone_number VARCHAR(45) NOT NULL,
    birth_date DATE NOT NULL,
    creation_date DATE NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (status_id) REFERENCES status(id),
);
GO

-- Create a new table called 'products_categories' in schema 'GDA00567_OT_Jairo_Castro'
-- Drop the table if it already exists
IF OBJECT_ID('products_categories', 'U') IS NOT NULL
DROP TABLE products_categories

-- Create the table in the specified schema
CREATE TABLE products_categories
(
    id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    status_id INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    creation_date DATE NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (status_id) REFERENCES status(id),
);
GO




-- Create a new table called 'order' in schema 'GDA00567_OT_Jairo_Castro'
-- Drop the table if it already exists
IF OBJECT_ID('[order]', 'U') IS NOT NULL
DROP TABLE [order]

-- Create the table in the specified schema
CREATE TABLE [order]
(
    id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    user_id INT NULL,
    status_id INT NOT NULL,
    client_id INT NOT NULL,
    full_name VARCHAR(45) NOT NULL,
    address VARCHAR(245) NOT NULL,
    phone_number VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    delivery_date DATE NOT NULL,
    total_order FLOAT NOT NULL,
    creation_date DATE NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (status_id) REFERENCES status(id),
);
GO



-- Create a new table called 'products' in schema 'GDA00567_OT_Jairo_Castro'
-- Drop the table if it already exists
IF OBJECT_ID('products', 'U') IS NOT NULL
DROP TABLE products

-- Create the table in the specified schema
CREATE TABLE products
(
    id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    products_categories_id INT NOT NULL,
    user_id INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    brand VARCHAR(45) NOT NULL,
    code VARCHAR(45) NOT NULL,
    stock INT NOT NULL,
    status_id INT NOT NULL,
    price FLOAT NOT NULL,
    photo VARCHAR(245) NOT NULL,
    creation_date DATE NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (products_categories_id) REFERENCES products_categories(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (status_id) REFERENCES status(id),

);


-- Create a new table called 'order_details' in schema 'GDA00567_OT_Jairo_Castro'
-- Drop the table if it already exists
IF OBJECT_ID('order_details', 'U') IS NOT NULL
DROP TABLE order_details

-- Create the table in the specified schema
CREATE TABLE order_details
(
    id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    order_id INT NOT NULL,
    products_id INT NOT NULL,
    quantity INT NOT NULL,
    price FLOAT NOT NULL,
    subtotal FLOAT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES [order](id),
    FOREIGN KEY (products_id) REFERENCES products(id),
);
GO

-- insert data into tables

Insert into status (name) values ('Activo'), ('Inactivo'), ('Pendiente'), ('Entregado'), ('Cancelado');
GO

insert into role (name) values ('Administrador'), ('Vendedor');
GO
INSERT INTO clients (social_reason, comertial_name, delivery_address, phone_number, email) VALUES ('Jairo Castro', 'Jairo Castro', 'Guatemala', '12345678', 'jc@test.com'), ('Juan Perez', 'Juan Perez', 'Guatemala', '12345678', 'jp@mail.com'),('Maria Lopez', 'Maria Lopez', 'Guatemala', '12345678', 'ml@mail.com'), ('Pedro Ramirez', 'Pedro Ramirez', 'Guatemala', '12345678', 'pr@mail.com');
GO

INSERT INTO users (role_id, status_id, email, password, phone_number, birth_date) VALUES (1, 1, 'jj@mail.com', '1234567', '12345678', '1990-01-01'), (2, 1, 'jc@mail.com', '1234567', '12345678', '1990-01-01'),(2, 1, 'mr@start.com', '1234567', '12345678', '1990-01-01'), (2, 1, 'miso@pato.com', '1234567', '12345678', '1990-01-01');
GO

INSERT INTO products_categories (user_id, status_id, name) VALUES (1, 1, 'Electrodomesticos'), (1, 1, 'Ropa'), (1, 1, 'Zapatos'), (1, 1, 'Accesorios');
GO

INSERT INTO [order](user_id, status_id, client_id, full_name, address, phone_number, email, delivery_date, total_order, creation_date) 
VALUES 
(4, 5, 3, 'Clovis Gallo', 'PO Box 13454', '215-643-1384', 'cgallo0@time.com', '2022-11-09', 6565.92, '2024-09-22T00:06:09'),
(4, 4, 1, 'Harp Errichelli', 'Suite 24', '431-713-4974', 'herrichelli1@about.me', '2022-11-14', 1035.04, '2024-12-05T17:56:30'),
(2, 5, 3, 'Jena Benning', 'Apt 869', '251-213-5584', 'jbenning2@youku.com', '2022-06-21', 460.28, '2024-05-16T11:24:48'),
(3, 4, 2, 'Bekki Andover', 'Suite 97', '855-337-4469', 'bandover3@hatena.ne.jp', '2022-11-24', 5762.57, '2024-07-13T12:11:58'),
(3, 3, 3, 'Cory Mitrikhin', 'Suite 82', '771-232-0889', 'cmitrikhin4@phpbb.com', '2022-12-11', 5686.53, '2024-09-19T21:22:16'),
(1, 5, 2, 'Alvina Maylour', 'Apt 326', '667-891-2384', 'amaylour5@sciencedaily.com', '2022-03-25', 7803.63, '2024-08-08T03:52:43'),
(4, 4, 4, 'Krysta Springate', 'Apt 6', '611-663-5491', 'kspringate6@twitter.com', '2022-01-25', 5139.47, '2024-06-09T04:42:23'),
(3, 5, 1, 'Nicolas Moylan', 'Apt 829', '288-777-3172', 'nmoylan7@pen.io', '2022-02-27', 3153.75, '2024-05-19T18:12:01'),
(1, 3, 4, 'Charmian Madison', 'Room 1800', '721-534-4857', 'cmadison8@buzzfeed.com', '2022-10-09', 6365.14, '2024-11-30T11:05:21'),
(3, 5, 4, 'Evyn Longfield', '13th Floor', '834-123-9374', 'elongfield9@oracle.com', '2022-09-08', 6037.85, '2024-02-13T23:51:59'),
(4, 3, 1, 'Richard Glaserman', 'Room 1485', '432-413-4006', 'rglasermana@naver.com', '2022-07-29', 3163.77, '2024-10-24T15:32:45'),
(3, 3, 1, 'Sophie Cast', 'Room 375', '165-787-9564', 'scastb@sciencedirect.com', '2022-12-11', 4648.98, '2024-08-07T17:18:15'),
(2, 4, 2, 'Karola Kelinge', 'Apt 418', '342-595-2897', 'kkelingec@china.com.cn', '2022-09-21', 834.83, '2024-07-10T14:31:14'),
(3, 5, 3, 'Gert Gilloran', '10th Floor', '141-827-3211', 'ggillorand@europa.eu', '2022-01-19', 2868.6, '2024-09-30T02:54:03'),
(3, 3, 1, 'Krispin Endecott', '5th Floor', '710-918-2115', 'kendecotte@addthis.com', '2022-10-15', 4059.49, '2024-10-31T01:33:21'),
(3, 3, 2, 'Irvine Ind', 'Room 731', '818-912-5196', 'iindf@unicef.org', '2022-10-18', 241.24, '2024-10-01T18:52:56'),
(1, 5, 1, 'Noni Sailor', 'Suite 15', '516-992-5213', 'nsailorg@gnu.org', '2022-05-04', 1211.01, '2024-05-07T23:55:35'),
(3, 3, 2, 'Oates Poag', 'Room 1661', '323-869-3536', 'opoagh@blogspot.com', '2022-02-08', 6406.76, '2024-01-28T07:32:48'),
(1, 5, 3, 'Katusha Lunnon', 'Apt 257', '727-756-2801', 'klunnoni@wunderground.com', '2022-07-07', 9244.91, '2024-01-26T17:52:51'),
(3, 5, 2, 'Falkner Molyneux', 'Suite 33', '741-713-6491', 'fmolyneuxj@opera.com', '2022-06-05', 8110.57, '2024-04-21T22:48:56');
GO


insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (3, 2, 'non', 'non', 'LSZ', 86, 2, 621.13, 'venenatis', '2/18/2022');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (2, 4, 'justo', 'ac', 'TPX', 21, 2, 7.72, 'sed accumsan felis', '6/6/2013');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (3, 2, 'sagittis', 'eget', 'CFD', 47, 1, 721.53, 'auctor gravida', '4/25/2003');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (4, 4, 'tempor', 'lectus', 'FDR', 62, 1, 710.96, 'posuere cubilia curae', '11/8/2001');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (3, 0, 'integer', 'lorem', 'MJL', 35, 1, 802.92, 'duis bibendum morbi', '4/25/2009');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (1, 4, 'adipiscing', 'sit', 'YKZ', 21, 2, 1184.25, 'duis consequat', '11/2/2001');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (0, 0, 'vel', 'potenti', 'KHM', 29, 1, 901.85, 'hac habitasse', '1/27/2007');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (4, 4, 'enim', 'nisi', 'VAI', 14, 2, 1164.56, 'ac', '11/21/2021');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (1, 4, 'tempus', 'sagittis', 'YRO', 41, 2, 906.67, 'sed sagittis nam', '4/26/2017');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (2, 2, 'id', 'dapibus', 'ZRH', 98, 2, 943.63, 'mattis nibh', '1/3/2015');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (3, 2, 'odio', 'imperdiet', 'KIP', 31, 1, 192.46, 'erat', '2/20/2008');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (2, 1, 'quis', 'sem', 'WIR', 71, 2, 591.43, 'lacus', '9/29/2024');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (2, 4, 'porta', 'nec', 'DVP', 65, 2, 469.95, 'luctus tincidunt', '10/15/2008');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (3, 1, 'aliquam', 'at', 'BJD', 46, 2, 759.35, 'duis', '1/9/2013');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (3, 3, 'eros', 'est', 'PTJ', 43, 2, 68.77, 'lacus at velit', '6/29/2015');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (1, 0, 'quam', 'velit', 'FBU', 52, 1, 929.94, 'dis parturient montes', '12/26/2012');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (3, 2, 'lorem', 'justo', 'WTE', 93, 2, 590.72, 'ut massa', '4/28/2023');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (4, 0, 'sed', 'ante', 'BGX', 69, 1, 552.63, 'integer aliquet', '5/3/2017');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (0, 0, 'a', 'vestibulum', 'CON', 5, 2, 740.09, 'integer', '8/21/2021');
insert into products (products_categories_id, user_id, name, brand, code, stock, status_id, price, photo, creation_date) values (0, 0, 'potenti', 'integer', 'PJG', 80, 2, 354.75, 'ultrices posuere cubilia', '2/12/2015');
GO


insert into order_details (order_id, products_id, quantity, price, subtotal) values (13, 7, 9, 285.86, 6005.73);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (9, 4, 4, 746.18, 9134.67);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (10, 18, 7, 276.04, 9485.18);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (6, 19, 3, 578.2, 4076.92);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (17, 9, 8, 902.28, 2144.84);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (3, 4, 5, 663.52, 1017.23);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (3, 13, 4, 236.5, 4252.62);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (18, 9, 2, 28.16, 9493.39);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (5, 7, 9, 116.26, 1052.83);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (19, 1, 3, 900.71, 9118.9);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (2, 13, 4, 655.51, 4828.89);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (14, 2, 2, 223.41, 5813.38);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (10, 7, 7, 977.0, 4017.88);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (8, 18, 1, 922.13, 8326.42);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (16, 2, 5, 769.08, 2537.73);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (12, 11, 6, 546.19, 9744.43);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (2, 2, 3, 379.3, 6361.23);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (8, 3, 5, 285.5, 6110.76);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (13, 20, 6, 526.78, 2873.66);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (8, 15, 7, 235.73, 6636.92);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (9, 15, 10, 747.38, 5742.64);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (14, 2, 5, 461.68, 1665.83);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (15, 17, 9, 381.9, 6411.91);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (5, 15, 3, 472.31, 2808.56);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (6, 4, 6, 525.05, 3255.94);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (13, 3, 1, 768.34, 9667.17);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (17, 12, 10, 547.77, 6608.95);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (12, 18, 6, 64.94, 9798.94);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (10, 19, 1, 855.39, 8857.64);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (10, 16, 5, 235.08, 823.2);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (20, 2, 1, 379.07, 5347.48);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (17, 3, 2, 425.58, 4465.79);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (1, 8, 9, 491.65, 4729.21);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (8, 17, 6, 508.33, 8246.57);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (8, 8, 8, 523.07, 6391.09);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (13, 3, 1, 12.88, 1400.04);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (14, 10, 5, 885.56, 4392.32);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (9, 14, 9, 848.34, 5441.37);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (5, 8, 6, 392.4, 1658.74);
insert into order_details (order_id, products_id, quantity, price, subtotal) values (18, 12, 7, 224.92, 3421.91);
GO

-- CREATE PROCEDURES

-- Create a new stored procedure called 'sp_create_status' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_create_status'
)
DROP PROCEDURE sp_create_status
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_create_status
    @name VARCHAR(45)

AS
BEGIN
    INSERT INTO status
        (name)
    VALUES
        (@name)
END
GO

-- Create a new stored procedure called 'sp_update_status' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_status'
)
DROP PROCEDURE sp_update_status
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_status
    @name VARCHAR(45),
    @status_id INT

AS
BEGIN
    UPDATE status
    SET name = @name
    WHERE id = @status_id
END
GO



-- Create a new stored procedure called 'sp_create_role' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_create_role'
)
DROP PROCEDURE sp_create_role
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_create_role
    @role_name VARCHAR(45)

AS
BEGIN
    INSERT INTO status
        (name)
    VALUES
        (@role_name)
END
GO

-- Create a new stored procedure called 'sp_update_role' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_role'
)
DROP PROCEDURE sp_update_role
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_role
    @role_name VARCHAR(45),
    @role_id INT

AS
BEGIN
    UPDATE role
    SET name = @role_name
    WHERE id = @role_id
END
GO

-- Create a new stored procedure called 'sp_create_client' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_create_client'
)
DROP PROCEDURE sp_create_client
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_create_client
    @social_reason VARCHAR(245),
    @comertial_name VARCHAR(245),
    @delivery_address VARCHAR(45),
    @phone_number VARCHAR(45),
    @email VARCHAR(45)

AS
BEGIN
    INSERT INTO clients
        (social_reason, comertial_name, delivery_address, phone_number, email)
    VALUES
        (@social_reason, @comertial_name, @delivery_address, @phone_number, @email)
END
GO

-- Create a new stored procedure called 'sp_update_client' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_client'
)
DROP PROCEDURE sp_update_client
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_client
    @social_reason VARCHAR(245),
    @comertial_name VARCHAR(245),
    @delivery_address VARCHAR(45),
    @phone_number VARCHAR(45),
    @email VARCHAR(45),
    @client_id INT

AS
BEGIN
    UPDATE clients
    SET social_reason = @social_reason,
        comertial_name = @comertial_name,
        delivery_address = @delivery_address,
        phone_number = @phone_number,
        email = @email
    WHERE id = @client_id
END
GO

-- Create a new stored procedure called 'sp_register_user' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_register_user'
)
DROP PROCEDURE sp_register_user
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_register_user
    @role_id INT,
    @status_id INT,
    @email VARCHAR(100),
    @password VARCHAR(150),
    @phone_number VARCHAR(45),
    @birth_date DATE
AS
BEGIN
    INSERT INTO users
        (role_id, status_id, email, password, phone_number, birth_date)
    VALUES
        (@role_id, @status_id, @email, @password, @phone_number, @birth_date)
END
GO

-- Create a new stored procedure called 'sp_update_user' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_user'
)
DROP PROCEDURE sp_update_user
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_user
    @role_id INT,
    @email VARCHAR(100),
    @password VARCHAR(150),
    @phone_number VARCHAR(45),
    @birth_date DATE,
    @user_id INT
AS
BEGIN
    UPDATE users
    SET role_id = @role_id,
        email = @email,
        password = @password,
        phone_number = @phone_number,
        birth_date = @birth_date
    WHERE id = @user_id
END
GO

-- Create a new stored procedure called 'sp_update_user_status' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_user_status'
)
DROP PROCEDURE sp_update_user_status
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_user_status
    @status_id INT,
    @user_id INT
AS
BEGIN
    UPDATE users
    SET status_id = @status_id
    WHERE id = @user_id
END
GO


-- Create a new stored procedure called 'sp_register_products_categories' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_register_products_categories'
)
DROP PROCEDURE sp_register_products_categories
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_register_products_categories
    @user_id INT,
    @status_id INT,
    @name VARCHAR(45)
AS
BEGIN
    INSERT INTO products_categories
        (user_id, status_id, name)
    VALUES
        (@user_id, @status_id, @name)
END
GO

-- Create a new stored procedure called 'sp_update_products_categories' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_products_categories'
)
DROP PROCEDURE sp_update_products_categories
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_products_categories
    @name VARCHAR(45),
    @products_categories_id INT
AS
BEGIN
    UPDATE products_categories
    SET name = @name
    WHERE id = @products_categories_id
END
GO

-- Create a new stored procedure called 'sp_update_products_categories_status' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_products_categories_status'
)
DROP PROCEDURE sp_update_products_categories_status
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_products_categories_status
    @status_id INT,
    @products_categories_id INT
AS
BEGIN
    UPDATE products_categories
    SET status_id = @status_id
    WHERE id = @products_categories_id
END
GO


DROP PROCEDURE IF EXISTS sp_register_order;
GO

-- Create the stored procedure
CREATE PROCEDURE sp_register_order
    @client_id INT,
    @status_id INT,
    @full_name VARCHAR(45),
    @address VARCHAR(245),
    @phone_number VARCHAR(45),
    @email VARCHAR(45),
    @delivery_date DATE,
    @total_order FLOAT,
    @order_details NVARCHAR(MAX)
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        DECLARE @order_id INT;

        -- Insert into [order] table
        INSERT INTO [order]
        (client_id, status_id, full_name, address, phone_number, email, delivery_date, total_order)
    VALUES
        (@client_id, @status_id, @full_name, @address, @phone_number, @email, @delivery_date, @total_order);

        -- Get the newly inserted order_id
        SET @order_id = SCOPE_IDENTITY();

        -- Insert into order_details table using OPENJSON
        INSERT INTO order_details
        (order_id, products_id, quantity, price, subtotal)
    SELECT
        @order_id AS order_id,
        JSON_VALUE(value, '$.products_id') AS products_id,
        JSON_VALUE(value, '$.quantity') AS quantity,
        JSON_VALUE(value, '$.price') AS price,
        JSON_VALUE(value, '$.subtotal') AS subtotal
    FROM OPENJSON(@order_details);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO



-- Create a new stored procedure called 'sp_update_order_info' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_order_info'
)
DROP PROCEDURE sp_update_order_info
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_order_info
    @full_name VARCHAR(45),
    @address VARCHAR(245),
    @phone_number VARCHAR(45),
    @email VARCHAR(45),
    @order_id INT
AS
BEGIN
    UPDATE [order]
    SET full_name = @full_name,
        address = @address,
        phone_number = @phone_number,
        email = @email
    WHERE id = @order_id
END
GO

-- Create a new stored procedure called 'sp_update_order_status' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_order_status'
)
DROP PROCEDURE sp_update_order_status
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_order_status
    @status_id INT,
    @order_id INT

AS
BEGIN
    UPDATE [order]
    SET status_id = @status_id
    WHERE id = @order_id
END
GO

-- Create a new stored procedure called 'sp_register_products' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_register_products'
)
DROP PROCEDURE sp_register_products
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_register_products
    @products_categories_id INT,
    @user_id INT,
    @status_id INT,
    @name VARCHAR(45),
    @brand VARCHAR(45),
    @code VARCHAR(45),
    @stock INT,
    @price FLOAT,
    @photo VARCHAR(245)
AS
BEGIN
    INSERT INTO products
        (products_categories_id, user_id, status_id, name, brand, code, stock, price, photo)
    VALUES
        (@products_categories_id, @user_id, @status_id, @name, @brand, @code, @stock, @price, @photo)
END
GO

-- Create a new stored procedure called 'sp_update_products' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_products'
)
DROP PROCEDURE sp_update_products
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_products
    @products_categories_id INT,
    @name VARCHAR(45),
    @brand VARCHAR(45),
    @code VARCHAR(45),
    @photo VARCHAR(245),
    @product_id INT
AS
BEGIN
    UPDATE products
    SET products_categories_id = @products_categories_id,
        name = @name,
        brand = @brand,
        code = @code,
        photo = @photo
    WHERE id = @product_id
END
GO

-- Create a new stored procedure called 'sp_update_product_stock' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_product_stock'
)
DROP PROCEDURE sp_update_product_stock
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_product_stock
    @stock INT,
    @price FLOAT,
    @product_id INT
AS
BEGIN
    UPDATE products
    SET stock = @stock, 
        price = @price
    WHERE id = @product_id
END
GO

-- Create a new stored procedure called 'sp_update_product_status' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_product_status'
)
DROP PROCEDURE sp_update_product_status
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_product_status
    @status_id INT,
    @product_id INT
AS
BEGIN
    UPDATE products
    SET status_id = @status_id
    WHERE id = @product_id
END
GO

-- Create a new stored procedure called 'sp_update_order_details' in schema 'SchemaName'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'GDA00567_OT_Jairo_Castro'
    AND SPECIFIC_NAME = N'sp_update_order_details'
)
DROP PROCEDURE sp_update_order_details
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE sp_update_order_details
    @quantity INT,
    @subtotal FLOAT,
    @total_order FLOAT,
    @order_id INT
AS
BEGIN
    BEGIN TRANSACTION

    BEGIN TRY
        UPDATE order_details
        SET quantity = @quantity,
            subtotal = @subtotal
        WHERE order_id = @order_id

        UPDATE [order]
        SET total_order = @total_order
        WHERE id = @order_id

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
END
GO

-- CREATE VIEWS

-- Create a new view called 'total_active_products' in schema 'SchemaName'
-- Drop the view if it already exists
IF EXISTS (
SELECT *
FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'USE GDA00567_OT_Jairo_Castro;'
    AND sys.views.name = N'total_active_products'
)
DROP VIEW SchemaName.total_active_products
GO
-- Create the view in the specified schema
CREATE VIEW total_active_products
AS
    -- body of the view
    SELECT COUNT(*) AS total_active_products
    FROM products
    WHERE stock > 0;
GO

-- Create a new view called 'total_amount_per_month' in schema 'SchemaName'
--Drop the view if it already exists
IF EXISTS (
 SELECT *
FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'USE GDA00567_OT_Jairo_Castro;'
    AND sys.views.name = N'total_amount_per_month'
)
 DROP VIEW SchemaName.total_amount_per_month
 GO
--Create the view in the specified schema
CREATE VIEW total_amount_per_month
AS
    SELECT SUM(total_order) AS total_order
    FROM [order]
    WHERE MONTH(creation_date) = 8 AND YEAR(creation_date) = 2024;
GO

-- Create a new view called 'top_ten_clients' in schema 'SchemaName'
--Drop the view if it already exists
IF EXISTS (
 SELECT *
FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'USE GDA00567_OT_Jairo_Castro;'
    AND sys.views.name = N'top_ten_clients'
)
 DROP VIEW  top_ten_clients
 GO
--Create the view in the specified schema
CREATE VIEW top_ten_clients
AS
    SELECT TOP 10
        c.social_reason, SUM(o.total_order) as total
    FROM clients c
        JOIN [order] o ON c.id = o.client_id
    GROUP BY c.social_reason
    ORDER BY total DESC 
GO


-- Create a new view called 'top_ten_sales' in schema 'SchemaName'
-- Drop the view
-- if it already exists
IF EXISTS (
 SELECT *
FROM sys.views
    JOIN sys.schemas
    ON sys.views.schema_id = sys.schemas.schema_id
WHERE sys.schemas.name = N'USE GDA00567_OT_Jairo_Castro;'
    AND sys.views.name = N'top_ten_sales'
 )
 DROP VIEW  top_ten_sales
 GO
-- Create the view in the specified schema
CREATE VIEW top_ten_sales
AS
    SELECT TOP 10
        p.name, SUM(od.quantity) as top_ten_sales
    FROM products p
        JOIN order_details od ON p.id = od.products_id
    GROUP BY p.name
    ORDER BY top_ten_sales;
GO




