/**se requiere my sql */
const mysql = require('mysql2/promise');

//parametros de conexion  usando ENV
var dbConfig = {
    host:process.env.HOST,
    user:process.env.USR,
    password:process.env.PSW,
    database: process.env.DB
};


/**
 * @param {Query a ejecutar con/sin placeholder} Query 
 * @param {placeholder a sustituir } Data 
 * @returns resultado devuelto por .query segun la operacion Insert update delete
 */
 const executeQuery = async function(Query,Data){

    const connection =  await mysql.createConnection(dbConfig);    
    connection.connect(function(error) {
       if (error) console.log(error);
    });

    const [resultset] = await connection.query(Query,Data,function(error, result){
        if (error) throw error;
        return result ;
        }
     )

    connection.end();
    return resultset;
 }


 /*modulo */
 var DB = function (config){
    config = config || {};
}

DB.prototype.getRole = async function (rolId){
    var query = ` select rol.id, rol.title, dep.name as department, rol.salary 
                    from role rol 
                    inner join department dep on dep.id = rol.department_id `

    if ( rolId !== null && rolId > 0 ){
        var where = ` where rol.id = ${rolId}`;
        query  += where;
    }
    
    const result =  await executeQuery(query,null)
    console.log('get departamentos ejecucion');

    return result ;    
}


DB.prototype.getDepartment = async function (departmentId){
    var query = `SELECT id, name 
                    FROM department `

    if ( departmentId !== null && departmentId > 0 ){
        var where = ` where id= ${departmentId}`;
        query  += where;
    }
    
    const result =  await executeQuery(query,null)
    console.log('get departamentos ejecucion');

    return result ;    
}

DB.prototype.getEmployee =  async function(employeeId){
    var query = `SELECT emp.id, emp.first_name, emp.last_name,
                    rol.title, rol.salary,
                    CONCAT(man.first_name, " ", man.last_name) as manager
    FROM employee emp
        inner join role rol on rol.id = emp.role_id
        left join employee man on man.id = emp.manager_id `

    if ( employeeId !== null && employeeId > 0 ){
        var where = ` where id= ${employeeId}`;
        query  += where;
    }
    
    const result =  await executeQuery(query,null)
    console.log('get empleados ejecucion');

    return result ;
   }


   module.exports = DB;