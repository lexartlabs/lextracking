-- dev. @droman
-- SINGLE TABLE GENERATOR

DROP TABLE IF EXISTS usuarios;


CREATE TABLE usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
	fechaCreado DATETIME,
	fechaActualizado DATETIME,
	nombre VARCHAR(50),
	email VARCHAR(50),
	password VARCHAR(300),
	tipo VARCHAR(20),
	idClient INT ,
	borrado TINYINT(1)
);

DROP TABLE IF EXISTS Banks;


CREATE TABLE Banks(
	id INT AUTO_INCREMENT PRIMARY KEY,
	-- fechaCreado DATETIME,
	-- fechaActualizado DATETIME,
	name VARCHAR(50),
	branchOffice VARCHAR(50),
	holder VARCHAR(50),
	type VARCHAR(50),

	currency VARCHAR(50),

	identificationCard VARCHAR(50),

	account VARCHAR(50),
	priceUsd FLOAT(20),

	borrado TINYINT(1)
);


DROP TABLE IF EXISTS Bills;


CREATE TABLE Bills(
	id INT AUTO_INCREMENT PRIMARY KEY,

	name VARCHAR(50),
	billNumber varchar(50),
	rut VARCHAR(50),
	date datetime,

	concept VARCHAR(50),


	price VARCHAR(50),


	expirationTime datetime,


	borrado TINYINT(1)
);



DROP TABLE IF EXISTS Products;


CREATE TABLE Products(
	id INT AUTO_INCREMENT PRIMARY KEY,

	type VARCHAR(50),

	-- type == servidor Virtual
	cpu   VARCHAR(50),
	hdd   VARCHAR(50),
	transfer  VARCHAR(50),
	memory  VARCHAR(50),


	-- type == hosting
	diskSpace VARCHAR(20),
	--transfer  VARCHAR(50),
	amountEmails INT,
	amountDataBase INT,

	-- type == dominio
	domain varchar(50),
	expiration datetime,
	provider varchar(50),
	placeAccommodation varchar(50),

	-- type == administracion productos externos

	accessData  TEXT,
	link VARCHAR(50),
	ip VARCHAR(50),
	databaseAccess VARCHAR(50),

	status VARCHAR(20),



	borrado TINYINT(1)
);








DROP TABLE IF EXISTS Hosting;


CREATE TABLE Hosting(
	id INT AUTO_INCREMENT PRIMARY KEY,
	-- tab1 (datos de la cuenta)
	fullName varchar(50),
	account VARCHAR(50),
	serviceNumber varchar(50),
	finalClient tinyint,
	company tinyint,
	accountStatus VARCHAR(50),


	-- Datos de facturación (tab 2)
	serviceDescription text,
	serviceCost int,
	contractType varchar(50),

	hireDate datetime,
	nextExpiration datetime,
	billingAddress varchar(200),

	-- if is company
	businessName varchar(50),
	contact text,
	rut VARCHAR(50),


	-- if is finalClient
	dni varchar(20),
	phone varchar(20),
	email varchar(200),




	startDate datetime,
	endDate datetime,







	borrado TINYINT(1)
);


DROP TABLE IF EXISTS Sales;


CREATE TABLE Sales(
	'id' INT AUTO_INCREMENT PRIMARY KEY,
	`description` varchar(500) NOT NULL,
	`concept` varchar(200) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`type` varchar(200) NOT NULL,
	`currency` varchar(100) NOT NULL,
	`active` tinyint(4) NOT NULL,
	`date` datetime NOT NULL,
	`status` varchar(200) NOT NULL,
	`client` varchar(200) NOT NULL,
	`idClient` int NOT NULL,
	`seller` varchar(200) NOT NULL,

	`idUser` int(11) NOT NULL
);


DROP TABLE IF EXISTS WeeklyHours;


CREATE TABLE WeeklyHours(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idUser Int ,
	userName VARCHAR(50),
	costHour Float(10),
	workLoad Float (10),

	borrado TINYINT(1)
);
