import React from 'react'
import {fetchOldArtists } from "../../features/artists/artistSlice";
import ArtistList from '../../components/ArtistList';
function OldArtists() {
  return (
    <div>OldArtists
      <ArtistList fetchFunction={fetchOldArtists}/>
    </div>
  )
}

export default OldArtists;