// Step3Form.js

import React, { useState, useEffect } from 'react';

const Step3Form = ({ variants, onAddValues, onNext }) => {
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    // Initialize inputValues with empty strings for each variant
    const initialValues = {};
    variants.forEach((variant) => {
      initialValues[variant] = '';
    });
    setInputValues(initialValues);
  }, [variants]);

  const handleInputChange = (variant, value) => {
    setInputValues({ ...inputValues, [variant]: value });
  };

  const handleNext = () => {
    const nonEmptyValues = {};
    Object.entries(inputValues).forEach(([variant, value]) => {
      if (value.trim() !== '') {
        nonEmptyValues[variant] = value.trim();
      }
    });

    onAddValues(nonEmptyValues);
    onNext();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Enter Values</h2>
      {variants.map((variant, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-1">{variant}:</label>
          <input
            type="text"
            placeholder={`Enter Value for ${variant}`}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            value={inputValues[variant]}
            onChange={(e) => handleInputChange(variant, e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Step3Form;
