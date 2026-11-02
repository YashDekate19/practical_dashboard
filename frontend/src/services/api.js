/**
 * Central API Client for Flask Backend Communication
 */

const BASE_URL = ''; // Relative path leverages Vite dev proxy & same-origin production

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP error ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// Dashboard & Health Services
// -----------------------------------------------------------------------------
export const getPracticals = () => request('/api/practicals');
export const getStatuses = () => request('/api/status');
export const startService = (service) => request(`/api/service/${service}/start`, { method: 'POST' });
export const stopService = (service) => request(`/api/service/${service}/stop`, { method: 'POST' });

// -----------------------------------------------------------------------------
// Practical 1: Tasty Restaurant
// -----------------------------------------------------------------------------
export const getPr1Menu = (category) => request(`/api/pr1/menu${category ? `?category=${encodeURIComponent(category)}` : ''}`);
export const getPr1Info = () => request('/api/pr1/info');
export const placePr1Order = (orderData) => request('/api/pr1/order', { method: 'POST', body: JSON.stringify(orderData) });
export const reservePr1Table = (reservationData) => request('/api/pr1/reservation', { method: 'POST', body: JSON.stringify(reservationData) });

// -----------------------------------------------------------------------------
// Practical 2: ShopEasy E-Commerce
// -----------------------------------------------------------------------------
export const getPr2Products = (category) => request(`/api/pr2/products${category ? `?category=${encodeURIComponent(category)}` : ''}`);
export const getPr2Offers = () => request('/api/pr2/offers');
export const searchPr2 = (q) => request(`/api/pr2/search?q=${encodeURIComponent(q)}`);
export const calculatePr2Cart = (items, coupon) => request('/api/pr2/cart', { method: 'POST', body: JSON.stringify({ items, coupon }) });
export const checkoutPr2 = (data) => request('/api/pr2/checkout', { method: 'POST', body: JSON.stringify(data) });

// -----------------------------------------------------------------------------
// Practical 3: Personal Developer Portfolio
// -----------------------------------------------------------------------------
export const getPr3Profile = () => request('/api/pr3/profile');
export const getPr3Skills = () => request('/api/pr3/skills');
export const getPr3Projects = () => request('/api/pr3/projects');
export const getPr3Education = () => request('/api/pr3/education');
export const sendPr3Message = (data) => request('/api/pr3/contact', { method: 'POST', body: JSON.stringify(data) });

// -----------------------------------------------------------------------------
// Practical 4: Authentication & Profile System
// -----------------------------------------------------------------------------
export const testPr4Db = () => request('/api/test-db');
export const registerUser = (userData) => request('/api/register', { method: 'POST', body: JSON.stringify(userData) });
export const loginUser = (credentials) => request('/api/login', { method: 'POST', body: JSON.stringify(credentials) });
export const getUsersList = () => request('/api/users');

// -----------------------------------------------------------------------------
// Practical 5: The Daily Times News Portal
// -----------------------------------------------------------------------------
export const getPr5Articles = (category) => request(`/api/pr5/articles${category ? `?category=${encodeURIComponent(category)}` : ''}`);
export const getPr5Breaking = () => request('/api/pr5/breaking');
export const getPr5Weather = () => request('/api/pr5/weather');
export const subscribePr5Newsletter = (email) => request('/api/pr5/subscribe', { method: 'POST', body: JSON.stringify({ email }) });

// -----------------------------------------------------------------------------
// Practical 6: Student Profile Portal
// -----------------------------------------------------------------------------
export const getPr6Students = (params = {}) => {
  const queryParts = [];
  if (params.q) queryParts.push(`q=${encodeURIComponent(params.q)}`);
  if (params.department && params.department !== 'all') queryParts.push(`department=${encodeURIComponent(params.department)}`);
  if (params.min_gpa) queryParts.push(`min_gpa=${encodeURIComponent(params.min_gpa)}`);
  const qs = queryParts.length ? `?${queryParts.join('&')}` : '';
  return request(`/api/pr6/students${qs}`);
};
export const getPr6Stats = () => request('/api/pr6/stats');
export const enrollStudent = (data) => request('/api/pr6/students', { method: 'POST', body: JSON.stringify(data) });
export const contactAdvisor = (data) => request('/api/pr6/contact-advisor', { method: 'POST', body: JSON.stringify(data) });
