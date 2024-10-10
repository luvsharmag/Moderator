import React from 'react'
import ArtistList from '../../components/ArtistList'
import { fetchRejectedArtists } from '../../features/artists/artistSlice'

function RejectedArtists() {
  return (
    <div>RejectedArtists
      <ArtistList fetchFunction={fetchRejectedArtists}/>
    </div>
  )
}

export default RejectedArtists