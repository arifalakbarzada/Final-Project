import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartApi, favListApi } from '../../../service/base';
import { removeFromFavList, setFavList, addToFavList } from '../../../redux/slices/favListSlice';
import { addCartItem } from '../../../redux/slices/cartSlice';
import { BsCart } from 'react-icons/bs';

function FavList() {
  const dispatch = useDispatch();
  const favList = useSelector(state => state.favList.items);
  const reduxUser = useSelector((state) => state.users.user)
  const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    if (user && user.id) {
      favListApi.getFavList(user.id).then(res => dispatch(setFavList(res.favlist)));
    }
  }, [dispatch]);

  return (
    <>
      {favList.length > 0 ? (
        <div className="favList-container">
          {favList.map((item, index) => (
            <div key={index} className="fav-item">
              <div className="fav-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="fav-item-details">
                <Link to={`/products/${item.id}/${item.colorId}/${item.color}`} className="fav-item-name">
                  <h4>{item.name}, {item.color}</h4>
                </Link>
                <p className="fav-item-price">${parseFloat(item.price).toFixed(2)}</p>
                <p className={`fav-item-stock ${item.stock ? 'in-stock' : 'out-stock'}`}>
                  {item.stock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <div className="fav-item-actions">
                <button onClick={() => dispatch(addCartItem({ cartItem: item, reduxUser : reduxUser }))} className="addToCartBtn">
                  <BsCart /> Add To Cart
                </button>
                <button onClick={() => dispatch(removeFromFavList({ colorId: item.colorId, reduxUser : reduxUser }))} className="removeBtn">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-fav-list">
          <h2>Your Favorite List is Empty</h2>
          <p>Add items to your favorite list to easily find them later.</p>
          <button className="explore-btn">
            <Link to={'/'}>Explore Now</Link>
          </button>
        </div>
      )}
    </>
  );
}

export default FavList;
