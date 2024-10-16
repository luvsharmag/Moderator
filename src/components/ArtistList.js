import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./ArtistList.css"; // Your CSS file for styling

const ArtistList = ({ fetchFunction }) => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const navigate = useNavigate(); // Initialize useNavigate

  
  const { artists, loading, error } = useSelector((state) => state.artists);

  
  useEffect(() => {
      dispatch(fetchFunction());
  }, [dispatch, fetchFunction]);

  
  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  
  const handleArtistClick = (artistId) => {
    navigate(`/artist/${artistId}`); 
  };
  console.log("inside artistList",artists);
  return (
    <div className="artist-list">
      {artists.map((artist, index) => (
        <div
          key={artist._id}
          className="artist-item"
          onClick={() => handleArtistClick(artist._id)} // Call the function on click
        >
          <img
            src={`http://localhost:4000/images/uifaces-popular-image (${
              index + 1
            }).jpg`} // Adjust based on your artist data structure
            alt={artist.fullname}
            className="artist-image"
          />
          <div className="artist-details">
            <h3 className="artist-name">{artist.artistName}</h3>
            <p className="artist-title">Category/Title: {artist.title}</p>
            <p className="artist-skills">Skills: {artist.skills.join(", ")}</p>
            <p className="artist-request-time">
              Email:{artist.artistEmail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;
