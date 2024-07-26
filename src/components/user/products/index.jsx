import React, { useEffect, useState } from 'react'
import { productsApi } from '../../../service/base'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../../redux/slices/productSlice';

function Products() {
 const dispatch = useDispatch(); 
  const products = useSelector((state) => state.products.items);
const categories = []
const [category, setCategory] = useState(``)

  useEffect(() => { 
    productsApi.getAllProduct().then(data => dispatch(setProducts(data)));
   
}, [dispatch]);
 products.forEach((element) =>{
      if (!categories.includes(element.category)) {
        categories.push(element.category)
      }
    })
console.log(categories)
console.log(category)
  return (
    <div>
      <select name="categories" id="" onChange={(e)=>{
        setCategory(e.target.value)
      }}>
        <option value="">All</option>
      {
categories.map((category) =>{
return <option value= {category}>{category}</option>
})
      }
      </select>
    </div>
  )
}

export default Products