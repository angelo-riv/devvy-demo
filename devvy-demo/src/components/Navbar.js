import { useState } from 'react';
import { Home, Search, Calendar, User } from 'lucide-react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`navbar ${darkMode ? 'dark' : 'light'}`}>
      <div className="navbar-left">
        <img src="/newlogo2.png" alt="Logo" className="nav-logo" />
        <h1 className="nav-title">
            Devvy
        </h1>

        <nav className="nav-links">
          <div className = "nav-item">
            <Home size={16} className="nav-icon" /> Home
          </div>
          <div className = "nav-item">
            <Search size={16} className="nav-icon" /> Problems
          </div>
          <div className = "nav-item">
            <Search size={16} className="nav-icon" /> Explore
          </div>
          <div className = "nav-item">
            <Calendar size={16} className="nav-icon" /> Events
          </div>
            
        </nav>
      </div>

      <div className="navbar-right">
          <div className = "nav-item">
            <User size={16} className="nav-icon" /> Profile
          </div>
      </div>
    </div>
  );
};

export default Navbar;