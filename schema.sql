DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;


CREATE TABLE department (
    id INT AUTO_INCREMENT,
  PRIMARY KEY (id),
name VARCHAR(30) NOT NULL
);

CREATE TABLE role   (
 id INT AUTO_INCREMENT,
 PRIMARY KEY (id),
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT
);

CREATE TABLE  employees (
    id INT AUTO_INCREMENT NOT NULL,
 PRIMARY KEY (id),
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  salary DECIMAL(10,2) NOT NULL,
  role_id INT,
  manager_id INT NULL
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employees;