import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { favListApi } from '../../../service/base';
import { removeFromFavList, setFavList } from '../../../redux/slices/favListSlice';
import { addCartItem } from '../../../redux/slices/cartSlice';
import { BsCart } from 'react-icons/bs';
function FavList() {
  const dispatch = useDispatch();
  const favList = useSelector(state => state.favList.items);
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  useEffect(() => {
    favListApi.getFavList(JSON.parse(user).id).then(res => dispatch(setFavList(res.favlist)));
  }, []);

  return (
    <div className='favlist-container'>
      {
        favList.length > 0 ? (
          favList.map((item, index) => (
            <div key={index} className='fav-item'>
             <div className="fav-item-image">
              <img src={item.image} alt={item.name} />
             </div>
             <div className="fav-item-name">
              <Link to={`/products/${item.id}/${item.colorId}/${item.color}`}>{item.name} , {item.color}</Link>
              </div>
              <div className="fav-item-stock">
                <p>{item.stock?'In Stock':'Out Stock'}</p>
              </div>
              <div className="addToCartInFavList">
                <button onClick={() => dispatch(addCartItem(item))}><BsCart /> Add To Cart</button>
              </div>
              <div className="removeFavItem">
                <button onClick={() => dispatch(removeFromFavList(item.colorId))}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <div className="fav-empty">
            <p>Your favorites list is empty.</p>
            <Link to="/" className="home-link">Go to Home</Link>
          </div>
        )
      }
    </div>
  );
}

export default FavList;
