import React, { useEffect } from 'react';
import { productsApi } from '../../../service/base';
import { useNavigate } from 'react-router';
import { deleteProduct, setProducts } from '../../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegTrashAlt } from 'react-icons/fa';

const EditPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    productsApi.getAllProduct().then((res) => dispatch(setProducts(res)));
  }, [dispatch]);

  return (
    <div className="product-panel">
      <h2>Product Management</h2>
      <button className="add-product-btn" onClick={() => navigate('/admin/addnew')}>
        Add New Product
      </button>
      <div className="product-list">
        {products?.map((product) => (
          <div key={product.id} className="product-item">
            <span className="product-name">{product.name}</span>
            <span className="product-price">${product.price}</span>
            <span className="product-category">{product.category}</span>
            <div className="primary-actions">
         <button className="edit-btn" onClick={() => navigate(`/admin/edit/${product.id}`)}>
              Edit
            </button>
            <button className='delete-btn' onClick={
              ()=>{
                productsApi.deleteProduct(product.id);
                dispatch(deleteProduct(product.id))
              }
            }><FaRegTrashAlt /> Delete</button>     
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPanel;
