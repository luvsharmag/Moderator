import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/artist/onboardingRequest";
const API_URL_BASE = "http://localhost:4000/api/v1/artist";
const getArtists = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch artists");
  }
};
const markAsReviewed = async (artistId) => {
  try {
    const response = await axios.put(`${API_URL}/${artistId}/markAsReviewed`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to mark artist as reviewed");
  }
};
const getArtistDetail = async (artistId) => {
  try {
    const response = await axios.get(`${API_URL_BASE}/pending/${artistId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch artist details');
  }
};
const updateArtistStatus = async (artistId, status) => {
  try {
    const response = await axios.put(`${API_URL}/${artistId}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update artist status');
  }
};
// Export the service methods
export default {
  getArtists,
  markAsReviewed,
  getArtistDetail,
  updateArtistStatus
};
