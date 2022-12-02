//importacion de paquetes
require('dotenv').config();
const inquirer = require('inquirer');   
const cTable = require("console.table");

const Database = require('./db/database');

var db = new Database();

var employees = [];


const menu = [
    {
        type: "list",
        name: "Opcion",
        message: "Seleccione la opción deseada?",
        choices: ["Ver todos los empleados", "Agregar empleado", "Actualizar rol del empleado", 
                    "Ver todos los roles", "Agregar rol",
                    "ver todos los departamentos", "Agregar departamento", 
                    "Salir"], 
    }
];

function menuPrincipal() {
    inquirer.prompt(menu).then( async  (answers) => {
        if (answers.Opcion == "Ver todos los empleados"){
            employees = await db.getEmployee(0);
            console.table(employees);
            menuPrincipal();
           
        } 
        else if (answers.Option == "Salir"){
            console.log('Proceso Finaizado.');
        }
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