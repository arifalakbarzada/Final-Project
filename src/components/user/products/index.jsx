import React, { useEffect, useState } from 'react';
import { productsApi } from '../../../service/base';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../../redux/slices/productSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { FaRegEye } from 'react-icons/fa';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categories, setCategories] = useState([]);

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

  const renderProduct = (product) => {
    return product.colors ? product.colors.map((color) => (
      <div key={product.id + color.name} className="product">
        <div className="product-image">
          <div className="product-label">
            <span>-{product.discount}%</span>
          </div>
          <img src={color.images[0]} className="img-fluid" alt={product.name} />
          <div className="product-action">
            <ul>
              <li><BsCartPlus /></li>
              <li><FaRegEye /></li>
              <li><CiHeart /></li>
            </ul>
          </div>
        </div>
        <div className="product-content">
          <h3 className="title"><Link to={`/products/${product.id}`}>{product.name}, {color.name}</Link></h3>
          <p className="product-price">
            <span className="discounted-price">${(product.price - product.price * product.discount / 100).toFixed(2)}</span>
            <span className="main-price">${product.price}</span>
          </p>
        </div>
      </div>
    )) : (
      <div key={product.id} className="product">
        <div className="product-image">
          <div className="product-label">
            <span>-{product.discount}%</span>
          </div>
          <img src={product.image || product.colors[0].images[0]} className="img-fluid" alt={product.name} />
          <div className="product-action">
            <ul>
              <li><BsCartPlus /></li>
              <li><FaRegEye /></li>
              <li><CiHeart /></li>
            </ul>
          </div>
        </div>
        <div className="product-content">
          <h3 className="title"><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
          <p className="product-price">
            <span className="discounted-price">${(product.price - product.price * product.discount / 100).toFixed(2)}</span>
            <span className="main-price">${product.price}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <select name="categories" onChange={handleCategoryChange}>
        <option value="">All</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      <div className="products">
        {filteredProducts.map(renderProduct)}
      </div>
    </div>
  );
}

export default Products;
