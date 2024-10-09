import React, { useEffect, useState } from "react";
import artistService from "../services/artistService"; // Import your service
import { useParams, useNavigate } from "react-router-dom"; // For route params and navigation
import "./ArtistDetail.css";

const ArtistDetail = () => {
  const { artistId } = useParams(); // Get artistId from URL params
  const navigate = useNavigate(); // For navigation
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtistDetail = async () => {
      try {
        const data = await artistService.getArtistDetail(artistId);
        console.log("API Response: ", data); // Log the API response
        if (data.success) {
          setArtist(data.data);
          console.log("Set Artist: ", data.data); // Log the artist data being set
        } else {
          setError("Artist not found");
        }
      } catch (error) {
        setError("Error fetching artist detail");
      }
    };

    fetchArtistDetail();
  }, [artistId]);

  const handleUpdateStatus = async (status) => {
    try {
      const response = await artistService.updateArtistStatus(artistId, status);
      if (response.success) {
        navigate("/artist"); // Navigate back to artist list
      }
    } catch (error) {
      setError("Error updating artist status");
    }
  };

  if (!artist) return <div>Loading...</div>; // Loading state
  if (error) return <div>{error}</div>; // Error state

  return (
    <div className="artist-detail">
       ( console.log(artist);)
      <img src={`http://localhost:4000/images/uifaces-popular-image (1).jpg`} alt="Artist" className="artist-image" /> {/* Static Image */}
      <h2>{artist.artistName}</h2>
      <p>Email: {artist.artistEmail}</p>
      <p>Request Date: {new Date(artist.requestDate).toLocaleDateString()}</p>
      <p>Profile Status: {artist.profileStatus}</p>
      <p>Skills: {Array.isArray(artist.skills) ? artist.skills.join(", ") : "N/A"}</p>
      <p>Title: {artist.title}</p>

      <div className="artist-actions">
        <button className="approve-button" onClick={() => handleUpdateStatus("approved")}>Approve</button>
        <button className="reject-button" onClick={() => handleUpdateStatus("rejected")}>Reject</button>
      </div>
    </div>
  );
};

export default ArtistDetail;
