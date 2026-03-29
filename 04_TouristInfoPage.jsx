import { useState } from "react";

const SECTIONS = ["HOW TO REACH","WHERE TO STAY","WHAT TO KNOW","ATTRACTIONS"];

const ZIGZAG = `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='0,0 10,12 20,0 30,12 40,0' fill='none' stroke='%23C41E1E' stroke-width='2' opacity='0.5'/%3E%3C/svg%3E")`;

const ROUTES = [
  { mode:"BY AIR ✈", hub:"Dimapur Airport (DMU)", distance:"74 km from Kohima", steps:["Flights from Delhi, Kolkata, Guwahati, Imphal","Pre-book cab from airport to Kohima (2–2.5 hrs)","Kohima → Kisama: 20 min drive"], tip:"Book flights 3+ months early. Dec fares spike hard." },
  { mode:"BY RAIL 🚂", hub:"Dimapur Railway Station", distance:"Only railhead in Nagaland", steps:["Trains from Guwahati (4 hrs), Kolkata (24 hrs)","Shared taxis from station to Kohima (2.5 hrs)","Book return tickets before you arrive"], tip:"Pre-book return tickets — trains fill up fast in Dec." },
  { mode:"BY ROAD 🚌", hub:"NH-29 & NH-2", distance:"Well-connected highway network", steps:["Guwahati → Kohima: 5 hrs by bus or cab","Imphal → Kohima: 4 hrs","ISBT Kohima is the main bus terminal"], tip:"State Transport runs special festival buses." },
  { mode:"LOCAL TRANSPORT 🚗", hub:"Kohima → Kisama", distance:"12 km · 20 min drive", steps:["Festival shuttle buses run every 20 mins","Shared taxis and autos from Kohima town","Free Govt. shuttles during peak hours (10AM–5PM)"], tip:"Don't drive yourself — parking is chaotic." },
];

const STAYS = [
  { tier:"LUXURY", range:"₹3,500 – 8,000 / night", options:["Hotel Japfü, Kohima","Vivor Hotel, Kohima","The Heritage Hotel"], note:"Book 3+ months in advance." },
  { tier:"MID-RANGE", range:"₹1,500 – 3,500 / night", options:["Hotel Polo Towers","Classic Hotel Kohima","Acacia Hotel"], note:"Good availability if booked 6–8 weeks out." },
  { tier:"BUDGET & HOMESTAY", range:"₹400 – 1,500 / night", options:["Kisama village homestays","Kohima guesthouses","Festival camping zones"], note:"Homestays offer the most authentic experience." },
];

const TIPS = [
  { icon:"🌡", label:"WEATHER", body:"December: 8°C–20°C. Cold evenings, pleasant days. Carry a warm jacket. Light rain possible. Layer up." },
  { icon:"🪪", label:"INNER LINE PERMIT", body:"Indian citizens: no ILP needed for Kohima. Foreign nationals: get ILP before entering Nagaland at nagaland.gov.in." },
  { icon:"💵", label:"CASH IS KING", body:"Carry INR cash. ATMs near Kisama are limited. Card connectivity at stalls is unreliable. Withdraw in Kohima." },
  { icon:"👟", label:"WHAT TO WEAR", body:"Comfortable walking shoes — the festival ground is large. Dress modestly in tribal villages. Jeans + jacket works." },
  { icon:"📷", label:"PHOTOGRAPHY", body:"Festival grounds: photography allowed. Always ask permission before shooting tribal elders or ceremonies." },
  { icon:"🍺", label:"FOOD & DRINK", body:"Try Naga pork, bamboo shoot curry, smoked meat and Zutho (rice beer). Street food is safe and incredible." },
  { icon:"📱", label:"CONNECTIVITY", body:"Airtel and BSNL have decent coverage. Jio may be weak in some zones. Download offline maps of Kohima." },
  { icon:"🚨", label:"SAFETY", body:"Nagaland is very safe. Festival grounds have security. Keep valuables close in crowds. Medical stations on-site." },
];

