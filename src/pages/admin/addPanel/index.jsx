import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { productsApi } from '../../../service/base'

function EditForSingleProductPanel() {
    const {id} = useParams()
    const [products, setProducts] = useState([])
    const [editingProduct, setEditingProduct] = useState({})
    const [product, setProduct] = useState()
    useEffect(() => {
        productsApi.getSingleProduct(id).then(res=>{
            setEditingProduct(res)
            setProduct(res)
        })
        
        productsApi.getAllProduct().then(res=>setProducts(res))
    }, [])
    const [newColor, setNewColor] = useState({ name: '', hex: '', images: [], stock: 0 });
  
    const handleEditProduct = (e) => {
      setEditingProduct({
        ...editingProduct,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSaveProduct = () => {
      setProduct(editingProduct);
    };
  
    const handleAddColor = () => {
      setProduct({
        ...product,
        colors: [...product.colors, { ...newColor, id: (product.colors.length + 1).toString() }]
      });
      setNewColor({ name: '', hex: '', images: [], stock: 0 });
    };
  
    return (
      <div className="panel">
        <h2>Product Management</h2>
        
        <div className="product-details">
          <h3>Product Details</h3>
          <p><strong>Name:</strong> {product?.name}</p>
          <p><strong>Brand:</strong> {product?.brand}</p>
          <p><strong>Category:</strong> {product?.category}</p>
          <p><strong>Price:</strong> ${product?.price}</p>
          <p><strong>Discount:</strong> {product?.discount}%</p>
          
          <div className="specifications">
            <h4>Specifications</h4>
            {product?.specifications.map((spec, index) => (
              <p key={index}><strong>{spec.name}:</strong> {spec.value}</p>
            ))}
          </div>
          
          <div className="colors">
            <h4>Colors</h4>
            {product?.colors.map((color) => (
              <div key={color.id} className="color-item">
                <div className="color-sample" style={{ backgroundColor: color.hex }}></div>
                <span>{color.name}</span>
                <span>Stock: {color.stock}</span>
                <div className="color-images">
                  {color.images.map((img, index) => (
                    <img key={index} src={img} alt={`${color.name} color`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="edit-form">
          <h3>Edit Product</h3>
          <input
            type="text"
            name="name"
            value={editingProduct.name}
            onChange={handleEditProduct}
            placeholder="Product Name"
          />
          <input
            type="text"
            name="price"
            value={editingProduct.price}
            onChange={handleEditProduct}
            placeholder="Price"
          />
          <input
            type="text"
            name="discount"
            value={editingProduct.discount}
            onChange={handleEditProduct}
            placeholder="Discount"
          />
          <button onClick={handleSaveProduct}>Save</button>
        </div>
  
        <div className="add-color-form">
          <h3>Add New Color</h3>
          <input
            type="text"
            value={newColor.name}
            onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
            placeholder="Color Name"
          />
          <input
            type="text"
            value={newColor.hex}
            onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
            placeholder="Color Hex Code"
          />
          <input
            type="number"
            value={newColor.stock}
            onChange={(e) => setNewColor({ ...newColor, stock: e.target.value })}
            placeholder="Stock"
          />
          <button onClick={handleAddColor}>Add Color</button>
        </div>
      </div>
    );
  
}

export default EditForSingleProductPanel