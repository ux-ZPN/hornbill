import { useState } from "react";

const TRIBES = [
  { name:"Angami", known:"Sekrenyi festival, stone-pulling ceremony", region:"Kohima" },
  { name:"Ao", known:"Moatsu festival, colorful shawls", region:"Mokokchung" },
  { name:"Chakhesang", known:"Tsukhenyie festival, distinct weaving", region:"Phek" },
  { name:"Chang", known:"Naknyulem festival, war dances", region:"Tuensang" },
  { name:"Khiamniungan", known:"Tsokum festival, bamboo crafts", region:"Tuensang" },
  { name:"Konyak", known:"Aoling festival, tattooed headhunters", region:"Mon" },
  { name:"Lotha", known:"Tokhu Emong harvest festival", region:"Wokha" },
  { name:"Phom", known:"Monyu festival, fire rituals", region:"Longleng" },
  { name:"Pochury", known:"Yemshe festival, distinct headgear", region:"Phek" },
  { name:"Rengma", known:"Ngada festival, iron smelting heritage", region:"Kohima" },
  { name:"Sangtam", known:"Amongmong festival, dance traditions", region:"Kiphire" },
  { name:"Sumi", known:"Tuluni festival, rice beer culture", region:"Zunheboto" },
  { name:"Yimchunger", known:"Metumneo festival, ancient songs", region:"Kiphire" },
  { name:"Zeliang", known:"Hegang festival, bamboo dance", region:"Peren" },
  { name:"Tikhir", known:"Jumai festival, unique oral traditions", region:"Longleng" },
  { name:"Kachari", known:"Baisagu festival, plains heritage", region:"Dimapur" },
];

const TIMELINE = [
  { year:"2000", title:"The Beginning", desc:"Govt. of Nagaland launches the festival to protect and showcase Naga cultural identity." },
  { year:"2005", title:"Global Attention", desc:"International delegations and foreign press discover the spectacle. Kisama goes on the world map." },
  { year:"2008", title:"Rock Music Added", desc:"Hornbill International Rock Contest begins. Metal meets morung." },
  { year:"2012", title:"UNESCO Notice", desc:"International heritage bodies recognize the festival as a model of intangible cultural preservation." },
  { year:"2015", title:"Permanent Venue", desc:"Kisama Heritage Village becomes the dedicated home. Tribal morungs built permanently." },
  { year:"2020", title:"Digital Edition", desc:"COVID forces a virtual festival — 2 million viewers watch online. New audience found globally." },
  { year:"2025", title:"Silver Jubilee", desc:"25 years. The Festival of Festivals celebrates its grandest edition yet." },
];

const TABS = ["THE FESTIVAL","16 TRIBES","HISTORY"];

const ZIGZAG = `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='0,0 10,12 20,0 30,12 40,0' fill='none' stroke='%23C41E1E' stroke-width='2' opacity='0.5'/%3E%3C/svg%3E")`;

