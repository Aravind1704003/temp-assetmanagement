import React, { useState } from 'react';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    variants: [
      { name: '', price: '', attributes: [{ name: '', value: '' }] },
    ],
  });

  const handleInputChange = (e, index, attributeIndex) => {
    const { name, value } = e.target;
  
    if (name.startsWith('variantName-')) {
      const variantIndex = parseInt(name.split('-')[1], 10);
      setFormData((prevData) => {
        const updatedVariants = [...prevData.variants];
        updatedVariants[variantIndex] = { ...updatedVariants[variantIndex], name: value };
  
        return {
          ...prevData,
          variants: updatedVariants,
        };
      });
    } else if (name.startsWith('price-')) {
      const variantIndex = parseInt(name.split('-')[1], 10);
      setFormData((prevData) => {
        const updatedVariants = [...prevData.variants];
        updatedVariants[variantIndex] = { ...updatedVariants[variantIndex], price: value };
  
        return {
          ...prevData,
          variants: updatedVariants,
        };
      });
    } else if (name.startsWith('attributeName-')) {
      const [variantIndex, attributeIndex] = name.split('-').slice(1).map(Number);
      setFormData((prevData) => {
        const updatedVariants = [...prevData.variants];
        updatedVariants[variantIndex].attributes[attributeIndex] = {
          ...updatedVariants[variantIndex].attributes[attributeIndex],
          name: value,
        };
  
        return {
          ...prevData,
          variants: updatedVariants,
        };
      });
    } else if (name.startsWith('attributeValue-')) {
      const [variantIndex, attributeIndex] = name.split('-').slice(1).map(Number);
      setFormData((prevData) => {
        const updatedVariants = [...prevData.variants];
        updatedVariants[variantIndex].attributes[attributeIndex] = {
          ...updatedVariants[variantIndex].attributes[attributeIndex],
          value: value,
        };
  
        return {
          ...prevData,
          variants: updatedVariants,
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const handleAddVariant = () => {
    setFormData((prevData) => ({
      ...prevData,
      variants: [...prevData.variants, { name: '', price: '', attributes: [{ name: '', value: '' }] }],
    }));
  };

  const handleAddAttribute = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      variants: prevData.variants.map((variant, i) =>
        i === index ? { ...variant, attributes: [...variant.attributes, { name: '', value: '' }] } : variant
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message, redirect, etc.)
        console.log('Product and variants added successfully!');
      } else {
        // Handle errors (e.g., show an error message)
        console.error('Error adding product and variants:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product and variants:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Product Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange(e)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange(e)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        {formData.variants.map((variant, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h3 className="text-lg font-semibold mb-2">Variant {index + 1}</h3>
            <label className="block mb-2">
              Variant Name:
              <input
                type="text"
                name={`variantName-${index}`}
                value={variant.name}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              Price:
              <input
                type="text"
                name={`price-${index}`}
                value={variant.price}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>

            {variant.attributes.map((attribute, attributeIndex) => (
              <div key={attributeIndex} className="mb-2">
                <h4 className="text-base font-semibold mb-2">Attribute {attributeIndex + 1}</h4>
                <label className="block mb-2">
                  Attribute Name:
                  <input
                    type="text"
                    name={`attributeName-${index}-${attributeIndex}`}
                    value={attribute.name}
                    onChange={(e) => handleInputChange(e, index, attributeIndex)}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </label>
                <label className="block mb-2">
                  Attribute Value:
                  <input
                    type="text"
                    name={`attributeValue-${index}-${attributeIndex}`}
                    value={attribute.value}
                    onChange={(e) => handleInputChange(e, index, attributeIndex)}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </label>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleAddAttribute(index)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Attribute
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddVariant}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Variant
        </button>

        <br />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 mt-4 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
