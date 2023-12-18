import React, { useState } from 'react';

const Step1Form = ({ onNext }) => {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    // Validate the input if needed
    // Call the onNext function to move to the next step
    onNext({ productName, productImage, productDescription });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <label className="block mb-4">
        <span className="text-gray-700">Product Name:</span>
        <input
          className="form-input mt-1 block w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Product Image:</span>
        <input
          className="form-input mt-1 block w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
      {productImage && (
        <img
          src={productImage}
          alt="Product Preview"
          className="mb-4 rounded"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
      <label className="block mb-4">
        <span className="text-gray-700">Product Description:</span>
        <textarea
          className="form-textarea mt-1 block w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </label>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Step1Form;
