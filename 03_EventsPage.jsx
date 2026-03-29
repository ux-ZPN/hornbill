import { useState } from "react";

const CATS = ["ALL","CULTURAL","MUSIC","SPORTS","ARTS","CINEMA"];

const EVENTS = [
  { id:1, date:"DEC 01", day:"SAT", title:"Opening Ceremony", cat:"CULTURAL", time:"10:00 AM", venue:"Main Arena", badge:"OPENING", desc:"All 16 tribes assemble in full warrior regalia. Lamp lighting, conch blowing, and a procession that shakes Kisama to its roots.", featured:true },
  { id:2, date:"DEC 1–10", day:"DAILY", title:"Tribal War Dances", cat:"CULTURAL", time:"11AM & 3PM", venue:"Cultural Arena", badge:"DAILY", desc:"Each tribe performs their ancient war dance, harvest song and ceremonial folk art. No costume. No rehearsal. Pure tradition.", featured:true },
  { id:3, date:"DEC 2–10", day:"NIGHTLY", title:"Hornbill Music Festival", cat:"MUSIC", time:"6:00 PM", venue:"Music Stage", badge:"NIGHTLY", desc:"International artists, Northeast bands, and traditional Naga musicians share the same stage. Rock meets log-drum.", featured:false },
  { id:4, date:"DEC 3–5", day:"EVE", title:"International Rock Contest", cat:"MUSIC", time:"4:00 PM", venue:"Rock Stage", badge:"COMPETITION", desc:"The biggest rock competition in Northeast India. Bands from across the country compete in the shadow of the hills.", featured:false },
  { id:5, date:"DEC 04", day:"WED", title:"Indigenous Games", cat:"SPORTS", time:"9:00 AM", venue:"Sports Ground", badge:"COMPETITION", desc:"Traditional archery, spear throwing, log-drum beating, and the legendary Naga wrestling — strength tested in the old way.", featured:false },
  { id:6, date:"DEC 05", day:"THU", title:"18th Naga Wrestling", cat:"SPORTS", time:"11:00 AM", venue:"Wrestling Arena", badge:"18TH EDITION", desc:"Warriors from all tribes. No weight class. No equipment. The ancient rules of Naga wrestling — raw power and technique.", featured:true },
  { id:7, date:"DEC 1–10", day:"DAILY", title:"Arts & Crafts Bazaar", cat:"ARTS", time:"8AM – 8PM", venue:"Craft Village", badge:"DAILY", desc:"200+ Naga artisans. Handwoven shawls, cane baskets, beaded war jewelry, carved headhunter totems and black pottery.", featured:false },
  { id:8, date:"DEC 03", day:"TUE", title:"Horn Blowing Competition", cat:"CULTURAL", time:"2:00 PM", venue:"Heritage Stage", badge:"3RD EDITION", desc:"Ancient communication made into art. Warriors demonstrate the traditional skill of calling across valleys through carved horns.", featured:false },
  { id:9, date:"DEC 6–8", day:"3 DAYS", title:"Nagaland CineFest", cat:"CINEMA", time:"3:00 PM", venue:"CineFest Pavilion", badge:"NEW", desc:"Northeast cinema takes the stage — short films, documentaries, and feature films rooted in Naga stories and Northeast identity.", featured:false },
  { id:10, date:"DEC 2–10", day:"DAILY", title:"Battle of Kohima Walk", cat:"CULTURAL", time:"7:00 AM", venue:"Kohima War Cemetery", badge:"HERITAGE", desc:"Guided walk through one of WWII's most decisive battles. The hill where the Japanese advance into India was stopped.", featured:false },
  { id:11, date:"DEC 1–10", day:"OPEN", title:"HIPFEST Photography", cat:"ARTS", time:"All Day", venue:"Exhibition Hall", badge:"OPEN ENTRY", desc:"Theme: 'Seasons of Nagaland'. Capture the festival, the hills, the tribes. Prize pool for top photographers.", featured:false },
  { id:12, date:"DEC 10", day:"SUN", title:"Closing Ceremony", cat:"CULTURAL", time:"7:00 PM", venue:"Main Arena", badge:"CLOSING", desc:"Ten days end in fire. A grand cultural finale, farewell dances from all 16 tribes, and fireworks over the Kisama hills.", featured:true },
];

const ZIGZAG = `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='0,0 10,12 20,0 30,12 40,0' fill='none' stroke='%23C41E1E' stroke-width='2' opacity='0.5'/%3E%3C/svg%3E")`;

