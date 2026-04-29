import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Gallery.css';

/* Each "image" is a richly rendered SVG tile representing a real scene */
const GALLERY_ITEMS = [
  { id:1, cat:'warriors', title:'Angami Warrior Dance',     aspect:'tall',  hue:'#C4820A', shape:'warrior' },
  { id:2, cat:'tribes',   title:'Konyak Tattoo Elder',      aspect:'wide',  hue:'#4A90B8', shape:'elder' },
  { id:3, cat:'craft',    title:'Lotha Weaving Loom',       aspect:'sq',    hue:'#2D6B4A', shape:'weave' },
  { id:4, cat:'warriors', title:'Chang Headdress Parade',   aspect:'wide',  hue:'#8B1A1A', shape:'parade' },
  { id:5, cat:'nature',   title:'Kisama Hills at Dawn',     aspect:'wide',  hue:'#1A2E1A', shape:'hills' },
  { id:6, cat:'craft',    title:'Naga Hornbill Carving',    aspect:'sq',    hue:'#A06030', shape:'carve' },
  { id:7, cat:'tribes',   title:'Ao Moatsu Festival Fire',  aspect:'tall',  hue:'#C46080', shape:'fire' },
  { id:8, cat:'food',     title:'Naga Feast Spread',        aspect:'wide',  hue:'#8B4513', shape:'feast' },
  { id:9, cat:'warriors', title:'Sumi Warrior Regalia',     aspect:'sq',    hue:'#C46080', shape:'regalia' },
  { id:10,cat:'nature',   title:'Kohima Sunrise Mist',      aspect:'tall',  hue:'#1A3A5C', shape:'mist' },
  { id:11,cat:'craft',    title:'Beadwork & Necklaces',     aspect:'sq',    hue:'#7B2D8B', shape:'beads' },
  { id:12,cat:'tribes',   title:'Rengma Elder Portrait',    aspect:'wide',  hue:'#D48030', shape:'elder2' },
];

const CATS = ['all','warriors','tribes','craft','food','nature'];

