import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login=()=>{
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate();
    useEffect(()=>{
            const auth=localStorage.getItem("user");
            if(auth)
            {
                navigate('/')
            }
        },[])

    const handlelogin=async ()=>{
        console.log(email,password)
        let result=await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result=await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user))
            localStorage.setItem("token",JSON.stringify(result.auth))
            console.log(result.auth)
            navigate('/')
        }else
        {
            alert("Please enter correct details")
        }
    }
    return (
        
            <div className="login">
                <h1>Login</h1>
                <input className="inputBox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
                <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
                <button onClick={handlelogin} className="appButton" type="button">Login</button>
            </div>
        )
}
export default Login;