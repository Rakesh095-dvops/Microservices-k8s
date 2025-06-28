const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const port = 3003;

app.get('/health', (req, res) => {
  res.json({ status: 'Gateway Service is healthy' });
});

app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get('http://user-service:3000/users');
    //const response = await axios.get(`${process.env.USER_SERVICE_URL}/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('http://product-service:3001/products');
    //const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/products`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const response = await axios.get('http://order-service:3002/orders');
    //const response = await axios.get(`${process.env.ORDER_SERVICE_URL}/orders`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const response = await axios.post('http://order-service:3002/orders', req.body);
    //const response = await axios.post(`${process.env.ORDER_SERVICE_URL}/orders`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
});

app.listen(port, () => {
  console.log(`Gateway service running on port ${port}`);
});