const ATTRACTIONS = [
  { name:"KOHIMA WAR CEMETERY", dist:"12 km", mood:"Deeply moving", body:"WWII memorial honoring thousands who died in the Battle of Kohima — the turning point of Japan's India campaign. One of Asia's most powerful sites." },
  { name:"DZÜKOU VALLEY", dist:"25 km", mood:"Breathtaking", body:"A hidden valley at 2,450m covered in seasonal lilies and rhododendrons. A 3–4 hour trek from Viswema village. Worth every step." },
  { name:"NAGALAND STATE MUSEUM", dist:"In Kohima", mood:"Essential", body:"Tribal artifacts, headhunter relics, traditional weapons and textiles. The fastest way to understand Naga identity before the festival." },
  { name:"MON DISTRICT (KONYAK)", dist:"270 km", mood:"Once in a lifetime", body:"Home of the last tattooed headhunters. The Konyak Naga warriors with facial tattoos and ancient horn ornaments are a living window into a vanishing world." },
  { name:"DZÜLEKE VILLAGE", dist:"40 km", mood:"Serene", body:"A picture-perfect Angami village perched on a hill. Pine forests, terrace fields, traditional stone houses. Perfect for a morning trip." },
  { name:"MOKOKCHUNG", dist:"150 km", mood:"Cultural deep-dive", body:"The Ao Naga heartland. Visit authentic villages, see traditional weaving in action, and explore the town that produced Nagaland's literary culture." },
];

