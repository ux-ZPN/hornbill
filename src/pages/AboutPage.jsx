import { useState, useEffect } from "react";

const TRIBES = [
  { name:"Angami", known:"Sekrenyi in February", region:"Kohima" },
  { name:"Ao", known:"Moatsu in May", region:"Mokokchung" },
  { name:"Chakhesang", known:"Tsukhenyie in January", region:"Phek" },
  { name:"Chang", known:"Nyaknylum in July", region:"Tuensang" },
  { name:"Kachari", known:"Bushu in January", region:"Dimapur" },
  { name:"Konyak", known:"Aoling in April", region:"Mon" },
  { name:"Kuki", known:"Mimkut in January", region:"Peren" },
  { name:"Lotha", known:"Tokhu Emong in November", region:"Wokha" },
  { name:"Pochury", known:"Yemshe in October", region:"Phek" },
  { name:"Sumi", known:"Tuluni in July", region:"Zunheboto" },
  { name:"Sangtam", known:"Cultural heritage", region:"Kiphire" },
  { name:"Zeliang", known:"Traditional dances", region:"Peren" },
  { name:"Phom", known:"Rich traditions", region:"Longleng" },
  { name:"Yimchunger", known:"Folk songs", region:"Kiphire" },
  { name:"Khiamniungan", known:"Bamboo crafts", region:"Tuensang" },
  { name:"Rengma", known:"Iron smelting", region:"Kohima" }
];

const TIMELINE = [
  { year:"AGRI", title:"Rooted in Earth", desc:"More than 60% of Nagaland depends on agriculture. Most festivals revolve around the harvest and are considered deeply sacred." },
  { year:"DEC", title:"First Week", desc:"To encourage inter-tribal interaction, the Govt. of Nagaland organizes Hornbill every year in the first week of December." },
  { year:"NAME", title:"The Great Bird", desc:"The festival is named after the Hornbill, the globally respected bird displayed in folklore in most of the state's tribes." },
  { year:"12KM", title:"Kisama Heritage", desc:"Situated 12 km from Kohima, deriving its name from Kigwema (KI) and Phesama (SA). The epicenter of unity." },
  { year:"16", title:"Morungs", desc:"The Heritage Complex consists of a cluster of 16 houses—youth dormitories—designed with unique indigenous tribal architecture." },
];

export default function AboutPage() {
  const [offsets, setOffsets] = useState([]);

  useEffect(() => {
    // Generate pseudo-random positions for the scatter grid on mount 
    // to avoid hydration mismatches if we ever use SSR, though this is purely client side.
    const arr = TRIBES.map((t, i) => ({
      scale: Math.random() * 1.5 + 1.2,
      rotate: Math.random() * 14 - 7,
      y: Math.random() * 40 - 20,
      color: i % 4 === 0 ? "#C4603A" : i % 5 === 0 ? "#E8B4A0" : "#3D4A6B"
    }));
    setOffsets(arr);
  }, []);

  return (
    <div style={{ background: "#EDF2F0", minHeight: "100vh", position: "relative", padding: "120px 0 120px", overflowX: "hidden" }}>
      <style>{`
        .quote-container { margin: 160px auto; width: 100vw; margin-left: -8vw; padding: 0 5vw; }
        .quote-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(40px, 7vw, 120px); line-height: 1.1; color: #A83228; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(60px, 14vw, 180px); line-height: 0.85; color: #3D4A6B; transform: rotate(-4deg); transform-origin: left center; margin-bottom: 120px; font-style: italic; }
        .timeline-container { position: relative; margin-top: 100px; padding-bottom: 100px; }
        .timeline-item { position: relative; z-index: 1; margin-bottom: 80px; max-width: 400px; background: #EDF2F0; padding: 20px; }
        .scatter-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; margin-top: 100px; max-width: 1200px; margin-left: auto; margin-right: auto; }

        @media (max-width: 768px) {
          .quote-container { margin: 80px 0; width: 100%; margin-left: 0; padding: 0; }
          .quote-text { font-size: 36px; line-height: 1.2; }
          .hero-title { font-size: 64px; margin-bottom: 60px; transform: rotate(-2deg); }
          .timeline-item { margin-left: 0 !important; max-width: 100%; border-left: 4px dashed #E8B4A0; padding-left: 20px; margin-bottom: 50px; }
          .timeline-svg { display: none; }
          .scatter-grid { margin-top: 60px; gap: 20px; }
        }
      `}</style>
      
      {/* Background grain pseudo element effect is handled globally */}

      <div style={{ padding: "0 8%", position: "relative", zIndex: 10 }}>
        <h1 className="hero-title">
          Museum After<br/>
          <span style={{ color: "#A83228" }}>Hours.</span>
        </h1>
        
        {/* Scatter Tribes */}
        <div className="scatter-grid">
          {TRIBES.map((t, i) => {
            const off = offsets[i] || { scale: 1, rotate: 0, y: 0, color: "#3D4A6B" };
            return (
             <div key={t.name} style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: `${off.scale}rem`,
                transform: `rotate(${off.rotate}deg) translateY(${off.y}px)`,
                color: off.color,
                opacity: 0.9,
                cursor: "pointer",
                transition: "transform 0.3s ease"
             }}
             onMouseEnter={(e) => e.target.style.transform = `rotate(0deg) scale(${off.scale * 1.1}) translateY(0px)`}
             onMouseLeave={(e) => e.target.style.transform = `rotate(${off.rotate}deg) translateY(${off.y}px)`}
             title={t.known}
             >
               {t.name}
             </div>
            );
          })}
        </div>

        {/* Huge Quote */}
        <div className="quote-container">
           <p className="quote-text">
             &ldquo;Sixteen ways of being human.<br/> One ground.&rdquo;
           </p>
           <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", color: "#3D4A6B", marginTop: "20px" }}>— NAGA ELDER, KISAMA</p>
        </div>

        {/* Diagonal Timeline */}
        <div className="timeline-container">
           <svg className="timeline-svg" style={{ position: "absolute", top: 0, left: "-10%", width: "120%", height: "100%", zIndex: 0, pointerEvents: "none" }} preserveAspectRatio="none">
             <line x1="0" y1="100%" x2="100%" y2="0" stroke="#E8B4A0" strokeWidth="2" strokeDasharray="15 10"/>
           </svg>
           {TIMELINE.map((item, i) => (
             <div key={item.year} className="timeline-item" style={{ marginLeft: `${(i / TIMELINE.length) * 50}%` }}>
               <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "36px", color: "#C4603A", marginBottom: "10px", lineHeight: 1 }}>{item.year}</h3>
               <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#3D4A6B", marginBottom: "15px" }}>{item.title}</h4>
               <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#3D4A6B", lineHeight: 1.6, fontStyle: "italic" }}>{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
