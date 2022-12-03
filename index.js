//importacion de paquetes
require('dotenv').config();
const inquirer = require('inquirer');   
const cTable = require("console.table");

const Database = require('./db/database');

var banner = require('./assets/js/banner');
var db = new Database();

var employees = [];
var departments = [];
var roles=[];
var result=[];
var managers=[]
//var listaDepartamentos = [];

var datosPresupuesto = [
    {
        type: "list",
        name: "departmentSel",
        message: "¿De que departamento desea visualizar el presupuesto?",
        choices: [],
    }
]

var datosRolEmp = [
    {
        type: "list",
        name: "empleadoSel",
        message: "¿Que empleado desea actualizar?",
        choices: [],
    },
    {
        type: "list",
        name: "roleSel",
        message: "¿Cual sera el nuevo rol del empleado?",
        choices:[]
    }

]

var datosEmpleado = [
    {
        type:"input",
        name:"first_name",
        message:"¿Cual es el nombre del nuevo empleado?",
        validate: dataInput => {
            if (dataInput !=="")
            {
                return true;
            }
            else{
                return 'Capture un nombre de empleado válido';
            }
        }          
    },
    {
        type:"input",
        name:"last_name",
        message:"¿Cual es el apellido del nuevo empleado?",
        validate: dataInput => {
            if (dataInput !=="")
            {
                return true;
            }
            else{
                return 'Capture un apellido válido';
            }
        }          
    },    
    {
        type:"list",
        name:"roleSel",
        message:"¿Cual es el rol del nuevo empleado?",
        choices:[]
    },
    {
        type:"list",
        name:"managerSel",
        message:"¿Quien es el gerente del nuevo empleado?",
        choices:[]
    }
];

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
                    "Ver presupuesto",
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
                //Poblar listas 
                roles = await db.getRole(0);
                managers = await db.getManager(0);
                datosEmpleado[2].choices = roles.map ( row => { return row.title; });
                //deberian aparecer solo los managers no todos los empleados
                datosEmpleado[3].choices = managers.map ( row => { return row.name; });

                inquirer.prompt(datosEmpleado).then ( async (data) => {
                    let idxRol =  roles.findIndex(element => element.title === data.roleSel );
                    let idxMan =  managers.findIndex(element => element.name === data.managerSel );
                    result = await db.addEmployee(data.first_name, data.last_name, roles[idxRol].id, managers[idxMan].id);                    
                    console.log('Se a agregado: ['+data.first_name+' '+ data.last_name+'] a la base de datos.');
                    menuPrincipal();  
                } );              
                break;
            case "Actualizar rol del empleado" :
                //poblar lista de opciones
                roles = await db.getRole(0);
                employees = await db.getEmployeeList();
                datosRolEmp[0].choices = employees.map ( row => { return row.name; });
                datosRolEmp[1].choices = roles.map ( row => { return row.title; });

                inquirer.prompt(datosRolEmp).then ( async (data) => {
                    let idxRol =  roles.findIndex(element => element.title === data.roleSel );
                    let idxEmp =  employees.findIndex(element => element.name === data.empleadoSel );
                    result = await db.UpdateRoleEmployee( employees[idxEmp].id, roles[idxRol].id);
                    console.log('Se a actualizado el rol de: ['+data.empleadoSel+'] en la base de datos.');
                    menuPrincipal();  
                } );              
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
            case "Ver presupuesto" :
                //poblar lista de departamentos 
                departments = await db.getDepartment(0);
                datosPresupuesto[0].choices = departments.map ( row => { return row.name; });
                datosPresupuesto[0].choices.unshift('TODOS');

                inquirer.prompt(datosPresupuesto).then ( async (data) => {
                    let idx =  departments.findIndex(element => element.name === data.departmentSel );
                    result = await db.getPresupuesto( idx ==-1 ? 0: departments[idx].id ); 
                    console.table(result);
                    console.log('Consulta de presupesto completada.');
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
    console.log(banner);
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