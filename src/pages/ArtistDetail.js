import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingArtistDetail,
  updateArtistStatus,
} from "../features/artists/artistSlice";
import "./ArtistDetail.css";
import { toast } from "react-toastify";

const ArtistDetail = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { artistDetail, error, loading } = useSelector(
    (state) => state.artists
  );

  const [isUpdating, setIsUpdating] = useState(false); // State to manage button click

  useEffect(() => {
    if (artistId) {
      dispatch(fetchPendingArtistDetail(artistId));
    }
  }, [dispatch, artistId]);

  const handleUpdateStatus = async (status) => {
    if (isUpdating) return; // Prevent multiple clicks
    setIsUpdating(true); // Set updating state
    console.log(status);
    try {
      console.log("Updating artist status", { artistId, status });
      const response = await dispatch(
        updateArtistStatus({ artistId, status })
      ).unwrap();
      console.log("Update response:", response);

      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to update artist status: " + error.message); // Handle error properly
    } finally {
      setIsUpdating(false); // Reset updating state
    }
  };

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  // Handle case when artistDetail might be null or undefined
  if (!artistDetail) {
    return <div className="error-message">Artist not found.</div>;
  }

  return (
    <div className="artist-detail">
      <img
        src={`http://localhost:4000/images/uifaces-popular-image (1).jpg`}
        alt="Artist"
        className="artist-image"
      />
      <h2>{artistDetail.artistName || "N/A"}</h2>
      <p>Email: {artistDetail.artistEmail || "N/A"}</p>
      <p>
        Request Date:{" "}
        {artistDetail.requestDate
          ? new Date(artistDetail.requestDate).toLocaleDateString()
          : "N/A"}
      </p>
      <p>Profile Status: {artistDetail.profileStatus || "N/A"}</p>
      <p>
        Skills:{" "}
        {Array.isArray(artistDetail.skills)
          ? artistDetail.skills.join(", ")
          : "N/A"}
      </p>
      <p>Title: {artistDetail.title || "N/A"}</p>
      <div className="artist-actions">
        <button
          className="approve-button"
          onClick={() => handleUpdateStatus("approved")}
          disabled={isUpdating} // Disable button while updating
        >
          Approve
        </button>
        <button
          className="reject-button"
          onClick={() => handleUpdateStatus("rejected")}
          disabled={isUpdating} // Disable button while updating
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ArtistDetail;
