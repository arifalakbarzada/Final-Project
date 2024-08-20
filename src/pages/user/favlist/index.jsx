import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { favListApi } from '../../../service/base';
import { removeFromFavList, setFavList } from '../../../redux/slices/favListSlice';
function FavList() {
  const dispatch = useDispatch();
  const favList = useSelector(state => state.favList.items);
  const state = useSelector(state => state.favList)
console.log(state)
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  useEffect(() => {
    favListApi.getFavList(JSON.parse(user).id).then(res => dispatch(setFavList(res.favlist)));
  }, []);

  return (
    <div className='favlist-container'>
      {
        favList.length > 0 ? (
          favList.map((item, index) => (
            <ul key={index} className='fav-item'>
              <li className="fav-image">
                <img src={item.image} alt={item.name} />
              </li>
              <li className="fav-name">
                <h4>{item.name} {item.color}</h4>
              </li>
              <li className="fav-remove">
                <button onClick={() => {
                  dispatch(removeFromFavList(item.colorId))
                }}>Remove</button>
              </li>
            </ul>
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
