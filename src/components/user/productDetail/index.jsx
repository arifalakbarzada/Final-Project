import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { productsApi } from '../../../service/base';


function Details() {
  const [product, setProduct] = useState({})
  const {id} = useParams();
  useEffect(() => {
  productsApi.getSingleProduct(id).then(data => setProduct(data))
  
  }, [id])
  
  console.log(product);
  return (
    <div>Details</div>
  )
}

export default Details