import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { supabase } from '../lib/supabaseClient';
import './Events.css';

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
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('day', { ascending: true });
        
        if (error) throw error;
        if (data) setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err.message);
        // Fallback to empty if table doesn't exist yet
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = tab === 'all' ? events : events.filter(e => e.type === tab);

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
          <div className="page-hero-eyebrow">December 1–10, 2026</div>
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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--cream)' }}>
              <div className="spinner" style={{ margin: '0 auto 1rem', width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--ochre)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              Loading event schedule...
            </div>
          ) : (
            <>
              {filtered.map((ev, i) => (
                <div key={i} className="event-row reveal">
                  {/* Date */}
                  <div className="event-row__date">
                    <div className="event-row__day">{ev.day}</div>
                    <div className="event-row__month">{ev.month || 'Dec'}</div>
                  </div>

                  {/* Time */}
                  <div className="event-row__time">{ev.time}</div>

                  {/* Info */}
                  <div className="event-row__info">
                    <div className="event-row__title">{ev.title}</div>
                    <div className="event-row__sub">{ev.sub}</div>
                  </div>

                  <div className="event-row__actions">
                    {/* Badge */}
                    <span
                      className="event-row__badge"
                      style={{ color: BADGE_COLORS[ev.type], borderColor: BADGE_COLORS[ev.type] }}
                    >
                      {ev.type}
                    </span>
                    <Link to="/tickets" className="event-row__book">
                      Book This Day →
                    </Link>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="events-empty">No events in this category.</div>
              )}
            </>
          )}
        </div>
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
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .event-row__actions { display: flex; align-items: center; gap: 1.5rem; }
        .event-row__book {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          color: var(--ochre);
          text-decoration: none;
          letter-spacing: 1px;
          transition: transform 0.2s;
          white-space: nowrap;
        }
        .event-row__book:hover { transform: translateX(5px); color: var(--cream); }
        @media (max-width: 600px) {
          .event-row__actions { flex-direction: column; align-items: flex-start; gap: 0.5rem; margin-top: 1rem; }
        }
      `}</style>
    </div>
  );
}