export default function AboutPage() {
  const [tab, setTab] = useState(0);
  const [activeTribe, setActiveTribe] = useState(null);

  return (
    <div style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", background:"#0E0A07", color:"#F2E8D5", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes zigzagMove{from{background-position:0 0}to{background-position:40px 0}}
        .tab-btn{cursor:pointer;border:none;transition:all .2s;font-family:'Bebas Neue',sans-serif;letter-spacing:.1em;}
        .tribe-card{cursor:pointer;transition:all .2s;border:1px solid rgba(196,30,30,.15);}
        .tribe-card:hover,.tribe-card.active{background:rgba(196,30,30,.12)!important;border-color:rgba(196,30,30,.5)!important;}
        .fact-row{border-bottom:1px solid rgba(196,30,30,.12);padding:16px 0;display:flex;gap:20;align-items:baseline;}
        .fact-row:last-child{border-bottom:none;}
      `}</style>

      {/* PAGE HEADER */}
      <div style={{ padding:"120px 6% 72px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 20% 50%, rgba(196,30,30,.12) 0%, transparent 70%)" }} />
        <div style={{ position:"absolute", right:"-5%", top:"10%", fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(100px,20vw,260px)", color:"rgba(196,30,30,.04)", lineHeight:1, userSelect:"none", letterSpacing:".04em" }}>NAGA</div>

        <div style={{ position:"relative", zIndex:2, animation:"fadeUp .8s ease both" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <div style={{ width:24, height:2, background:"#C41E1E" }} />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:".2em", color:"#C41E1E" }}>KNOW THE STORY</span>
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,12vw,140px)", lineHeight:.9, letterSpacing:".04em" }}>
            <span style={{ display:"block" }}>ABOUT THE</span>
            <span style={{ display:"block", WebkitTextStroke:"2px #C41E1E", WebkitTextFillColor:"transparent" }}>FESTIVAL</span>
          </h1>
        </div>
      </div>

      {/* ZIGZAG DIVIDER */}
      <div style={{ height:12, backgroundImage:ZIGZAG, backgroundRepeat:"repeat-x", backgroundSize:"40px 12px", animation:"zigzagMove .8s linear infinite" }} />

      {/* TABS */}
      <div style={{ padding:"40px 6% 0", display:"flex", gap:0, borderBottom:"1px solid rgba(196,30,30,.2)" }}>
        {TABS.map((t,i) => (
          <button key={t} className="tab-btn" onClick={() => setTab(i)} style={{
            fontSize:16, padding:"14px 28px",
            background:tab===i ? "#C41E1E" : "transparent",
            color: tab===i ? "#F2E8D5" : "rgba(242,232,213,.4)",
            borderBottom: tab===i ? "none" : "none",
            clipPath: tab===i ? "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)" : "none",
          }}>{t}</button>
        ))}
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"64px 6% 100px" }}>

        {/* ── TAB 0: THE FESTIVAL ── */}
        {tab === 0 && (
          <div style={{ animation:"fadeUp .4s ease both" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start" }}>
              <div>
                <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(32px,5vw,60px)", lineHeight:.95, letterSpacing:".04em", marginBottom:24 }}>
                  THE FESTIVAL<br/>
                  <span style={{ WebkitTextStroke:"1.5px #F2E8D5", WebkitTextFillColor:"transparent" }}>OF FESTIVALS</span>
                </h2>
                <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:17, fontWeight:300, color:"rgba(242,232,213,.7)", lineHeight:1.85, marginBottom:20 }}>
                  The Hornbill Festival is named after the Indian Hornbill — the great forest bird whose feathers crown the ceremonial headgear of Naga warriors. Held every December in Kisama Heritage Village, it brings together all 16 major Naga tribes.
                </p>
                <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:17, fontWeight:300, color:"rgba(242,232,213,.7)", lineHeight:1.85, marginBottom:32 }}>
                  Launched in 2000 by the Government of Nagaland, the festival was born from a simple conviction: the living traditions of the Nagas must not die. They must be danced, sung, worn, cooked, and shared with the world.
                </p>

                {/* Key facts */}
                <div style={{ border:"1px solid rgba(196,30,30,.25)", padding:"24px" }}>
                  {[
                    ["NAMED AFTER", "The Great Indian Hornbill bird"],
                    ["SINCE", "Year 2000 · 25th Edition in 2025"],
                    ["VENUE", "Kisama Heritage Village, Nagaland"],
                    ["ORGANIZED BY", "Government of Nagaland"],
                    ["ELEVATION", "1,500m above sea level"],
                    ["WEATHER IN DEC", "8°C – 20°C · Cool and clear"],
                  ].map(([k,v]) => (
                    <div key={k} className="fact-row">
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".14em", color:"#C41E1E", minWidth:140 }}>{k}</span>
                      <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:"rgba(242,232,213,.75)" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Large decorative element */}
                <div style={{ position:"relative", marginBottom:32 }}>
                  <div style={{ border:"1px solid rgba(196,30,30,.3)", padding:"40px", position:"relative" }}>
                    <div style={{ position:"absolute", top:-1, left:20, right:20, height:1, background:"linear-gradient(90deg,transparent,#C41E1E,transparent)" }} />
                    <div style={{ position:"absolute", bottom:-1, left:20, right:20, height:1, background:"linear-gradient(90deg,transparent,#C41E1E,transparent)" }} />

                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:11, letterSpacing:".2em", color:"#C41E1E", marginBottom:16 }}>THE HORNBILL BIRD</div>
                    <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:16, color:"rgba(242,232,213,.65)", lineHeight:1.85, fontStyle:"italic" }}>
                      "The great Hornbill soars above the forest canopy of Nagaland. Its massive yellow-and-black beak, its white and black wings — it is the most revered creature in Naga folklore. Warriors wore its feathers as a mark of valor. The festival carries its name as a mark of pride."
                    </p>
                    <div style={{ marginTop:16, fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".12em", color:"rgba(242,232,213,.3)" }}>— NAGALAND CULTURAL ARCHIVES</div>
                  </div>
                </div>

                {/* Kisama facts */}
                <div style={{ background:"rgba(196,30,30,.07)", border:"1px solid rgba(196,30,30,.2)", padding:"28px" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:".1em", marginBottom:16 }}>KISAMA HERITAGE VILLAGE</div>
                  <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:"rgba(242,232,213,.65)", lineHeight:1.8 }}>
                    A compound built to house permanent replicas of each tribe's morung — the traditional youth dormitory. Every structure is authentic, every artefact real. This is not a museum. It is a living village.
                  </p>
                  <div style={{ marginTop:20, display:"flex", gap:16, flexWrap:"wrap" }}>
                    {["12 KM FROM KOHIMA","16 TRIBAL MORUNGS","PERMANENT VENUE"].map(tag => (
                      <span key={tag} style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".12em", color:"#C41E1E", padding:"4px 10px", border:"1px solid rgba(196,30,30,.35)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 1: 16 TRIBES ── */}
        {tab === 1 && (
          <div style={{ animation:"fadeUp .4s ease both" }}>
            <div style={{ marginBottom:40 }}>
              <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:18, fontWeight:300, fontStyle:"italic", color:"rgba(242,232,213,.6)", maxWidth:600, lineHeight:1.8 }}>
                Tap any tribe to learn what makes them distinct. Each carries centuries of song, weave, and warfare.
              </p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:10, marginBottom:32 }}>
              {TRIBES.map((t,i) => (
                <div key={t.name} className={`tribe-card${activeTribe===i ? " active" : ""}`}
                  onClick={() => setActiveTribe(activeTribe===i ? null : i)}
                  style={{ background:"rgba(255,255,255,.02)", padding:"14px 16px", cursor:"pointer" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:".08em", color:"#F2E8D5", marginBottom:2 }}>{t.name.toUpperCase()}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".12em", color:"rgba(242,232,213,.3)" }}>{t.region.toUpperCase()}</div>
                </div>
              ))}
            </div>

            {/* Detail panel */}
            {activeTribe !== null && (
              <div style={{ background:"rgba(196,30,30,.1)", border:"1px solid rgba(196,30,30,.35)", padding:"28px 32px", animation:"fadeUp .3s ease both" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"wrap", gap:12, marginBottom:12 }}>
                  <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, letterSpacing:".08em", color:"#F2E8D5" }}>{TRIBES[activeTribe].name.toUpperCase()}</h3>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".14em", color:"#C41E1E" }}>{TRIBES[activeTribe].region.toUpperCase()} DISTRICT</span>
                </div>
                <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:16, color:"rgba(242,232,213,.7)", lineHeight:1.8 }}>{TRIBES[activeTribe].known}</p>
              </div>
            )}

            <div style={{ marginTop:32, padding:"20px", background:"rgba(196,30,30,.05)", border:"1px solid rgba(196,30,30,.15)", display:"flex", gap:12, alignItems:"center" }}>
              <svg width="24" height="24" viewBox="0 0 32 32" style={{ flexShrink:0 }}>
                <polygon points="16,2 30,16 16,30 2,16" fill="none" stroke="#C41E1E" strokeWidth="1.5"/>
                <polygon points="16,10 22,16 16,22 10,16" fill="#C41E1E" opacity=".6"/>
              </svg>
              <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.55)", lineHeight:1.75, fontStyle:"italic" }}>
                The Hornbill — revered by every Naga tribe — represents courage, freedom, and the warrior spirit. Its feathers are the highest symbol of valor in Naga culture.
              </p>
            </div>
          </div>
        )}

        {/* ── TAB 2: HISTORY ── */}
        {tab === 2 && (
          <div style={{ animation:"fadeUp .4s ease both" }}>
            <div style={{ maxWidth:700 }}>
              {TIMELINE.map((item, i) => (
                <div key={item.year} style={{ display:"flex", gap:32, paddingBottom: i < TIMELINE.length - 1 ? 48 : 0, position:"relative" }}>
                  {/* Left: year + line */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0, width:56 }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:".06em", color:"#C41E1E", lineHeight:1 }}>{item.year}</div>
                    {i < TIMELINE.length - 1 && <div style={{ flex:1, width:1, background:"rgba(196,30,30,.2)", marginTop:8 }} />}
                  </div>
                  {/* Right: content */}
                  <div style={{ paddingTop:2 }}>
                    <div style={{ width:8, height:8, clipPath:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)", background:"#C41E1E", marginBottom:10 }} />
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:".08em", marginBottom:6, color:"#F2E8D5" }}>{item.title.toUpperCase()}</div>
                    <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:"rgba(242,232,213,.6)", lineHeight:1.8 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
