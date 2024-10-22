import { S3Client } from '@aws-sdk/client-s3';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AddProductPanel = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    discount: '',
    specifications: [{ name: '', value: '' }],
    colors: [{ name: '', hex: '', stock: '', images: [''] }],
  });

  const handleInputChange = (e, key) => {
    setProduct({ ...product, [key]: e.target.value });
  };
  const [colorData, setColorData] = useState({
    name: '',
    hex: '',
    images: [],
    stock: 0,
    imageFiles: null,
    imagePreview: null,
  });

  const acckey = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
  const accSecret = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
  const region = 'eu-north-1';

  const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: acckey,
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
      const data = await s3Client.send(new PutObjectCommand(params));
      return `https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`;
    } catch (err) {
      console.log('File upload error:', err);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      uploadFile(file);
    });
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
      colors: [...product.colors, { name: '', hex: '', stock: '', images: [''] }],
    });
  };

  const addImage = (colorIndex) => {
    const newColors = [...product.colors];
    newColors[colorIndex].images.push('');
    setProduct({ ...product, colors: newColors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, like sending the product to the backend API
    console.log('Product Submitted:', product);
    // After submission, navigate to product management panel
    navigate('/admin/edit');
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
          <label>Specification Name:</label>
          <input
            type="text"
            name="name"
            value={spec.name}
            onChange={(e) => handleSpecificationChange(index, e)}
            required
          />
          <label>Specification Value:</label>
          <input
            type="text"
            name="value"
            value={spec.value}
            onChange={(e) => handleSpecificationChange(index, e)}
            required
          />
        </div>
      ))
      }
      <button type="button" onClick={addSpecification}>
        Add Specification
      </button>

      <h3>Colors</h3>
      {product.colors.map((color, index) => (
        <div key={index} className="form-group color-group">
          <label>Color Name:</label>
          <input type="text" name="name" value={color.name} onChange={(e) => handleColorChange(index, e)} required />
          <label>Hex Code:</label>
          <input type="text" name="hex" value={color.hex} onChange={(e) => handleColorChange(index, e)} required />
          <label>Stock:</label>
          <input type="text" name="stock" value={color.stock} onChange={(e) => handleColorChange(index, e)} required />
          <h4>Images</h4>
          {color.images.map((image, imgIndex) => (
            <div key={imgIndex} className="form-group">
              <label>Image URL:</label>
              <input
                type="file"
              />
            </div>
          ))}
          <button type="button" onClick={() => addImage(index)}>
            Add Image
          </button>
        </div>
      ))}
      <button type="button" onClick={addColor}>
        Add Color
      </button>

      <button type="submit" className="submit-btn">
        Submit Product
      </button>
    </form>
  );
};

export default AddProductPanel;
