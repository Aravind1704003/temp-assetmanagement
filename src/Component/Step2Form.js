import React, { useState } from 'react';

const Step2Form = ({ onNext }) => {
  const [newVariantDescription, setNewVariantDescription] = useState('');
  const [variantDescriptions, setVariantDescriptions] = useState([]);

  const addNewVariant = () => {
    if (newVariantDescription.trim() !== '') {
      setVariantDescriptions([...variantDescriptions, newVariantDescription]);
      setNewVariantDescription('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onNext({ variants: variantDescriptions });

    // Move to the next step
    // Comment this line if you're handling navigation outside of this component
    // history.push('/step3');
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Add Variants</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter Variant Description"
            className="w-full border p-2 rounded-l focus:outline-none focus:ring focus:border-blue-300"
            value={newVariantDescription}
            onChange={(e) => setNewVariantDescription(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-700 focus:outline-none"
            onClick={addNewVariant}
          >
            Add
          </button>
        </div>
        {variantDescriptions.map((description, index) => (
          <div key={index} className="mb-2 flex items-center">
            <span className="mr-2 text-blue-500">&#8226;</span>
            <span className="text-gray-700">{description}</span>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Step2Form;
