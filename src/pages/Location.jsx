import { useReveal } from '../hooks/useReveal';
import './Location.css';

const TRAVEL_OPTIONS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C12 4 6 10 6 18C6 24 10 28 16 28C22 28 26 24 26 18C26 10 20 4 16 4Z" stroke="#C4820A" strokeWidth="1.5" fill="none"/>
        <circle cx="16" cy="18" r="3" fill="#C4820A"/>
        <line x1="16" y1="4" x2="16" y2="8" stroke="#C4820A" strokeWidth="1.5"/>
        <line x1="24" y1="10" x2="21" y2="13" stroke="#C4820A" strokeWidth="1" strokeOpacity="0.5"/>
      </svg>
    ),
    mode: 'By Air',
    primary: 'Dimapur Airport (DIM)',
    detail: '74 km from Kisama. Daily flights from Delhi (2h 30m), Kolkata (1h 15m), and Guwahati (45m). Taxis and shared vehicles to Kohima cost ₹600–800. Journey takes 2–2.5 hours on NH-29.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="12" width="24" height="12" rx="2" stroke="#C4820A" strokeWidth="1.5" fill="none"/>
        <rect x="8" y="8" width="16" height="4" stroke="#C4820A" strokeWidth="1" fill="none"/>
        <circle cx="10" cy="26" r="3" stroke="#C4820A" strokeWidth="1.5" fill="none"/>
        <circle cx="22" cy="26" r="3" stroke="#C4820A" strokeWidth="1.5" fill="none"/>
        <line x1="13" y1="16" x2="13" y2="24" stroke="#C4820A" strokeWidth="1" strokeOpacity="0.4"/>
        <line x1="19" y1="16" x2="19" y2="24" stroke="#C4820A" strokeWidth="1" strokeOpacity="0.4"/>
      </svg>
    ),
    mode: 'By Bus',
    primary: 'From Dimapur or Guwahati',
    detail: 'State transport buses run from Dimapur bus stand to Kohima regularly (₹120–250). Private buses also operate from Guwahati (overnight, ~9 hours). Festival shuttle buses run from Kohima to Kisama every 30 minutes during the festival.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="#C4820A" strokeWidth="1.5" fill="none"/>
        <path d="M16 5C16 5 22 10 22 16C22 22 16 27 16 27" stroke="#C4820A" strokeWidth="1" strokeOpacity="0.5"/>
        <line x1="5" y1="16" x2="27" y2="16" stroke="#C4820A" strokeWidth="1" strokeOpacity="0.4"/>
        <line x1="7" y1="10" x2="25" y2="10" stroke="#C4820A" strokeWidth="0.8" strokeOpacity="0.3"/>
        <line x1="7" y1="22" x2="25" y2="22" stroke="#C4820A" strokeWidth="0.8" strokeOpacity="0.3"/>
      </svg>
    ),
    mode: 'By Road',
    primary: 'Self-drive via NH-29',
    detail: 'Dimapur to Kohima via NH-29 (74 km, 2–3 hours depending on traffic). Kisama is 12 km from Kohima town on the Kohima–Imphal highway. Signposting during the festival is clear. Free parking available at the venue.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 24L6 10L16 6L26 10L26 24" stroke="#C4820A" strokeWidth="1.5" fill="none"/>
        <rect x="12" y="16" width="8" height="8" stroke="#C4820A" strokeWidth="1" fill="none"/>
        <line x1="10" y1="14" x2="22" y2="14" stroke="#C4820A" strokeWidth="0.8" strokeOpacity="0.4"/>
        <line x1="6" y1="10" x2="26" y2="10" stroke="#C4820A" strokeWidth="0.8" strokeOpacity="0.3"/>
      </svg>
    ),
    mode: 'Accommodation',
    primary: 'Kohima Town (12 km away)',
    detail: 'Hotels, guesthouses, and homestays cluster around Kohima town. Festival period gets fully booked — reserve at least 3 months ahead. The Tourism Department also operates festival camps at Kisama during Dec 1–10.',
  },
];

