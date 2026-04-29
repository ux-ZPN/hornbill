import React, { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import TicketCard from '../components/TicketCard';
import BookingConfirmModal from '../components/BookingConfirmModal';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Tickets.css';

export default function Tickets() {
  useReveal();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        // filter active tickets
        const activeTickets = data.filter(t => t.active !== false && t.is_active !== false && t.status !== 'inactive');
        setTickets(activeTickets);
      }
    } catch (err) {
      console.error('Error fetching tickets:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleBuyNow = (ticket, qty) => {
    setSelectedTicket(ticket);
    setSelectedQty(qty);
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowBookingModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (selectedTicket) {
      setShowBookingModal(true);
    }
  };

  const confirmBooking = async () => {
    if (!selectedTicket || !user) return;
    
    const qty = selectedQty;
    
    try {
      // Use Supabase RPC to handle the booking and seat decrement atomically
      const { data, error } = await supabase.rpc('confirm_booking', {
        p_ticket_id: selectedTicket.id,
        p_user_id: user.id,
        p_quantity: qty,
        p_total_price: selectedTicket.price * qty
      });

      if (error) throw error;

      const bookingId = data.booking_id;
      const bookingRef = `HB-${bookingId.substring(0,8).toUpperCase()}`;

      setShowBookingModal(false);
      setSelectedTicket(null);
      fetchTickets();
      
      // Route to success page
      navigate('/booking-success', {
        state: {
          ticket: selectedTicket,
          quantity: qty,
          userEmail: user.email,
          totalPrice: selectedTicket.price * qty,
          bookingRef: bookingRef,
          bookingDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        }
      });
      
    } catch (err) {
      console.error('Booking failed:', err.message);
      // Fallback if RPC fails (e.g. not created yet)
      if (err.message.includes('confirm_booking')) {
         alert('Booking system error: The secure booking function is missing. Please contact support.');
      } else {
         alert('Failed to book: ' + err.message);
      }
    }
  };

  return (
    <div className="tickets-page">

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" style={{ background:'radial-gradient(ellipse at 50% 50%, #2A1810 0%, #0F0A06 65%)' }}/>
        <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.06 }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
          <defs><pattern id="tkp" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect x="12" y="0" width="6" height="30" fill="#C4820A"/>
            <rect x="0" y="12" width="30" height="6" fill="#8B1A1A"/>
          </pattern></defs>
          <rect width="1440" height="400" fill="url(#tkp)" opacity="0.6"/>
        </svg>
        <div style={{ position:'relative', zIndex:1 }}>
          <div className="page-hero-eyebrow">Secure Your Place</div>
          <h1 className="page-hero-title">Festival<br /><span>Tickets</span></h1>
        </div>
      </div>

      <div className="pattern-band" />

      {/* TIER CARDS */}
      <section className="tickets-tiers reveal">
        <div className="section-tag" style={{ padding:'3rem 3rem 0' }}>Available Passes</div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--cream)' }}>
             <div className="spinner" style={{ margin: '0 auto 1rem', width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--ochre)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
             Fetching active tickets...
             <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div className="tickets-tier-grid" style={{ paddingBottom: '4rem' }}>
            {tickets.map(t => (
              <TicketCard 
                key={t.id} 
                ticket={t} 
                onBuyClick={(qty) => handleBuyNow(t, qty)} 
              />
            ))}
            
            {tickets.length === 0 && (
               <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--cream-dark)' }}>
                  No active tickets currently available. Please check back later.
               </div>
            )}
          </div>
        )}
      </section>

      <div className="pattern-band" />

      {/* FAQ */}
      <section className="tickets-faq reveal">
        <div className="section-tag">Good to Know</div>
        <div className="faq-grid">
          {[
            { q:'Do I need an ILP?', a:'Non-Nagaland Indian nationals require an Inner Line Permit. Foreigners need a Protected Area Permit. Both can be arranged online or at entry points.' },
            { q:'Is photography allowed?', a:'Yes — photography is encouraged at all public events. Some sacred ceremonies may have restrictions; follow guide instructions.' },
            { q:'Are children free?', a:'Children under 12 receive free entry when accompanied by a ticket-holding adult.' },
            { q:'Refund policy?', a:'Full refunds available up to 14 days before the festival. 50% refund within 7 days. No refunds within 48 hours of the event.' },
          ].map(f => (
            <div key={f.q} className="faq-item">
              <h4 className="faq-q">{f.q}</h4>
              <p className="faq-a">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODALS */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onSuccess={handleAuthSuccess} 
        />
      )}

      {showBookingModal && selectedTicket && (
        <BookingConfirmModal
          ticket={selectedTicket}
          quantity={selectedQty}
          onConfirm={confirmBooking}
          onCancel={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
