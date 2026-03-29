import { useState } from "react";

const SECTIONS = ["HOW TO REACH","WHERE TO STAY","WHAT TO KNOW","ATTRACTIONS"];

const ROUTES = [
  { mode:"BY AIR", hub:"Dimapur Airport", distance:"Regularly serviced by major airlines", steps:["Linked to Kolkata and Guwahati","Direct flights from Delhi","Travel 2 hours by road to Kohima"], tip:"Pre-book cab from airport." },
  { mode:"BY RAIL", hub:"Dimapur Railhead", distance:"Major railhead, linked to Guwahati", steps:["Trains connected to Guwahati and rest of India","Visit irctc.co.in to book tickets","Travel 2.5 hours by road to Kohima"], tip:"Book return tickets early." },
  { mode:"BY ROAD", hub:"NH-29 & NH-2", distance:"From Shillong or Guwahati", steps:["Good road network covers the state","First proceed to Dimapur","Then travel to Kohima by road"], tip:"State Transport runs buses." },
  { mode:"ENTRY PERMIT", hub:"Inner Line Permit (ILP)", distance:"Mandatory for Tourists", steps:["Domestic: Apply at ilp.nagaland.gov.in or DRC offices","Foreigners: Register at FRO (Dimapur Police) within 24 hrs"], tip:"Get permits before arriving." }
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
  { name:"WORLD WAR II CEMETERY", dist:"Kohima", mood:"Historic", body:"1420 commonwealth funerals from the Japanese Invasion of 1944. Preserves the famous cross: 'For your tomorrow, we gave our today'." },
  { name:"STATE MUSEUM", dist:"Bayavu Hill", mood:"Cultural", body:"Rare artefacts of all 16 tribes. Clan motifs, precious stones, traditional attires, and Naga Morung hut models." },
  { name:"CATHOLIC CATHEDRAL", dist:"Aradhurah Hill", mood:"Spiritual", body:"One of the biggest churches in Northeast India. Its architecture reflects a blend of indigenous and creative art." },
  { name:"KHONOMA VILLAGE", dist:"20 km away", mood:"Heritage", body:"The last base of the Naga warriors rebelling against the British Empire. Features carved terraces for 20 types of paddy." },
  { name:"NAGA BAZAAR", dist:"Kohima Town", mood:"Bustling", body:"Famous for livestock trading, where local women in traditional dress sell handicrafts, poultry, and fishery products." },
];

