import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import artistService from "../services/artistService"; // Import your artist service
import "./ArtistList.css"; // Your CSS file for styling

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await artistService.getArtists();
        if (data.success) {
          setArtists(data.data);
        } else {
          setError("No artists found");
        }
      } catch (error) {
        setError("Error fetching artists");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleMarkAsReviewed = async (artistId) => {
    try {
      // Call the service to mark the artist as reviewed
      const response = await artistService.markAsReviewed(artistId);
      if (response.success) {
        // Update the artist list locally
        setArtists((prevArtists) =>
          prevArtists.map((artist) =>
            artist._id === artistId ? { ...artist, isReviewed: true } : artist
          )
        );
        // Navigate to the artist detail page
        navigate(`/artist/${artistId}`);
      }
    } catch (error) {
      setError("Error marking artist as reviewed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="artist-list">
      {artists.map((artist, index) => (
        <div
          key={artist._id}
          className={`artist-item ${artist.isReviewed ? "" : "unread"}`}
          onClick={() => handleMarkAsReviewed(artist._id)} // Call the function on click
        >
          <img
            src={`http://localhost:4000/images/uifaces-popular-image (${
              index + 1
            }).jpg`} // Adjust based on your artist data structure
            alt={artist.fullname}
            className="artist-image"
          />
          <div className="artist-details">
            <h3 className="artist-name">{artist.fullname}</h3>
            <p className="artist-title">Category/Title: {artist.title}</p>
            <p className="artist-skills">Skills: {artist.skills.join(", ")}</p>
            <p className="artist-request-time">
              Request Date: {new Date(artist.requesttime).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;
