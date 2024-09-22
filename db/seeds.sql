INSERT INTO department (name)
VALUES ('Engineering'),
       ('Sales'),
       ('Marketing'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1),
       ('Sales Manager', 80000, 2),
       ('Marketing Manager', 80000, 3),
       ('Accountant', 70000, 4),
       ('Legal Team Lead', 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, null),
       ('Jane', 'Smith', 2, 1),
       ('Alice', 'Johnson', 3, 2),
       ('Tim', 'Lee', 4, null),
       ('Kim', 'Jones', 5, 4),
       ('Tom', 'Brown', 6, null),