export default function TouristInfoPage() {
  const [sec, setSec] = useState(0);

  return (
    <div style={{ background: "#E8EDDA", minHeight: "100vh", position: "relative", padding: "180px 0 160px", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 8%" }}>
        
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(60px, 12vw, 150px)", color: "#3D4A6B", marginBottom: "80px", lineHeight: 0.85, letterSpacing: "-0.03em" }}>
          The Field<br/>
          <span style={{ color: "#E8B4A0", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>Guide.</span>
        </h1>

        {/* Hand-drawn tab dividers */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "120px", position: "relative" }}>
          <svg style={{ position: "absolute", bottom: "-15px", left: 0, width: "100%", height: "20px" }} preserveAspectRatio="none">
            <path d="M0,10 Q150,-10 300,10 T600,10 T900,10 T1200,10" fill="none" stroke="#E8B4A0" strokeWidth="2" strokeDasharray="5 5" />
          </svg>
          {SECTIONS.map((s, i) => (
             <button key={s} onClick={() => setSec(i)} style={{
               fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "28px", color: sec === i ? "#C4603A" : "#3D4A6B",
               background: "none", border: "none", cursor: "pointer", transition: "color 0.4s ease", padding: "10px 0"
             }}>
               {s}
             </button>
          ))}
        </div>

        {/* HOW TO REACH */}
        {sec === 0 && (
          <div style={{ animation: "curtainWipe 0.6s cubic-bezier(0.19, 1, 0.22, 1) both" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px" }}>
              {ROUTES.map(r => (
                <div key={r.mode} style={{ position: "relative" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "16px", letterSpacing: "0.15em", color: "#C4603A", marginBottom: "15px" }}>{r.mode}</div>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "36px", color: "#3D4A6B", marginBottom: "5px", lineHeight: 1 }}>{r.hub}</h3>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "18px", color: "#3D4A6B", opacity: 0.7, marginBottom: "30px" }}>{r.distance}</div>
                  
                  <ul style={{ listStyle: "none", padding: 0, borderLeft: "2px solid #E8B4A0", paddingLeft: "20px", marginBottom: "40px" }}>
                    {r.steps.map((step, si) => (
                      <li key={si} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", margin: "10px 0", color: "#3D4A6B", lineHeight: 1.4 }}>{step}</li>
                    ))}
                  </ul>

                  <div style={{ background: "rgba(232, 180, 160, 0.2)", padding: "20px" }}>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#C4603A", letterSpacing: "0.1em", marginBottom: "5px" }}>FIELD NOTE:</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "20px", color: "#3D4A6B", lineHeight: 1.4 }}>{r.tip}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "120px", position: "relative", padding: "60px" }}>
               <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.1, zIndex: 0 }} viewBox="0 0 100 100" preserveAspectRatio="none">
                 <polygon points="10,0 100,20 90,100 0,80" fill="#C4603A" />
               </svg>
               <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                 <div>
                   <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "40px", color: "#3D4A6B", marginBottom: "10px" }}>Kisama Heritage Village</h3>
                   <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "0.3em", color: "#3D4A6B" }}>25.5971° N, 94.1205° E</p>
                 </div>
                 <a href="https://maps.google.com/?q=Kisama+Heritage+Village+Nagaland" target="_blank" rel="noopener noreferrer" style={{
                   fontFamily: "'Space Mono', monospace", fontSize: "14px", letterSpacing: "0.2em", background: "#3D4A6B", color: "#E8EDDA", padding: "16px 32px", textDecoration: "none"
                 }}>
                   OPEN MAPS →
                 </a>
               </div>
            </div>
          </div>
        )}

        {/* WHERE TO STAY */}
        {sec === 1 && (
          <div style={{ animation: "curtainWipe 0.6s cubic-bezier(0.19, 1, 0.22, 1) both" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "36px", color: "#A83228", marginBottom: "80px", lineHeight: 1.3, maxWidth: "800px" }}>
              Every hotel in Kohima fills up months in advance. Hornbill week is the most booked period of the year. Do not wait.
            </p>

            {STAYS.map(stay => (
              <div key={stay.tier} style={{ marginBottom: "80px", position: "relative", paddingLeft: "40px", borderLeft: "2px dashed #E8B4A0" }}>
                <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "20px", marginBottom: "30px" }}>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 5vw, 64px)", color: "#3D4A6B" }}>{stay.tier}</h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", letterSpacing: "0.15em", color: "#C4603A" }}>{stay.range}</p>
                </div>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "20px" }}>
                  {stay.options.map((o, i) => (
                    <span key={o} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: "#3D4A6B", padding: "10px 20px", background: "rgba(255,255,255,0.4)", transform: `rotate(${i % 2 === 0 ? '-1deg' : '1deg'})` }}>
                      {o}
                    </span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "20px", color: "#3D4A6B", opacity: 0.6 }}>{stay.note}</p>
              </div>
            ))}
          </div>
        )}

        {/* WHAT TO KNOW */}
        {sec === 2 && (
          <div style={{ animation: "curtainWipe 0.6s cubic-bezier(0.19, 1, 0.22, 1) both" }}>
             <div style={{ display: "flex", flexDirection: "column", gap: "60px", maxWidth: "800px", margin: "0 auto" }}>
               {TIPS.map((tip, i) => (
                 <div key={tip.label} style={{
                    background: "#F7D99E",
                    padding: "40px 60px",
                    transform: `rotate(${i % 2 === 0 ? '-2deg' : '2deg'})`,
                    boxShadow: "2px 8px 25px rgba(0,0,0,0.06)",
                    position: "relative"
                 }}>
                   <div style={{ position: "absolute", top: "-15px", left: "50%", transform: "translateX(-50%)", width: "40px", height: "30px", background: "rgba(0,0,0,0.1)", mixBlendMode: "multiply" }} />
                   
                   <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "14px", letterSpacing: "0.2em", color: "#C4603A", marginBottom: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
                     <span style={{ fontSize: "24px" }}>{tip.icon}</span> {tip.label}
                   </h3>
                   <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "28px", color: "#3D4A6B", lineHeight: 1.5 }}>
                     {tip.body}
                   </p>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* ATTRACTIONS */}
        {sec === 3 && (
          <div style={{ animation: "curtainWipe 0.6s cubic-bezier(0.19, 1, 0.22, 1) both" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#3D4A6B", fontStyle: "italic", marginBottom: "80px", maxWidth: "700px", lineHeight: 1.4 }}>
              Nagaland is more than the festival. The hills, the villages, the history — they deserve days of their own.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "100px", maxWidth: "800px", margin: "0 auto" }}>
              {ATTRACTIONS.map((a, i) => (
                <div key={a.name} style={{ position: "relative" }}>
                   <div style={{ 
                     position: "absolute", top: "-40px", left: "-60px", 
                     fontFamily: "'Cormorant Garamond', serif", fontSize: "160px", color: "#E8B4A0", opacity: 0.3, fontStyle: "italic", lineHeight: 0.8,
                     zIndex: 0, pointerEvents: "none"
                   }}>
                     {(i+1).toString().padStart(2, '0')}
                   </div>

                   <div style={{ position: "relative", zIndex: 1, paddingLeft: "40px", borderLeft: "1px solid #C4603A" }}>
                     <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "20px", marginBottom: "15px" }}>
                       <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 42px)", color: "#3D4A6B" }}>{a.name}</h3>
                       <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.15em", color: "#C4603A" }}>{a.dist}</span>
                     </div>
                     
                     <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: "#3D4A6B", lineHeight: 1.6, marginBottom: "20px", opacity: 0.9 }}>
                       {a.body}
                     </p>
                     
                     <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", color: "#A83228", textTransform: "uppercase" }}>
                       [ FEELING: {a.mood} ]
                     </span>
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
