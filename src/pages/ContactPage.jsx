import { useState } from "react";

const FAQ = [
  { q:"Do I need a permit to enter Nagaland?", a:"Yes! Domestic tourists must obtain an Inner Line Permit via ilp.nagaland.gov.in. Foreign tourists must register at the Foreigners Registration Office (FRO) within 24 hours of arrival." },
  { q:"How do I reach Kisama?", a:"Fly into Dimapur Airport or take a train to Dimapur Railhead. From Dimapur, take a shared taxi or cab to Kohima (approx 2.5 hours). Kisama is another 12km from Kohima." },
  { q:"What is the festival address?", a:"The festival takes place entirely at the Naga Heritage Village, Kisama, Kohima, Nagaland, India." },
  { q:"How cold does it get in December?", a:"Kohima in December: 8°C at night, 18–20°C in the afternoon. Warm jacket essential for evenings and the morning walk. Layering is the key." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = e => { e.preventDefault(); if (form.name && form.email && form.message) setSent(true); };

  return (
    <div style={{ background: "linear-gradient(to bottom, #F7D99E, #F5EFE0)", minHeight: "100vh", position: "relative", padding: "180px 0 160px", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 8%" }}>
        
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(60px, 12vw, 150px)", color: "#3D4A6B", marginBottom: "80px", lineHeight: 0.85, letterSpacing: "-0.03em" }}>
          Write<br/>
          <span style={{ color: "#C4603A", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>To Us.</span>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "100px", alignItems: "start" }}>
          
          {/* Form */}
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "40px", position: "relative" }}>
            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.1, zIndex: 0, pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="none" stroke="#A83228" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
            
            {sent ? (
              <div style={{ position: "relative", zIndex: 1, padding: "40px 0", animation: "curtainWipe 0.6s ease" }}>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "40px", color: "#3D4A6B", marginBottom: "20px" }}>A Letter Sent.</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "24px", color: "#3D4A6B", lineHeight: 1.5, marginBottom: "40px" }}>
                  Thank you, {form.name}. The festival office in Kohima will open this within 2 days.
                </p>
                <button onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "14px", letterSpacing: "0.2em", color: "#A83228", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid #A83228", paddingBottom: "5px"
                }}>
                  WRITE ANOTHER →
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "40px" }}>
                <div style={{ position: "relative" }}>
                  <label style={{ position: "absolute", top: "-15px", left: 0, fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#C4603A", letterSpacing: "0.2em" }}>NAME [REQUIRED]</label>
                  <input type="text" name="name" value={form.name} onChange={onChange} style={{
                    width: "100%", border: "none", borderBottom: "1px solid #C4603A", background: "transparent",
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "32px", color: "#3D4A6B", padding: "15px 0", outline: "none"
                  }} />
                </div>
                
                <div style={{ position: "relative" }}>
                  <label style={{ position: "absolute", top: "-15px", left: 0, fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#C4603A", letterSpacing: "0.2em" }}>EMAIL [REQUIRED]</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} style={{
                    width: "100%", border: "none", borderBottom: "1px solid #C4603A", background: "transparent",
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "32px", color: "#3D4A6B", padding: "15px 0", outline: "none"
                  }} />
                </div>

                <div style={{ position: "relative" }}>
                  <label style={{ position: "absolute", top: "-15px", left: 0, fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#C4603A", letterSpacing: "0.2em" }}>SUBJECT</label>
                  <select name="subject" value={form.subject} onChange={onChange} style={{
                    width: "100%", border: "none", borderBottom: "1px solid #C4603A", background: "transparent",
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "32px", color: form.subject ? "#3D4A6B" : "rgba(61, 74, 107, 0.4)", padding: "15px 0", outline: "none", cursor: "pointer", appearance: "none"
                  }}>
                    <option value="" disabled>Choose a topic...</option>
                    <option value="general">General Enquiry</option>
                    <option value="media">Media & Press</option>
                    <option value="tickets">Tickets & Entry</option>
                  </select>
                </div>

                <div style={{ position: "relative" }}>
                  <label style={{ position: "absolute", top: "-15px", left: 0, fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#C4603A", letterSpacing: "0.2em" }}>WORDS [REQUIRED]</label>
                  <textarea name="message" value={form.message} onChange={onChange} rows={4} style={{
                    width: "100%", border: "none", borderBottom: "1px solid #C4603A", background: "transparent",
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "32px", color: "#3D4A6B", padding: "15px 0", outline: "none", resize: "none"
                  }} />
                </div>

                <button type="submit" style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "16px", letterSpacing: "0.2em",
                  color: "#3D4A6B", background: "none", border: "none", alignSelf: "flex-start", cursor: "pointer",
                  borderBottom: "2px solid #3D4A6B", paddingBottom: "5px", transition: "color 0.3s, border-color 0.3s"
                }}
                onMouseEnter={(e) => { e.target.style.color = "#A83228"; e.target.style.borderColor = "#A83228"; }}
                onMouseLeave={(e) => { e.target.style.color = "#3D4A6B"; e.target.style.borderColor = "#3D4A6B"; }}
                >
                  SEAL THIS ENVELOPE →
                </button>
              </form>
            )}
          </div>

          {/* Typographic Layout for Info */}
          <div>
            <div style={{ marginBottom: "60px" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "#C4603A", marginBottom: "10px" }}>VENUE</p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "42px", color: "#3D4A6B", lineHeight: 1.1, marginBottom: "15px" }}>Kisama Heritage<br/>Village</h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "22px", color: "#3D4A6B", opacity: 0.8 }}>12 km from Kohima,<br/>Nagaland 797001</p>
            </div>
            
            <div style={{ marginBottom: "60px" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "#C4603A", marginBottom: "10px" }}>SAY HELLO TO US</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "28px", color: "#3D4A6B", marginBottom: "15px", wordBreak: "break-all" }}>
                nagalandtourisminfo<br/>@gmail.com
              </h3>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "16px", color: "#3D4A6B", marginBottom: "25px", wordBreak: "break-all" }}>
                +91 370 2243124
              </h3>
            </div>

            <div style={{ marginBottom: "60px" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", color: "#C4603A", marginBottom: "20px" }}>SOCIAL FOOTPRINT</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {['@hornbillfestival', 'Hornbill Festival Official', '@hornbillfest'].map((handle, i) => (
                  <li key={handle} style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", color: "#3D4A6B", marginBottom: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
                    <span style={{ color: "#E8B4A0", fontSize: "40px", lineHeight: 0.5, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>~</span>
                    {handle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Scroll */}
        <div style={{ marginTop: "160px" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(48px, 8vw, 96px)", color: "#3D4A6B", marginBottom: "60px" }}>Common Questions</h2>
          <div style={{ borderTop: "3px solid #E8B4A0" }}>
            {FAQ.map((faq, i) => (
               <div key={i} style={{ borderBottom: "3px solid #E8B4A0" }}>
                 <button style={{ 
                    width: "100%", textAlign: "left", background: "none", border: "none", padding: "40px 0", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: "40px"
                   }}
                   onClick={() => setOpenFaq(openFaq === i ? null : i)}
                 >
                   <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", color: "#3D4A6B", lineHeight: 1.3 }}>{faq.q}</span>
                   <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "32px", color: "#C4603A" }}>{openFaq === i ? '—' : '+'}</span>
                 </button>
                 <div style={{ 
                   height: openFaq === i ? "auto" : "0", 
                   overflow: "hidden", 
                   opacity: openFaq === i ? 1 : 0,
                   transition: "opacity 0.6s ease"
                 }}>
                   <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "26px", color: "#3D4A6B", paddingBottom: "40px", lineHeight: 1.6, maxWidth: "800px" }}>
                     {faq.a}
                   </p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
