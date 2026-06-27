const mysql=require('mysql2')
const dbconnection=mysql.createPool({
    user:process.env.USER,
    database:process.env.DATABASE,
    host:process.env.HOST,
    password:process.env.PASSWORD,
    connectionLimit:'10'
});
// dbconnection.execute("select 'text'",(err,result)=>{
//     if (err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })

module.exports=dbconnection.promise()