import React from 'react'
import ArtistList from '../../components/ArtistList'
import { fetchPendingArtists } from '../../features/artists/artistSlice'

function PendingArtists() {
  return (
    <div>PendingArtists
      <ArtistList fetchFunction={fetchPendingArtists}/>
    </div>
  )
}

export default PendingArtists