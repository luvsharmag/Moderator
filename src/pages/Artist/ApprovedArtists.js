import React from "react";
import ArtistList from "../../components/ArtistList";
import { fetchApprovedArtists } from "../../features/artists/artistSlice";

function ApprovedArtists() {
  return (
    <div>
      ApprovedArtists
      <ArtistList fetchFunction={fetchApprovedArtists} />
    </div>
  );
}

export default ApprovedArtists;