export default function TouristInfoPage() {
  const [sec, setSec] = useState(0);

  return (
    <div style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", background:"#0E0A07", color:"#F2E8D5", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes zigzagMove{from{background-position:0 0}to{background-position:40px 0}}
        .sec-btn{cursor:pointer;border:none;font-family:'Bebas Neue',sans-serif;letter-spacing:.08em;transition:all .2s;}
        .route-card{border:1px solid rgba(196,30,30,.2);transition:all .25s;}
        .route-card:hover{border-color:rgba(196,30,30,.5)!important;background:rgba(196,30,30,.06)!important;}
        .tip-card{border-bottom:1px solid rgba(196,30,30,.12);transition:background .2s;}
        .tip-card:hover{background:rgba(196,30,30,.06)!important;}
        .attr-card{border:1px solid rgba(196,30,30,.15);transition:all .25s;}
        .attr-card:hover{border-color:rgba(196,30,30,.45)!important;transform:translateX(4px);}
      `}</style>

      {/* HEADER */}
      <div style={{ padding:"120px 6% 60px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 50% 60% at 10% 50%, rgba(196,30,30,.1) 0%, transparent 65%)" }} />
        <div style={{ position:"absolute", right:"-2%", top:"0", fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,16vw,220px)", color:"rgba(196,30,30,.03)", lineHeight:1, userSelect:"none", letterSpacing:".04em" }}>TRAVEL</div>
        <div style={{ position:"relative", zIndex:2, animation:"fadeUp .7s ease both" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ width:24, height:2, background:"#C41E1E" }} />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:".2em", color:"#C41E1E" }}>PLAN YOUR JOURNEY</span>
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,12vw,140px)", lineHeight:.9, letterSpacing:".04em" }}>
            <span style={{ display:"block" }}>TOURIST</span>
            <span style={{ display:"block", WebkitTextStroke:"2px #C41E1E", WebkitTextFillColor:"transparent" }}>GUIDE</span>
          </h1>
        </div>
      </div>

      <div style={{ height:12, backgroundImage:ZIGZAG, backgroundRepeat:"repeat-x", backgroundSize:"40px 12px", animation:"zigzagMove .8s linear infinite" }} />

      {/* SECTION TABS */}
      <div style={{ display:"flex", gap:0, borderBottom:"1px solid rgba(196,30,30,.2)", overflowX:"auto", padding:"0 6%" }}>
        {SECTIONS.map((s,i) => (
          <button key={s} className="sec-btn" onClick={() => setSec(i)} style={{
            fontSize:14, padding:"14px 22px", whiteSpace:"nowrap",
            background: sec===i ? "#C41E1E" : "transparent",
            color: sec===i ? "#F2E8D5" : "rgba(242,232,213,.4)",
            borderBottom: sec===i ? "none" : "none",
            clipPath: sec===i ? "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)" : "none",
          }}>{s}</button>
        ))}
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"56px 6% 100px" }}>

        {/* HOW TO REACH */}
        {sec === 0 && (
          <div style={{ animation:"fadeUp .4s ease both" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20, marginBottom:36 }}>
              {ROUTES.map(r => (
                <div key={r.mode} className="route-card" style={{ padding:"24px" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:".08em", marginBottom:4 }}>{r.mode}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#C41E1E", letterSpacing:".12em", marginBottom:4 }}>{r.hub}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"rgba(242,232,213,.35)", letterSpacing:".1em", marginBottom:16 }}>{r.distance}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
                    {r.steps.map((step, si) => (
                      <div key={si} style={{ display:"flex", gap:10, alignItems:"baseline" }}>
                        <span style={{ width:16, height:16, clipPath:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)", background:"rgba(196,30,30,.4)", flexShrink:0, marginTop:2 }} />
                        <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.65)", lineHeight:1.6 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:"rgba(196,30,30,.1)", border:"1px solid rgba(196,30,30,.25)", padding:"10px 12px", display:"flex", gap:8 }}>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#C41E1E", letterSpacing:".1em", flexShrink:0 }}>TIP:</span>
                    <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:"rgba(242,232,213,.65)" }}>{r.tip}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ border:"1px solid rgba(196,30,30,.25)", padding:"28px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
              <div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:".08em", marginBottom:4 }}>KISAMA HERITAGE VILLAGE</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.55)", fontStyle:"italic" }}>12 km from Kohima · Nagaland, Northeast India · 1,500m elevation</div>
              </div>
              <a href="https://maps.google.com/?q=Kisama+Heritage+Village+Nagaland" target="_blank" rel="noopener noreferrer" style={{
                fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:".1em",
                background:"#C41E1E", color:"#F2E8D5", padding:"12px 24px",
                textDecoration:"none", clipPath:"polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)",
              }}>OPEN IN MAPS →</a>
            </div>
          </div>
        )}

        {/* WHERE TO STAY */}
        {sec === 1 && (
          <div style={{ animation:"fadeUp .4s ease both" }}>
            <div style={{ background:"rgba(196,30,30,.1)", border:"1px solid rgba(196,30,30,.3)", padding:"16px 20px", marginBottom:32, display:"flex", gap:12, alignItems:"flex-start" }}>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, color:"#C41E1E", flexShrink:0 }}>⚠ BOOK EARLY</span>
              <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.7)", lineHeight:1.7 }}>Every hotel in Kohima fills up months in advance. Hornbill week is the most booked period of the year in Nagaland. Book accommodation at least 2–3 months ahead.</span>
            </div>

            {STAYS.map(stay => (
              <div key={stay.tier} style={{ borderBottom:"1px solid rgba(196,30,30,.15)", paddingBottom:28, marginBottom:28 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:16, flexWrap:"wrap", gap:8 }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(24px,4vw,36px)", letterSpacing:".08em" }}>{stay.tier}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#C41E1E", letterSpacing:".12em" }}>{stay.range}</div>
                </div>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:12 }}>
                  {stay.options.map(o => (
                    <span key={o} style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.6)", padding:"6px 14px", border:"1px solid rgba(196,30,30,.2)" }}>{o}</span>
                  ))}
                </div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"rgba(242,232,213,.35)", letterSpacing:".1em" }}>{stay.note}</div>
              </div>
            ))}
          </div>
        )}

        {/* WHAT TO KNOW */}
        {sec === 2 && (
          <div style={{ animation:"fadeUp .4s ease both" }}>
            {TIPS.map(tip => (
              <div key={tip.label} className="tip-card" style={{ display:"grid", gridTemplateColumns:"36px 120px 1fr", gap:16, padding:"20px 12px", alignItems:"baseline" }}>
                <span style={{ fontSize:20 }}>{tip.icon}</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".14em", color:"#C41E1E" }}>{tip.label}</span>
                <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:"rgba(242,232,213,.7)", lineHeight:1.75 }}>{tip.body}</span>
              </div>
            ))}
          </div>
        )}

        {/* ATTRACTIONS */}
        {sec === 3 && (
          <div style={{ animation:"fadeUp .4s ease both" }}>
            <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:17, fontStyle:"italic", color:"rgba(242,232,213,.5)", marginBottom:36, lineHeight:1.7 }}>
              Nagaland is more than the festival. The hills, the villages, the history — they deserve days of their own.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {ATTRACTIONS.map(a => (
                <div key={a.name} className="attr-card" style={{ padding:"22px 24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"wrap", gap:8, marginBottom:10 }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(18px,3vw,26px)", letterSpacing:".08em" }}>{a.name}</div>
                    <div style={{ display:"flex", gap:10 }}>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"#C41E1E", padding:"2px 8px", border:"1px solid rgba(196,30,30,.3)", letterSpacing:".1em" }}>{a.dist}</span>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"rgba(242,232,213,.3)", padding:"2px 8px", border:"1px solid rgba(255,255,255,.08)", letterSpacing:".08em" }}>{a.mood.toUpperCase()}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:"rgba(242,232,213,.6)", lineHeight:1.8 }}>{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
