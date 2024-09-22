-- Insert departments
INSERT INTO department (name) VALUES
('Engineering'),
('Sales'),
('Marketing'),
('Finance'),
('Legal');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Sales Manager', 80000, 2),
('Marketing Manager', 80000, 3),
('Accountant', 70000, 4),
('Legal Team Lead', 75000, 5);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Alice', 'Johnson', 3, 1),
('Bob', 'Brown', 4, NULL),
('Carol', 'Davis', 5, 2);