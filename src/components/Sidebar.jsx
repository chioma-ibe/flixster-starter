import React from 'react';
import '../Sidebar.css';

function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Flixster Menu</h2>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          <li
            className={`sidebar-nav-item ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => setActivePage('home')}
          >
            Home
          </li>
          <li
            className={`sidebar-nav-item ${activePage === 'favorites' ? 'active' : ''}`}
            onClick={() => setActivePage('favorites')}
          >
            Favorites
          </li>
          <li
            className={`sidebar-nav-item ${activePage === 'watched' ? 'active' : ''}`}
            onClick={() => setActivePage('watched')}
          >
            Watched
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
