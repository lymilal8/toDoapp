import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate= useNavigate();
    const[user,setUser]=useState({});
    const inputHandler=(e)=>{
        setUser({
            ...user,[e.target.name]:e.target.value
        })
       console.log(user);
    }
    const addHandler=()=>{
        console.log("button clicked",user);
        axios.post("http://localhost:3000/api/login",user)
        .then((response)=>{
            console.log(response);
            console.log(response.data.message);
            if(response.data.message ==="Login sucessfully"){
                const token=response.data.token;
                const userid=response.data.data._id;
                console.log(response);
                console.log(token);
                console.log(userid);
                sessionStorage.setItem("userToken",token);
                sessionStorage.setItem("userId", userid);
                alert(response.data.message);
                navigate('/viewpost')
            }
            else{
                alert(response.data.message);

            }
        })
    } 
  return (
    <div>
        <div className="container text-center">
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12">
                    <h1>TODO APP -LOGIN</h1>
                    <br/>
                    <br/>
                    <div className="row g-3">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                            <label htmlFor="" className="form-label" >userName</label>
                            <input type="text" className="form-control" name="username" onChange={inputHandler}/>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                            <label htmlFor="" className="form-label">Password</label>
                            <input type="password" name="password" id="" className="form-control" onChange={inputHandler} />
                        </div>
                        
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                        <button className="btn btn-success align-center" onClick={addHandler}>Login</button>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                            <a href="/register">New user click Here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </div>
  )
}

export default Login