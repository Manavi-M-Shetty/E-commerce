import React, { useState } from 'react';

const AddProduct=()=>{
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const [error,setError]=useState(false)
    const addProduct=async ()=>{
        if(!name||!price||!category||!company){
            setError(true)
            return false;
        }




        console.warn(name,price,category,company)
        const UserId=JSON.parse(localStorage.getItem('user'))._id;
        let result= await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                 authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result=await result.json();
        console.warn(result)
    }
    return(
        <div className='product'>

            <h1>Add product</h1>
            <input className="inputBox" type='text' placeholder='Enetr product name'
            onChange={(e)=>{setName(e.target.value)}} value={name}/>
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input className="inputBox" type='text' placeholder='Enetr product price'
            onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            <input className="inputBox" type='text' placeholder='Enetr product category'
            onChange={(e)=>{setCategory(e.target.value)}} value={category}/>
            {error && !category && <span className='invalid-input'>Enter valid category</span>}
            <input className="inputBox" type='text' placeholder='Enetr product company'
            onChange={(e)=>{setCompany(e.target.value)}} value={company}/>
            {error && !company && <span className='invalid-input'>Enter valid company</span>}
            <button onClick={addProduct} className="appButton">Add Product</button>

        </div>
    )
}
export default AddProduct;