import React, { useEffect, useState } from 'react'
import Header from './Header'
import Addpost from './Addpost'
import axios from 'axios'

const ViewallPosts = () => {
  const[data,setData]=useState([]);
  const[update,setUpdate] = useState(false);
  const[singleValue,setSingleValue] = useState([]);

  const fetchDataFromApi = () =>{
    axios
    .get(
      // 'https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=9b6ac262eea44bcbbf80ae1b064f631d'
      "http://localhost:3000/api/getbdata"
      ) 
     .then((response)=>{
      console.log(response.data);
      setData(response.data);
      // console.log(response.data.articles);
      // setData(response.data.articles)//articles field in the api

     })
  }
 const deleteBlog=(id)=>{
  console.log("delete clicked");
  console.log(id);
  axios.delete("http://localhost:3000/api/delete/"+id)
  .then((response)=>{
    alert(response.data.message);
    window.location.reload(false);
  })
  
 }
 const updateBlog=(val) => {
  console.log("update clicked",val);
  setUpdate(true);
  setSingleValue(val);
  

 }

  useEffect(()=>{
    fetchDataFromApi()
  },[]);

  let finalJSX= <div className="container text-center">
  <div className="row">
    <div className="col col-12 col-sm-12 col-md-12">

      <div className="row g-3">
        {data.map((value,index)=>{
          return<div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
             
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{value.title}</h5>
                <p class="card-text">{value.description}</p>
                <p class="card-text"><small class="text-body-secondary">{value.publishedAt}</small></p>
                <p class="card-text">
                  <small class="text-body-secondary">
                    <button className='btn btn-danger' onClick={()=>deleteBlog(value._id)}>Delete</button>
                   </small>&nbsp;
                   <small class="text-body-secondary">
                    <button className='btn btn-primary' onClick={()=>updateBlog(value)}>update</button>
                   </small>
                   </p>
                   <p class="card-text">
                
                   <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                      <label class="form-check-label" for="flexCheckDefault">
                        complete
                      </label>
                    </div>
                   </p>
              </div>
            </div>
          </div>
        </div>

        })}
        
      </div>
    </div>
  </div>
</div>
  if(update) finalJSX=<Addpost method='put' data={singleValue} />
    return (
    
      finalJSX

  )
}

export default ViewallPosts