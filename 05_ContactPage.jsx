import { useState } from "react";

const ZIGZAG = `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='0,0 10,12 20,0 30,12 40,0' fill='none' stroke='%23C41E1E' stroke-width='2' opacity='0.5'/%3E%3C/svg%3E")`;

const FAQ = [
  { q:"Do I need a permit to enter Nagaland?", a:"Indian citizens do not need an Inner Line Permit for Kohima or the festival. Foreign nationals need an ILP — apply at nagaland.gov.in. It is a simple process but do it before you travel." },
  { q:"What are the entry ticket prices?", a:"Day passes and 10-day passes are available at the festival gates. Prices are announced 2 months before the festival. Children under 12 enter free. Check the official website for updates." },
  { q:"Is it safe for solo travelers and families?", a:"Nagaland is one of the safest states in India for tourists. The festival grounds have visible security. Solo women travelers report very positive experiences. Families with children are warmly welcomed." },
  { q:"What currency is used?", a:"Indian Rupees (INR) only. Carry sufficient cash — ATM availability near Kisama is limited and card connectivity at stalls is unreliable. Withdraw in Kohima before heading to Kisama." },
  { q:"How cold does it get in December?", a:"Kohima in December: 8°C at night, 18–20°C in the afternoon. Warm jacket essential for evenings and the morning walk. Layering is the key — afternoons can be pleasant in the sun." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const [faq, setFaq] = useState(null);

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = e => { e.preventDefault(); if (form.name && form.email && form.message) setSent(true); };

  return (
    <div style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", background:"#0E0A07", color:"#F2E8D5", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes zigzagMove{from{background-position:0 0}to{background-position:40px 0}}
        @keyframes drawCheck{from{stroke-dashoffset:60}to{stroke-dashoffset:0}}
        .form-field{transition:border-color .2s;}
        .form-field:focus{outline:none;border-color:#C41E1E!important;box-shadow:0 0 0 2px rgba(196,30,30,.15);}
        .faq-row{cursor:pointer;border-bottom:1px solid rgba(196,30,30,.12);transition:background .15s;}
        .faq-row:hover{background:rgba(196,30,30,.06)!important;}
        .info-line{border-bottom:1px solid rgba(196,30,30,.1);padding:14px 0;display:flex;gap:16px;align-items:baseline;}
        .info-line:last-child{border-bottom:none;}
        .submit-btn{cursor:pointer;border:none;font-family:'Bebas Neue',sans-serif;letter-spacing:.12em;transition:all .2s;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);}
        .submit-btn:hover{background:#a01818!important;transform:translateY(-1px);}
      `}</style>

      {/* HEADER */}
      <div style={{ padding:"120px 6% 60px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 60% at 90% 40%, rgba(196,30,30,.1) 0%, transparent 65%)" }} />
        <div style={{ position:"absolute", left:"-4%", top:"5%", fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,16vw,220px)", color:"rgba(196,30,30,.03)", lineHeight:1, userSelect:"none" }}>TALK</div>
        <div style={{ position:"relative", zIndex:2, animation:"fadeUp .7s ease both" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ width:24, height:2, background:"#C41E1E" }} />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:".2em", color:"#C41E1E" }}>GET IN TOUCH</span>
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,12vw,140px)", lineHeight:.9, letterSpacing:".04em" }}>
            <span style={{ display:"block" }}>CONTACT</span>
            <span style={{ display:"block", WebkitTextStroke:"2px #C41E1E", WebkitTextFillColor:"transparent" }}>US</span>
          </h1>
        </div>
      </div>

      <div style={{ height:12, backgroundImage:ZIGZAG, backgroundRepeat:"repeat-x", backgroundSize:"40px 12px", animation:"zigzagMove .8s linear infinite" }} />

      {/* INFO STRIP */}
      <div style={{ background:"rgba(196,30,30,.07)", borderBottom:"1px solid rgba(196,30,30,.2)", padding:"0 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:0 }}>
          {[
            ["VENUE","Kisama Heritage Village, 12 km from Kohima, Nagaland 797001"],
            ["PHONE","+91-370-2290035  ·  Mon–Sat, 9AM–6PM"],
            ["EMAIL","info@hornbillfestival.com  ·  media@hornbillfestival.com"],
            ["ORG","Dept. of Art & Culture, Government of Nagaland"],
          ].map(([label, val]) => (
            <div key={label} style={{ padding:"20px 16px", borderRight:"1px solid rgba(196,30,30,.12)" }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".18em", color:"#C41E1E", marginBottom:6 }}>{label}</div>
              <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:"rgba(242,232,213,.6)", lineHeight:1.7 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"64px 6% 100px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:48, alignItems:"start" }}>

          {/* FORM */}
          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".2em", color:"#C41E1E", marginBottom:12 }}>// SEND A MESSAGE</div>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(28px,5vw,52px)", letterSpacing:".06em", lineHeight:.95, marginBottom:32 }}>
              WE'D LOVE TO<br/>
              <span style={{ WebkitTextStroke:"1.5px #F2E8D5", WebkitTextFillColor:"transparent" }}>HEAR FROM YOU</span>
            </h2>

            {sent ? (
              <div style={{ border:"1px solid rgba(196,30,30,.4)", padding:"48px", textAlign:"center", animation:"fadeUp .4s ease both" }}>
                <svg width="56" height="56" viewBox="0 0 56 56" style={{ marginBottom:16 }}>
                  <polygon points="28,4 52,28 28,52 4,28" fill="none" stroke="#C41E1E" strokeWidth="1.5" opacity=".6"/>
                  <polyline points="18,28 25,35 38,21" fill="none" stroke="#C41E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" style={{ animation:"drawCheck .5s ease .2s both forwards" }} />
                </svg>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:".08em", marginBottom:8 }}>MESSAGE SENT</div>
                <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:"rgba(242,232,213,.6)", lineHeight:1.8, marginBottom:20 }}>Thank you, {form.name}. We'll get back to you within 2 business days.</p>
                <button onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }} style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".14em", background:"none", border:"1px solid rgba(196,30,30,.3)", color:"#C41E1E", padding:"8px 16px", cursor:"pointer" }}>SEND ANOTHER</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {[
                    { name:"name", label:"YOUR NAME *", placeholder:"e.g. Temsu Jamir", type:"text" },
                    { name:"email", label:"EMAIL ADDRESS *", placeholder:"you@email.com", type:"email" },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".16em", color:"rgba(242,232,213,.4)", display:"block", marginBottom:6 }}>{f.label}</label>
                      <input className="form-field" type={f.type} name={f.name} value={form[f.name]} onChange={onChange} placeholder={f.placeholder}
                        style={{ width:"100%", padding:"12px 14px", fontFamily:"'Crimson Pro',serif", fontSize:14, background:"rgba(255,255,255,.03)", border:"1px solid rgba(196,30,30,.2)", color:"#F2E8D5" }} />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".16em", color:"rgba(242,232,213,.4)", display:"block", marginBottom:6 }}>SUBJECT</label>
                  <select name="subject" value={form.subject} onChange={onChange} className="form-field"
                    style={{ width:"100%", padding:"12px 14px", fontFamily:"'Crimson Pro',serif", fontSize:14, background:"#120d09", border:"1px solid rgba(196,30,30,.2)", color: form.subject ? "#F2E8D5" : "rgba(242,232,213,.35)" }}>
                    <option value="">Select a topic...</option>
                    <option value="general">General Enquiry</option>
                    <option value="media">Media & Press</option>
                    <option value="tickets">Tickets & Entry</option>
                    <option value="stay">Accommodation</option>
                    <option value="sponsor">Partnership / Sponsorship</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".16em", color:"rgba(242,232,213,.4)", display:"block", marginBottom:6 }}>MESSAGE *</label>
                  <textarea name="message" value={form.message} onChange={onChange} rows={6} placeholder="Tell us how we can help..."
                    className="form-field" style={{ width:"100%", padding:"12px 14px", fontFamily:"'Crimson Pro',serif", fontSize:14, background:"rgba(255,255,255,.03)", border:"1px solid rgba(196,30,30,.2)", color:"#F2E8D5", resize:"vertical" }} />
                </div>

                <button type="submit" className="submit-btn" style={{ background:"#C41E1E", color:"#F2E8D5", fontSize:17, padding:"14px 36px", alignSelf:"flex-start" }}>SEND MESSAGE →</button>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {/* Social */}
            <div style={{ border:"1px solid rgba(196,30,30,.2)", padding:"24px" }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".18em", color:"#C41E1E", marginBottom:16 }}>FOLLOW THE FESTIVAL</div>
              {[["Instagram","@hornbillfestival"],["Facebook","Hornbill Festival Official"],["X / Twitter","@hornbillfest"],["YouTube","Hornbill Festival"]].map(([p,h]) => (
                <div key={p} className="info-line">
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:".12em", color:"rgba(242,232,213,.35)", minWidth:80 }}>{p.toUpperCase()}</span>
                  <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.65)" }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Response */}
            <div style={{ background:"rgba(196,30,30,.08)", border:"1px solid rgba(196,30,30,.25)", padding:"20px" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:".08em", marginBottom:8 }}>RESPONSE TIME</div>
              <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"rgba(242,232,213,.6)", lineHeight:1.75 }}>All enquiries answered within 1–2 business days. For urgent matters, call +91-370-2290035 directly.</p>
            </div>

            {/* Press */}
            <div style={{ border:"1px solid rgba(196,30,30,.15)", padding:"20px" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:".08em", marginBottom:8 }}>MEDIA & PRESS</div>
              <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:"rgba(242,232,213,.55)", lineHeight:1.75, marginBottom:12 }}>Press kit, high-res images, tribal background notes and press accreditation available on request.</p>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:".1em", color:"#C41E1E" }}>media@hornbillfestival.com</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop:80 }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:32 }}>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(28px,5vw,52px)", letterSpacing:".06em", lineHeight:1 }}>COMMON QUESTIONS</h2>
            <div style={{ height:1, flex:1, background:"rgba(196,30,30,.2)" }} />
          </div>
          <div style={{ maxWidth:800 }}>
            {FAQ.map((item, i) => (
              <div key={i} className="faq-row" onClick={() => setFaq(faq===i ? null : i)} style={{ padding:"0 8px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, padding:"18px 0" }}>
                  <span style={{ fontFamily:"'Crimson Pro',serif", fontSize:16, color:"#F2E8D5", lineHeight:1.4 }}>{item.q}</span>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, color:"#C41E1E", flexShrink:0, transform: faq===i ? "rotate(45deg)" : "none", transition:"transform .2s", lineHeight:1 }}>+</span>
                </div>
                {faq === i && (
                  <p style={{ fontFamily:"'Crimson Pro',serif", fontSize:15, color:"rgba(242,232,213,.6)", lineHeight:1.85, paddingBottom:18, fontStyle:"italic", animation:"fadeUp .25s ease both" }}>{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
