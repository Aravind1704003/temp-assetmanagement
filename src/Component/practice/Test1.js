import React, { useState } from 'react'
import Goodboy from './Goodboy'
const Test1 = () => {
  // var name='aravind'

  const [name,setName]=useState("")

const handleSubmit = (e) =>{
  setName(e.target.value)
 
  }
  const handleFormSbmit=(e)=>{
    e.preventDefault();
    
  }

  return (
    <div>    
        <div>Hello this is the first page</div>
       <form onSubmit={handleFormSbmit}> <label>Name : 
          <input type='text' value={name} id='name'onChange={handleSubmit}></input>
        </label>
        
        <h1 >Your name:{name}</h1>
        
    <Goodboy  name={name}/>
    </form>
    </div>

  )
}

export default Test1