import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProduct=()=>{
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const [error,setError]=useState(false)
    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        console.warn(params)
        getProductDetails();
    },[])

    const getProductDetails=async()=>{
        console.warn(params)
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result =await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)

}
    const updateProduct=async ()=>{
        console.warn(name,price,category,company)
        let result=await fetch(`http://localhost:5000/product/${params.id}`,
            {
                method:'Put',
                body:JSON.stringify({name,price,category,company}),
                    headers:{
                        "Content-Type":"Application/json",
                        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                
            }
        )

        result= await result.json();
        console.warn(result)
        navigate('/')
       
    }




       

        
    return(
        <div className='product'>

            <h1>Update product</h1>
            <input className="inputBox" type='text' placeholder='Enetr product name'
            onChange={(e)=>{setName(e.target.value)}} value={name}/>

           
            <input className="inputBox" type='text' placeholder='Enetr product price'
            onChange={(e)=>{setPrice(e.target.value)}} value={price}/>

            <input className="inputBox" type='text' placeholder='Enetr product category'
            onChange={(e)=>{setCategory(e.target.value)}} value={category}/>

        
            <input className="inputBox" type='text' placeholder='Enetr product company'
            onChange={(e)=>{setCompany(e.target.value)}} value={company}/>

        
            <button onClick={updateProduct} className="appButton">Update Product</button>

        </div>
    )
}
export default UpdateProduct;