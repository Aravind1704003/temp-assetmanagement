const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql=require('mysql')

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aravind',
    database: 'newasset',
  });

// Connect to MySQL
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the Asset Management System API!');
});


app.post('/products', async (req, res) => {
  const { name, description, variants } = req.body;

  try {
    // Insert the product
    const insertProductQuery = 'INSERT INTO products (name, description) VALUES (?, ?)';
    const productValues = [name, description];
    // const [productResult] = await db.query(insertProductQuery, productValues);
    const productResultArray = await db.query(insertProductQuery, productValues);
const productResult = productResultArray[0];
console.log('Product Result:',productResult);

    const productId = productResultArray.insertId;

    console.log('Product Inserted:', productId);

    // Insert variants
    for (const variant of variants) {
      const { name: variantName, price, attributes } = variant;

      const insertVariantQuery = 'INSERT INTO product_variants (product_id, name, price) VALUES (?, ?, ?)';
      const variantValues = [productId, variantName, price];
      console.log(variantValues);
      const [variantResult] = await db.query(insertVariantQuery, variantValues);

      const variantId = variantResult.insertId;

      console.log('Variant Inserted:', variantId);

      // Check if attributes is an array with valid length before iterating
      if (Array.isArray(attributes) && attributes.length > 0) {
        // Insert attributes
        for (const attribute of attributes) {
          if (attribute && typeof attribute === 'object') {
            const { name: attributeName, value } = attribute;
            const insertAttributeQuery = 'INSERT INTO variant_attributes (variant_id, name, value) VALUES (?, ?, ?)';
            const attributeValues = [variantId, attributeName, value];
            await db.query(insertAttributeQuery, attributeValues);

            console.log('Attribute Inserted:', attributeValues);
          } else {
            // Handle the case when attribute is not in the expected format
            console.error('Invalid attribute format:', attribute);
          }
        }
      } else {
        // Handle the case when attributes is not an array or has an invalid length
        console.error('Invalid attributes:', attributes);
      }
    }

    res.status(201).send('Product and variants added successfully');
  } catch (error) {
    console.error('Error adding product and variants:', error);
    res.status(500).send('Error adding product and variants');
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
