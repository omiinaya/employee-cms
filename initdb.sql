DROP DATABASE IF EXISTS cmsDB;

CREATE DATABASE cmsDB;

USE cmsDB;

DROP TABLE IF EXISTS department, role, employee;

CREATE TABLE department (
id INT AUTO_INCREMENT,
name VARCHAR(20) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id int AUTO_INCREMENT,
title VARCHAR(20) NOT NULL,
salary INT NOT NULL,
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id int AUTO_INCREMENT,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id)
);
