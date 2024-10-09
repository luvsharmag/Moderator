import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onArtistClick }) => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="#" onClick={onArtistClick}>
              Artists
            </NavLink>
          </li>
          <li>
            <NavLink to="/brand">
              Brands
            </NavLink>
          </li>
          <li>
            <NavLink to="/proposal">
              Proposal
            </NavLink>
          </li>
          <li>
            <NavLink to="/payment">
              Payment
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports">
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
