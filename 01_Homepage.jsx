import { useState, useEffect, useRef } from "react";

const TRIBES = ["Angami","Ao","Chakhesang","Chang","Khiamniungan","Konyak","Lotha","Phom","Pochury","Rengma","Sangtam","Sumi","Yimchunger","Zeliang","Tikhir","Kachari"];

const HIGHLIGHTS = [
  { num:"01", title:"Tribal War Dances", sub:"16 tribes. One ground. Ancient rhythm.", tag:"CULTURAL" },
  { num:"02", title:"Rock & Folk Nights", sub:"Kisama shakes every evening.", tag:"MUSIC" },
  { num:"03", title:"Indigenous Games", sub:"Archery. Wrestling. Log-drum.", tag:"SPORTS" },
  { num:"04", title:"Naga Cuisine", sub:"Smoked pork. Bamboo shoot. Zutho.", tag:"FOOD" },
  { num:"05", title:"Handcraft Bazaar", sub:"Weaves, beads, cane, wood.", tag:"CRAFTS" },
  { num:"06", title:"CineFest", sub:"Northeast stories on screen.", tag:"CINEMA" },
];

// Tribal diamond / chevron SVG pattern as data URI
const TRIBAL_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' stroke='%23C41E1E' stroke-width='0.5' opacity='0.15'/%3E%3Cpath d='M30 10 L50 30 L30 50 L10 30 Z' stroke='%23C41E1E' stroke-width='0.3' opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`;

const ZIGZAG = `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='0,0 10,12 20,0 30,12 40,0' fill='none' stroke='%23C41E1E' stroke-width='2' opacity='0.6'/%3E%3C/svg%3E")`;

