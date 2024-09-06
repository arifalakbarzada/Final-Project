import React, { useEffect, useState } from 'react';
import { productsApi } from '../../service/base';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { addCartItem } from '../../redux/slices/cartSlice';
import { addToFavList } from '../../redux/slices/favListSlice';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
  const cart = useSelector((state)=>state.cart.items)
  const favList = useSelector((state)=>state.favList.items)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAllProduct();
        dispatch(setProducts(data));
      } catch (error) {
        console.error('Ürünler alınırken hata oluştu:', error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [products]);
  const handleAddToCart = (product, color) => {
    if (user) {
      const cartItem = {
        id: product.id,
        name: product.name,
        colorId: color.id,
        color: color.name,
        price: (product.price - (product.price * product.discount) / 100).toFixed(2),
        image: color.images[0],
        stock: color.stock,
      };
      dispatch(addCartItem({cartItem , favList}));
    } else {
      navigate('/login');
    }
  };

  const handleAddToFav = (product, color) => {
    if (user) {
      const favItem = {
        id: product.id,
        name: product.name,
        colorId: color.id,
        color: color.name,
        price: (product.price - (product.price * product.discount) / 100).toFixed(2),
        image: color.images[0],
        stock: color.stock,
      };
      dispatch(addToFavList({favItem , cart}));
    } else {
      navigate('/login');
    }
  };
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };


  const renderProduct = (product) => {
    return product.colors.map((color) => (
      <div key={`${product.id}-${color.id}`} className="product">
        <div className="product-container">
          <div className="product-image">
            {product.discount > 0 && (
              <div className="product-label">
                <span>-{product.discount}%</span>
              </div>
            )}
            <img src={color.images[0]} alt={`${product.name} - ${color.name}`} />
            <div className="product-action">
              <ul>
                <li>
                  <BsCartPlus onClick={() => handleAddToCart(product, color)} />
                </li>
                <li onClick={() => handleAddToFav(product, color)}>
                  <CiHeart />
                </li>
              </ul>
            </div>
          </div>
          <div
            className="product-content"
            onClick={() => navigate(`/products/${product.id}/${color.id}/${color.name}`)}
          >
            <h3 className="title">{product.name} {product.colors.length > 1 && ` - ${color.name}`}</h3>
            <div className="product-price">
              <span className="discounted-price">${(product.price - (product.price * product.discount) / 100).toFixed(2)}</span>
              {product.discount > 0 && (
                <span className="main-price">${product.price.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    ));
  };



  return (
    <div className='products-container'>
      <div className="select-container" style={{ marginBottom: '24px' }}>
        <select name="categories" id='filterProducts' onChange={handleCategoryChange} className="category-select">
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="products">
        {filteredProducts.length > 0 ? filteredProducts.map(renderProduct) : <p>Ürün bulunamadı.</p>}
      </div>
    </div>
  );
}

export default Products;
