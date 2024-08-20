import React, { useEffect,  useState } from 'react';
import { productsApi } from '../../../service/base';
import { useDispatch, useSelector } from 'react-redux';
import {setProducts } from '../../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { FaRegEye } from 'react-icons/fa';
import QuickViewModal from './../quickview';
import { addCartItem } from '../../../redux/slices/cartSlice';
import { addToFavList } from '../../../redux/slices/favListSlice';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  useEffect(() => {
    productsApi.getAllProduct().then(data => dispatch(setProducts(data)));
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [products]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const handleQuickViewOpen = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleQuickViewClose = () => {
    setSelectedProduct(null);
    setIsQuickViewOpen(false);
  };

  const renderProduct = (product) => {
    return product.colors.map((color) =>{
    return  (
      <div key={product.id + color.name} className="product col-lg-3 col-md-4 col-sm-6">
      <div className="product-container">
           <div className="product-image">
          <div className="product-label">
            <span>-{product.discount}%</span>
          </div> 
          <img src={color.images[0]} alt={product.name + color.name} />
          <div className="product-action">
            <ul>
              <li><BsCartPlus onClick={
                ()=>{
                  const cartItem = {
                    id : product.id,
                    name: product.name,
                    colorId: color.id,
                    color: color.name,
                    price: product.price - product.price * product.discount / 100,
                    image: color.images[0],
                    stock: color.stock,
                  };
                  dispatch(addCartItem(cartItem))
                }
              } /></li>
              <li><FaRegEye onClick={() => handleQuickViewOpen(product)} /></li>
              <li><CiHeart onClick={
                ()=>{
                  const favItem = {
                    id : product.id,
                    name: product.name,
                    colorId: color.id,
                    color: color.name,
                    price: product.price - product.price * product.discount / 100,
                    image: color.images[0],
                    stock: color.stock,
                  };
                  dispatch(addToFavList(favItem))
                }
              }/></li>
            </ul>
          </div>
        </div>
        <div className="product-content"  onClick={
        () => {
          navigate(`/products/${product.id}/${color.id}/${color.name}`)
        }
      }>
          <h3 className="title">{product.name} {product.colors.length>1 ?`, ${color.name}`  : null}</h3>
          <p className="product-price">
            <span className="discounted-price">${(product.price - product.price * product.discount / 100).toFixed(2)}</span>
            <span className="main-price">${product.price}</span>
          </p>
        </div>
      </div>
        
      </div>
    )})
  
  }
  return (
    <div className='products-container'>
      <div className="select-container">
             <select name="categories" id='filterProducts' onChange={handleCategoryChange}>
        <option value="">All</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
       </div>
      <div className="products row">
        {filteredProducts.map(renderProduct)}
      </div>
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onRequestClose={handleQuickViewClose}
        product={selectedProduct}
      />
    </div>
  );
}

export default Products;
