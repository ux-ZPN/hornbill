import { useState } from "react";

const CATS = ["ALL","CULTURAL","MUSIC","SPORTS","ARTS","CINEMA"];

const EVENTS = [
  { id:1, date:"DEC 1–10", day:"DAILY", title:"Cultural Performances", cat:"CULTURAL", time:"All Day", venue:"Main Arena", badge:"DAILY", desc:"Energetic traditional folk dance and musical performances. Each tribe has their own elegantly beautiful ceremonial performance.", featured:true },
  { id:2, date:"DEC 1–10", day:"DAILY", title:"Hornbill Music Festival", cat:"MUSIC", time:"Evening", venue:"Dimapur & Kohima", badge:"NIGHTLY", desc:"Various local and international artists perform. The celebrations and concerts are carried out throughout the night.", featured:true },
  { id:3, date:"DEC 1–10", day:"DAILY", title:"Handlooms & Handicrafts", cat:"ARTS", time:"All Day", venue:"Exhibition Hall", badge:"EXHIBITION", desc:"Sales and exhibition of traditional art pieces, wood crafts, sculptures, paintings, and cane products.", featured:false },
  { id:4, date:"DEC 1–10", day:"DAILY", title:"Food Festival", cat:"CULTURAL", time:"All Day", venue:"Food Courts", badge:"LOCAL CUISINE", desc:"Various food stalls serving deliciously indulging Naga food. Wash it down with traditional rice beer.", featured:false },
  { id:5, date:"DEC 05", day:"EVENTS", title:"Naga Wrestling", cat:"SPORTS", time:"Morning", venue:"Sports Ground", badge:"COMPETITION", desc:"International Hornbill Naga Wrestling. A supreme display of athletic power in the traditional Naga style.", featured:true },
  { id:6, date:"DEC 1–10", day:"OPEN", title:"Eating Competitions", cat:"SPORTS", time:"Afternoon", venue:"Main Arena", badge:"CONTEST", desc:"Do you have what it takes? Participate in the fiery Naga King Chilli and Pineapple eating competitions.", featured:false },
  { id:7, date:"DEC 1–10", day:"OUTDOOR", title:"Dzukou Valley Day Hikes", cat:"SPORTS", time:"Morning", venue:"Dzukou Valley", badge:"ADVENTURE", desc:"Mountain biking and guided day hikes to one of the most breathtaking valleys in Nagaland.", featured:false },
  { id:8, date:"DEC 1–10", day:"NIGHT", title:"Night Carnival", cat:"CULTURAL", time:"Night", venue:"Kisama Village", badge:"CARNIVAL", desc:"Enjoy the Bamboo Carnival and Night Carnival, keeping the lively spirits of the celebration going.", featured:false },
];

export default function EventsPage() {
  const [cat, setCat] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = EVENTS.filter(e => {
    const matchCat = cat === "ALL" || e.cat === cat;
    const matchS = e.title.toLowerCase().includes(search.toLowerCase()) || e.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchS;
  });

  return (
    <div style={{ background: "repeating-linear-gradient(to bottom, #F0EBE0, #F0EBE0 39px, rgba(168, 50, 40, 0.15) 40px)", minHeight: "100vh", position: "relative", padding: "180px 8% 120px" }}>
      
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(60px, 12vw, 160px)", color: "#3D4A6B", fontStyle: "italic", marginBottom: "80px", lineHeight: 0.85 }}>
          The Schedule<br/>
          <span style={{ color: "#C4603A" }}>Board.</span>
        </h1>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "80px" }}>
          {CATS.map((c, i) => (
             <button key={c} style={{
               fontFamily: "'Space Mono', monospace", fontSize: "12px", padding: "10px 24px",
               background: cat === c ? "#C4603A" : "#F5EFE0",
               color: cat === c ? "#F5EFE0" : "#3D4A6B",
               border: "1px solid #E8B4A0",
               clipPath: i % 2 === 0 ? "polygon(2% 5%, 98% 0%, 100% 95%, 0% 100%)" : "polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)",
               transform: cat === c ? "rotate(-2deg) scale(1.05) translateY(-5px)" : `rotate(${i % 2 === 0 ? '-1deg' : '1deg'})`,
               boxShadow: cat === c ? "2px 8px 15px rgba(0,0,0,0.15)" : "none",
               cursor: "pointer", transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
             }} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <input className="search-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "36px",
          background: "none", border: "none", borderBottom: "3px solid #3D4A6B",
          color: "#3D4A6B", width: "100%", maxWidth: "600px", paddingBottom: "10px", outline: "none",
          marginBottom: "100px"
        }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "60px", alignItems: "start" }}>
          {filtered.map((e, index) => (
            <div key={e.id} style={{
              position: "relative",
              padding: "40px", background: "#F5EFE0",
              clipPath: `polygon(${index % 3 === 0 ? '5% 0, 100% 5%, 95% 100%, 0 95%' : index % 3 === 1 ? '0 5%, 95% 0, 100% 95%, 5% 100%' : '2% 2%, 98% 0, 100% 98%, 0 100%'})`,
              boxShadow: "inset 0 0 0 1px #E8B4A0",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              transform: "translateY(0) rotate(0deg)",
              cursor: "pointer",
            }}
            onMouseEnter={(ev) => ev.currentTarget.style.transform = `rotate(${index % 2 === 0 ? '1' : '-1'}deg) translateY(-8px)` }
            onMouseLeave={(ev) => ev.currentTarget.style.transform = "translateY(0) rotate(0deg)" }
            >
              {/* Massive background date */}
              <div style={{
                position: "absolute", top: "20px", right: "20px",
                fontFamily: "'Cormorant Garamond', serif", fontSize: "160px", color: "#E8B4A0", opacity: 0.25,
                lineHeight: 0.75, pointerEvents: "none", fontStyle: "italic", letterSpacing: "-0.05em",
                zIndex: 0
              }}>{e.date.split(" ")[1] || "—"}</div>
              
              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#C4603A", marginBottom: "15px", letterSpacing: "0.2em" }}>{e.badge} • {e.time}</p>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "36px", color: "#3D4A6B", marginBottom: "20px", lineHeight: 1.1 }}>{e.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#3D4A6B", lineHeight: 1.5, marginBottom: "30px", fontStyle: "italic", opacity: 0.8 }}>{e.desc}</p>
                
                <div style={{ display: "inline-block", fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#A83228", borderBottom: "1px solid #A83228", paddingBottom: "4px" }}>
                  @ {e.venue.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
          
          {filtered.length === 0 && (
             <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", color: "#C4603A", fontStyle: "italic" }}>Silence. No events found.</h3>
          )}
        </div>
      </div>
    </div>
  );
}
