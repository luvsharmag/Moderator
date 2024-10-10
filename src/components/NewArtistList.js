import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { fetchArtists, markArtistAsReviewed } from "../features/artists/artistSlice"; // Import your thunk


const NewArtistList = React.memo(() => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const navigate = useNavigate(); // Initialize useNavigate
  const { artists, loading, error } = useSelector((state) => state.artists);
  
  // Handle marking an artist as reviewed
  const handleMarkAsReviewed = async (artistId) => {
    try {
      await dispatch(markArtistAsReviewed(artistId)).unwrap(); 
      
      navigate(`/artist/${artistId}`);
    } catch (error) {
      console.error("Error marking artist as reviewed:", error);
    }
  };

  
  useEffect(() => {
    // if (artists.length === 0) { // Check if artists are already fetched
      dispatch(fetchArtists());
    // }
  }, [dispatch,fetchArtists]);

  
  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="artist-list">
      {artists.map((artist, index) => (
        <div
          key={artist._id}
          className="artist-item"
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
              requesttime: {new Date(artist.requesttime).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
});

export default NewArtistList;


