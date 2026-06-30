const express=require('express')
const answerRoute=express.Router()
const {postAnswer}=require('./Controllers/answerController')
answerRoute.post('/:questionId/post',postAnswer)

module.exports=answerRoute