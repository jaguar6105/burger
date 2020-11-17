DROP DATABASE IF EXISTS burgers_db;
Create DATABASE burgers_db;
USE burgers_db;
Create table burgers (
     id INT AUTO_INCREMENT NOT NULL,
     burger_name VARCHAR(30) NOT NULL,
     devoured BOOLEAN DEFAULT true,
     PRIMARY KEY(id)
);
