
const express = require('express');



const app = express();
const mysql=require('mysql2')
const dbconnection=mysql.createPool({
    user:process.env.USER,
    database:process.env.DATABASE,
    host:process.env.HOST,
    port: process.env.DB_PORT || 3306,
    password:process.env.PASSWORD,
    connectionLimit:'10'
});
app.get('/test-db', (req, res) => {

    dbconnection.execute("SELECT 'Connection Successful!' AS message", (err, result) => {
        if (err) {
            console.error(err);
            // ስህተት ካለ ለብሮውዘሩ በ HTML ወይም JSON መልክ መመለስ
            return res.status(500).send(`<h1>የዴታቤዝ ስህተት አጋጥሟል!</h1><p>${err.message}</p>`);
        } else {
            console.log(result);
        
            return res.json({
                status: "Success",
                data: result
            });
        }
    });
});




module.exports=dbconnection.promise()