INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");       
       
INSERT INTO role (title, salary,department_id)
VALUES ("Sales lead", 100000.10, 1),                
        ("Salesperson", 80000.20, 1),               
       ("Lead Engineer", 150000.30, 2),              
       ("Software Engineer", 120000.40, 2),          
        ("Account Manager", 160000.50, 3),
        ("Accountant", 125000.60, 3),
        ("Legal Team Lead", 250000.70, 4),
        ("Lawyer", 190000.80, 4);                

INSERT INTO employee (first_name, last_name, role_id)       
VALUES ("John", "Doe", 1);                             

INSERT INTO employee (first_name, last_name, role_id, manager_id)       
VALUES ("Mike", "Chan", 2,1);

INSERT INTO employee (first_name, last_name, role_id)               
VALUES ("Ashley", "Rodriguez", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 4, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kunal", "Singh", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)               
VALUES ("Malia", "Brown", 6, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Sarah", "Lourd", 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)               
VALUES ("Tom", "Allen", 8, 7);
