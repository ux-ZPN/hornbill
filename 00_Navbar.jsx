import { useState, useEffect } from "react";

const LINKS = [
  { label:"About", href:"/about" },
  { label:"Events", href:"/events" },
  { label:"Tourist Info", href:"/tourist" },
  { label:"Contact", href:"/contact" },
];

export default function Navbar({ active = "" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');
        .hb2-link{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.14em;color:rgba(242,232,213,.55);text-decoration:none;text-transform:uppercase;transition:color .15s;}
        .hb2-link:hover,.hb2-link.active{color:#C41E1E;}
        .hb2-cta{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:.12em;background:#C41E1E;color:#F2E8D5;padding:9px 22px;text-decoration:none;transition:all .2s;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%);}
        .hb2-cta:hover{background:#a01818;}
        @keyframes pulseRed{0%,100%{box-shadow:0 0 0 0 rgba(196,30,30,.4)}50%{box-shadow:0 0 0 10px rgba(196,30,30,0)}}
        @keyframes menuFadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:500, height:64,
        background: scrolled ? "rgba(14,10,7,.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(196,30,30,.25)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 6%", transition:"all .3s",
      }}>
        {/* Logo */}
        <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <svg width="30" height="30" viewBox="0 0 32 32">
            <polygon points="16,2 30,16 16,30 2,16" fill="none" stroke="#C41E1E" strokeWidth="2"/>
            <polygon points="16,8 24,16 16,24 8,16" fill="#C41E1E" opacity=".7"/>
            <polygon points="16,12 20,16 16,20 12,16" fill="#F2E8D5"/>
          </svg>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:".1em", lineHeight:1, color:"#F2E8D5" }}>HORNBILL</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:7, letterSpacing:".18em", color:"#C41E1E" }}>FESTIVAL · NAGALAND</div>
          </div>
        </a>

        {/* Desktop nav */}
        <div style={{ display:"flex", gap:28, alignItems:"center" }}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href} className={`hb2-link${active===l.label ? " active" : ""}`}>{l.label}</a>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <a href="/tourist" className="hb2-cta">PLAN VISIT</a>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#C41E1E", animation:"pulseRed 2s ease infinite" }} />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".1em", color:"rgba(242,232,213,.35)" }}>DEC 1–10</span>
          </div>
          <button onClick={() => setOpen(true)} style={{ background:"none", border:"none", color:"#F2E8D5", cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif", fontSize:20, lineHeight:1, padding:"4px" }}>☰</button>
        </div>
      </nav>

      {/* Mobile fullscreen */}
      {open && (
        <div style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(14,10,7,.98)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:0, animation:"menuFadeIn .25s ease both" }}>
          <button onClick={() => setOpen(false)} style={{ position:"absolute", top:24, right:24, background:"none", border:"none", color:"#F2E8D5", fontSize:28, cursor:"pointer", fontFamily:"'Bebas Neue',sans-serif" }}>✕</button>

          {/* Decorative */}
          <svg width="48" height="48" viewBox="0 0 32 32" style={{ marginBottom:32, opacity:.4 }}>
            <polygon points="16,2 30,16 16,30 2,16" fill="none" stroke="#C41E1E" strokeWidth="1.5"/>
            <polygon points="16,8 24,16 16,24 8,16" fill="#C41E1E" opacity=".7"/>
          </svg>

          {[{ label:"Home", href:"/" }, ...LINKS].map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,8vw,64px)", letterSpacing:".08em",
              color:"#F2E8D5", textDecoration:"none", transition:"color .15s",
              borderBottom:"1px solid rgba(196,30,30,.1)", width:"100%", textAlign:"center",
              padding:"16px 0",
            }}>{l.label.toUpperCase()}</a>
          ))}

          <a href="/tourist" style={{ marginTop:28, fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:".12em", background:"#C41E1E", color:"#F2E8D5", padding:"14px 40px", textDecoration:"none", clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)" }}>PLAN YOUR VISIT →</a>
        </div>
      )}
    </>
  );
}
