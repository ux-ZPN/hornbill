import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { QRCodeSVG } from 'qrcode.react';
import './Tickets.css'; 

export default function BookingSuccess() {
  useReveal();
  const location = useLocation();
  const { state } = location;

  if (!state || !state.bookingRef) {
    return <Navigate to="/tickets" replace />;
  }

  const { ticket, quantity, userEmail, bookingRef, bookingDate } = state;

  return (
    <div className="tickets-page" style={{ paddingBottom: '4rem' }}>
      {/* PAGE HERO */}
      <div className="page-hero" style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', padding: '10rem 2rem 3rem' }}>
        <div className="page-hero-bg" style={{ background:'radial-gradient(ellipse at 50% 50%, #2A1810 0%, #0F0A06 65%)' }}/>
        <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.06 }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
          <defs><pattern id="tkp" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect x="12" y="0" width="6" height="30" fill="#C4820A"/>
            <rect x="0" y="12" width="30" height="6" fill="#8B1A1A"/>
          </pattern></defs>
          <rect width="1440" height="400" fill="url(#tkp)" opacity="0.6"/>
        </svg>
        <div style={{ position:'relative', zIndex:1, textAlign: 'center' }} className="reveal">
          <div className="page-hero-eyebrow" style={{ color: 'var(--vermilion)' }}>Payment Successful!</div>
          <h1 className="page-hero-title" style={{ fontSize: '3rem', margin: '1rem 0' }}>See You at<br /><span>Kisama</span></h1>
          <p style={{ color: 'var(--cream-dark)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Your booking is confirmed. Below are your official ticket details. Check your email for further instructions.
          </p>
        </div>
      </div>

      <div className="pattern-band" />

      {/* TICKET DETAILS UI */}
      <div className="reveal" style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* The Digital Ticket */}
        <div style={{ 
          background: 'rgba(0,0,0,0.4)', 
          border: '1px solid rgba(196,130,10,0.3)', 
          borderRadius: '12px', 
          width: '100%', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
           {/* Notches for authentic ticket look */}
           <div style={{ position: 'absolute', top: '150px', left: '-15px', width: '30px', height: '30px', background: 'var(--bg-dark)', borderRadius: '50%', borderRight: '1px solid rgba(196,130,10,0.3)' }} />
           <div style={{ position: 'absolute', top: '150px', right: '-15px', width: '30px', height: '30px', background: 'var(--bg-dark)', borderRadius: '50%', borderLeft: '1px solid rgba(196,130,10,0.3)' }} />
           
           <div style={{ padding: '2.5rem', borderBottom: '1px dashed rgba(196,130,10,0.3)', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--ochre)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', opacity: 0.6 }}>
               REF: {bookingRef.substring(0,8).toUpperCase()}
             </div>
             
             <div style={{ color: 'var(--cream-dark)', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>TICKET TYPE</div>
             <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--font-display)', fontSize: '2.5rem', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
               {ticket.name}
             </h2>
             {ticket.category && (
               <span style={{ display: 'inline-block', padding: '0.2rem 0.8rem', background: 'var(--ochre)', color: '#000', fontSize: '0.8rem', fontWeight: 'bold', borderRadius: '4px', marginTop: '0.5rem' }}>
                 {ticket.category}
               </span>
             )}
             
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
                <div>
                  <div style={{ color: 'var(--cream-dark)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>QUANTITY</div>
                  <div style={{ color: 'var(--cream)', fontSize: '1.2rem', fontWeight: 'bold' }}>{quantity} Pass{quantity > 1 ? 'es' : ''}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--cream-dark)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>DATE BOOKED</div>
                  <div style={{ color: 'var(--cream)', fontSize: '1.2rem' }}>{bookingDate}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--cream-dark)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>ATTENDEE</div>
                  <div style={{ color: 'var(--cream)', fontSize: '1rem', overflowWrap: 'break-word', maxWidth: '200px' }}>{userEmail}</div>
                </div>
             </div>
           </div>
           
           <div style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(196,130,10,0.03)' }}>
             <p style={{ color: 'var(--cream-dark)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
               Present this QR code precisely upon entry at Kisama Heritage Village.
             </p>
             <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
                <QRCodeSVG value={`hornbill|${bookingRef}`} size={160} />
             </div>
             <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', letterSpacing: '4px', fontSize: '1.2rem', color: 'var(--cream)', opacity: 0.8 }}>
               {bookingRef.substring(0,8).toUpperCase()}-{bookingRef.substring(9,13).toUpperCase()}
             </div>
           </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', width: '100%', marginTop: '3rem', flexWrap: 'wrap' }}>
          <button onClick={() => window.print()} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
          
          <button onClick={() => alert('An extra copy of the ticket will be dispatched to ' + userEmail)} className="btn-solid" style={{ flex: 1, justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Ticket to Me
          </button>
        </div>
        
        <div style={{ marginTop: '3rem', cursor: 'pointer' }}>
          <Link to="/" className="navbar__link" style={{ fontSize: '1rem' }}>&#8592; Return Home</Link>
        </div>

      </div>
    </div>
  );
}
