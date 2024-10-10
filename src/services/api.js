import axios from 'axios';

const API_KEY = '71aeaceb0db645c080b60bbf49371290';
const BASE_URL = 'https://newsapi.org/v2';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Fetch top headlines
export const fetchTopHeadlines = async (params) => {
  try {
    const response = await api.get('/top-headlines', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
