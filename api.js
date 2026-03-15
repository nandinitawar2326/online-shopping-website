import axios from "axios";

const API_URL = "http://localhost:5000";

// Signup & Login
export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data; // { user, token }
};

// Products
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Cart
export const addToCart = async (productId, quantity, token) => {
  const response = await axios.post(
    `${API_URL}/cart/add`,
    { productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getCart = async (token) => {
  const response = await axios.get(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Orders
export const placeOrder = async (items, total, token) => {
  const response = await axios.post(
    `${API_URL}/orders/place`,
    { items, total },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getOrders = async (token) => {
  const response = await axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
