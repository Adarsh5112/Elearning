import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail from "../middleware/sendMail.js"
import tryCatch from "../middleware/tryCatch.js"



const register =  tryCatch(async(req,res) => {
    
        const {email,name,password} = req.body
        let user = User.findOne({email})

        if(user === null){ return res.status(400).json({
            message: "User already exists"
        })}
        const hashPassword = await bcrypt.hash(password,10)

        user = {
            name,
            email,
            password: hashPassword,
        };
        const otp = Math.floor(Math.random()*1000000);
        const activationToken = jwt.sign({
            user,
            otp,
        },process.env.Activation_Secret,{
            expiresIn: "5m"
        });
        const data = {
            name,
            otp,
        };
        
        await sendMail( email, "E Learning", data)

        res.status(200).json({
            message: "OTP sent to your mail",
            activationToken,
        })
    
})
export const verifyUser = tryCatch(async (req, res) => {
    const {otp, activationToken} = req.body

    const verify = jwt.verify(activationToken,process.env.Activation_Secret)

    if(!verify)
    return res.status(400).json(
{
    message: "OTP Expired"
})
if(verify.otp !== otp) return res.status(400).json({
    message: "wrong OTP"
})
User.create({
    name : verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
})




 res.json({
    message: "User Registered"
   })
})

;

export const loginUser = tryCatch(async(req,res)=>{
    const {email,password} = req.body
    
     const user = await User.findOne({email});
    

    if(user==null)
        return res.status(400).json({
            message: "No user with this email"
        });
    
    
    const matchPassword = await bcrypt.compare(password, user.password);
   

    if(!matchPassword) 
        res.status(400).json({
            message: "wrong Password"
        })
    

    const token = jwt.sign({_id: user._id}, process.env.jwt_Sec, {
        expiresIn: "15d"
    })
    res.json({
        message: `Welcome back ${user.name}`,
        token,
        user,
    })
})

export const myProfile = tryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id)

    res.json({user})
})


export default register