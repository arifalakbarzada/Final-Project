import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { productsApi } from '../../service/base';
import { BsCartPlus, BsHeart } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../redux/slices/cartSlice';
import { addToFavList } from '../../redux/slices/favListSlice';

function ProductDetail() {
  const { id, colorId, color: selectedColor } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state)=>state.cart.items)
  const favList = useSelector((state)=>state.favList.items)

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColorId, setSelectedColorId] = useState(colorId);
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');

  const capitalizeFirstLetter = useCallback(
    (string) => string.charAt(0).toUpperCase() + string.slice(1),
    []
  );

  useEffect(() => {
    productsApi
      .getSingleProduct(id)
      .then((res) => {
        setProduct(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const colorData = product.colors.find(
    (color) => color.name.toLowerCase() === selectedColor.toLowerCase()
  );

  if (!colorData) {
    return <div>Color not found</div>;
  }

  return (
    <div className="product-detail-container container">
  <div className="row">
    {/* Ürün Görselleri */}
    <div className="col-lg-6 col-sm-12">
      <div className="product-detail-image">
        <Swiper spaceBetween={20} slidesPerView={1} navigation modules={[Navigation]}>
          {colorData.images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={image}
                alt={`${product.name} ${colorData.name}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>

    {/* Ürün Bilgileri */}
    <div className="col-lg-6 col-sm-12">
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="brand">
          <strong>Brand:</strong> {capitalizeFirstLetter(product.brand)}
        </p>
        <p className="category">
          <strong>Category:</strong> {capitalizeFirstLetter(product.category)}
        </p>

        <div className="price-stock">
          <p className="price">
            <span className="discounted-price">
              ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
            </span>
            <span className="main-price">${product.price}</span>
          </p>
          <p className="stock">
            <strong>Stock:</strong> {colorData.stock}
          </p>
        </div>

        {/* Ürün Özellikleri */}
        <div className="specifications">
          <h3>Specifications</h3>
          <ul>
            {product.specifications.map((spec, index) => (
              <li key={index}>
                <strong>{capitalizeFirstLetter(spec.name)}:</strong> {capitalizeFirstLetter(spec.value)}
              </li>
            ))}
          </ul>
        </div>

        {/* Renk Seçenekleri */}
        {product.colors.length > 1 && (
          <div className="colors">
            <h3>Available Colors</h3>
            <div className="color-options">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`color ${color.id === selectedColorId ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  onClick={() => setSelectedColorId(color.id)}
                >
                  <NavLink to={`/products/${product.id}/${color.id}/${color.name.toLowerCase()}`} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Aksiyonlar */}
      <div className="product-action">
        <button
          className="addToCart"
          onClick={(e) => {
            e.preventDefault();
            const cartItem = {
              id: product.id,
              name: product.name,
              colorId: selectedColorId,
              color: selectedColor,
              price: product.price - (product.price * product.discount) / 100,
              image: colorData.images[0],
              stock: colorData.stock,
            };
            user ? dispatch(addCartItem({ cartItem, favList })) : navigate('/login');
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
              image: colorData.images[0],
              price: product.price - (product.price * product.discount) / 100,
              colorId: selectedColorId,
              color: selectedColor,
              stock: colorData.stock,
            };
            dispatch(addToFavList({ favItem: favoriteItem, cart }));
          }}
        >
          <BsHeart /> Add To Favorite
        </button>
      </div>
    </div>
  </div>
</div>

  );
}

export default ProductDetail;
