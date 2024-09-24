import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsCartPlus } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { addCartItem } from '../../../redux/slices/cartSlice';
import { addToFavList } from '../../../redux/slices/favListSlice';
const Search = () => {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const products = useSelector((state) => state.products.items)
  const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'))
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items)
  const favList = useSelector((state) => state.favList.items)
  useEffect(() => {
    const filteredResults = products.filter((item) =>
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm) {
      setResults(filteredResults);
    }
  }, [searchTerm, dispatch]);

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
      dispatch(addCartItem({ cartItem, favList }));
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
      dispatch(addToFavList({ favItem, cart }));
    } else {
      navigate('/login');
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
      <div className="products">
        {results.length > 0 ? results.map(renderProduct) : <p>Ürün bulunamadı.</p>}
      </div>
    </div>
  );
};

export default Search;