const ESSENTIALS = [
  { label: 'Inner Line Permit', detail: 'Required for all non-Nagaland Indian nationals. Apply online at nagaland.gov.in/ilp or obtain at the state borders. Processing time: 1–3 days online.', warn: true },
  { label: 'Protected Area Permit', detail: 'Required for foreign nationals. Apply through the Ministry of Home Affairs or Nagaland government portals. Allow 5–7 days.', warn: true },
  { label: 'Best Time to Visit', detail: 'December 1–10 for the Hornbill Festival. Temperature: 8–18°C. Pack warm layers for evenings. Daylight hours are good — venue opens at 8 AM, events run till 10 PM.' },
  { label: 'Currency & ATMs', detail: 'Cash is king in Kisama. ATMs available in Kohima town. UPI payments accepted at most stalls during the festival but carry backup cash.' },
  { label: 'Medical & Safety', detail: 'A first aid centre operates on-site throughout the festival. Kohima Civil Hospital is 14 km away. Mobile signal is generally strong (Airtel, Jio, BSNL).' },
  { label: 'Photography Tips', detail: 'Golden hour at Kisama is exceptional — arrive early on Dec 1 for the morning mist. Tribal elders appreciate being asked before close-up portrait photography.' },
];

export default function Location() {
  useReveal();

  return (
    <div className="location-page">

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background:'radial-gradient(ellipse at 40% 60%, #1A2E1A 0%, #0F0A06 65%)' }}/>
        <div style={{ position:'relative', zIndex:1 }}>
          <div className="page-hero-eyebrow">Plan Your Visit</div>
          <h1 className="page-hero-title">Getting<br /><span>There</span></h1>
        </div>
      </div>

      <div className="pattern-band" />

      {/* MAP SECTION */}
      <section className="location-map-section reveal">
        <div className="location-map-content">
          <div className="section-tag">The Venue</div>
          <h2 className="location-map-title">Kisama Heritage Village</h2>
          <p className="location-map-desc">Kisama sits 12 km south of Kohima on the Kohima–Imphal road, 1,444m above sea level, in the Naga hills of Nagaland. The Heritage Village was purpose-built to host the Hornbill Festival, with permanent tribal morung, a main performance stage, and open grounds ringed by forested hills.</p>
          <div className="location-coords">
            <div className="location-coord-item">
              <span className="location-coord-label">Latitude</span>
              <span className="location-coord-val">25.5289° N</span>
            </div>
            <div className="location-coord-item">
              <span className="location-coord-label">Longitude</span>
              <span className="location-coord-val">94.0549° E</span>
            </div>
            <div className="location-coord-item">
              <span className="location-coord-label">Elevation</span>
              <span className="location-coord-val">1,444 m</span>
            </div>
          </div>
        </div>

        {/* SVG MAP */}
        <div className="location-map-visual">
          <svg width="100%" height="100%" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice">
            {/* Background */}
            <rect width="600" height="420" fill="#0D150D"/>
            {/* Terrain contour lines */}
            {[
              "M0 300 Q80 260 160 280 Q240 300 320 270 Q400 240 480 260 Q540 270 600 255",
              "M0 320 Q90 280 180 300 Q260 318 340 290 Q420 262 500 278 Q560 288 600 275",
              "M0 340 Q100 310 200 330 Q290 348 370 318 Q450 288 530 305 Q570 314 600 300",
              "M0 360 Q110 340 210 356 Q300 370 380 345 Q460 320 540 335 Q575 342 600 330",
              "M0 380 Q120 368 230 378 Q320 388 400 368 Q475 348 560 362 Q582 368 600 360",
            ].map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#1A4020" strokeWidth="1" opacity={0.5 + i * 0.08}/>
            ))}
            {/* Hills fill */}
            <path d="M0 290 Q80 250 160 270 Q240 290 320 258 Q400 228 480 248 Q540 258 600 242 L600 420 L0 420Z" fill="#152518" opacity="0.8"/>
            {/* Roads */}
            {/* NH-29 main road */}
            <path d="M50 390 Q100 360 160 320 Q200 295 240 290 Q280 285 320 270 Q380 248 440 230" fill="none" stroke="#C4820A" strokeWidth="2.5" strokeDasharray="8 3"/>
            {/* Side road to Kisama */}
            <path d="M310 270 Q315 295 312 330 Q310 355 308 380" fill="none" stroke="#E8A020" strokeWidth="1.5" strokeDasharray="5 3"/>
            {/* Kisama Marker */}
            <circle cx="312" cy="330" r="10" fill="#C4820A" opacity="0.9"/>
            <circle cx="312" cy="330" r="18" stroke="#C4820A" strokeWidth="1" fill="none" opacity="0.5"/>
            <circle cx="312" cy="330" r="28" stroke="#C4820A" strokeWidth="0.5" fill="none" opacity="0.25"/>
            {/* Pulse ring animation — static */}
            <circle cx="312" cy="330" r="38" stroke="#C4820A" strokeWidth="0.3" fill="none" opacity="0.12"/>
            {/* Kisama label */}
            <rect x="328" y="318" width="128" height="24" rx="2" fill="rgba(10,6,3,0.88)"/>
            <text x="336" y="333" fill="#E8A020" fontSize="11" fontFamily="monospace" letterSpacing="1">KISAMA VILLAGE</text>
            {/* Kohima marker */}
            <circle cx="160" cy="320" r="6" fill="#8B1A1A" opacity="0.8"/>
            <rect x="170" y="311" width="78" height="20" rx="2" fill="rgba(10,6,3,0.8)"/>
            <text x="176" y="324" fill="#D4C4A0" fontSize="10" fontFamily="monospace" letterSpacing="0.5" opacity="0.8">KOHIMA</text>
            {/* Dimapur marker */}
            <circle cx="50" cy="388" r="5" fill="#4A90B8" opacity="0.7"/>
            <rect x="58" y="380" width="80" height="18" rx="2" fill="rgba(10,6,3,0.8)"/>
            <text x="64" y="392" fill="#D4C4A0" fontSize="9" fontFamily="monospace" opacity="0.7">DIMAPUR</text>
            {/* Distance labels */}
            <text x="190" y="310" fill="#C4820A" fontSize="9" fontFamily="monospace" opacity="0.6">12 km</text>
            <text x="90" y="355" fill="#C4820A" fontSize="9" fontFamily="monospace" opacity="0.5">74 km ↙</text>
            {/* NH-29 label */}
            <rect x="340" y="248" width="48" height="16" rx="2" fill="rgba(196,130,10,0.15)" stroke="#C4820A" strokeWidth="0.5"/>
            <text x="347" y="259" fill="#C4820A" fontSize="9" fontFamily="monospace">NH-29</text>
            {/* Trees around Kisama */}
            {[[275,290],[295,305],[330,300],[355,320],[280,335],[340,345]].map(([x,y],i) => (
              <g key={i}>
                <rect x={x-1} y={y} width="2" height="10" fill="#1A4020" opacity="0.7"/>
                <polygon points={`${x},${y-10} ${x-6},${y+2} ${x+6},${y+2}`} fill="#1A4020" opacity="0.8"/>
              </g>
            ))}
            {/* Compass */}
            <g transform="translate(560,40)">
              <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(196,130,10,0.3)" strokeWidth="1"/>
              <path d="M0,-14 L3,0 L0,6 L-3,0Z" fill="#C4820A" opacity="0.7"/>
              <path d="M0,14 L3,0 L0,-6 L-3,0Z" fill="rgba(196,130,10,0.3)"/>
              <text x="0" y="-18" fill="#C4820A" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.7">N</text>
            </g>
            {/* Legend */}
            <rect x="10" y="10" width="150" height="70" rx="2" fill="rgba(10,6,3,0.75)"/>
            <line x1="18" y1="28" x2="42" y2="28" stroke="#C4820A" strokeWidth="2.5" strokeDasharray="8 3"/>
            <text x="48" y="32" fill="#D4C4A0" fontSize="9" fontFamily="monospace" opacity="0.7">NH-29</text>
            <line x1="18" y1="45" x2="42" y2="45" stroke="#E8A020" strokeWidth="1.5" strokeDasharray="5 3"/>
            <text x="48" y="49" fill="#D4C4A0" fontSize="9" fontFamily="monospace" opacity="0.7">Local road</text>
            <circle cx="25" cy="62" r="5" fill="#C4820A"/>
            <text x="36" y="66" fill="#D4C4A0" fontSize="9" fontFamily="monospace" opacity="0.7">Festival venue</text>
          </svg>
        </div>
      </section>

      <div className="pattern-band" />

      {/* HOW TO GET THERE */}
      <section className="location-travel reveal">
        <div className="section-tag" style={{ padding:'3rem 3rem 0' }}>Getting Here</div>
        <div className="travel-grid">
          {TRAVEL_OPTIONS.map(t => (
            <div key={t.mode} className="travel-card reveal">
              <div className="travel-card__icon">{t.icon}</div>
              <div className="travel-card__mode">{t.mode}</div>
              <div className="travel-card__primary">{t.primary}</div>
              <p className="travel-card__detail">{t.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pattern-band" />

      {/* ESSENTIALS */}
      <section className="location-essentials">
        <div className="essentials-inner reveal">
          <div className="section-tag">Visitor Essentials</div>
          <h2 className="essentials-title">Before You Go</h2>
        </div>
        <div className="essentials-grid">
          {ESSENTIALS.map(e => (
            <div key={e.label} className={`essential-card reveal ${e.warn ? 'essential-card--warn' : ''}`}>
              {e.warn && (
                <div className="essential-card__warn-badge">Required</div>
              )}
              <h4 className="essential-card__label">{e.label}</h4>
              <p className="essential-card__detail">{e.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
