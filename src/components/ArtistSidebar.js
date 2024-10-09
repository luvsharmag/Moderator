// src/components/ArtistSidebar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const ArtistSidebar = ({ onBack }) => {
  return (
    <div className="sidebar">
      <button onClick={onBack} className="back-button">
        &lt; Back
      </button>
      <h2>Artist Management</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/artist/newArtist" activeClassName="active-link">
              New Artists
            </NavLink>
          </li>
          <li>
            <NavLink to="/artist/approved" activeClassName="active-link">
              Approved Artists
            </NavLink>
          </li>
          <li>
            <NavLink to="/artist/pending" activeClassName="active-link">
              Pending Artists
            </NavLink>
          </li>
          <li>
            <NavLink to="/artist/rejected" activeClassName="active-link">
              Rejected Artists
            </NavLink>
          </li>
          <li>
            <NavLink to="/artist/old" activeClassName="active-link">
              Old Artists
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ArtistSidebar;
