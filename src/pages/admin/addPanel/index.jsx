import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { productsApi } from '../../../service/base';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../../redux/slices/productSlice';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 } from 'uuid';

function EditForSingleProductPanel() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    discount: '',
    specifications: [],
    colors: [],
  });

  const [newSpec, setNewSpec] = useState({ name: '', value: '' });
  const [editingSpec, setEditingSpec] = useState(null);
  const [addSpec, setAddSpec] = useState(false);
  const [addColor, setAddColor] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
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
      Key: `${v4()}-${file.name}`,  // Adding a UUID to ensure unique file names
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

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = await Promise.all(files.map(uploadFile));
    setColorData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...uploadedUrls],
      imageFiles: files,
      imagePreview: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  const handleEditSpec = (index) => {
    const spec = product.specifications[index];
    setEditingSpec({ ...spec, index });
    setAddSpec(false)
  };

  const handleEditColor = (index) => {
    const color = product.colors[index];
    setColorData(color);
    setEditingColor({ ...color, index });
  };

  const handleSpecUpdate = () => {
    const updatedSpecs = [...product.specifications];
    updatedSpecs[editingSpec.index] = {
      name: editingSpec.name,
      value: editingSpec.value,
    };

    const updatedProduct = {
      ...product,
      specifications: updatedSpecs,
    };
    setProduct(updatedProduct);
    productsApi.updateProduct(id, updatedProduct);
    setEditingSpec(null);
  };

  const handleAddColor = async () => {
    let imageUrls = colorData.images;

    if (colorData.imageFiles) {
      const newImageUrl = await uploadFile(colorData.imageFiles[0]);
      imageUrls = [...colorData.images, newImageUrl];
    }

    const updatedColors = [...product.colors, { ...colorData, id: v4() }];

    const updatedProduct = {
      ...product,
      colors: updatedColors,
    };
    setProduct(updatedProduct);
    productsApi.updateProduct(id, updatedProduct);
    setAddColor(null);
  }

  const handleColorUpdate = async () => {
    let imageUrls = colorData.images;

    if (colorData.imageFiles) {
      const newImageUrl = await uploadFile(colorData.imageFiles[0]);
      imageUrls = [...colorData.images, newImageUrl];
    }

    const updatedColors = [...product.colors];
    updatedColors[editingColor.index] = {
      ...colorData,
      images: imageUrls,
    };

    const updatedProduct = {
      ...product,
      colors: updatedColors,
    };
    setProduct(updatedProduct);
    productsApi.updateProduct(id, updatedProduct);
    setEditingColor(null);
  };
  const handleDeleteColor = (index) => {
    const deletedColor = product.colors[index]
    const updatedColors = product.colors.filter((color) => color.id !== deletedColor.id)
    const updatedProduct = { ...product, colors: updatedColors }
    setProduct(updatedProduct)
    productsApi.updateProduct(id, updatedProduct)
  }

  const handleDeleteSpec = (index) => {
    const updatedSpecs = product.specifications.filter((_, i) => i !== index);
    const updatedProduct = { ...product, specifications: updatedSpecs };
    setProduct(updatedProduct);
    productsApi.updateProduct(id, updatedProduct);
  };

  useEffect(() => {
    productsApi.getSingleProduct(id).then((res) => {
      setProduct(res);
    });

    productsApi.getAllProduct().then((res) => dispatch(setProducts(res)));
  }, [dispatch, id]);

  return (
    <div className="panel">
      <h2>Product Management</h2>

      <div className="product-details">
        <h3>Product Details</h3>
        <p><strong>Name:</strong>
          <input type="text" value={product?.name} onChange={
            (e) => setProduct({ ...product, name: e.target.value })
          } />
        </p>

        <div className="specifications">
          <h4>Specifications</h4>
          {product?.specifications.map((spec, index) => (
            <div key={index} className="spec-item">
              <p><strong>{spec.name}:</strong> {spec.value}</p>
              <button onClick={() => handleEditSpec(index)}>Edit</button>
              <button onClick={() => handleDeleteSpec(index)}>Delete</button>
            </div>
          ))}
          {addSpec ? (
            <div className="edit-spec">
              <h3>Add Specification</h3>
              <input
                type="text"
                placeholder="Specification Name"
                value={newSpec.name}
                onChange={(e) => setNewSpec({ ...newSpec, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Specification Value"
                value={newSpec.value}
                onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
              />
              <button onClick={() => {
                if (newSpec.name && newSpec.value) {
                  const updatedSpecs = [...product.specifications, newSpec];
                  const updatedProduct = { ...product, specifications: updatedSpecs };
                  setProduct(updatedProduct);
                  productsApi.updateProduct(id, updatedProduct);
                  setNewSpec({ name: '', value: '' });
                  setAddSpec(false);
                }
              }}>Add</button>
              <button onClick={() => setAddSpec(false)}>Close</button>
            </div>
          ) : (
            <button onClick={() => {
              setAddSpec(true)
              setEditingSpec(null)
            }}>Add Specification</button>
          )}
        </div>
        {editingSpec && (
          <div className="edit-spec">
            <h3>Edit Specification</h3>
            <input
              type="text"
              value={editingSpec.name}
              onChange={(e) => setEditingSpec({ ...editingSpec, name: e.target.value })}
            />
            <input
              type="text"
              value={editingSpec.value}
              onChange={(e) => setEditingSpec({ ...editingSpec, value: e.target.value })}
            />
            <button onClick={handleSpecUpdate} disabled={!editingSpec.name || !editingSpec.value}>
              Update
            </button>
            <button onClick={() => {
              setEditingSpec(null);
            }}>Close</button>
          </div>
        )
        }
        <div className="colors">
          <h4>Colors</h4>
          {product?.colors.map((color, index) => (
            <div key={index} className="color-item">
              <div className="color-sample" style={{ backgroundColor: color.hex }}></div>
              <span>{color.name}</span>
              <span>Stock: {color.stock}</span>
              <div className="color-images">
                {color.images.map((img, imgIndex) => (
                  <img key={imgIndex} src={img} alt={`${color.name} color`} />
                ))}
              </div>
              <button onClick={() => {
                handleEditColor(index)
                setAddColor(false)
              }}>Edit</button>
              <button onClick={() => handleDeleteColor(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      {editingColor && (
        <div className="edit-color">
          <h3>Edit Color</h3>
          <input
            type="text"
            placeholder="Color Name"
            value={colorData.name}
            onChange={(e) => setColorData({ ...colorData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Color Hex Code"
            value={colorData.hex}
            onChange={(e) => setColorData({ ...colorData, hex: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={colorData.stock}
            onChange={(e) => setColorData({ ...colorData, stock: parseInt(e.target.value) })}
          />
          <input type="file" multiple onChange={handleImageChange} />
          <div className="image-previews">
            {colorData.imagePreview?.map((preview, index) => (
              <img key={index} src={preview} alt="Preview" />
            ))}
          </div>
          <button onClick={handleColorUpdate} disabled={!colorData.name || !colorData.hex || colorData.stock < 0}>
            Update Color
          </button>
          <button onClick={() => {
            setEditingColor(false);
            setColorData({ name: "", hex: "", stock: 0, imagePreview: [] })
          }}>Close</button>


        </div>
      )}



      {addColor ?
        <div className="edit-color">
          <h3>Add Color</h3>
          <input
            type="text"
            placeholder="Color Name"
            value={colorData.name}
            onChange={(e) => setColorData({ ...colorData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Color Hex Code"
            value={colorData.hex}
            onChange={(e) => setColorData({ ...colorData, hex: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={colorData.stock}
            onChange={(e) => setColorData({ ...colorData, stock: parseInt(e.target.value) })}
          />
          <input type="file" multiple onChange={handleImageChange} />
          <div className="image-previews">
            {colorData.imagePreview?.map((preview, index) => (
              <img key={index} src={preview} alt="Preview" />
            ))}
          </div>
          <button onClick={() => {
            setAddColor(false)
            handleAddColor()
          }} disabled={!colorData.name || !colorData.hex || colorData.stock <= 0}>
            Add Color
          </button>
          <button onClick={() => {
            setAddColor(false)
            setColorData({ name: "", hex: "", stock: 0, imagePreview: [] })
          }}>Close</button>

        </div>

        : <button onClick={() => {
          setEditingColor(false);
          setAddColor(true);
        }}>Add Color</button>
      } </div>
  );
}

export default EditForSingleProductPanel;
