import React, { useEffect } from 'react';
import { productsApi } from '../../../service/base';
import { useNavigate } from 'react-router';
import { setProducts } from '../../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const EditPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items);
  useEffect(() => {
    productsApi.getAllProduct().then(res => dispatch(setProducts(res)))
  }, [dispatch])



  return (
    <div className="product-panel">
      <h2>Product Management</h2>
      <div className="product-list">
        {products?.map(product => (
          <div key={product.id} className="product-item">
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span>{product.category}</span>
            <button onClick={() => {
              navigate(`/admin/edit/${product.id}`);
            }}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPanel;
