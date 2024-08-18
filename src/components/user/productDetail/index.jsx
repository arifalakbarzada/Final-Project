import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { productsApi } from '../../../service/base';
import { BsCartPlus } from 'react-icons/bs';


function ProductDetail() {
  const { id, colorId, color: selectedColor } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null)
  const [selectedColorId, setSelectedColorId] = useState(colorId)
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    productsApi.getSingleProduct(id).then(res => setProduct(res))
  }, [id])

  if (!product) {
    return <div>Product not found</div>;
  }

  const colorData = product.colors.find((color) => color.name.toLowerCase() === selectedColor.toLowerCase());

  if (!colorData) {
    return <div>Color not found</div>;
  }

  return (
    <div className="product-detail-container container">
      <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div className="product-detail-image">
                 <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        modules={[Navigation]}
      >
        {colorData.images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={image}
              alt={`${product.name} ${colorData.name}`}
              style={{ width: '100%', height: 'auto' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
            </div>
      
      </div>
     
      <div className="col-lg-6 col-sm-12">
<div className="product-info">
        <h1>{product.name}</h1>
        <p className="brand">Brand: {capitalizeFirstLetter(product.brand)}</p>
        <p className="category">Category: {capitalizeFirstLetter(product.category)}</p>
        <div className="specifications">
          <h3>Specifications:</h3>
          <ul>
            {product.specifications.map((spec, index) => (
              <li key={index}><strong>{capitalizeFirstLetter(spec.name)}:</strong> {capitalizeFirstLetter(spec.value)}</li>
            ))}
          </ul>
        </div>
        <p className="price">
          <span className="discounted-price">${(product.price - product.price * product.discount / 100).toFixed(2)}</span>
          <span className="main-price">${product.price}</span>
        </p>
        <p className="stock">Stock: {colorData.stock}</p>
        <div className="colors">

          {product.colors.length > 1 ?
            (<><h3>Available Colors:</h3>
              <div className="color-options">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="color"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    onClick={
                      () => {
                        navigate(`/products/${product.id}/${color.id}/${color.name.toLowerCase()}`)
                        setSelectedColorId(color.id)
                      }
                    }
                  ></div>
                ))}
              </div>
            </>) : null
          }
        </div>
</div>
<div className="product-action">
  <button className="addToCart" onClick={()=>{
    const cartItem = {
      id: product.id,
      name: product.name,
      colorId : selectedColorId,
      color : selectedColor ,
      price: product.price - product.price * product.discount / 100,
      image: colorData.images[0],
      stock: colorData.stock
      }
      console.log(cartItem)
  }}>
  <BsCartPlus />  Add To Cart
  </button>
</div>
      </div>
      </div>
    
    </div>
  );
}

export default ProductDetail;


