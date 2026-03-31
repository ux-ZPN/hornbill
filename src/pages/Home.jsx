import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import './Home.css';

/* ─── Feather particle ─────────────────────────── */
function useFeathers(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const colors = ['#C4820A','#E8A020','#8B1A1A','#F5C842'];
    const spawn = () => {
      const f = document.createElement('div');
      f.className = 'home-feather';
      const c = colors[Math.floor(Math.random() * colors.length)];
      const dur = Math.random() * 6 + 4;
      f.style.cssText = `left:${Math.random()*100}%;background:${c};height:${Math.random()*14+4}px;animation-duration:${dur}s;animation-delay:${Math.random()*2}s`;
      container.appendChild(f);
      setTimeout(() => f.remove(), (dur + 2) * 1000);
    };
    const id = setInterval(spawn, 380);
    return () => clearInterval(id);
  }, [containerRef]);
}

/* ─── Countdown hook ───────────────────────────── */
function useCountdown(target) {
  const [time, setTime] = useState({ d:'---', h:'--', m:'--', s:'--' });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) { setTime({ d:'000', h:'00', m:'00', s:'00' }); return; }
      setTime({
        d: String(Math.floor(diff / 86400000)).padStart(3,'0'),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2,'0'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}


const MARQUEE_ITEMS = [
  'Warrior Dances','17 Naga Tribes','Traditional Music','Naga Cuisine',
  'Handicrafts','Heritage Village','Fire Rituals','Archery Contests',
];

const TRIBE_PREVIEWS = [
  { name: 'Angami', region: 'Kohima', color: '#C4820A', desc: 'Masters of terraced fields and warrior lore.' },
  { name: 'Ao',     region: 'Mokokchung', color: '#8B4513', desc: 'Rich oral tradition and the Moatsu harvest festival.' },
  { name: 'Lotha',  region: 'Wokha', color: '#2D6B4A', desc: 'Skilled weavers whose patterns tell ancestral stories.' },
  { name: 'Konyak', region: 'Mon', color: '#4A90B8', desc: 'Guardians of an extraordinary warrior tattoo culture.' },
];

export default function Home() {
  const heroRef = useRef(null);
  useFeathers(heroRef);
  useReveal();
  const time = useCountdown('2025-12-01T00:00:00+05:30');

  /* parallax hills */
  useEffect(() => {
    const onScroll = () => {
      const hills = document.querySelector('.home-hills');
      if (hills) hills.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="home">

      {/* ══ HERO ══════════════════════════════════ */}
      <section className="home-hero" ref={heroRef}>
        <div className="home-hero__bg" />

        {/* SVG Hills */}
        <svg className="home-hills" viewBox="0 0 1440 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A2E1A" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#0F0A06"/>
            </linearGradient>
            <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2A1810" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#0F0A06"/>
            </linearGradient>
          </defs>
          <path d="M0 280C100 220 200 180 350 200C500 220 600 160 720 150C840 140 950 180 1100 160C1250 140 1350 180 1440 200L1440 400L0 400Z" fill="url(#hg1)" opacity="0.6"/>
          <path d="M0 340C80 300 180 260 300 280C420 300 520 240 680 230C840 220 960 280 1100 260C1240 240 1360 290 1440 310L1440 400L0 400Z" fill="url(#hg2)"/>
          <g fill="#0F0A06" opacity="0.95">
            <rect x="60" y="300" width="4" height="50"/><polygon points="62,280 50,310 74,310"/><polygon points="62,265 52,295 72,295"/>
            <rect x="140" y="290" width="3" height="60"/><polygon points="141.5,268 131,300 152,300"/>
            <rect x="1340" y="295" width="4" height="55"/><polygon points="1342,273 1330,306 1354,306"/><polygon points="1342,258 1332,288 1352,288"/>
            <rect x="1390" y="305" width="3" height="45"/><polygon points="1391.5,283 1381,313 1402,313"/>
          </g>
          <ellipse cx="720" cy="234" rx="70" ry="22" fill="#C4820A" opacity="0.07"/>
          <ellipse cx="720" cy="234" rx="35" ry="11" fill="#E8A020" opacity="0.11"/>
        </svg>

        {/* Watermark hornbill */}
        <svg className="home-hero__watermark" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 50C180 80 140 100 100 130C80 145 50 160 40 190C30 220 60 240 80 230C70 260 90 280 120 270C130 300 160 310 190 290C200 310 220 320 240 300C260 280 250 260 270 250C300 240 320 210 310 180C300 150 270 140 260 120C240 90 220 60 200 50Z" fill="#C4820A"/>
          <path d="M200 50C220 30 240 20 260 30C280 40 290 70 270 90C260 80 250 70 240 80C250 60 230 55 200 50Z" fill="#C4820A"/>
          <circle cx="275" cy="55" r="12" fill="#E8A020"/>
          <path d="M190 290C180 340 160 370 150 390L155 390C170 370 195 340 205 290Z" fill="#C4820A" opacity="0.7"/>
          <path d="M240 300C245 350 250 375 245 390L250 390C258 375 255 350 248 300Z" fill="#C4820A" opacity="0.7"/>
        </svg>

        {/* Content */}
        <div className="home-hero__content">
          <div className="home-hero__eyebrow">Nagaland · India · Est. 2000</div>
          <h1 className="home-hero__title">
            Hornbill
            <span>Festival</span>
          </h1>
          <p className="home-hero__subtitle">Festival of Festivals — Where 17 Tribes Become One</p>
          <div className="home-hero__date">December 1–10, 2025 · Kisama Heritage Village</div>
          <div className="home-hero__actions">
            <Link to="/tickets" className="btn-solid">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1L15 8L8 15M1 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Attend the Festival
            </Link>
            <Link to="/tribes" className="btn-outline">Explore Tribes</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="home-hero__scroll">
          <span>Scroll</span>
          <div className="home-hero__scroll-line" />
        </div>
      </section>

      {/* ══ PATTERN ═══════════════════════════════ */}
      <div className="pattern-band" />

      {/* ══ MARQUEE ═══════════════════════════════ */}
      <div className="marquee-band">
        <div className="marquee-inner">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="marquee-item">
              <div className="marquee-dot" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ══ COUNTDOWN ═════════════════════════════ */}
      <section className="home-countdown">
        <div className="home-countdown__label">Next Festival Begins In</div>
        <div className="home-countdown__row">
          {[['Days', time.d], ['Hours', time.h], ['Mins', time.m], ['Secs', time.s]].map(([unit, val], i) => (
            <div key={unit} className="home-countdown__wrap">
              {i > 0 && <div className="home-countdown__sep">:</div>}
              <div className="home-countdown__item">
                <div className="home-countdown__num">{val}</div>
                <div className="home-countdown__unit">{unit}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pattern-band" />

      {/* ══ ABOUT TEASER ══════════════════════════ */}
      <section className="home-about">
        <div className="home-about__visual">
          <svg width="100%" height="100%" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="600" fill="#2A1810"/>
            <defs>
              <pattern id="naga-weave" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="#2A1810"/>
                <rect x="0" y="18" width="40" height="4" fill="#C4820A" opacity="0.55"/>
                <rect x="18" y="0" width="4" height="40" fill="#C4820A" opacity="0.55"/>
                <rect x="8"  y="8"  width="4" height="4" fill="#8B1A1A" opacity="0.75"/>
                <rect x="28" y="8"  width="4" height="4" fill="#8B1A1A" opacity="0.75"/>
                <rect x="8"  y="28" width="4" height="4" fill="#8B1A1A" opacity="0.75"/>
                <rect x="28" y="28" width="4" height="4" fill="#8B1A1A" opacity="0.75"/>
                <polygon points="20,2 24,8 20,14 16,8" fill="#E8A020" opacity="0.35"/>
              </pattern>
              <linearGradient id="ov" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2A1810" stopOpacity="0"/>
                <stop offset="75%" stopColor="#2A1810" stopOpacity="0"/>
                <stop offset="100%" stopColor="#2A1810" stopOpacity="0.75"/>
              </linearGradient>
            </defs>
            <rect width="500" height="600" fill="url(#naga-weave)"/>
            {/* Hornbill silhouette */}
            <g transform="translate(60,80)" opacity="0.22">
              <ellipse cx="170" cy="200" rx="100" ry="150" fill="#C4820A"/>
              <ellipse cx="170" cy="95" rx="50" ry="70" fill="#C4820A"/>
              <path d="M195 75Q230 55 252 68Q242 90 210 95Z" fill="#C4820A"/>
              <circle cx="237" cy="66" r="10" fill="#E8A020"/>
              <path d="M130 340Q110 400 100 430L110 430Q125 400 145 340Z" fill="#C4820A"/>
              <path d="M200 340Q206 400 200 430L210 430Q218 400 212 340Z" fill="#C4820A"/>
            </g>
            {/* Mithun silhouette */}
            <g transform="translate(250,370)" opacity="0.13">
              <ellipse cx="80" cy="60" rx="80" ry="50" fill="#C4820A"/>
              <ellipse cx="80" cy="30" rx="35" ry="30" fill="#C4820A"/>
              <path d="M50 15Q40 5 45 0Q55 8 55 15Z" fill="#C4820A"/>
              <path d="M95 15Q105 0 115 5Q110 12 100 15Z" fill="#C4820A"/>
              {[30,60,90,120].map(x => <rect key={x} x={x} y="90" width="12" height="40" fill="#C4820A"/>)}
            </g>
            <rect x="0" y="0" width="8" height="600" fill="#C4820A" opacity="0.45"/>
            <rect x="492" y="0" width="8" height="600" fill="#C4820A" opacity="0.45"/>
            <rect x="0" y="0" width="500" height="8" fill="#8B1A1A" opacity="0.55"/>
            <rect x="0" y="592" width="500" height="8" fill="#8B1A1A" opacity="0.55"/>
            <rect width="500" height="600" fill="url(#ov)"/>
          </svg>
        </div>
        <div className="home-about__content reveal">
          <div className="section-tag">About the Festival</div>
          <h2 className="home-about__title">Where Ancient Cultures Rise Again</h2>
          <p className="home-about__text">Held every December in Kisama Heritage Village, the Hornbill Festival is a ten-day celebration where all 17 Naga tribes converge — singing, dancing, feasting, and competing in traditions passed down through centuries.</p>
          <p className="home-about__text">Named after the Great Indian Hornbill — a sacred bird woven into Naga mythology, headgear, and warrior lore — it is the most important cultural showcase of the Northeast.</p>
          <div className="home-about__stats">
            {[['17','Naga Tribes'],['10','Days of Celebration'],['25+','Years of Heritage']].map(([n, l]) => (
              <div key={l} className="home-about__stat">
                <span className="home-about__stat-num">{n}</span>
                <span className="home-about__stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pattern-band" />

      {/* ══ TRIBE PREVIEW ═════════════════════════ */}
      <section className="home-tribes">
        <div className="home-tribes__header reveal">
          <div className="section-tag" style={{ justifyContent: 'center' }}>The People</div>
          <h2 className="home-tribes__title">17 Tribes, One Spirit</h2>
        </div>
        <div className="home-tribes__grid">
          {TRIBE_PREVIEWS.map(t => (
            <div key={t.name} className="home-tribe-card reveal" style={{ '--tc': t.color }}>
              <div className="home-tribe-card__color-bar" />
              <h3 className="home-tribe-card__name">{t.name}</h3>
              <div className="home-tribe-card__region">{t.region}</div>
              <p className="home-tribe-card__desc">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="home-tribes__cta reveal">
          <Link to="/tribes" className="btn-outline">Meet All 17 Tribes →</Link>
        </div>
      </section>

      <div className="pattern-band" />

      {/* ══ QUICK LINKS GRID ══════════════════════ */}
      <section className="home-quicklinks">
        {[
          { label: 'Events',     sub: 'Full programme', path: '/events',     bg: '#1A2E1A' },
          { label: 'Experience', sub: 'What awaits you', path: '/experience', bg: '#2A1810' },
          { label: 'Gallery',    sub: 'See the festival', path: '/gallery',   bg: '#1A1A2E' },
          { label: 'Location',   sub: 'How to get there', path: '/location',  bg: '#1A2420' },
        ].map(({ label, sub, path, bg }) => (
          <Link key={path} to={path} className="home-quicklink" style={{ background: bg }}>
            <span className="home-quicklink__label">{label}</span>
            <span className="home-quicklink__sub">{sub}</span>
            <span className="home-quicklink__arrow">→</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
