import React, { useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Addpost = (props) => {
  const navigate=useNavigate();
  const[userToken,setUserToken] =useState(sessionStorage.getItem("userToken"));
  const[userID,setUserId] =useState(sessionStorage.getItem("userId"));

  
  
  const[post,setPost] = useState(props.data);
  console.log("method",props.method);
  console.log("data",props.data);
  const inputHandler=(e)=>{
    const {name,value} = e.target;
    setPost({
      ...post,[name]:value
    })
    console.log(post);
  }
  const addPost=()=>{
    let data={
      userId:userID,
      token:userToken,
      title:post.title,
      description:post.description,
      status:"incompleted"
     
    }
    console.log("addPost clicked",post);
    if(props.method==="post")
    {

        axios.post("http://localhost:3000/api/postbdata",data)
        .then((response)=>{
          if(response.data.message==="Post added sucecessfully")
          {
            alert(response.data.message);
            navigate('/viewpost')
          }
          else
          {
            alert(response.data.message);
          }

        })
        .catch(err=>console.log(err))
    }
    if(props.method=="put")
    {
      axios.put("http://localhost:3000/api/edit/"+post._id,post)
        .then((response)=>{
          if(response.data.message==="Updated Successfully")
          {
            alert(response.data.message);
            window.location.reload(false);
          }
          else
          {
            alert(response.data.message);
          }

        })
        .catch(err=>console.log(err))
    }

  }
  return (
    <div>
    
      <div className="container ">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12">
            <div className="row g-3">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                <label htmlFor="" className="form-label" >Title</label>
                <input type="text" className="form-control" name="title" value={post.title} onChange={inputHandler}/>
              </div>
              <div className="col col-12 col-sm-12 col-nd-12">

                <textarea name="description" cols="30" rows="10" className="form-control" placeholder='Type a post' value={post.description} onChange={inputHandler} ></textarea>
              </div>
              
              <div className="col col-12 col-sm-12 col-nd-12">
                <button className="btn btn-primary" onClick={addPost}>Addtodo</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Addpost