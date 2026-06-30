const dbconnection=require('../../db/dbConfig')
const bcrypt=require('bcrypt')
const {StatusCodes}=require('http-status-codes')
const jwt=require('jsonwebtoken')
async function register(req,res){

  const {userName,firstName,lastName,email,PASSWORD}=req.body;

    if(!userName || !firstName || !lastName || !email || !PASSWORD){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide all required fields"})
    }
    try{
        const [user]=await dbconnection.query("SELECT userId, userName from users WHERE userName=? or email = ?",[userName,email])

if(user.length>0){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already existed"})
}
if(PASSWORD.length <=8){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 characters"})
}
salt=await bcrypt.genSalt(10)
const hashedpassword= await bcrypt.hash(PASSWORD,salt)
    await dbconnection.query("INSERT INTO users( userName,firstName,lastName,email,PASSWORD ) VALUES (?,?,?,?,?) ",[userName,firstName,lastName,email,hashedpassword])
    return res.status(StatusCodes.CREATED).json({msg:"user register"})
    }catch(err){
      
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong!"})
    }
}
async function login(req,res){
    const {email,PASSWORD}=req.body;
    if(!PASSWORD || !email){
        return res.json({msg:"please provide all required fields"})
    }
    try{
      const [user]= await dbconnection.query("SELECT userId, userName, PASSWORD FROM users WHERE email=?",[email])
    if(user.length==0){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invalid credential"})
    }
   const isMatch=await bcrypt.compare(PASSWORD,user[0].PASSWORD)
     if(!isMatch){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"please enter correct password"})
        }
        const userName=user[0].userName;
        const userId=user[0].userId;
 const token=jwt.sign({userName,userId},process.env.JWT_SECURE,{expiresIn:'1d'})
return res.status(StatusCodes.OK).json({msg:"user successfully login",token,userName,userId})
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong!"})
    }
}
function checkUser(req,res){
    const userName=req.user.userName;
    const userId=req.user.userId;

    res.status(StatusCodes.ACCEPTED).json({msg:"valid user",userName,userId})
}

module.exports={register,login,checkUser}