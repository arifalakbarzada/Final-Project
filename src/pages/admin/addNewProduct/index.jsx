import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { productsApi } from '../../../service/base';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../../redux/slices/productSlice';

const AddProductPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    discount: '',
    specifications: [{ name: '', value: '' }],
    colors: [{ name: '', hex: '', stock: '', images: [] }],
  });

  const accKey = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
  const accSecret = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
  const region = 'eu-north-1';

  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId: accKey,
      secretAccessKey: accSecret,
    },
  });

  const uploadFile = async (file) => {
    const params = {
      Bucket: 'arifsbucketforecommerceinitb',
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };

    try {
      await s3Client.send(new PutObjectCommand(params));
      return `https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`;
    } catch (err) {
      console.error('File upload error:', err);
      alert('Image upload failed. Please try again.');
      return null;
    }
  };

  const handleImageChange = async (e, colorIndex) => {
    const files = Array.from(e.target.files);
    const uploadedImages = await Promise.all(files.map(uploadFile));
    const updatedColors = [...product.colors];
    updatedColors[colorIndex].images.push(...uploadedImages.filter((url) => url));
    setProduct({ ...product, colors: updatedColors });
  };

  const handleInputChange = (e, key) => {
    setProduct({ ...product, [key]: e.target.value });
  };

  const handleSpecificationChange = (index, e) => {
    const newSpecifications = [...product.specifications];
    newSpecifications[index][e.target.name] = e.target.value;
    setProduct({ ...product, specifications: newSpecifications });
  };

  const handleColorChange = (index, e) => {
    const newColors = [...product.colors];
    newColors[index][e.target.name] = e.target.value;
    setProduct({ ...product, colors: newColors });
  };

  const addSpecification = () => {
    setProduct({
      ...product,
      specifications: [...product.specifications, { name: '', value: '' }],
    });
  };

  const addColor = () => {
    setProduct({
      ...product,
      colors: [...product.colors, { name: '', hex: '', stock: '', images: [] }],
    });
  };

  const removeSpecification = (index) => {
    const updatedSpecifications = product.specifications.filter((_, i) => i !== index);
    setProduct({ ...product, specifications: updatedSpecifications });
  };

  const removeColor = (index) => {
    const updatedColors = product.colors.filter((_, i) => i !== index);
    setProduct({ ...product, colors: updatedColors });
  };

  const removeImage = (colorIndex, imgIndex) => {
    const updatedColors = [...product.colors];
    updatedColors[colorIndex].images.splice(imgIndex, 1);
    setProduct({ ...product, colors: updatedColors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, brand, category, price, specifications, colors } = product;

    if (!name || !brand || !category || !price || specifications.length === 0 || colors.length === 0) {
      return alert('All required fields must be filled!');
    }

    try {
      await productsApi.addProduct(product);
      dispatch(setProducts([...products, product]));
      alert('Product added successfully!');
      navigate('/admin/edit');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-panel">
      <h2>Add New Product</h2>
      <div className="form-group">
        <label>Product Name:</label>
        <input type="text" value={product.name} onChange={(e) => handleInputChange(e, 'name')} required />
      </div>
      <div className="form-group">
        <label>Brand:</label>
        <input type="text" value={product.brand} onChange={(e) => handleInputChange(e, 'brand')} required />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input type="text" value={product.category} onChange={(e) => handleInputChange(e, 'category')} required />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input type="number" value={product.price} onChange={(e) => handleInputChange(e, 'price')} required />
      </div>
      <div className="form-group">
        <label>Discount (%):</label>
        <input type="number" value={product.discount} onChange={(e) => handleInputChange(e, 'discount')} />
      </div>

      <h3>Specifications</h3>
      {product.specifications.map((spec, index) => (
        <div className="form-group" key={index}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={spec.name}
            onChange={(e) => handleSpecificationChange(index, e)}
            required
          />
          <label>Value:</label>
          <input
            type="text"
            name="value"
            value={spec.value}
            onChange={(e) => handleSpecificationChange(index, e)}
            required
          />
          <button type="button" onClick={() => removeSpecification(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addSpecification}>Add Specification</button>

      <h3>Colors</h3>
      {product.colors.map((color, index) => (
        <div key={index} className="form-group color-group">
          <label>Color Name:</label>
          <input type="text" name="name" value={color.name} onChange={(e) => handleColorChange(index, e)} required />
          <label>Hex Code:</label>
          <input type="text" name="hex" value={color.hex} onChange={(e) => handleColorChange(index, e)} required />
          <label>Stock:</label>
          <input type="number" name="stock" value={color.stock} onChange={(e) => handleColorChange(index, e)} required />
          <h4>Images</h4>
          {color.images.map((image, imgIndex) => (
            <div key={imgIndex}>
              <img src={image} alt="Color preview" style={{ width: '50px', height: '50px' }} />
              <button type="button" onClick={() => removeImage(index, imgIndex)}>Remove</button>
            </div>
          ))}
          <input type="file" multiple onChange={(e) => handleImageChange(e, index)} />
          <button type="button" onClick={() => removeColor(index)}>Remove Color</button>
        </div>
      ))}
      <button type="button" onClick={addColor}>Add Color</button>

      <button type="submit" className="submit-btn">Submit Product</button>
    </form>
  );
};

export default AddProductPanel;