export default function Homepage() {
  const [tick, setTick] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const tickerRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 80);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navOpaque = scrollY > 80;

  return (
    <div style={{
      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
      background: "#0E0A07",
      color: "#F2E8D5",
      overflowX: "hidden",
      cursor: "default",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:#0E0A07} ::-webkit-scrollbar-thumb{background:#C41E1E}

        @keyframes drumBeat {
          0%,100%{transform:scaleY(1)} 10%{transform:scaleY(1.6)} 20%{transform:scaleY(0.8)}
          30%{transform:scaleY(1.4)} 40%{transform:scaleY(0.9)} 50%{transform:scaleY(1.5)} 60%{transform:scaleY(1)}
        }
        @keyframes fireFlicker {
          0%,100%{transform:scaleX(1) scaleY(1);opacity:1}
          25%{transform:scaleX(1.08) scaleY(1.12);opacity:.9}
          50%{transform:scaleX(.95) scaleY(1.2);opacity:1}
          75%{transform:scaleX(1.05) scaleY(.95);opacity:.85}
        }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes tribalSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes zigzagMove { from{background-position:0 0} to{background-position:40px 0} }
        @keyframes pulseRed { 0%,100%{box-shadow:0 0 0 0 rgba(196,30,30,.4)} 50%{box-shadow:0 0 0 12px rgba(196,30,30,0)} }
        @keyframes scanline { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }

        .nav-item { font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.14em; color:rgba(242,232,213,.6); text-decoration:none; transition:color .15s; text-transform:uppercase; }
        .nav-item:hover { color:#C41E1E; }
        .highlight-row { border-bottom:1px solid rgba(196,30,30,.2); transition:all .2s; cursor:pointer; }
        .highlight-row:hover { background:rgba(196,30,30,.08); padding-left:32px !important; }
        .highlight-row:hover .hl-num { color:#C41E1E !important; }
        .tribe-tag { font-family:'Space Mono',monospace; font-size:10px; letter-spacing:.12em; padding:3px 8px; border:1px solid rgba(196,30,30,.3); color:rgba(242,232,213,.4); transition:all .2s; white-space:nowrap; }
        .tribe-tag:hover { border-color:#C41E1E; color:#F2E8D5; background:rgba(196,30,30,.1); }
        .cta-primary { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:.12em; background:#C41E1E; color:#F2E8D5; border:none; padding:14px 40px; cursor:pointer; position:relative; overflow:hidden; transition:all .2s; clip-path:polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }
        .cta-primary::before { content:''; position:absolute; inset:0; background:rgba(255,255,255,.12); transform:translateX(-100%); transition:transform .3s; }
        .cta-primary:hover::before { transform:translateX(0); }
        .cta-secondary { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:.12em; background:transparent; color:#F2E8D5; border:2px solid rgba(242,232,213,.4); padding:14px 40px; cursor:pointer; transition:all .2s; clip-path:polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }
        .cta-secondary:hover { border-color:#C41E1E; color:#C41E1E; }
        .stat-block { border-left:3px solid #C41E1E; padding-left:16px; transition:all .2s; }
        .stat-block:hover { border-color:#F2E8D5; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        height:64,
        background: navOpaque ? "rgba(14,10,7,.96)" : "transparent",
        borderBottom: navOpaque ? "1px solid rgba(196,30,30,.3)" : "none",
        backdropFilter: navOpaque ? "blur(10px)" : "none",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 6%",
        transition:"all .35s",
      }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <polygon points="16,2 30,16 16,30 2,16" fill="none" stroke="#C41E1E" strokeWidth="2"/>
            <polygon points="16,8 24,16 16,24 8,16" fill="#C41E1E" opacity=".7"/>
            <polygon points="16,12 20,16 16,20 12,16" fill="#F2E8D5"/>
          </svg>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:".1em", lineHeight:1, color:"#F2E8D5" }}>HORNBILL</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".18em", color:"#C41E1E" }}>FESTIVAL · NAGALAND</div>
          </div>
        </div>

        <div style={{ display:"flex", gap:32 }}>
          {["About","Events","Tourist Info","Contact"].map(l => (
            <a key={l} href="#" className="nav-item">{l}</a>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(242,232,213,.4)", letterSpacing:".1em" }}>DEC 1–10 · 2025</span>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"#C41E1E", animation:"pulseRed 2s ease infinite" }} />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", position:"relative", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 6% 80px", overflow:"hidden" }}>

        {/* Background tribal diamond grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage: TRIBAL_PATTERN, backgroundSize:"60px 60px" }} />

        {/* Red gradient wash from top-right */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 70% at 80% 20%, rgba(196,30,30,.18) 0%, transparent 65%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, #0E0A07 30%, transparent 80%)" }} />

        {/* Vertical fire pillars */}
        {[15,35,55,72,88].map((x,i) => (
          <div key={i} style={{
            position:"absolute", bottom:0, left:`${x}%`,
            width:2, height:`${30+i*8}%`,
            background:`linear-gradient(to top, #C41E1E, rgba(196,30,30,.3), transparent)`,
            animation:`fireFlicker ${1.2+i*.3}s ease-in-out infinite ${i*.2}s`,
            transformOrigin:"bottom center",
          }} />
        ))}

        {/* Scanline effect */}
        <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.04) 3px, rgba(0,0,0,.04) 4px)", pointerEvents:"none" }} />

        {/* Decorative large year */}
        <div style={{
          position:"absolute", top:"8%", right:"5%",
          fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,14vw,180px)",
          color:"rgba(196,30,30,.06)", lineHeight:1, letterSpacing:".05em",
          userSelect:"none", animation:"fadeIn 1.5s ease .5s both",
        }}>2025</div>

        {/* Tribal spinning diamond top-left */}
        <div style={{ position:"absolute", top:"15%", left:"4%", animation:"tribalSpin 20s linear infinite" }}>
          <svg width="80" height="80" viewBox="0 0 80 80" opacity=".25">
            <polygon points="40,4 76,40 40,76 4,40" fill="none" stroke="#C41E1E" strokeWidth="1.5"/>
            <polygon points="40,16 64,40 40,64 16,40" fill="none" stroke="#C41E1E" strokeWidth="1"/>
            <polygon points="40,28 52,40 40,52 28,40" fill="#C41E1E"/>
          </svg>
        </div>

        {/* MAIN HERO TEXT */}
        <div style={{ position:"relative", zIndex:10, animation:"fadeSlideUp .9s ease .2s both" }}>

          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:2, background:"#C41E1E" }} />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:".2em", color:"#C41E1E", textTransform:"uppercase" }}>Nagaland · India · 25th Edition</span>
            <div style={{ width:32, height:2, background:"#C41E1E" }} />
          </div>

          <h1 style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(72px,16vw,200px)",
            lineHeight:.9,
            letterSpacing:".04em",
            color:"#F2E8D5",
            marginBottom:4,
          }}>
            <span style={{ display:"block" }}>HORN</span>
            <span style={{ display:"block", color:"#C41E1E", WebkitTextStroke:"2px #C41E1E", WebkitTextFillColor:"transparent" }}>BILL</span>
            <span style={{ display:"block", fontSize:"clamp(40px,8vw,100px)", color:"rgba(242,232,213,.5)", letterSpacing:".12em" }}>FESTIVAL</span>
          </h1>

          <div style={{ marginTop:28, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
            <div style={{ maxWidth:460 }}>
              <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:"clamp(16px,2vw,20px)", fontWeight:300, fontStyle:"italic", color:"rgba(242,232,213,.7)", lineHeight:1.7, marginBottom:28 }}>
                16 Naga tribes. One valley. Ten days of fire, dance, and living heritage that shakes the hills of Kisama every December.
              </p>
              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                <button className="cta-primary">EXPLORE FESTIVAL</button>
                <button className="cta-secondary">DEC 1–10 · KISAMA</button>
              </div>
            </div>

            {/* Stats vertical */}
            <div style={{ display:"flex", gap:32, flexWrap:"wrap" }}>
              {[["16","TRIBES"],["10","DAYS"],["25+","YEARS"],["60K","VISITORS"]].map(([n,l]) => (
                <div key={l} className="stat-block">
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5vw,56px)", lineHeight:1, color:"#F2E8D5" }}>{n}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".18em", color:"rgba(242,232,213,.4)", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER MARQUEE ── */}
      <div style={{ background:"#C41E1E", padding:"10px 0", overflow:"hidden", borderTop:"2px solid rgba(0,0,0,.3)", borderBottom:"2px solid rgba(0,0,0,.3)", position:"relative" }}>
        <div style={{ display:"flex", animation:"marquee 18s linear infinite", width:"max-content" }}>
          {Array(4).fill([...TRIBES]).flat().map((t,i) => (
            <span key={i} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:".15em", color:"#F2E8D5", marginRight:40, whiteSpace:"nowrap" }}>
              ◆ {t.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* ── WHAT'S AT THE FESTIVAL ── */}
      <section style={{ padding:"100px 6%", position:"relative" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(196,30,30,.4),transparent)" }} />

        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          {/* Header */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, marginBottom:64, alignItems:"end" }}>
            <div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:".22em", color:"#C41E1E", marginBottom:12 }}>// FESTIVAL PROGRAM</div>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,6vw,80px)", lineHeight:.95, letterSpacing:".04em" }}>
                WHAT HAPPENS<br/>
                <span style={{ WebkitTextStroke:"1.5px #F2E8D5", WebkitTextFillColor:"transparent" }}>AT KISAMA</span>
              </h2>
            </div>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:17, fontWeight:300, color:"rgba(242,232,213,.65)", lineHeight:1.8, alignSelf:"end" }}>
              From the crack of drums at dawn to fire-lit rock concerts at midnight — the Festival of Festivals packs a lifetime of Naga culture into ten wild days.
            </p>
          </div>

          {/* Highlight rows — editorial list style */}
          <div>
            {HIGHLIGHTS.map((h, i) => (
              <div key={h.num} className="highlight-row" style={{ display:"flex", alignItems:"center", gap:24, padding:"22px 16px 22px 16px", transition:"all .2s" }}>
                <span className="hl-num" style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"rgba(242,232,213,.25)", letterSpacing:".1em", minWidth:28, transition:"color .2s" }}>{h.num}</span>
                <div style={{ width:32, height:1, background:"rgba(196,30,30,.4)", flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(22px,3.5vw,38px)", letterSpacing:".06em", lineHeight:1, color:"#F2E8D5" }}>{h.title}</div>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.5)", fontStyle:"italic", marginTop:2 }}>{h.sub}</div>
                </div>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".14em", color:"#C41E1E", padding:"3px 10px", border:"1px solid rgba(196,30,30,.4)" }}>{h.tag}</span>
                <div style={{ width:20, height:20, clipPath:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", background:"rgba(196,30,30,.3)", flexShrink:0 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRIBES GRID ── */}
      <section style={{ padding:"80px 6%", background:"rgba(196,30,30,.04)", borderTop:"1px solid rgba(196,30,30,.15)", borderBottom:"1px solid rgba(196,30,30,.15)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:32, flexWrap:"wrap", gap:12 }}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(28px,4vw,52px)", letterSpacing:".06em" }}>16 TRIBES · ONE FESTIVAL</h2>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:".14em", color:"rgba(242,232,213,.35)" }}>NAGALAND · NORTHEAST INDIA</span>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {TRIBES.map((t, i) => (
              <div key={t} className="tribe-tag">{t.toUpperCase()}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATE / LOCATION CALLOUT ── */}
      <section style={{ padding:"100px 6%", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage: TRIBAL_PATTERN, backgroundSize:"60px 60px", opacity:.4 }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 50%, rgba(14,10,7,.4) 0%, #0E0A07 70%)" }} />

        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
          {/* Animated zigzag border top */}
          <div style={{ height:12, backgroundImage: ZIGZAG, backgroundRepeat:"repeat-x", backgroundSize:"40px 12px", marginBottom:40, animation:"zigzagMove .8s linear infinite" }} />

          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:".22em", color:"#C41E1E", marginBottom:16 }}>MARK YOUR CALENDAR</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(48px,10vw,120px)", lineHeight:.9, letterSpacing:".04em", marginBottom:8 }}>
            <span style={{ display:"block", color:"#F2E8D5" }}>DEC 1–10</span>
            <span style={{ display:"block", fontSize:"clamp(24px,5vw,60px)", WebkitTextStroke:"1px rgba(242,232,213,.4)", WebkitTextFillColor:"transparent", letterSpacing:".12em" }}>KISAMA · NAGALAND</span>
          </h2>

          <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:17, color:"rgba(242,232,213,.6)", lineHeight:1.8, maxWidth:520, margin:"24px auto 40px", fontStyle:"italic" }}>
            Kisama Heritage Village, 12 km from Kohima. At 1,500m above sea level, surrounded by the hills that the Nagas have called home for centuries.
          </p>

          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="cta-primary" style={{ fontSize:16 }}>PLAN YOUR VISIT</button>
            <button className="cta-secondary" style={{ fontSize:16 }}>VIEW ALL EVENTS</button>
          </div>

          {/* Zigzag border bottom */}
          <div style={{ height:12, backgroundImage: ZIGZAG, backgroundRepeat:"repeat-x", backgroundSize:"40px 12px", marginTop:40, animation:"zigzagMove .8s linear infinite reverse" }} />
        </div>
      </section>

      {/* ── DRUM VISUALIZER FOOTER CTA ── */}
      <section style={{ padding:"60px 6% 40px", borderTop:"1px solid rgba(196,30,30,.2)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
        <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:48 }}>
          {Array(16).fill(0).map((_,i) => {
            const h = 20 + Math.sin((tick + i * 1.8) * 0.4) * 18 + Math.sin((tick + i * 0.9) * 0.7) * 10;
            return <div key={i} style={{ width:5, height:`${Math.max(8, h)}px`, background: i % 4 === 0 ? "#C41E1E" : "rgba(242,232,213,.25)", borderRadius:1, transition:"height .08s ease", transformOrigin:"bottom" }} />;
          })}
        </div>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(24px,4vw,44px)", letterSpacing:".06em", lineHeight:1 }}>THE BEAT OF NAGALAND</div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:".16em", color:"rgba(242,232,213,.35)", marginTop:4 }}>LIVE · DECEMBER · KISAMA VILLAGE</div>
        </div>
        <div style={{ display:"flex", gap:3, alignItems:"flex-end", height:48 }}>
          {Array(16).fill(0).map((_,i) => {
            const h = 20 + Math.sin((tick + i * 1.8 + 8) * 0.4) * 18 + Math.sin((tick + i * 0.9 + 4) * 0.7) * 10;
            return <div key={i} style={{ width:5, height:`${Math.max(8, h)}px`, background: i % 4 === 0 ? "#C41E1E" : "rgba(242,232,213,.25)", borderRadius:1, transition:"height .08s ease" }} />;
          })}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"rgba(0,0,0,.5)", borderTop:"1px solid rgba(196,30,30,.3)", padding:"48px 6% 28px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <svg width="24" height="24" viewBox="0 0 32 32">
                  <polygon points="16,2 30,16 16,30 2,16" fill="none" stroke="#C41E1E" strokeWidth="2"/>
                  <polygon points="16,10 22,16 16,22 10,16" fill="#C41E1E"/>
                </svg>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:".1em" }}>HORNBILL FESTIVAL</span>
              </div>
              <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.45)", lineHeight:1.8, maxWidth:260 }}>
                Organized by the Government of Nagaland. Celebrating 16 tribes and 25 years of living heritage.
              </p>
            </div>
            {[
              { title:"EXPLORE", links:["About Festival","16 Tribes","Heritage Village","Gallery"] },
              { title:"VISIT", links:["How to Reach","Where to Stay","Travel Guide","Entry Passes"] },
              { title:"CONNECT", links:["News","Contact","Press Kit","Privacy"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".2em", color:"#C41E1E", marginBottom:14 }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.4)", marginBottom:8, cursor:"pointer", transition:"color .15s" }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(196,30,30,.15)", paddingTop:18, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,232,213,.25)", letterSpacing:".1em" }}>© 2025 HORNBILL FESTIVAL · GOVERNMENT OF NAGALAND</span>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,232,213,.25)", letterSpacing:".1em" }}>FESTIVAL OF FESTIVALS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
