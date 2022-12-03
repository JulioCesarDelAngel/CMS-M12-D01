//importacion de paquetes
require('dotenv').config();
const inquirer = require('inquirer');   
const cTable = require("console.table");

const Database = require('./db/database');

var db = new Database();

var employees = [];
var departments = [];
var roles=[];
var result=[];
//var listaDepartamentos = [];

var datosRol = [
    {
        type:"input",
        name:"name",
        message:"¿Cual es el nombre del nuevo rol?",
        validate: dataInput => {
            if (dataInput !=="")
            {
                return true;
            }
            else{
                return 'Capture un nombre de rol válido';
            }
        }          
    },
    {
        type: "number",
        name: "salary",
        message: "¿Cual es el salario del nuevo rol?",
    },
    {
        type: "list",
        name: "departmentSel",
        message: "¿Cual es el departamento del nuevo rol?",
        choices: [] //listaDepartamentos,
    }  
];

const datosDep  =[{
    type:"input",
    name:"name",
    message:"¿Cual es el nombre del departamento?",
    validate: dataInput => {
        if (dataInput !=="")
        {
            return true;
        }
        else{
            return 'Capture un nombre de departamento válido';
        }
    }    
}];

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
                roles = await db.getRole(0);
                console.table(roles);
                menuPrincipal();                
                break;                
            case "Agregar rol" :
                //llenar matriz de departamentos
                departments = await db.getDepartment(0);
                //listaDepartamentos = departments.map ( row => { return row.name; });
                datosRol[2].choices = departments.map ( row => { return row.name; });;

                inquirer.prompt(datosRol).then ( async (data) => {
                    let idx =  departments.findIndex(element => element.name === data.departmentSel );
                    result = await db.addRol(data.name, data.salary, departments[idx].id)
                    console.log('Se a agregado: ['+data.name+'] a la base de datos.');
                    menuPrincipal();  
                } );              
                break;
            case "Ver todos los departamentos":
                departments = await db.getDepartment(0);
                console.table(departments);
                menuPrincipal();                
                break;
            case "Agregar departamento":
                inquirer.prompt(datosDep).then ( async (data) => {
                    result = await db.addDepartment(data.name);
                    //console.log(result.affectedRows);
                    console.log('Se a agregado: ['+data.name+'] a la base de datos.');
                    menuPrincipal();
                });
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