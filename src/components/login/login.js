import React ,{useState} from 'react'
import "./login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Login = ({setLoginUser}) => {
    const navigate=useNavigate()
    const [user,setUser]=useState({
        email:'',
        password:'',
      })
  
      const handlechange=(e)=>{
          const {name,value}=e.target;
          setUser({
              ...user,
              [name]:value
          })
      }
      const login=()=>{
          axios.post("http://localhost:9002/login",user)
          .then(res=>{
              console.log(res)
              alert(res.data.message)
              setLoginUser(res.data.user)
              navigate("/")
          })
      }
  return (
    <div className='login'>
        <h1>Login</h1>
        <input type='text' onChange={handlechange}  placeholder='Enter your Email' name="email" value={user.email}></input>
        <input type="password"  onChange={handlechange} name="password" value={user.password} placeholder='Enter your Password'></input>
        <div className='butt' onClick={login}>Login</div>
        <div>Or</div>
        <div className='butt' onClick={()=>navigate("/register")}>Register</div>

    </div>
  )
}

export default Login