import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Tourist Info", href: "/tourist" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const active = LINKS.find(l => l.href === location.pathname)?.label || "";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <div className="texture-overlay" />
      <style>{`
        .nav-link {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #3D4A6B;
          text-decoration: none;
          position: relative;
          padding-bottom: 4px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1px;
          background: #C4603A;
          transition: width 0.3s ease, left 0.3s ease;
        }
        .nav-link:hover::after, .nav-link[data-active="true"]::after {
          width: 100%;
          left: 0;
        }
        
        .nav-wrapper {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 500;
          padding: 32px 6%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.4s ease, padding 0.4s ease;
        }
        .nav-wrapper.scrolled {
          background: rgba(245, 239, 224, 0.98);
          padding: 20px 6%;
          border-bottom: 1px solid rgba(61, 74, 107, 0.1);
        }

        .menu-overlay {
          position: fixed;
          inset: 0;
          background: #3D4A6B;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          clip-path: circle(0% at 95% 5%);
          transition: clip-path 0.7s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .menu-overlay.open {
          clip-path: circle(150% at 95% 5%);
        }
        
        @keyframes curveyText {
          0% { transform: translateY(20px); opacity: 0; clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
          100% { transform: translateY(0); opacity: 1; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }
        
        .menu-overlay a {
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-wrapper { padding: 20px 6%; }
        }
      `}</style>
      
      <nav className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: '#A83228', fontWeight: 600, lineHeight: 0.9, fontStyle: 'italic' }}>Hornbill</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.3em', color: '#3D4A6B' }}>NAGALAND</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ gap: '48px', alignItems: 'center' }} className="desktop-nav">
          {LINKS.map(l => (
            <Link key={l.label} to={l.href} className="nav-link" data-active={active === l.label}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Menu Toggler */}
        <button 
          onClick={() => setOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.2em', color: '#3D4A6B' }}
          className="menu-btn"
        >
          [ MENU ]
        </button>
      </nav>

      {/* Fullscreen Overlay */}
      <div className={`menu-overlay ${open ? 'open' : ''}`}>
        <button 
          onClick={() => setOpen(false)}
          style={{ position: 'absolute', top: '40px', right: '6%', background: 'none', border: 'none', color: '#F5EFE0', fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '0.2em', cursor: 'pointer' }}
        >
          [ CLOSE ]
        </button>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4vh' }}>
          {[{label: 'Home', href: '/'}, ...LINKS].map((l, i) => (
            <Link 
              key={l.label} 
              to={l.href} 
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(48px, 12vw, 110px)",
                color: active === l.label || (l.label==='Home' && active==='') ? "#E8B4A0" : "#F5EFE0",
                textDecoration: "none",
                fontStyle: "italic",
                transition: "color 0.3s ease",
                animation: open ? `curveyText 0.6s cubic-bezier(0.77, 0, 0.175, 1) ${0.1 + i*0.05}s both` : 'none'
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: '8%', fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#F7D99E', letterSpacing: '0.4em' }}>
          DEC 1–10 • KISAMA
        </div>
      </div>
    </>
  );
}
