import { useEffect, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Tribes.css';

const TRIBES = [
  { num:'01', name:'Angami', region:'Kohima District', color:'#C4820A', shawl:'Lohe / Mechala', festival:'Sekrenyi', known:'Terraced rice fields, warrior lore, intricate woodcarving', desc:"Among the most recognised Naga tribes, the Angami are celebrated for their stone-walled hilltop villages around Kohima. Known for the Sekrenyi purification festival and shawls striped in bold red and black." },
  { num:'02', name:'Ao', region:'Mokokchung District', color:'#8B4513', shawl:'Tsungkotepsu', festival:'Moatsu', known:'Rich oral tradition, blue-striped shawls, log-drum music', desc:"The Ao hold one of the richest oral traditions in Nagaland — history preserved in song, myth, and the rhythms of the log drum. Their Moatsu harvest festival in May is a riot of singing and communal bonding." },
  { num:'03', name:'Lotha', region:'Wokha District', color:'#2D6B4A', shawl:'Sutam', festival:'Tokhu Emong', known:'Vibrant blankets, Wokha Orange cultivation, harvest songs', desc:"The Lotha are master weavers whose shawls carry geometric patterns encoding clan identity and social status. The Tokhu Emong festival celebrates the harvest with dance, song, and grain-beer." },
  { num:'04', name:'Konyak', region:'Mon District', color:'#4A90B8', shawl:'Rongkhim', festival:'Aoling', known:'Tattoo culture, head-hunting heritage, Ang (chief) system', desc:"The most photographed Naga tribe — last living carriers of the ancient face-tattoo culture, a mark of warrior status earned in battle. Their Aoling spring festival is five days of sacred fires and ceremony." },
  { num:'05', name:'Sumi', region:'Zunheboto District', color:'#C46080', shawl:'Ghara', festival:'Tuluni', known:'Red-black textiles, folk songs, Tuluni summer festival', desc:"The Sumi celebrate Tuluni at summer's peak, when rice beer flows freely and folk songs echo across valleys. Their textiles are instantly recognisable — bold red stripes on black." },
  { num:'06', name:'Chakhesang', region:'Phek District', color:'#7B2D8B', shawl:'Pfekhriepfü', festival:'Tsükhenye', known:'Highland terracing, Chakri / Khezha / Sangtam sub-groups', desc:"A confederation of three communities in the high mountains of Phek. Their Tsükhenye festival marks the end of winter with bonfires on hilltops — visible for miles across the valleys." },
  { num:'07', name:'Phom', region:'Longleng District', color:'#5A8A4A', shawl:'Khangha', festival:'Moatsu Mong', known:'Exquisite basketwork, warrior dances, bamboo architecture', desc:"The Phom are distinguished by extraordinary bamboo craft — from their morung dormitories to everyday implements. Their warrior dances at the Hornbill Festival draw huge crowds every year." },
  { num:'08', name:'Rengma', region:'Tseminyu, Kohima District', color:'#A06030', shawl:'Tsükha', festival:'Ngada', known:'Ancient cave paintings, unique language, Ngada harvest festival', desc:"One of the smaller Naga tribes, the Rengma are distinguished by their Ngada post-harvest festival — a ten-day celebration of song, dance, and sacred rituals. Their language is distinct from all neighbours." },
  { num:'09', name:'Sangtam', region:'Kiphire District', color:'#D48030', shawl:'Chonpangsu', festival:'Amongmong', known:'Remote highland villages, bow-and-arrow skill, Naknyulum festival', desc:"Living in one of the most remote areas of Nagaland, the Sangtam have preserved their traditions with remarkable integrity. Their archery skills are legendary, alive in competitions at the Hornbill Festival." },
  { num:'10', name:'Yimchunger', region:'Tuensang District', color:'#8090C0', shawl:'Metsuopvü', festival:'Miu', known:'Unique script, weaving traditions, cattle herding culture', desc:"The Yimchunger inhabit the higher reaches of Tuensang and are known for their weaving and pastoral cattle culture. The Miu festival is a time of reconciliation — old feuds settled, new alliances forged." },
  { num:'11', name:'Zeliang', region:'Peren District', color:'#70A090', shawl:'Nriuhrii', festival:'Hega', known:'Linked with Zeme and Liangmai, lowland agriculture', desc:"The Zeliang are culturally linked to the Zeme and Liangmai tribes. Their Hega festival honours the spirits of the field, accompanied by distinctive folk dances in elaborate traditional costume." },
  { num:'12', name:'Pochuri', region:'Phek District', color:'#C09040', shawl:'Paru', festival:'Yemshe', known:'Storytelling tradition, morung art, bamboo instruments', desc:"The Pochuri are celebrated storytellers whose oral literature contains some of the most vivid mythological narratives in the Northeast. Their Yemshe festival is a time for community gathering and sacred songs." },
  { num:'13', name:'Chang', region:'Tuensang District', color:'#B06858', shawl:'Sü', festival:'Nknyulum', known:'Elaborate headdresses, log-drum rituals, warrior body art', desc:"Chang warriors are among the most strikingly attired at Hornbill — their headdresses of hornbill feathers and boar tusks signify rank and valour. The Nknyulum festival in July is their principal celebration." },
  { num:'14', name:'Khiamniungan', region:'Noklak District', color:'#688080', shawl:'Thvünrü', festival:'Tsokum', known:'Remote eastern border culture, forest knowledge, wildlife lore', desc:"Living on Nagaland's eastern frontier with Myanmar, the Khiamniungan have an intimate knowledge of the Patkai forest ecosystem. Their Tsokum festival is one of the least-documented — and most fascinating." },
  { num:'15', name:'Kuki', region:'Various Districts', color:'#A08850', shawl:'Various', festival:'Chavang Kut', known:'Kuki-Chin heritage, Chavang Kut harvest festival, weaving art', desc:"The Kuki communities share linguistic roots with the Kuki-Chin peoples of Manipur and Myanmar. Their Chavang Kut harvest festival in November is a joyous event filled with music, dance, and traditional games." },
  { num:'16', name:'Garo', region:'Dimapur District', color:'#90A860', shawl:'Dakmanda', festival:'Wangala', known:'Matrilineal society, Wangala hundred-drums festival', desc:"The Garo maintain one of the few matrilineal societies in the Northeast. Their Wangala hundred-drums festival is a spectacle of rhythmic percussion — the sound carries for miles across the plains." },
  { num:'17', name:'Dimasa', region:'Dimapur District', color:'#C08060', shawl:'Rijamphai', festival:'Bushu', known:'Ancient Dimasa Kingdom heritage, rice-beer rituals', desc:"The Dimasa are the ancient rulers of what is now Dimapur — their Kingdom once controlled the gateway to Nagaland. Their Bushu festival is a thanksgiving to the earth goddess, celebrated with elaborate ritual." },
];

export default function Tribes() {
  useReveal();
  const [active, setActive] = useState(null);

  return (
    <div className="tribes-page">

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" />
        <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.05 }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="tp" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none"/>
              <rect x="0" y="18" width="40" height="4" fill="#C4820A"/>
              <rect x="18" y="0" width="4" height="40" fill="#C4820A"/>
            </pattern>
          </defs>
          <rect width="1440" height="400" fill="url(#tp)"/>
        </svg>
        <div style={{ position:'relative', zIndex:1 }}>
          <div className="page-hero-eyebrow">The People of Nagaland</div>
          <h1 className="page-hero-title">17 Tribes,<br /><span>One Spirit</span></h1>
        </div>
      </div>

      <div className="pattern-band" />

      {/* ACCORDION GRID */}
      <section className="tribes-grid-section">
        <p className="tribes-grid-intro reveal">Click any tribe to learn their story.</p>
        <div className="tribes-grid">
          {TRIBES.map(t => (
            <div
              key={t.num}
              className="tribe-card reveal"
              data-active={active === t.num}
              style={{ '--tc': t.color }}
              onClick={() => setActive(active === t.num ? null : t.num)}
            >
              <div className="tribe-card__accent" />
              <div className="tribe-card__header">
                <div className="tribe-card__header-left">
                  <span className="tribe-card__num">{t.num}</span>
                  <div>
                    <h3 className="tribe-card__name">{t.name}</h3>
                    <div className="tribe-card__region">{t.region}</div>
                  </div>
                </div>
                <svg
                  className="tribe-card__chevron"
                  width="18" height="18" viewBox="0 0 18 18" fill="none"
                  style={{ transform: active === t.num ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                >
                  <path d="M4 7L9 12L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              {active === t.num && (
                <div className="tribe-card__body">
                  <p className="tribe-card__desc">{t.desc}</p>
                  <div className="tribe-card__meta">
                    {[['Festival', t.festival], ['Shawl', t.shawl]].map(([k, v]) => (
                      <div key={k} className="tribe-card__meta-item">
                        <span className="tribe-card__meta-label">{k}</span>
                        <span className="tribe-card__meta-val">{v}</span>
                      </div>
                    ))}
                    <div className="tribe-card__meta-item tribe-card__meta-item--full">
                      <span className="tribe-card__meta-label">Known For</span>
                      <span className="tribe-card__meta-val">{t.known}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="pattern-band" />

      {/* TEXTILE NOTE */}
      <section className="tribes-textile reveal">
        <div className="tribes-textile__content">
          <div className="section-tag">Naga Textiles</div>
          <h2 className="tribes-textile__title">The Shawl as Identity</h2>
          <p className="tribes-textile__text">In Naga culture, the shawl is more than clothing — it is a living record of identity, achievements, and clan. Each tribe weaves its own patterns; each pattern carries specific meaning. A warrior's shawl differs from an elder's. A woman's weave differs from a man's.</p>
          <p className="tribes-textile__text">At the Hornbill Festival, watch master weavers at their looms in the Naga Heritage Village morung, creating textiles that have been woven the same way for centuries.</p>
        </div>
        <div className="tribes-textile__visual">
          <svg width="100%" height="280" viewBox="0 0 600 280" preserveAspectRatio="xMidYMid slice">
            <rect width="600" height="280" fill="#1A1008"/>
            {['#C4820A','#8B1A1A','#2D6B4A','#4A90B8','#C46080','#7B2D8B','#5A8A4A','#A06030','#D48030','#8090C0'].map((c, i) => (
              <rect key={i} x="0" y={i * 28} width="600" height="4" fill={c} opacity="0.7"/>
            ))}
            {Array.from({length:20}).map((_,i) => (
              <rect key={i} x={i*30} y="0" width="4" height="280" fill="#0F0A06" opacity="0.45"/>
            ))}
            {[[150,140],[300,140],[450,140]].map(([cx,cy],i) => (
              <polygon key={i} points={`${cx},${cy-38} ${cx+38},${cy} ${cx},${cy+38} ${cx-38},${cy}`} fill="#C4820A" opacity="0.13" stroke="#C4820A" strokeWidth="1" strokeOpacity="0.35"/>
            ))}
          </svg>
        </div>
      </section>
    </div>
  );
}
