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
            {favList.map((item, index) => (
              <div key={index} className="fav-item">
                <div className="fav-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="fav-item-details">
                  <Link to={`/products/${item.id}/${item.colorId}/${item.color}`} className="fav-item-name">
                    <h4>{item.name} , {item.color}</h4>
                  </Link>
                  <p className="fav-item-price">${item.price.toFixed(2)}</p>
                  <p className={`fav-item-stock ${item.stock ? 'in-stock' : 'out-stock'}`}>
                    {item.stock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                <div className="fav-item-actions">
                  <button onClick={() => dispatch(addCartItem(item))} className="addToCartBtn">
                    <BsCart /> Add To Cart
                  </button>
                  <button onClick={() => dispatch(removeFromFavList(item.colorId))} className="removeBtn">
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
            <button className="explore-btn"><Link to={'/'}>Explore Now</Link></button>
          </div>

        )
      }
    </>
  );
}

export default FavList;
