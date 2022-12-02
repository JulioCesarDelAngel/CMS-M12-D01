INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");       
       
INSERT INTO role (title, salary,department_id)
VALUES ("Sales lead", 100000.10, 4),                
        ("Sales person", 9000.20, 4),               
       ("Lead enginner", 80000.30, 1),              
       ("Software enginner", 70000.40, 1),          
        ("Legal team", 70000.40, 3);                

INSERT INTO employee (first_name, last_name, role_id)       
VALUES ("John", "Doe", 4);                             

INSERT INTO employee (first_name, last_name, role_id)       
VALUES ("Jane", "Doe", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)               
VALUES ("John", "Primero", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)               
VALUES ("Johns", "Segundo", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)               
VALUES ("Jane", "Primera", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)               
VALUES ("Jane", "Segunda", 4, 2);