/* SVG tile renderer — each shape type produces a unique illustration */
function GalleryTile({ item }) {
  const { hue, shape, title } = item;
  const dark = hue + '22';

  const shapes = {
    warrior: (
      <>
        <rect width="100%" height="100%" fill={dark}/>
        {/* Sky gradient */}
        <ellipse cx="50%" cy="30%" rx="60%" ry="40%" fill={hue} opacity="0.08"/>
        {/* Warrior silhouette */}
        <g transform="translate(50%,55%)" fill={hue}>
          <ellipse cx="0" cy="-60" rx="14" ry="16" opacity="0.9"/>
          {/* Headdress */}
          <path d="M-16,-76 Q-8,-110 0,-120 Q8,-110 16,-76Z" opacity="0.8"/>
          <path d="M-24,-72 Q-16,-100 -8,-108 Q-4,-95 -8,-76Z" opacity="0.6"/>
          <path d="M24,-72 Q16,-100 8,-108 Q4,-95 8,-76Z" opacity="0.6"/>
          {/* Body */}
          <rect x="-10" y="-44" width="20" height="40" rx="4" opacity="0.85"/>
          {/* Spear */}
          <rect x="16" y="-90" width="2" height="100" opacity="0.7"/>
          <polygon points="17,-90 21,-78 13,-78" opacity="0.9"/>
          {/* Legs */}
          <rect x="-9" y="-4" width="7" height="30" rx="2" opacity="0.8"/>
          <rect x="2"  y="-4" width="7" height="30" rx="2" opacity="0.8"/>
        </g>
        {/* Ground line */}
        <line x1="0" y1="88%" x2="100%" y2="88%" stroke={hue} strokeWidth="1" strokeOpacity="0.3"/>
      </>
    ),
    elder: (
      <>
        <rect width="100%" height="100%" fill={dark}/>
        <ellipse cx="50%" cy="38%" rx="22%" ry="28%" fill={hue} opacity="0.15"/>
        {/* Face */}
        <circle cx="50%" cy="35%" r="18%" fill={hue} opacity="0.7"/>
        {/* Tattoo lines */}
        {[-3,-1,1,3].map((y,i) => <line key={i} x1="30%" y1={`${35+y}%`} x2="70%" y2={`${35+y}%`} stroke="#0F0A06" strokeWidth="1.5" strokeOpacity="0.5"/>)}
        {/* Necklace */}
        <ellipse cx="50%" cy="58%" rx="22%" ry="6%" fill="none" stroke={hue} strokeWidth="3" opacity="0.6"/>
        {/* Bead dots */}
        {Array.from({length:12}).map((_,i) => {
          const angle = (i/12)*Math.PI*2;
          return <circle key={i} cx={`${50+22*Math.cos(angle)}%`} cy={`${58+6*Math.sin(angle)}%`} r="2%" fill={hue} opacity="0.8"/>;
        })}
      </>
    ),
    weave: (
      <>
        <rect width="100%" height="100%" fill={dark}/>
        <defs>
          <pattern id={`wv${item.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="transparent"/>
            <rect x="0" y="8" width="20" height="4" fill={hue} opacity="0.5"/>
            <rect x="8" y="0" width="4" height="20" fill="#8B1A1A" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#wv${item.id})`}/>
        <rect x="15%" y="15%" width="70%" height="70%" fill="none" stroke={hue} strokeWidth="2" opacity="0.4"/>
      </>
    ),
    parade: (
      <>
        <rect width="100%" height="100%" fill={dark}/>
        {[20,38,56,74].map((x,i) => (
          <g key={i} transform={`translate(${x}%,55%)`} fill={hue} opacity={0.5+i*0.12}>
            <ellipse cx="0" cy="-32" rx="8" ry="9"/>
            <path d="M-8,-41 Q0,-60 8,-41Z" opacity="0.7"/>
            <rect x="-5" y="-23" width="10" height="22" rx="2"/>
            <rect x="-4" y="-1" width="4" height="16" rx="1"/>
            <rect x="0"  y="-1" width="4" height="16" rx="1"/>
          </g>
        ))}
        <line x1="0" y1="85%" x2="100%" y2="85%" stroke={hue} strokeWidth="1" strokeOpacity="0.25"/>
      </>
    ),
    hills: (
      <>
        <rect width="100%" height="100%" fill="#0A0F08"/>
        <path d="M0,70% Q25%,40% 50%,55% Q75%,35% 100%,50% L100%,100% L0,100%Z" fill="#1A2E1A" opacity="0.9"/>
        <path d="M0,80% Q30%,60% 60%,70% Q80%,62% 100%,72% L100%,100% L0,100%Z" fill="#2A1810" opacity="0.8"/>
        <ellipse cx="50%" cy="25%" rx="12%" ry="8%" fill="#E8A020" opacity="0.15"/>
        <ellipse cx="50%" cy="28%" rx="30%" ry="12%" fill={hue} opacity="0.05"/>
        {/* Stars */}
        {[[15,20],[35,12],[65,18],[82,10],[90,25]].map(([x,y],i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r="1.2" fill="#F0E8D8" opacity="0.5"/>
        ))}
      </>
    ),
    carve: (
      <>
        <rect width="100%" height="100%" fill={dark}/>
        {/* Hornbill carved motif */}
        <g transform="translate(50%,50%)">
          <ellipse cx="0" cy="0" rx="25%" ry="35%" fill={hue} opacity="0.6"/>
          <ellipse cx="0" cy="-20%" rx="14%" ry="18%" fill={hue} opacity="0.8"/>
          <path d="M14%,-26% Q25%,-30% 28%,-22% Q24%,-16% 14%,-16%Z" fill={hue} opacity="0.7"/>
          <circle cx="23%" cy="-24%" r="3%" fill="#E8A020" opacity="0.9"/>
          <path d="M-8%,30% Q-10%,42% -12%,48% L-8%,48% Q-4%,42% 0,30%Z" fill={hue} opacity="0.6"/>
          <path d="M8%,34% Q10%,46% 8%,50% L12%,50% Q14%,46% 12%,34%Z" fill={hue} opacity="0.6"/>
        </g>
      </>
    ),
    fire: (
      <>
        <rect width="100%" height="100%" fill="#0A0604"/>
        {/* Flames */}
        {[[-20,0,0.6],[0,-15,1],[20,0,0.7],[-10,-8,0.5],[10,-5,0.8]].map(([dx,dy,op],i) => (
          <path key={i}
            d={`M${50+dx}% 78% Q${48+dx}% ${55+dy}% ${50+dx}% ${42+dy}% Q${52+dx}% ${55+dy}% ${50+dx}% 78%`}
            fill="#C4820A" opacity={op}
          />
        ))}
        <ellipse cx="50%" cy="80%" rx="18%" ry="4%" fill="#E8A020" opacity="0.35"/>
        {/* Silhouettes around fire */}
        {[20,35,65,80].map((x,i) => (
          <g key={i} transform={`translate(${x}%,76%)`} fill="#0A0604">
            <circle cx="0" cy="-22" r="5"/>
            <rect x="-4" y="-17" width="8" height="17" rx="2"/>
          </g>
        ))}
      </>
    ),
    feast: (
      <>
        <rect width="100%" height="100%" fill={dark}/>
        {/* Table */}
        <rect x="10%" y="55%" width="80%" height="8%" rx="2" fill={hue} opacity="0.4"/>
        {/* Dishes */}
        {[20,38,55,72].map((x,i) => (
          <g key={i}>
            <ellipse cx={`${x}%`} cy="55%" rx="7%" ry="3%" fill={hue} opacity={0.3+i*0.1}/>
            <ellipse cx={`${x}%`} cy="54%" rx="5%" ry="2.5%" fill="#E8A020" opacity="0.3"/>
          </g>
        ))}
        {/* Bamboo mugs */}
        {[28,62].map((x,i) => (
          <rect key={i} x={`${x-2}%`} y="46%" width="4%" height="10%" rx="1" fill={hue} opacity="0.6"/>
        ))}
        {/* Leaf decorations */}
        <path d="M5%,40% Q12%,20% 18%,42%" stroke="#2D6B4A" strokeWidth="2" fill="none" opacity="0.6"/>
        <path d="M82%,38% Q88%,18% 94%,40%" stroke="#2D6B4A" strokeWidth="2" fill="none" opacity="0.6"/>
      </>
    ),
    regalia: (
      <>
        <rect width="100%" height="100%" fill={dark}/>
        <g transform="translate(50%,52%)">
          {/* Feather crown */}
          {Array.from({length:9}).map((_,i) => {
            const angle = ((i-4)/4)*0.7;
            return <path key={i} d={`M0,-44 Q${Math.sin(angle)*18},-72 ${Math.sin(angle)*14},-90`} stroke={hue} strokeWidth="3" fill="none" opacity={0.4+Math.abs(i-4)*0.05}/>;
          })}
          {/* Head */}
          <ellipse cx="0" cy="-28" rx="13" ry="16" fill={hue} opacity="0.75"/>
          {/* Body shawl */}
          <path d="M-18,-12 Q-22,20 -14,40 L14,40 Q22,20 18,-12Z" fill={hue} opacity="0.5"/>
          {/* Beads */}
          <ellipse cx="0" cy="-8" rx="14" ry="4" fill="none" stroke={hue} strokeWidth="2.5" opacity="0.7"/>
        </g>
      </>
    ),
    mist: (
      <>
        <rect width="100%" height="100%" fill="#080C10"/>
        {/* Layered fog */}
        {[85,75,65,55].map((y,i) => (
          <ellipse key={i} cx="50%" cy={`${y}%`} rx="70%" ry={`${8+i*3}%`} fill="#1A3A5C" opacity={0.15-i*0.02}/>
        ))}
        <path d="M0,65% Q20%,45% 40%,60% Q60%,40% 80%,55% Q90%,48% 100%,58% L100%,100% L0,100%Z" fill="#1A2E1A" opacity="0.8"/>
        <path d="M0,78% Q30%,65% 60%,75% Q80%,68% 100%,76% L100%,100% L0,100%Z" fill="#2A1810" opacity="0.9"/>
        <ellipse cx="30%" cy="22%" rx="15%" ry="10%" fill="#E8C070" opacity="0.12"/>
        <ellipse cx="30%" cy="20%" rx="8%"  ry="5%"  fill="#E8C070" opacity="0.18"/>
      </>
    ),
    beads: (
      <>
        <rect width="100%" height="100%" fill={dark}/>
        {/* Necklace strands */}
        {[0,1,2].map(n => (
          <g key={n}>
            {Array.from({length:16}).map((_,i) => {
              const angle = (i/16)*Math.PI*2;
              const r = 22+n*10;
              return <circle key={i}
                cx={`${50+r*Math.cos(angle)}%`}
                cy={`${50+r*Math.sin(angle)*0.4}%`}
                r={3-n*0.5}
                fill={[hue,'#E8A020','#8B1A1A'][n]}
                opacity={0.9-n*0.1}
              />;
            })}
          </g>
        ))}
        <circle cx="50%" cy="50%" r="5%" fill={hue} opacity="0.25"/>
      </>
    ),
    elder2: (
      <>
        <rect width="100%" height="100%" fill={dark}/>
        <ellipse cx="50%" cy="38%" rx="20%" ry="24%" fill={hue} opacity="0.7"/>
        {/* Wrinkle lines */}
        {[-6,-3,0,3,6].map((y,i) => <line key={i} x1="34%" y1={`${36+y}%`} x2="66%" y2={`${37+y}%`} stroke="#0F0A06" strokeWidth="0.8" strokeOpacity="0.35"/>)}
        {/* Traditional hat */}
        <ellipse cx="50%" cy="18%" rx="24%" ry="6%" fill={hue} opacity="0.5"/>
        <path d="M28%,18% Q50%,4% 72%,18% Q70%,22% 30%,22%Z" fill={hue} opacity="0.7"/>
        {/* Shawl */}
        <path d="M30%,60% Q50%,72% 70%,60% Q68%,90% 32%,90%Z" fill={hue} opacity="0.4"/>
        {/* Shawl pattern lines */}
        <line x1="32%" y1="68%" x2="68%" y2="68%" stroke="#0F0A06" strokeWidth="2" strokeOpacity="0.3"/>
        <line x1="34%" y1="76%" x2="66%" y2="76%" stroke="#0F0A06" strokeWidth="2" strokeOpacity="0.3"/>
      </>
    ),
  };

  return shapes[shape] || shapes.warrior;
}

