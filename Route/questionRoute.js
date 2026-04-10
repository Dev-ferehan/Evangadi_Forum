const express=require('express')
const {askQuestion,singleQuestion,homeQuestion}=require('./Controllers/questionController')
const authmiddleware = require('../AuthMiddleware/authmiddleware')
const questionRouter=express.Router()


questionRouter.get('/',homeQuestion)
questionRouter.post('/postquestion',askQuestion)
questionRouter.get('/:questionId',singleQuestion)

module.exports=questionRouter