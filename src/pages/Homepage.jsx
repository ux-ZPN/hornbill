import { useNavigate } from "react-router-dom";

const TRIBES = ["Angami","Ao","Chakhesang","Chang","Kachari","Khiamniungan","Konyak","Kuki","Lotha","Phom","Pochury","Rengma","Sangtam","Sumi","Tikhir","Yimchunger","Zeliang"];

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#F5EFE0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes drawIn { to { stroke-dashoffset: 0; } }
        @keyframes wipeRight {
          from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
          to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .anim-wipe { animation: wipeRight 1.5s cubic-bezier(0.77, 0, 0.175, 1) both; }
        
        /* Typography */
        .text-bleed {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px, 22vw, 340px);
          line-height: 0.75;
          color: #3D4A6B;
          width: 150vw;
          margin-left: -2vw;
          letter-spacing: -0.04em;
        }
        
        /* Buttons */
        .btn-ink {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          letter-spacing: 0.2em;
          background: none;
          border: 1px solid #3D4A6B;
          color: #3D4A6B;
          padding: 18px 30px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease;
          display: inline-block;
          text-decoration: none;
          white-space: nowrap;
        }
        .btn-ink::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #C4603A;
          border-radius: 50%;
          transform: scale(0);
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: -1;
        }
        .btn-ink:hover { color: #F5EFE0; border-color: #C4603A; }
        .btn-ink:hover::after { transform: scale(2); border-radius: 0; }
        .btn-light { border-color: #F5EFE0; color: #F5EFE0; }
        .btn-light::after { background: #E8B4A0; }
        .btn-light:hover { color: #1A1F3A; border-color: #E8B4A0; }

        /* Marquee */
        .marquee-container {
          background: #F7D99E; padding: 20px 0; overflow: hidden; width: 100%;
          border-top: 2px solid #E8B4A0; border-bottom: 2px solid #E8B4A0;
        }
        .marquee-track { display: flex; width: 200%; animation: marqueeScroll 25s linear infinite; }
        .marquee-item {
          font-family: 'DM Serif Display', serif; font-size: clamp(24px, 4vw, 32px);
          color: #3D4A6B; margin-right: 40px; white-space: nowrap;
        }

        /* Layout & Responsiveness */
        .sec-padding { padding: 180px 8%; }
        .hero-flex { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 40px; }
        .mist-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 80px; align-items: start; }
        .bamboo-flex { display: flex; flex-wrap: wrap; justify-content: center; gap: 60px; }
        .indigo-flex { display: flex; gap: 40px; flex-wrap: wrap; align-items: center; }
        .footer-flex { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 60px; margin-bottom: 80px; }
        .footer-links-wrap { display: flex; gap: 60px; flex-wrap: wrap; }

        .title-huge { font-size: clamp(50px, 8vw, 120px); }
        .desc-text { font-size: clamp(20px, 3vw, 28px); }

        /* MOBILE OVERRIDES */
        @media (max-width: 768px) {
          .sec-padding { padding: 80px 6%; }
          .hero-flex { flex-direction: column; align-items: flex-start; gap: 30px; margin-top: 60px !important; }
          .hero-flex > div:last-child { text-align: left !important; }
          .mist-grid { gap: 40px; grid-template-columns: 1fr; }
          .bamboo-flex { gap: 40px; flex-direction: column; }
          .indigo-flex { gap: 30px; flex-direction: column; align-items: flex-start; }
          .footer-flex { flex-direction: column; gap: 40px; margin-bottom: 40px; }
          
          .text-bleed { font-size: clamp(40px, 16vw, 100px); width: 100%; margin-left: 0; }
          .genre-bubble { width: 70px !important; height: 70px !important; font-size: 12px !important; }
          .mist-card { padding: 30px 20px !important; transform: rotate(1deg) !important; }
          .mist-card h3 { font-size: 32px !important; }
          .mist-card li { font-size: 20px !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ minHeight: "100vh", paddingTop: "calc(10vh + 80px)", paddingBottom: "80px", position: "relative" }}>
        <div className="anim-wipe" style={{ paddingLeft: "6%" }}>
          <h1 className="text-bleed" style={{ fontStyle: "italic", fontWeight: 600 }}>HORNBILL</h1>
          <h1 className="text-bleed" style={{ color: "#C4603A" }}>FESTIVAL</h1>
        </div>

        <div className="hero-flex" style={{ padding: "0 6%", margin: "120px 0 0", position: "relative", zIndex: 10 }}>
           <div style={{ maxWidth: "600px" }}>
             <p className="desc-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#3D4A6B", lineHeight: 1.4, marginBottom: "30px" }}>
               The drums start before sunrise. By the time you're awake, the valley is already alive with sixteen ways of being human.
             </p>
             <button className="btn-ink" onClick={() => navigate('/about')}>ENTER KISAMA →</button>
           </div>
           
           <div style={{ textAlign: "right" }}>
             <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "0.2em", color: "#C4603A", marginBottom: "10px" }}>25TH EDITION</p>
             <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 5vw, 64px)", color: "#3D4A6B", lineHeight: 1.1 }}>DEC 1–10<br/><span style={{ color: "#E8B4A0", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>NAGALAND</span></p>
           </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-track">
           {Array(4).fill(TRIBES).flat().map((t, i) => (
             <span key={i} className="marquee-item">~ {t}</span>
           ))}
        </div>
      </div>

      {/* Mist White Section */}
      <section className="sec-padding" style={{ background: "#EDF2F0", position: "relative" }}>
        <svg style={{ position: "absolute", top: "40px", left: "6%", maxWidth: "80px" }} viewBox="0 0 120 30">
          <path d="M0,15 Q30,-5 60,15 T120,15" fill="none" stroke="#C4603A" strokeWidth="3" strokeDasharray="150" strokeDashoffset="150" style={{ animation: "drawIn 2s forwards 0.5s" }} />
        </svg>

        <div className="mist-grid">
           <div>
             <h2 className="title-huge" style={{ fontFamily: "'DM Serif Display', serif", color: "#3D4A6B", marginBottom: "30px", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
               Cultural<br/>Extravaganza
             </h2>
             <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.2em", color: "#C4603A", marginBottom: "20px" }}>THE FESTIVAL OF FESTIVALS</p>
             <p className="desc-text" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#3D4A6B", lineHeight: 1.5, marginBottom: "40px", opacity: 0.9 }}>
               More than 60% of Nagaland depends on agriculture, and our festivals revolve around the harvest. To encourage inter-tribal interaction, the Hornbill Festival unites all tribes under one roof at the Naga Heritage Village every December.
             </p>
             <button className="btn-ink" onClick={() => navigate('/events')}>SCHEDULE BOARD →</button>
           </div>

           <div className="mist-card" style={{ position: "relative", padding: "50px 40px", background: "#F5EFE0", boxShadow: "4px 12px 40px rgba(61,74,107,0.08)", transform: "rotate(2deg)" }}>
             <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "36px", color: "#A83228", marginBottom: "20px" }}>Immerse</h3>
             <ul style={{ listStyle: "none", padding: 0 }}>
               {["Handwoven tribal textiles", "Ancient war dances and folklore", "Naga King Chilli eating contest", "Traditional indigenous wrestling", "Smoked meat and Zutho (rice beer)"].map((item, i) => (
                 <li key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "24px", color: "#3D4A6B", marginBottom: "15px", borderBottom: "1px dashed #E8B4A0", paddingBottom: "10px" }}>
                   {item}
                 </li>
               ))}
             </ul>
           </div>
        </div>
      </section>

      {/* Bamboo Pale Section */}
      <section className="sec-padding" style={{ background: "#E8EDDA" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(36px, 6vw, 90px)", color: "#3D4A6B", textAlign: "center", marginBottom: "60px", maxWidth: "1000px", margin: "0 auto 60px", lineHeight: 1.2 }}>
          "Come in December. Come early. Find your place in the valley."
        </h2>

        <div className="bamboo-flex">
           {[
             { num: "12", label: "KM FROM KOHIMA" },
             { num: "25", label: "YEARS OF HERITAGE" },
             { num: "01", label: "GLOBALLY RESPECTED BIRD" }
           ].map(stat => (
             <div key={stat.label} style={{ textAlign: "center" }}>
               <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(60px, 10vw, 140px)", color: "#3D4A6B", lineHeight: 1 }}>{stat.num}</div>
               <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "0.2em", color: "#C4603A", borderTop: "2px solid #C4603A", paddingTop: "15px", marginTop: "10px", display: "inline-block" }}>{stat.label}</div>
             </div>
           ))}
        </div>
        
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <button className="btn-ink" onClick={() => navigate('/tourist')}>READ THE FIELD GUIDE →</button>
        </div>
      </section>

      {/* Dark Indigo Section */}
      <section className="sec-padding" style={{ background: "#1A1F3A", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "0.3em", color: "#E8B4A0", marginBottom: "30px" }}>NIGHTLY AT KISAMA</p>
          <h2 className="title-huge" style={{ fontFamily: "'DM Serif Display', serif", color: "#F5EFE0", lineHeight: 0.9, marginBottom: "40px", letterSpacing: "-0.02em" }}>
            Hornbill Music <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#C4603A", display: "inline-block", transform: "rotate(-2deg)" }}>Festival.</span>
          </h2>
          <p className="desc-text" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(245, 239, 224, 0.9)", lineHeight: 1.4, marginBottom: "50px", maxWidth: "800px", fontStyle: "italic" }}>
            The Hornbill festival wakes up to the sound of breathtaking music every evening. Local and international artists, hand-shake concerts, and the biggest rock competitions in Northeast India. Rock meets log-drum.
          </p>
          <div className="indigo-flex">
             <div style={{ display: "flex", gap: "15px" }}>
               {["ROCK", "EDM", "FOLK"].map(genre => (
                 <div key={genre} className="genre-bubble" style={{ width: "90px", height: "90px", borderRadius: "50%", border: "1px dashed #F7D99E", display: "flex", alignItems: "center", justifyContent: "center", color: "#F7D99E", fontFamily: "'Space Mono', monospace", fontSize: "14px", letterSpacing: "0.1em" }}>{genre}</div>
               ))}
             </div>
             <button className="btn-ink btn-light" onClick={() => navigate('/events')}>SEE ARTISTS →</button>
          </div>
        </div>
      </section>

    </div>
  );
}
