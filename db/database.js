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


DB.prototype.getEmployee =  async function(employeeId){
    var query = `SELECT * FROM employee `

    if ( employeeId ==! null && employeeId > 0 ){
        var where = ` where id= ${employeeId}`;
        query  += where;
    }
    
    const result =  await executeQuery(query,null)
    console.log('get empleados ejecucion');

    return result ;
   }


   module.exports = DB;