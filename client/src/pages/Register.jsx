import React from 'react';
import { useState } from 'react';
import axios from 'axios'; // yahi kaam keraga use effect ki taraf
import {useNavigate} from "react-router-dom";
import './register.css'
const Register = () => {
  const navigate = useNavigate();
  const [data,setData] = useState({
    name : '',
    email : '',
    password : ''
  });

  const change = (e) =>{
    const {name,value} = e.target;
    // console.log(name,value);
    // console.log(e.target.value);
    setData({
      ...data,
      [name]:value,

    });
  };

  const loginuser = async(e) =>{
    e.preventDefault();
    const {name,email,password} = data; // data se name ,email,password le liyaaa
    try{
      console.log(name,email,password);
       const { data: response } = await axios.post('https://blog-website-slp.vercel.app/register', {
          name,email,password
      })
      if(data.error){
        console.log(error);
      }
      else{
        setData({
          name : '',
          email : '',
          password : '',
        })
        navigate('/login');
      }
    }
    catch(err){
      console.log(err);
    }
  };
  return (
    <>
    <h1>Register Page</h1>
    <form onSubmit={loginuser}>
      <input type = "text" name = "name" placeholder='enter name' onChange={change} required/>
      <input type = "email" name = "email" placeholder='enter email' onChange={change} required/>
      <input type = "password" name = "password" placeholder='enter password' onChange={change} required/>
      <button type = "submit" >Register</button> 
    </form>
    </>
  )
}

export default Register
