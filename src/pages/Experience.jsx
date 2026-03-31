import { useReveal } from '../hooks/useReveal';
import { Link } from 'react-router-dom';
import './Experience.css';

const EXPERIENCES = [
  {
    id: '01',
    title: 'Warrior Dances',
    color: '#C4820A',
    tag: 'Performance',
    duration: 'Daily · 9 AM – 12 PM',
    desc: 'Watch as warriors in full regalia — towering hornbill-feather headdresses, boar-tusk necklaces, dao swords, and hand-woven war shawls — perform battle dances that once signalled the beginning of tribal campaigns. Each tribe brings its own distinct choreography, its own drum rhythms, and its own war cry. No two performances are alike.',
    highlight: 'The Konyak and Chang warrior dances are the most dramatic — do not miss them.',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <path d="M26 6L30 18H43L33 26L37 38L26 30L15 38L19 26L9 18H22Z" fill="#C4820A" opacity="0.85"/>
        <line x1="26" y1="38" x2="26" y2="50" stroke="#C4820A" strokeWidth="1.5" strokeOpacity="0.5"/>
        <line x1="14" y1="44" x2="38" y2="44" stroke="#C4820A" strokeWidth="1" strokeOpacity="0.3"/>
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Naga Cuisine',
    color: '#8B4513',
    tag: 'Food & Drink',
    duration: 'All Day · Food Court',
    desc: 'Smoked pork with Bhut jolokia (the world\'s once-hottest chilli), fermented bamboo shoots (akhuni), sticky rice steamed in bamboo, and rice beer brewed fresh in tribal pots. Every dish at the Hornbill Festival is a centuries-old recipe — and a ceremony in itself. Each tribe serves its own regional specialities, and the variety is staggering.',
    highlight: 'The Naga cuisine competition on Dec 3rd pits tribe against tribe — the smells alone are worth the trip.',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <ellipse cx="26" cy="32" rx="18" ry="12" fill="#8B4513" opacity="0.6"/>
        <path d="M18 32 Q26 16 34 32" stroke="#C4820A" strokeWidth="2" fill="none"/>
        <circle cx="26" cy="16" r="5" fill="#C4820A" opacity="0.8"/>
        <ellipse cx="26" cy="34" rx="10" ry="6" fill="#C4820A" opacity="0.25"/>
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Traditional Crafts',
    color: '#2D6B4A',
    tag: 'Workshop',
    duration: 'Daily · Craft Village',
    desc: 'Weavers working at backstrap looms, woodcarvers turning out intricately detailed household items, blacksmiths forging the dao — Nagaland\'s iconic chopping blade — and bead-workers stringing elaborate necklaces that encode clan identity. You can watch, or you can sit down and try. Most craftspeople at the festival welcome visitors to have a go.',
    highlight: 'The morung at the Heritage Village features live weaving demonstrations by Ao and Lotha masters.',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <rect x="10" y="10" width="14" height="32" fill="#2D6B4A" opacity="0.6"/>
        <rect x="28" y="16" width="14" height="26" fill="#2D6B4A" opacity="0.4"/>
        <rect x="10" y="30" width="32" height="5" fill="#C4820A" opacity="0.7"/>
        <line x1="17" y1="10" x2="17" y2="42" stroke="#C4820A" strokeWidth="0.5" strokeOpacity="0.4"/>
        <line x1="35" y1="16" x2="35" y2="42" stroke="#C4820A" strokeWidth="0.5" strokeOpacity="0.4"/>
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Music & Drums',
    color: '#4A90B8',
    tag: 'Concert',
    duration: 'Evenings · Amphitheatre',
    desc: 'Log drums carved from single tree trunks, bamboo flutes in haunting minor keys, the deep resonance of the morung horn — and then, without warning, a rock band from Dimapur plugs in and the whole amphitheatre shifts gear. The Hornbill Festival is the birthplace of Northeast India\'s rock scene, and every year it proves its credentials.',
    highlight: 'The Battle of Bands on Dec 8th is the loudest, most electric night of the festival.',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <ellipse cx="26" cy="38" rx="18" ry="8" fill="#4A90B8" opacity="0.4"/>
        <rect x="22" y="10" width="8" height="28" rx="4" fill="#4A90B8" opacity="0.7"/>
        <ellipse cx="26" cy="10" rx="8" ry="6" fill="#4A90B8" opacity="0.9"/>
        <line x1="10" y1="22" x2="42" y2="22" stroke="#4A90B8" strokeWidth="0.8" strokeOpacity="0.3"/>
        <line x1="10" y1="30" x2="42" y2="30" stroke="#4A90B8" strokeWidth="0.8" strokeOpacity="0.3"/>
      </svg>
    ),
  },
  {
    id: '05',
    title: 'Traditional Sports',
    color: '#5A8A4A',
    tag: 'Competition',
    duration: 'Dec 3, 5, 8 · Sports Ground',
    desc: 'Archery with traditional bamboo bows, spear-throwing for distance and accuracy, wrestling where tribal pride rides on every bout, and foot races on the open ground — the competitive spirit of the Naga warrior is ancient and electric. Inter-tribe rivalries run deep, and the crowd\'s reactions make it clear that these contests matter.',
    highlight: 'The archery tournament is the most attended daytime event — arrive early to get a good spot.',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <path d="M8 44 L26 10 L44 44Z" stroke="#5A8A4A" strokeWidth="1.5" fill="none"/>
        <line x1="26" y1="4" x2="26" y2="48" stroke="#5A8A4A" strokeWidth="1.5" strokeOpacity="0.5"/>
        <circle cx="26" cy="26" r="6" fill="#5A8A4A" opacity="0.7"/>
        <circle cx="26" cy="26" r="2" fill="#C4820A"/>
      </svg>
    ),
  },
  {
    id: '06',
    title: 'Heritage Morung',
    color: '#C46080',
    tag: 'Cultural Site',
    duration: 'Daily · Heritage Village',
    desc: 'The morung — the bachelor\'s dormitory and community hall of traditional Naga society — is one of the most architecturally distinctive structures in the Northeast. At the Hornbill Festival, each of the 17 tribes builds or maintains its own morung in the Heritage Village, complete with carved pillars, hornbill motifs, warrior skulls, and the artefacts of daily life.',
    highlight: 'Walking through all 17 morung in sequence is an education in tribal identity that no textbook can replicate.',
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <polygon points="26,6 46,20 46,48 6,48 6,20" stroke="#C46080" strokeWidth="1.5" fill="none"/>
        <polygon points="26,6 46,20 6,20" fill="#C46080" opacity="0.25"/>
        <rect x="20" y="30" width="12" height="18" fill="#C46080" opacity="0.5"/>
        <line x1="26" y1="6" x2="26" y2="2" stroke="#C4820A" strokeWidth="2"/>
        <circle cx="26" cy="2" r="2" fill="#C4820A"/>
      </svg>
    ),
  },
];

