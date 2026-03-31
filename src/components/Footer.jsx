import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">

        <div className="footer__brand-col">
          <div className="footer__brand">Hornbill Festival</div>
          <p className="footer__tagline">
            The Festival of Festivals.<br />
            Where 17 tribes rise as one<br />
            every December in Nagaland.
          </p>
          <div className="footer__social">
            {['FB', 'IG', 'TW', 'YT'].map(s => (
              <a key={s} href="#" className="footer__social-btn">{s}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="footer__col-head">Navigate</h4>
          <ul className="footer__links">
            {[['Home','/'],['The Tribes','/tribes'],['Events','/events'],['Experience','/experience']].map(([label, path]) => (
              <li key={path}><Link to={path} className="footer__link">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer__col-head">Plan</h4>
          <ul className="footer__links">
            {[['Gallery','/gallery'],['Buy Tickets','/tickets'],['Getting Here','/location'],['Travel Guide','/location']].map(([label, path]) => (
              <li key={label}><Link to={path} className="footer__link">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer__col-head">Contact</h4>
          <ul className="footer__links">
            {['Media Enquiries','Stall Bookings','Tourism Dept.','Nagaland Govt.'].map(item => (
              <li key={item}><a href="#" className="footer__link">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pattern-band" style={{ margin: '2rem 0' }} />

      <div className="footer__bottom">
        <span className="footer__copy">© 2025 Hornbill Festival · Department of Tourism, Nagaland</span>
        <span className="footer__copy">Designed with reverence for Naga culture</span>
      </div>
    </footer>
  );
}
