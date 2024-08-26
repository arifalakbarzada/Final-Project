import React, { useState ,useEffect} from 'react';
import { productsApi } from '../../../service/base';
import { useNavigate } from 'react-router';

const EditPanel = () => {
  const [products, setProducts] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });
useEffect(() => {
  productsApi.getAllProduct().then(res=>setProducts(res))
}, [])

  const handleEdit = (product) => {
    setEditingProduct(product);
  };
const navigate = useNavigate();

  const handleSave = () => {
    setProducts(products.map(p => (p.id === editingProduct.id ? editingProduct : p)));
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    // const newId = products.length ? Math.max(products.map(p => p.id)) + 1 : 1;
    // setProducts([...products, {...newProduct }]);
    setNewProduct({ name: '', price: '', category: '' });
  };

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
              handleEdit(product);
              navigate(`/admin/edit/${product.id}`);
            }}>Edit</button>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="edit-form">
          <h3>Edit Product</h3>
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            placeholder="Product Name"
          />
          <input
            type="text"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
            placeholder="Price"
          />
          <input
            type="text"
            value={editingProduct.category}
            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
            placeholder="Category"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}

      <div className="add-form">
        <h3>Add New Product</h3>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Product Name"
        />
        <input
          type="text"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Price"
        />
        <input
          type="text"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          placeholder="Category"
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default EditPanel;
