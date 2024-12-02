import React, { useEffect, useState } from 'react';
import { productsApi } from '../../service/base';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setProducts } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { addCartItem } from '../../redux/slices/cartSlice';
import { addToFavList } from '../../redux/slices/favListSlice';
import toast from 'react-hot-toast';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const filtered = useSelector((state) => state.products.filteredByCategory)
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
  const reduxUser = useSelector((state)=>state.users.user)

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
    dispatch(setFilter(products))
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
      dispatch(addCartItem({ cartItem, reduxUser : reduxUser }));
    } else {
      navigate('/login');
      toast.error("Please sign in or sign up first" , {
        position : 'top-center'
      })
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
      dispatch(addToFavList({ favItem, reduxUser : reduxUser }));
    } else {
      navigate('/login');
      toast.error("Please sign in or sign up" , {
        position : 'top-center'
      })
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
                <span className="main-price">${parseFloat(product.price).toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    ));
  };



  return (
    <div className='products-container'>
      <div className="products">
        {filtered.length > 0 ? filtered.map(renderProduct) : <p>Ürün bulunamadı.</p>}
      </div>
    </div>
  );
}

export default Products;
