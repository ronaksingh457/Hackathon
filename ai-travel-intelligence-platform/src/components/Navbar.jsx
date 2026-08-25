import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, UserCircle, Menu, X, Compass } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar({ overlay = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={`navbar${overlay ? " navbar-overlay" : ""}`}>
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark">
            <Compass size={20} strokeWidth={2.4} />
          </span>
          <span className="brand-text">
            <span className="brand-name">SAARTHI</span>
            <span className="brand-subtitle">Local Intelligence</span>
          </span>
        </Link>

        <nav className="navbar-links desktop-only" aria-label="Primary">
          <Link to="/">Home</Link>
          <a href="#featured">Explore</a>
          <a href="#about">About</a>
        </nav>

        <div className="navbar-actions">
          <button
            className="icon-button desktop-only"
            aria-label="Search destinations"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={19} />
          </button>
          <button className="icon-button desktop-only" aria-label="Current location">
            <MapPin size={19} />
          </button>
          <button className="icon-button desktop-only" aria-label="Profile and settings">
            <UserCircle size={19} />
          </button>
          <button
            className="icon-button mobile-only"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="navbar-search-panel desktop-only">
          <div className="navbar-search-inner">
            <SearchBar
              autoFocus
              compact
              onNavigate={() => setSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="mobile-menu">
          <SearchBar compact onNavigate={() => setMobileOpen(false)} />
          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <a href="#featured" onClick={() => setMobileOpen(false)}>Explore</a>
          <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
        </div>
      )}
    </header>
  );
}
