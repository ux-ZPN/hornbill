import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Events.css';

const EVENTS = [
  { day:'01', month:'Dec', time:'10:00 AM', type:'ritual',  title:'Grand Opening Ceremony',         sub:'Chief Minister\'s Inauguration · Kisama Main Stage' },
  { day:'01', month:'Dec', time:'03:00 PM', type:'culture', title:'Heritage Village Inauguration',   sub:'All 17 Tribe Morung Opens · Heritage Ground' },
  { day:'02', month:'Dec', time:'09:00 AM', type:'culture', title:'Warrior Dance Showcase',          sub:'All 17 Tribes Perform · Open Grounds' },
  { day:'02', month:'Dec', time:'06:00 PM', type:'music',   title:'Traditional Folk Music Evening',  sub:'Log Drums & Bamboo Flute · Amphitheatre' },
  { day:'03', month:'Dec', time:'10:00 AM', type:'sport',   title:'Traditional Archery Tournament',  sub:'Inter-Tribe Competition · Archery Range' },
  { day:'03', month:'Dec', time:'04:00 PM', type:'culture', title:'Naga Cuisine Festival',           sub:'All-tribe cooking competition · Food Court' },
  { day:'04', month:'Dec', time:'09:00 AM', type:'culture', title:'Traditional Weaving Exhibition',  sub:'Master Weavers at Looms · Craft Village' },
  { day:'04', month:'Dec', time:'07:00 PM', type:'music',   title:'Fire & Drum Night',               sub:'Tribal percussion concert · Main Stage' },
  { day:'05', month:'Dec', time:'10:00 AM', type:'sport',   title:'Wrestling & Strength Games',      sub:'Inter-Tribe · Sports Ground' },
  { day:'05', month:'Dec', time:'05:00 PM', type:'culture', title:'Naga Headgear Display',           sub:'Headdress Exhibition · Heritage Gallery' },
  { day:'06', month:'Dec', time:'06:30 PM', type:'ritual',  title:'Fire of Unity Ceremony',          sub:'Ancient Fire Ritual · Sacred Grounds' },
  { day:'07', month:'Dec', time:'09:00 AM', type:'culture', title:'Morung Art Workshop',             sub:'Open to Visitors · Heritage Village' },
  { day:'07', month:'Dec', time:'07:00 PM', type:'music',   title:'Northeast Rock Concert',          sub:'Indie & Rock Bands · Main Stage' },
  { day:'08', month:'Dec', time:'10:00 AM', type:'sport',   title:'Spear-Throwing Contest',         sub:'Inter-Tribe · Open Ground' },
  { day:'08', month:'Dec', time:'07:00 PM', type:'music',   title:'Battle of Bands',                sub:'Northeast\'s Finest · Main Stage' },
  { day:'09', month:'Dec', time:'11:00 AM', type:'ritual',  title:'Sacred Naga Feast',              sub:'Community Ceremonial Meal · Heritage Ground' },
  { day:'09', month:'Dec', time:'06:00 PM', type:'culture', title:'Storytelling Night',             sub:'Tribal Elders · Firepit Stage' },
  { day:'10', month:'Dec', time:'05:00 PM', type:'ritual',  title:'Grand Closing Ceremony',         sub:'Cultural Finale & Fireworks · Kisama' },
];

const TABS = [
  { key:'all',     label:'All Events' },
  { key:'culture', label:'Culture' },
  { key:'music',   label:'Music' },
  { key:'ritual',  label:'Ritual' },
  { key:'sport',   label:'Sports' },
];

const BADGE_COLORS = {
  culture: '#C4820A',
  music:   '#4A90B8',
  ritual:  '#C46080',
  sport:   '#4CAF50',
};

export default function Events() {
  useReveal();
  const [tab, setTab] = useState('all');
  const filtered = tab === 'all' ? EVENTS : EVENTS.filter(e => e.type === tab);

  return (
    <div className="events-page">

      {/* PAGE HERO */}
      <div className="page-hero events-page__hero">
        <div className="page-hero-bg" />
        <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.06 }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="ep" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="#C4820A" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="1440" height="400" fill="url(#ep)"/>
        </svg>
        <div style={{ position:'relative', zIndex:1 }}>
          <div className="page-hero-eyebrow">December 1–10, 2025</div>
          <h1 className="page-hero-title">Event<br /><span>Programme</span></h1>
        </div>
      </div>

      <div className="pattern-band" />

      {/* FILTER TABS */}
      <section className="events-section">
        <div className="events-tabs reveal">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`events-tab ${tab === t.key ? 'events-tab--active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* EVENT LIST */}
        <div className="events-list">
          {filtered.map((ev, i) => (
            <div key={i} className="event-row reveal">
              {/* Date */}
              <div className="event-row__date">
                <div className="event-row__day">{ev.day}</div>
                <div className="event-row__month">{ev.month}</div>
              </div>

              {/* Time */}
              <div className="event-row__time">{ev.time}</div>

              {/* Info */}
              <div className="event-row__info">
                <div className="event-row__title">{ev.title}</div>
                <div className="event-row__sub">{ev.sub}</div>
              </div>

              {/* Badge */}
              <span
                className="event-row__badge"
                style={{ color: BADGE_COLORS[ev.type], borderColor: BADGE_COLORS[ev.type] }}
              >
                {ev.type}
              </span>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="events-empty">No events in this category.</div>
        )}
      </section>

      <div className="pattern-band" />

      {/* VENUE INFO */}
      <section className="events-venue reveal">
        <div className="events-venue__grid">
          {[
            { label:'Main Stage',         detail:'Grand performances, opening & closing ceremonies' },
            { label:'Heritage Village',    detail:'Tribe morung, craft demonstrations, weaving' },
            { label:'Amphitheatre',        detail:'Music concerts, folk events, evening programmes' },
            { label:'Sports Ground',       detail:'Archery, wrestling, spear-throwing, track events' },
          ].map(v => (
            <div key={v.label} className="events-venue__card">
              <div className="events-venue__label">{v.label}</div>
              <div className="events-venue__detail">{v.detail}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
