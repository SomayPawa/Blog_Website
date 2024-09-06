import React, { useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './register.css'
const Login = () => {
  const navigate = useNavigate();
  const[data,setData] = useState({
    email : '',
    password : '',
  });
  const change = (e) =>{
    const {name,value} = e.target;

    setData({
      ...data,
      [name] : value,
    });

  };
  const changess = async (e) => {
    e.preventDefault();
    const {email,password} = data; // data se name ,email,password le liyaaa

    try{
       const { data: response } = await axios.post('https://blog-website-slp.vercel.app/login', {
        email,password
      })

      if(data.error){
        console.log(error);
      }
      else{
        setData({
          email : '',
          password : '',
        })
        navigate('/');
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
    <h1>Login Page</h1>
    <form onSubmit={changess}>
      <input name = "email" type = "email" placeholder='enter email' onChange={change}/>
      <input name = "password" type = "password" placeholder='enter password' onChange={change}/>
      <button type = "submit" >Login</button>
    </form>
    </>
  )
}

export default Login
