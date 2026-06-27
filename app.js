require('dotenv').config()

const express=require('express')
const userRouter=require('./Route/userRoute')
const questionRouter = require('./Route/questionRoute')
const answerRoute=require('./Route/answerRoute')
const dbconnection=require('./db/dbConfig')
const authmiddleware=require('./AuthMiddleware/authmiddleware')
const cors =require('cors')
const app=express()
const port=5500

app.use(cors())

app.use(express.json())
app.use('/api/users/',userRouter)
app.use('/api/questions/',authmiddleware,questionRouter)
app.use('/api/answer/',authmiddleware,answerRoute)

async function start(){
try{
const result =await dbconnection.execute("select 'test' ")
console.log("database connection established")
app.listen(port,(req,res)=>{
    console.log(`listening on port,${port}`)
    })
// console.log(result)
}catch(error){
console.log(error.message)
}
}
start()
