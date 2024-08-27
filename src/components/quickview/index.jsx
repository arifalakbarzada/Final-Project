import Modal from 'react-modal';
import React, { useEffect, useState, useCallback } from 'react';
import {useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BsCartPlus, BsHeart } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../redux/slices/cartSlice';
import { addToFavList } from '../../redux/slices/favListSlice';
Modal.setAppElement('#root');

const QuickViewModal = ({ isOpen, onRequestClose, product, color }) => {
  if (!product) return null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedColorId, setSelectedColorId] = useState(color.id);
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');

  const capitalizeFirstLetter = useCallback(
    (string) => string.charAt(0).toUpperCase() + string.slice(1),
    []
  );



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Quick View"
      className="quick-view-modal"
      overlayClassName="quick-view-overlay"
    >  <div className="product-detail-container container">
        <div className="row">
          <div className="col-lg-6 col-sm-12 flex-center">
            <div className="product-detail-image">
              <Swiper spaceBetween={50} slidesPerView={1} navigation modules={[Navigation]}>
                {color.images?.map((image, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={image}
                      alt={`${product.name} ${color.name}`}
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
                    <li key={index}>
                      <strong>{capitalizeFirstLetter(spec.name)}:</strong> {capitalizeFirstLetter(spec.value)}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="price">
                <span className="discounted-price">
                  ${(product.price - product.price * product.discount / 100).toFixed(2)}
                </span>
                <span className="main-price">${product.price}</span>
              </p>
              <p className="stock">Stock: {color.stock}</p>
              <div className="colors">
                {product.colors.length > 1 && (
                  <>
                    <h3>Available Colors:</h3>
                    <div className="color-options">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="color"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          onClick={() => {
                            navigate(`/products/${product.id}/${color.id}/${color.name.toLowerCase()}`);
                            setSelectedColorId(color.id);
                          }}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="product-action">
              <button
                className="addToCart"
                onClick={(e) => {
                  e.preventDefault();
                  const cartItem = {
                    id: product.id,
                    name: product.name,
                    colorId: selectedColorId,
                    color: color.name,
                    price: product.price - product.price * product.discount / 100,
                    image: color.images[0],
                    stock: color.stock,
                  };
                  user ? dispatch(addCartItem(cartItem)) : navigate('/login');
                }}
              >
                <BsCartPlus /> Add To Cart
              </button>

              <button
                className="addToFav"
                onClick={(e) => {
                  e.preventDefault();
                  const favoriteItem = {
                    id: product.id,
                    name: product.name,
                    image: color.images[0],
                    price: product.price - product.price * product.discount / 100,
                    colorId: selectedColorId,
                    color: color.id,
                    stock: color.stock
                  }
                  dispatch(addToFavList(favoriteItem))
                }}
              >
                <BsHeart /> Add To Favorite
              </button>
            </div>

          </div>
        </div>
      </div>
    </Modal>
  );

};

export default QuickViewModal;
