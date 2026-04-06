import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'Tribes',     path: '/tribes' },
  { label: 'Events',     path: '/events' },
  { label: 'Experience', path: '/experience' },
  { label: 'Gallery',    path: '/gallery' },
  { label: 'Tickets',    path: '/tickets' },
  { label: 'Location',   path: '/location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      {/* LOGO */}
      <Link to="/" className="navbar__logo">
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <path d="M14 2C12 6 8 8 5 12C3 15 4 20 7 22C6 19 8 16 10 17C9 20 11 23 14 24C17 23 19 20 18 17C20 16 22 19 21 22C24 20 25 15 23 12C20 8 16 6 14 2Z" fill="#C4820A" opacity="0.9"/>
          <path d="M18 6C20 5 22 6 23 5C22 7 20 8 19 7Z" fill="#E8A020"/>
          <circle cx="22" cy="5" r="2" fill="#E8A020"/>
        </svg>
        <span>Hornbill</span>
      </Link>

      {/* DESKTOP LINKS */}
      <ul className="navbar__links">
        {NAV_LINKS.map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className={`navbar__link ${location.pathname === path ? 'navbar__link--active' : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* DESKTOP ACTIONS */}
      <div className="navbar__desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {user && (
          <button 
            className="navbar__link" 
            onClick={signOut}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none' }}
          >
            Sign Out
          </button>
        )}
        <Link to="/tickets" className="navbar__cta">
          Book Now
        </Link>
      </div>

      {/* HAMBURGER */}
      <button
        className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* MOBILE DRAWER */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        <div className="navbar__drawer-pattern" />
        <ul className="navbar__drawer-links">
          {NAV_LINKS.map(({ label, path }, i) => (
            <li key={path}>
              <Link
                to={path}
                className={`navbar__drawer-link ${location.pathname === path ? 'navbar__drawer-link--active' : ''}`}
              >
                <span className="navbar__drawer-num">{String(i + 1).padStart(2, '0')}</span>
                {label}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <button
                className="navbar__drawer-link"
                onClick={() => { signOut(); setMenuOpen(false); }}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', outline: 'none' }}
              >
                <span className="navbar__drawer-num">{String(NAV_LINKS.length + 1).padStart(2, '0')}</span>
                SIGN OUT
              </button>
            </li>
          )}
        </ul>
        <div className="navbar__drawer-footer">
          <span>Dec 1–10 · Kisama Village · Nagaland</span>
        </div>
      </div>
    </nav>
  );
}
