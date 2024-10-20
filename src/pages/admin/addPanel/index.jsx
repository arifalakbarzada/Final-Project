import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { productsApi } from '../../../service/base';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../../redux/slices/productSlice';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; // Yeni SDK'dan ithal
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
    colors: []
  });

  const [specifications, setSpecifications] = useState([]);
  const [colorData, setColorData] = useState({
    name: '',
    hex: '',
    images: [],
    stock: 0,
    imageFiles: null,
    imagePreview: null,
  });

  // AWS kimlik bilgilerini güvenli bir şekilde almak
  const acckey = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
  const accSecret = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
  const region = 'eu-north-1';

  // AWS S3 istemcisi oluşturma
  const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: acckey,
      secretAccessKey: accSecret,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setColorData({
      ...colorData,
      imageFiles: file,
      imagePreview: URL.createObjectURL(file), // Görüntü önizlemesi
    });
  };

  const uploadFile = async (file) => {
    const params = {
      Bucket: 'arifsbucketforecommerceinitb', // S3 bucket adı
      Key: file.name, // Dosya adı
      Body: file, // Dosya içeriği
      ContentType: file.type, // Dosya tipi
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      console.log('Dosya başarıyla yüklendi:', `https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`);
      return `https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`; // Yüklenen dosyanın URL'si
    } catch (err) {
      console.log('Dosya yüklenirken hata oluştu:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dosya yüklemesi
    if (colorData.imageFiles) {
      const imageUrl = await uploadFile(colorData.imageFiles);

      // Yeni renk bilgilerini ekle
      const newColor = {
        id: v4(),
        name: colorData.name,
        hex: colorData.hex,
        stock: colorData.stock,
        images: [imageUrl],
      };

      // Ürün rengini güncelle
      const updatedProduct = {
        ...product,
        colors: [...product.colors, newColor],
      };
      setProduct(updatedProduct)
      productsApi.updateProduct(id , updatedProduct)

      // Backend'e güncellenen ürünü gönderme (API'ye göre ayarlayın)
      // await productsApi.updateProduct(id, updatedProduct);
    }
  };

  useEffect(() => {
    productsApi.getSingleProduct(id).then((res) => {
      setProduct(res);
      setSpecifications(res.specifications);
    });

    productsApi.getAllProduct().then((res) => dispatch(setProducts(res)));
  }, [dispatch, id]);

  return (
    <div className="panel">
      <h2>Product Management</h2>
       <div className="product-details">
        <h3>Product Details</h3>
        <p><strong>Name:</strong><input type="text" value={product?.name} onChange={
          (e) => setProduct({ ...product, name: e.target.value })
        } /> {}</p>
        <p><strong>Brand:</strong><input type="text" value={product?.brand} onChange={
          (e) => setProduct({ ...product, brand: e.target.value })
        } /> {}</p>
        <p><strong>Category:</strong><input type="text" value={product?.category} onChange={
          (e) => setProduct({ ...product, category: e.target.value })
        } /> {}</p>
        <p><strong>Price:</strong><input type="text" value={product?.price} onChange={
          (e) => setProduct({ ...product, price: e.target.value })
        } /> ${}</p>
        <p><strong>Discount:</strong><input type="text" value={product?.discount} onChange={
          (e) => setProduct({ ...product, discount: e.target.value })
        } /> {}%</p>

        <div className="specifications">
          <h4>Specifications</h4>
          {specifications.map((spec, index) => (
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


      {/* Form ve Ürün Detayları */}
      {/* ... */}
      <form onSubmit={handleSubmit}>
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
          type="text"
          placeholder="Stock"
          defaultValue={colorData.stock}
          onChange={(e) => setColorData({ ...colorData, stock :e.target.value})}
        />
        <input type="file" onChange={handleImageChange} />
        {colorData.imagePreview && <img src={colorData.imagePreview} alt="Preview" width="100" />}
        <button type="submit">Add Color</button>
      </form>
    </div>
  );
}

export default EditForSingleProductPanel;
