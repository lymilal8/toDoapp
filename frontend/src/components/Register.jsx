import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const[inputs,setInputs] = useState({});
    const navigate=useNavigate();


    const inputHandler = (e)=>{
        console.log("onchange");
        setInputs({
            ...inputs,[e.target.name]: e.target.value
        })
        console.log(inputs);
    }

    const submitHandler = ()=>{
        console.log("onsubmit",inputs);
        axios.post("http://localhost:3000/api/signup",inputs)
        .then((response)=>{
            console.log(response);
            console.log(response.data);
            if(response.data== "Registered successfully"){
                alert(response.data);
                navigate('/');
            }
            else
            {
                alert("Registration fail");
            }
        })
        .catch(err=>console.log(err))
    }
  return (
    <div>
     <div className="container text-center">
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12">
                    <h1>SIGNUP</h1>
                    <div className="row g-3">
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" onChange={inputHandler}/>
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Email ID</label>
                            <input type="text" name="email"  className="form-control"  onChange={inputHandler}/>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                        <label htmlFor="" className="form-label">Address ID</label>
                          <textarea name="address"  cols="30" rows="10" className="form-control" onChange={inputHandler}></textarea>
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Phone Number</label>
                            <input type="text" name="phone"  className="form-control" onChange={inputHandler}/>
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">User Name</label>
                            <input type="text" name="username"  className="form-control" onChange={inputHandler}/>
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6">
                            <label htmlFor="" className="form-label">Password</label>
                            <input type="password" name="password"  className="form-control" onChange={inputHandler}/>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                          <button className="btn btn-danger align-center" onClick={submitHandler}>Register</button>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                            <a href="/">Back to Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>





    </div>
  )
}

export default Register