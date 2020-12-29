import React from 'react';
import { FiArrowLeft, FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

interface SidebarProps {
  isDashboardPage?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isDashboardPage = false }) => {
  const { goBack } = useHistory();
  const { signOut } = useAuth();

  return (
    <aside className="sidebar">
      <img className="logo" src={mapMarkerImg} alt="Happy" />

      {isDashboardPage && (
        <div className="menu-items-container">
          <Link to="/registered-orphanages">
            <button>
              <FiMapPin />
            </button>
          </Link>
          <Link to="/pending-entries">
            <button>
              <FiAlertCircle />
            </button>
          </Link>
        </div>
      )}

      <footer>
        {isDashboardPage ? (
          <button type="button" onClick={signOut}>
            <FiPower size={24} color="#FFF" />
          </button>
        ) : (
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        )}
      </footer>
    </aside>
  );
};

export default Sidebar;
