const {StatusCodes}=require('http-status-codes')
const jwt=require('jsonwebtoken')
async function authmiddleware(req,res,next){

    const authheader=req.headers.authorization;

    if(!authheader || !authheader.startsWith("Bearer ")){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"invalid Authentication"})
    }
    const token=authheader.split(' ')[1]
    // console.log(token)
    // console.log(authheader)
    try{
        const {userName,userId}=jwt.verify(token,process.env.JWT_SECURE)
        req.user={userName,userId}               
        next()

    }catch(err){
return res.status(StatusCodes.UNAUTHORIZED).json({msg:"invalid Authentication"})
    }
}
module.exports=authmiddleware