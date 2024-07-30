import React, { useEffect, useState } from 'react';
import { productsApi } from '../../../service/base';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { FaRegEye } from 'react-icons/fa';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const categories = [];
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    productsApi.getAllProduct().then(data => dispatch(setProducts(data)));
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  products.forEach((element) => {
    if (!categories.includes(element.category)) {
      categories.push(element.category);
    }
  });

  return (
    <div>
      <select
        name="categories"
        onChange={(e) => {
          const category = e.target.value;
          if (category === '') {
            setFilteredProducts(products);
          } else {
            setFilteredProducts(products.filter(product => product.category === category));
          }
        }}
      >
        <option value="">All</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      <div className="products">
        {filteredProducts.map((product) => 
        product.colors
        (
          <div key={product.id} className="product">
            <div  className="product-image">
            <div className="product-label">
              <span>-{product.discount}%</span>
            </div>
            {product.image
              ? <img src={product.image} className="img-fluid" alt={product.name} />
              : <img src={product.colors[0].images[0]} className="img-fluid" alt={product.name} />}
            <div className="product-action">
              <ul>
                <li><BsCartPlus /></li>
                <li><FaRegEye /></li>
                <li><CiHeart /></li>
              </ul>
            </div>
          </div>
          <div class="product-content">
                                        <h3 class="title">{product.name}</h3>
                                        <p class="product-price">
                                          <span class="discounted-price">${(product.price - product.price*product.discount / 100).toFixed(2)}</span> 
                                          <span class="main-price">${product.price}</span>
                                          </p>
                                    </div>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default Products;