export default function Gallery() {
  const [cat, setCat] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  useReveal([cat]);

  const filtered = cat === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.cat === cat);
  const current  = GALLERY_ITEMS.find(i => i.id === lightbox);

  const prev = () => {
    const idx = GALLERY_ITEMS.findIndex(i => i.id === lightbox);
    setLightbox(GALLERY_ITEMS[(idx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length].id);
  };
  const next = () => {
    const idx = GALLERY_ITEMS.findIndex(i => i.id === lightbox);
    setLightbox(GALLERY_ITEMS[(idx + 1) % GALLERY_ITEMS.length].id);
  };

  return (
    <div className="gallery-page">

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background:'radial-gradient(ellipse at 60% 50%, #1A2E1A 0%, #0F0A06 65%)' }}/>
        <div style={{ position:'relative', zIndex:1 }}>
          <div className="page-hero-eyebrow">Visual Archive</div>
          <h1 className="page-hero-title">Gallery</h1>
        </div>
      </div>

      <div className="pattern-band" />

      {/* FILTER */}
      <section className="gallery-section">
        <div className="gallery-filters reveal">
          {CATS.map(c => (
            <button key={c} className={`gallery-filter ${cat === c ? 'gallery-filter--active' : ''}`} onClick={() => setCat(c)}>
              {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {/* MASONRY GRID */}
        <div className="gallery-grid">
          {filtered.map(item => (
            <div
              key={item.id}
              className={`gallery-tile gallery-tile--${item.aspect} reveal`}
              onClick={() => setLightbox(item.id)}
            >
              <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                <GalleryTile item={item}/>
              </svg>
              <div className="gallery-tile__overlay">
                <span className="gallery-tile__title">{item.title}</span>
                <span className="gallery-tile__cat">{item.cat}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && current && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <div className="gallery-lightbox__inner" onClick={e => e.stopPropagation()}>
            <button className="gallery-lightbox__close" onClick={() => setLightbox(null)}>✕</button>
            <div className="gallery-lightbox__image">
              <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                <GalleryTile item={current}/>
              </svg>
            </div>
            <div className="gallery-lightbox__info">
              <div className="gallery-lightbox__cat">{current.cat}</div>
              <h3 className="gallery-lightbox__title">{current.title}</h3>
            </div>
            <div className="gallery-lightbox__nav">
              <button className="gallery-lightbox__btn" onClick={prev}>← Prev</button>
              <button className="gallery-lightbox__btn" onClick={next}>Next →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
