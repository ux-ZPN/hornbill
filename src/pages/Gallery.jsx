import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Gallery.css';

const GALLERY_ITEMS = [
  { id:1, cat:'warriors', title:'Angami Warrior Dance',     aspect:'tall',  url:'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=600' },
  { id:2, cat:'tribes',   title:'Konyak Tattoo Elder',      aspect:'wide',  url:'https://images.unsplash.com/photo-1623057000739-386c80b24d78?q=80&w=800' },
  { id:3, cat:'craft',    title:'Lotha Weaving Loom',       aspect:'sq',    url:'https://images.unsplash.com/photo-1511119255263-053472be9dd9?q=80&w=600' },
  { id:4, cat:'warriors', title:'Chang Headdress Parade',   aspect:'wide',  url:'https://images.unsplash.com/photo-1516281075359-709088f117c7?q=80&w=800' },
  { id:5, cat:'nature',   title:'Kisama Hills at Dawn',     aspect:'wide',  url:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800' },
  { id:6, cat:'craft',    title:'Naga Hornbill Carving',    aspect:'sq',    url:'https://images.unsplash.com/photo-1590424753042-32007f35d51d?q=80&w=600' },
  { id:7, cat:'tribes',   title:'Ao Moatsu Festival Fire',  aspect:'tall',  url:'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600' },
  { id:8, cat:'food',     title:'Naga Feast Spread',        aspect:'wide',  url:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800' },
  { id:9, cat:'warriors', title:'Sumi Warrior Regalia',     aspect:'sq',    url:'https://images.unsplash.com/photo-1581093450021-4a7360e9a6ad?q=80&w=600' },
  { id:10,cat:'nature',   title:'Kohima Sunrise Mist',      aspect:'tall',  url:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600' },
  { id:11,cat:'craft',    title:'Beadwork & Necklaces',     aspect:'sq',    url:'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=600' },
  { id:12,cat:'tribes',   title:'Rengma Elder Portrait',    aspect:'wide',  url:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800' },
];

const CATS = ['all','warriors','tribes','craft','food','nature'];

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
              <img src={item.url} alt={item.title} className="gallery-tile__img" />
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
              <img src={current.url} alt={current.title} />
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
