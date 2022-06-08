import express from "express";
import cors from "cors";
import mongoose from "mongoose"

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/myloginregister',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},()=>{
    console.log('DB connected')
})


const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})



const User=new mongoose.model("User",userSchema)

//Routes
app.post("/login",(req,res)=>{
    const {name,email,password}=req.body
    User.findOne({email,password},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"Login Successfull",user:user})
            }else{
                res.send({message:"Password didn;t match"})
            }
        }else{
            res.send({message:"User not registered"})
        }
    })
})

app.post("/register",(req,res)=>{
    const {name,email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User Already Exist"})
        }else{
            const user=new User({
                name,
                email,
                password
            })
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"Successfully registered,Please login now "})
                }
            })
        }
    })
})


app.listen(process.env.PORT||9002,()=>{
    console.log(`running at port ${process.env.PORT||9002}`)
})