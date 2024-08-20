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
    <>
      {
        favList.length > 0 ? (
          <div className="favList-container">
            {
              favList.map((item, index) => (
                <div key={index} className='fav-item'>
                  <div className="fav-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="fav-item-name">
                    <Link to={`/products/${item.id}/${item.colorId}/${item.color}`}>{item.name} , {item.color}</Link>
                  </div>
                  <div className="fav-item-stock">
                    <p>{item.stock ? 'In Stock' : 'Out Stock'}</p>
                  </div>
                  <div className="addToCartInFavList">
                    <button onClick={() => dispatch(addCartItem(item))}><BsCart /> Add To Cart</button>
                  </div>
                  <div className="removeFavItem">
                    <button onClick={() => dispatch(removeFromFavList(item.colorId))}>Remove</button>
                  </div>
                </div>
              ))
            }
          </div>

        ) : (
          <div className="empty-fav-list">
            <h2>Your Favorite List is Empty</h2>
            <p>Add items to your favorite list to easily find them later.</p>
            <button className="explore-btn"><Link to={'/'}>Explore Now</Link></button>
          </div>

        )
      }
    </>
  );
}

export default FavList;
