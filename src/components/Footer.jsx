import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        .footer-padding { padding: 180px 8%; }
        .footer-flex { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 60px; margin-bottom: 80px; }
        .footer-links-wrap { display: flex; gap: 60px; flex-wrap: wrap; }
        
        @media (max-width: 768px) {
          .footer-padding { padding: 80px 6%; }
          .footer-flex { flex-direction: column; gap: 40px; margin-bottom: 40px; }
        }
      `}</style>
      <footer className="footer-padding" style={{ background: "#0E1224", paddingBottom: "40px" }}>
         <div className="footer-flex">
            <div style={{ maxWidth: "400px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(40px, 8vw, 56px)", color: "#E8B4A0", margin: "0 0 20px 0", lineHeight: 1 }}>Hornbill.</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 3vw, 22px)", color: "rgba(245, 239, 224, 0.6)", lineHeight: 1.5, margin: 0 }}>
                Organized by the State Tourism and Art & Culture Departments, Government of Nagaland. Designed to preserve, protect, and revive the rich culture of the Nagas.
              </p>
            </div>
            
            <div className="footer-links-wrap">
               {[
                 { title: "Explore", links: [{n: "About", p: "/about"}, {n:"Events", p:"/events"}] },
                 { title: "Visit", links: [{n: "Tourist Info", p: "/tourist"}, {n:"Contact", p:"/contact"}] }
               ].map(col => (
                 <div key={col.title}>
                   <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "0.2em", color: "#C4603A", margin: "0 0 20px 0" }}>{col.title.toUpperCase()}</p>
                   <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                     {col.links.map(l => (
                       <li key={l.n} style={{ marginBottom: "15px" }}>
                         <button onClick={() => navigate(l.p)} style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(20px, 4vw, 24px)", color: "#F5EFE0", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.3s", margin: 0 }} onMouseEnter={(e)=>e.target.style.color="#E8B4A0"} onMouseLeave={(e)=>e.target.style.color="#F5EFE0"}>{l.n}</button>
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
            </div>
         </div>
         <div style={{ borderTop: "1px solid rgba(245, 239, 224, 0.1)", paddingTop: "30px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "15px" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "rgba(245, 239, 224, 0.4)", letterSpacing: "0.15em", margin: 0 }}>© 2025 HORNBILLFESTIVAL.COM</p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "rgba(245, 239, 224, 0.4)", letterSpacing: "0.15em", margin: 0 }}>NAGALAND, INDIA</p>
         </div>
      </footer>
    </>
  );
}
