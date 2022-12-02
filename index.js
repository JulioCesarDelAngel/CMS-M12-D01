//importacion de paquetes
require('dotenv').config();
const inquirer = require('inquirer');   
const cTable = require("console.table");

const Database = require('./db/database');

var db = new Database();

var employees = [];
var departments = [];

const menu = [
    {
        type: "list",
        name: "Opcion",
        message: "Seleccione la opción deseada?",
        choices: ["Ver todos los empleados", "Agregar empleado", "Actualizar rol del empleado", 
                    "Ver todos los roles", "Agregar rol",
                    "Ver todos los departamentos", "Agregar departamento", 
                    "Salir"], 
    }
];

function menuPrincipal() {
    inquirer.prompt(menu).then( async  (answers) => {        
        switch (answers.Opcion){
            case "Ver todos los empleados" :
                employees = await db.getEmployee(0);
                console.table(employees);
                menuPrincipal();                
                break;
            case "Agregar empleado" :
                console.log('Opcion -Agregar empleado- no implementada');
                menuPrincipal();                
                break;
            case "Actualizar rol del empleado" :
                console.log('Opcion -Actualizar rol del empleado- no implementada');
                menuPrincipal();                
                break;
            case "Ver todos los roles" :
                console.log('Opcion -Ver todos los roles- no implementada');
                menuPrincipal();                
                break;
            case "Agregar rol" :
                console.log('Opcion -Agregar rol- no implementada');
                menuPrincipal();                
                break;
            case "Ver todos los departamentos":
                departments = await db.getDepartment(0);
                console.table(departments);
                menuPrincipal();                
                break;
            case "Agregar departamento":
                console.log('Opcion -Agregar departamento- no implementada');
                menuPrincipal();                
                break;
            case "Salir" :
                console.log('Proceso Finaizado.');    
                break;            
        };
        //implementacion con if
/*         if (answers.Opcion == "Ver todos los empleados"){
            employees = await db.getEmployee(0);
            console.table(employees);
            menuPrincipal();
           
        } 
        else if (answers.Option == "Salir"){
            console.log('Proceso Finaizado.');
        } */
    })
}

async function init(){
     menuPrincipal();

/*     console.log('start');
    console.log('prepare');
    console.log('exec');
    employees = await db.getEmployee(0);
    console.log('result console table');
    console.table(employees);
    console.log('end'); */
    
}

init();