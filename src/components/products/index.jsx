import React, { useEffect, useState } from 'react';
import { productsApi } from '../../service/base';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { FaRegEye } from 'react-icons/fa';
import QuickViewModal from './../quickview';
import { addCartItem } from '../../redux/slices/cartSlice';
import { addToFavList } from '../../redux/slices/favListSlice';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

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

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (category === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const handleQuickViewOpen = (product, color) => {
    if (product && color) {
      setSelectedProduct(product);
      setSelectedColor(color);
      setIsQuickViewOpen(true);
    }
  };

  const handleQuickViewClose = () => {
    setSelectedProduct(null);
    setSelectedColor(null);
    setIsQuickViewOpen(false);
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
                <li>
                  <FaRegEye onClick={() => handleQuickViewOpen(product, color)} />
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
        quantity: 1, // Başlangıç miktarı
      };
      dispatch(addCartItem(cartItem));
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
      dispatch(addToFavList(favItem));
    } else {
      navigate('/login');
    }
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
      {selectedProduct && selectedColor && (
        <QuickViewModal
          isOpen={isQuickViewOpen}
          onRequestClose={handleQuickViewClose}
          product={selectedProduct}
          color={selectedColor}
        />
      )}
    </div>
  );
}

export default Products;