export default function EventsPage() {
  const [cat, setCat] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = EVENTS.filter(e => {
    const matchCat = cat === "ALL" || e.cat === cat;
    const matchS = e.title.toLowerCase().includes(search.toLowerCase()) || e.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchS;
  });

  const featured = filtered.filter(e => e.featured);
  const rest = filtered.filter(e => !e.featured);

  return (
    <div style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", background:"#0E0A07", color:"#F2E8D5", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes zigzagMove{from{background-position:0 0}to{background-position:40px 0}}
        .cat-btn{cursor:pointer;border:none;transition:all .2s;font-family:'Bebas Neue',sans-serif;letter-spacing:.1em;}
        .event-card{transition:all .2s;cursor:pointer;}
        .event-card:hover{background:rgba(196,30,30,.1)!important;border-color:rgba(196,30,30,.45)!important;}
        .event-row{transition:all .2s;cursor:pointer;border-bottom:1px solid rgba(196,30,30,.12);}
        .event-row:hover{background:rgba(196,30,30,.07)!important;}
        .search-input:focus{outline:none;border-color:rgba(196,30,30,.6)!important;box-shadow:0 0 0 2px rgba(196,30,30,.12);}
      `}</style>

      {/* HEADER */}
      <div style={{ padding:"120px 6% 60px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 60% at 80% 30%, rgba(196,30,30,.12) 0%, transparent 65%)" }} />
        <div style={{ position:"absolute", left:"-5%", top:"5%", fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(100px,20vw,280px)", color:"rgba(196,30,30,.03)", lineHeight:1, userSelect:"none" }}>EVENTS</div>

        <div style={{ position:"relative", zIndex:2, animation:"fadeUp .7s ease both" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ width:24, height:2, background:"#C41E1E" }} />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:".2em", color:"#C41E1E" }}>DEC 1–10 · KISAMA · 2025</span>
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,12vw,140px)", lineHeight:.9, letterSpacing:".04em", marginBottom:20 }}>
            <span style={{ display:"block" }}>FULL</span>
            <span style={{ display:"block", WebkitTextStroke:"2px #C41E1E", WebkitTextFillColor:"transparent" }}>PROGRAM</span>
          </h1>
        </div>
      </div>

      <div style={{ height:12, backgroundImage:ZIGZAG, backgroundRepeat:"repeat-x", backgroundSize:"40px 12px", animation:"zigzagMove .8s linear infinite" }} />

      {/* CONTROLS */}
      <div style={{ padding:"32px 6%", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16, borderBottom:"1px solid rgba(196,30,30,.15)" }}>
        {/* Category filters */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {CATS.map(c => (
            <button key={c} className="cat-btn" onClick={() => setCat(c)} style={{
              fontSize:13, padding:"8px 18px",
              background: cat===c ? "#C41E1E" : "transparent",
              color: cat===c ? "#F2E8D5" : "rgba(242,232,213,.4)",
              border: cat===c ? "none" : "1px solid rgba(196,30,30,.25)",
              clipPath:"polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,0 100%)",
            }}>{c}</button>
          ))}
        </div>
        {/* Search */}
        <input className="search-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="SEARCH EVENTS..."
          style={{ fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:".1em", padding:"10px 16px", background:"rgba(255,255,255,.03)", border:"1px solid rgba(196,30,30,.2)", color:"#F2E8D5", width:240, transition:"border-color .2s" }} />
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"56px 6% 100px" }}>

        {/* FEATURED events — large cards */}
        {featured.length > 0 && (
          <div style={{ marginBottom:56 }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".2em", color:"#C41E1E", marginBottom:20 }}>◆ FEATURED EVENTS</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:16 }}>
              {featured.map(e => (
                <div key={e.id} className="event-card" style={{ background:"rgba(196,30,30,.07)", border:"1px solid rgba(196,30,30,.25)", padding:"0" }}>
                  {/* Top color bar */}
                  <div style={{ height:3, background:"#C41E1E" }} />
                  <div style={{ padding:"24px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                      <div>
                        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#C41E1E", letterSpacing:".14em" }}>{e.badge}</div>
                        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(22px,3vw,32px)", letterSpacing:".06em", lineHeight:1.05, marginTop:4 }}>{e.title.toUpperCase()}</div>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"#C41E1E", lineHeight:1 }}>{e.date}</div>
                        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"rgba(242,232,213,.35)", letterSpacing:".1em" }}>{e.day}</div>
                      </div>
                    </div>
                    <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.65)", lineHeight:1.8, marginBottom:16 }}>{e.desc}</p>
                    <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                      {[[e.time],[e.venue]].map(([val], vi) => (
                        <span key={vi} style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".1em", color:"rgba(242,232,213,.4)", padding:"3px 8px", border:"1px solid rgba(196,30,30,.2)" }}>{val}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REST — compact rows */}
        {rest.length > 0 && (
          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".2em", color:"rgba(242,232,213,.35)", marginBottom:16 }}>ALL EVENTS — {rest.length} LISTED</div>
            <div>
              {rest.map(e => (
                <div key={e.id} className="event-row" style={{ display:"grid", gridTemplateColumns:"80px 1fr auto", gap:20, padding:"18px 12px", alignItems:"center" }}>
                  <div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:"#C41E1E", lineHeight:1 }}>{e.date.replace("DEC ","")}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".1em", color:"rgba(242,232,213,.3)" }}>DEC</div>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(18px,2.5vw,24px)", letterSpacing:".06em", lineHeight:1, marginBottom:3 }}>{e.title.toUpperCase()}</div>
                    <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:"rgba(242,232,213,.5)", fontStyle:"italic" }}>{e.venue} · {e.time}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".12em", color:"#C41E1E", padding:"2px 8px", border:"1px solid rgba(196,30,30,.3)", whiteSpace:"nowrap" }}>{e.badge}</span>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".1em", color:"rgba(242,232,213,.25)" }}>{e.cat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, color:"rgba(196,30,30,.3)", marginBottom:12 }}>NO RESULTS</div>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:"rgba(242,232,213,.4)" }}>Try different search terms or clear the filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
