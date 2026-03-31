import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Tickets.css';

const TIERS = [
  {
    id: 'day',
    name: 'Day Pass',
    price: '250',
    currency: '₹',
    badge: null,
    color: '#C4820A',
    features: [
      'Single day access',
      'All public performance areas',
      'Heritage Village entry',
      'Food court access',
    ],
    note: 'Valid for one calendar day of your choice',
  },
  {
    id: 'full',
    name: 'Full Festival',
    price: '1,800',
    currency: '₹',
    badge: 'Most Popular',
    color: '#E8A020',
    features: [
      'All 10 days — Dec 1 to 10',
      'Priority seating at main stage',
      'Opening & closing ceremonies',
      'Craft village unlimited access',
      'Festival programme booklet',
    ],
    note: 'Best value — the full Hornbill experience',
  },
  {
    id: 'heritage',
    name: 'Heritage Tour',
    price: '4,500',
    currency: '₹',
    badge: 'Immersive',
    color: '#2D6B4A',
    features: [
      'Full festival access (10 days)',
      'Guided tribal morung tour',
      'Traditional Naga homestay (2 nights)',
      'Village trek with Naga guide',
      'Ceremonial feast invitation',
      'Traditional craft workshop',
    ],
    note: 'For those who want to go deeper into Naga culture',
  },
  {
    id: 'media',
    name: 'Press Pass',
    price: null,
    currency: '',
    badge: 'Apply',
    color: '#4A90B8',
    features: [
      'Full 10-day media accreditation',
      'Dedicated press zone & workroom',
      'Backstage & performance access',
      'Official media credentials',
      'Press briefings with organisers',
    ],
    note: 'Contact the Tourism Department of Nagaland directly',
  },
];

const DAYS = Array.from({length:10},(_,i)=>`Dec ${i+1}, 2025`);

export default function Tickets() {
  useReveal();
  const [selected, setSelected] = useState('full');
  const [day, setDay] = useState(DAYS[0]);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ name:'', email:'', phone:'' });
  const [submitted, setSubmitted] = useState(false);

  const tier = TIERS.find(t => t.id === selected);
  const rawPrice = tier?.price ? parseInt(tier.price.replace(',','')) * qty : 0;
  const totalStr = rawPrice ? `₹${rawPrice.toLocaleString('en-IN')}` : 'Contact Office';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <div className="tickets-page">

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background:'radial-gradient(ellipse at 50% 50%, #2A1810 0%, #0F0A06 65%)' }}/>
        <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.06 }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
          <defs><pattern id="tkp" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect x="12" y="0" width="6" height="30" fill="#C4820A"/>
            <rect x="0" y="12" width="30" height="6" fill="#8B1A1A"/>
          </pattern></defs>
          <rect width="1440" height="400" fill="url(#tkp)" opacity="0.6"/>
        </svg>
        <div style={{ position:'relative', zIndex:1 }}>
          <div className="page-hero-eyebrow">Secure Your Place</div>
          <h1 className="page-hero-title">Festival<br /><span>Tickets</span></h1>
        </div>
      </div>

      <div className="pattern-band" />

      {/* TIER CARDS */}
      <section className="tickets-tiers reveal">
        <div className="section-tag" style={{ padding:'3rem 3rem 0' }}>Choose Your Pass</div>
        <div className="tickets-tier-grid">
          {TIERS.map(t => (
            <div
              key={t.id}
              className={`tier-card ${selected === t.id ? 'tier-card--selected' : ''}`}
              style={{ '--tc': t.color }}
              onClick={() => setSelected(t.id)}
            >
              {t.badge && <div className="tier-card__badge">{t.badge}</div>}
              <div className="tier-card__top-bar" />
              <div className="tier-card__name">{t.name}</div>
              <div className="tier-card__price">
                {t.price
                  ? <><span className="tier-card__currency">{t.currency}</span>{t.price}</>
                  : <span style={{ fontSize:'1.2rem' }}>Contact<br/>Office</span>
                }
              </div>
              <ul className="tier-card__features">
                {t.features.map(f => (
                  <li key={f}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="tier-card__note">{t.note}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="pattern-band" />

      {/* BOOKING FORM */}
      <section className="tickets-booking">
        <div className="tickets-booking__left reveal">
          <div className="section-tag">Your Order</div>
          <div className="order-summary">
            <div className="order-row">
              <span>Pass Type</span>
              <span style={{ color:'var(--ochre-light)', fontStyle:'italic' }}>{tier?.name}</span>
            </div>
            {selected === 'day' && (
              <div className="order-row">
                <span>Select Day</span>
                <select
                  value={day}
                  onChange={e => setDay(e.target.value)}
                  className="order-select"
                >
                  {DAYS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            )}
            {tier?.price && (
              <div className="order-row">
                <span>Quantity</span>
                <div className="qty-control">
                  <button onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => Math.min(10,q+1))}>+</button>
                </div>
              </div>
            )}
            <div className="order-divider" />
            <div className="order-row order-row--total">
              <span>Total</span>
              <span className="order-total">{totalStr}</span>
            </div>
          </div>
        </div>

        <div className="tickets-booking__right reveal">
          {submitted ? (
            <div className="booking-success">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="#C4820A" strokeWidth="1.5"/>
                <path d="M14 24L21 31L34 18" stroke="#C4820A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h3>Booking Request Received</h3>
              <p>We'll confirm your {tier?.name} via email within 24 hours. Welcome to the Festival of Festivals.</p>
            </div>
          ) : (
            <>
              <div className="section-tag">Your Details</div>
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label>Full Name <span>*</span></label>
                  <input
                    type="text"
                    placeholder="As on ID proof"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Email Address <span>*</span></label>
                  <input
                    type="email"
                    placeholder="Ticket will be sent here"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <div className="form-note">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#C4820A" strokeWidth="1"/><line x1="7" y1="5" x2="7" y2="10" stroke="#C4820A" strokeWidth="1.5" strokeLinecap="round"/><circle cx="7" cy="3.5" r="0.8" fill="#C4820A"/></svg>
                  Non-Nagaland Indian nationals require an Inner Line Permit (ILP). Apply at <span style={{color:'var(--ochre)'}}>nagaland.gov.in/ilp</span>
                </div>
                <button type="submit" className="btn-solid" style={{ width:'100%', justifyContent:'center', marginTop:'0.5rem' }}>
                  {selected === 'media' ? 'Submit Application' : `Confirm Booking — ${totalStr}`}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      <div className="pattern-band" />

      {/* FAQ */}
      <section className="tickets-faq reveal">
        <div className="section-tag">Good to Know</div>
        <div className="faq-grid">
          {[
            { q:'Do I need an ILP?', a:'Non-Nagaland Indian nationals require an Inner Line Permit. Foreigners need a Protected Area Permit. Both can be arranged online or at entry points.' },
            { q:'Is photography allowed?', a:'Yes — photography is encouraged at all public events. Some sacred ceremonies may have restrictions; follow guide instructions.' },
            { q:'Are children free?', a:'Children under 12 receive free entry when accompanied by a ticket-holding adult.' },
            { q:'Refund policy?', a:'Full refunds available up to 14 days before the festival. 50% refund within 7 days. No refunds within 48 hours of the event.' },
          ].map(f => (
            <div key={f.q} className="faq-item">
              <h4 className="faq-q">{f.q}</h4>
              <p className="faq-a">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