const HIGHLIGHTS = [
  { num: '1L+', label: 'Annual Visitors' },
  { num: '10',  label: 'Days of Festival' },
  { num: '17',  label: 'Tribe Morung' },
  { num: '200+', label: 'Events & Shows' },
];

export default function Experience() {
  useReveal();

  return (
    <div className="exp-page">

      {/* PAGE HERO */}
      <div className="page-hero exp-page__hero">
        <div className="page-hero-bg" style={{ background: 'radial-gradient(ellipse at 30% 70%, #5C0A0A 0%, #0F0A06 65%)' }} />
        <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.07 }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="xp" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#C4820A" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="1440" height="400" fill="url(#xp)"/>
        </svg>
        <div style={{ position:'relative', zIndex:1 }}>
          <div className="page-hero-eyebrow">What Awaits You</div>
          <h1 className="page-hero-title">The Hornbill<br /><span>Experience</span></h1>
        </div>
      </div>

      <div className="pattern-band" />

      {/* STATS BAND */}
      <div className="exp-stats reveal">
        {HIGHLIGHTS.map(h => (
          <div key={h.label} className="exp-stat">
            <span className="exp-stat__num">{h.num}</span>
            <span className="exp-stat__label">{h.label}</span>
          </div>
        ))}
      </div>

      <div className="pattern-band" />

      {/* EXPERIENCE CARDS */}
      <section className="exp-cards-section">
        {EXPERIENCES.map((ex, i) => (
          <div
            key={ex.id}
            className="exp-card reveal"
            style={{ '--ec': ex.color, flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}
          >
            {/* Visual panel */}
            <div className="exp-card__visual">
              <div className="exp-card__id">{ex.id}</div>
              <div className="exp-card__icon">{ex.icon}</div>
              <div className="exp-card__tag-wrap">
                <span className="exp-card__tag">{ex.tag}</span>
                <span className="exp-card__duration">{ex.duration}</span>
              </div>
            </div>

            {/* Content panel */}
            <div className="exp-card__content">
              <div className="exp-card__accent" />
              <h2 className="exp-card__title">{ex.title}</h2>
              <p className="exp-card__desc">{ex.desc}</p>
              <div className="exp-card__highlight">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L10 6L14 6L11 9L12 13L8 11L4 13L5 9L2 6L6 6Z" fill="#C4820A" opacity="0.9"/>
                </svg>
                {ex.highlight}
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="pattern-band" />

      {/* CTA */}
      <section className="exp-cta reveal">
        <h2 className="exp-cta__title">Ready to Experience It?</h2>
        <p className="exp-cta__text">Secure your place at the Festival of Festivals. Tickets for 2025 are now available.</p>
        <div className="exp-cta__actions">
          <Link to="/tickets" className="btn-solid">Book Tickets →</Link>
          <Link to="/location" className="btn-outline">Plan Your Visit</Link>
        </div>
      </section>
    </div>
  );
}
