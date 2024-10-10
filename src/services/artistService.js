import axios from "axios";

// Base URL for the API
const BASE_URL = "http://localhost:4000/api/v1/artist";

// Function to handle API responses
const handleResponse = (response) => {
  if (response.status === 200 && response.data.success) {
    return response.data.data;
  }
  throw new Error("Error fetching data from the server.");
};

// Fetch all approved artists
const fetchApprovedArtists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/approved`);
    console.log(response);
    return handleResponse(response).approvedArtists;
  } catch (error) {
    console.error("Error fetching approved artists:", error.message);
    throw error;
  }
};

// Fetch all pending artists
const fetchPendingArtists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pending`);
    return handleResponse(response).pendingArtists;
  } catch (error) {
    console.error("Error fetching pending artists:", error.message);
    throw error;
  }
};

// Fetch all rejected artists
const fetchRejectedArtists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rejected`);
    return handleResponse(response).rejectedArtists;
  } catch (error) {
    console.error("Error fetching rejected artists:", error.message);
    throw error;
  }
};

// Fetch old artists (approved 3+ months ago)
const fetchOldArtists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getOldArtist`);
    return handleResponse(response).oldArtists;
  } catch (error) {
    console.error("Error fetching old artists:", error.message);
    throw error;
  }
};

const getArtists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/onboardingRequest`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch artists");
  }
};
const markAsReviewed = async (artistId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${artistId}/markAsReviewed`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to mark artist as reviewed");
  }
};
const getPendingArtistDetail = async (artistId) => {
  try {
    const response = await axios.get(`${BASE_URL}/pending/${artistId}`);
    return response.data; // Ensure this matches your expected data structure
  } catch (error) {
    throw new Error("Failed to fetch artist details");
  }
};

const updateArtistStatus = async (artistId, status) => {
  try {
    const response = await axios.put(`${BASE_URL}/${artistId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update artist status");
  }
};
// Export the service methods
export const artistService = {
  getArtists,
  markAsReviewed,
  getPendingArtistDetail,
  updateArtistStatus,
  fetchApprovedArtists,
  fetchPendingArtists,
  fetchRejectedArtists,
  fetchOldArtists,
};