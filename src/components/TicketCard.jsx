import React, { useState } from 'react';

const TicketCard = ({ ticket, onBuyClick }) => {
  const [qty, setQty] = useState(1);
  const seatsLow = ticket.seats_left > 0 && ticket.seats_left <= 5;
  const soldOut = ticket.seats_left === 0;

  const handleQtyChange = (delta) => {
    setQty(prev => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > ticket.seats_left) return ticket.seats_left;
      return next;
    });
  };

  return (
    <div className="tier-card" style={{ '--tc': ticket.color || '#E8A020', display: 'flex', flexDirection: 'column' }}>
      {ticket.category && (
        <div className="tier-card__badge" style={{ backgroundColor: 'var(--tc)', color: '#000' }}>
          {ticket.category}
        </div>
      )}
      <div className="tier-card__top-bar" />
      <div className="tier-card__name" style={{ marginBottom: '0.5rem' }}>{ticket.name}</div>
      
      {ticket.event_date && (
        <div style={{ color: 'var(--ochre-light)', fontSize: '0.8rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
          {ticket.event_date}
        </div>
      )}
      
      <div className="tier-card__note" style={{ flexGrow: 1, color: 'var(--cream-dark)', marginBottom: '1.5rem', fontStyle: 'normal' }}>
        {ticket.description}
      </div>
      
      <div className="tier-card__price" style={{ margin: '1rem 0', display: 'flex', alignItems: 'baseline', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
        <span className="tier-card__currency">₹</span>{(ticket.price || 0).toLocaleString('en-IN')}
      </div>
      
      <div style={{ 
        padding: '0.5rem 0', 
        marginBottom: '1.5rem', 
        color: seatsLow ? 'var(--vermilion)' : 'var(--cream-dark)', 
        fontWeight: '600',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {soldOut ? 'Sold Out' : (seatsLow ? `Hurry! Only ${ticket.seats_left} seats remaining` : `${ticket.seats_left} seats remaining`)}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: 'auto' }}>
        <div className="qty-control" style={{ flex: 0.6, display: 'flex', background: 'rgba(0,0,0,0.4)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            type="button"
            onClick={() => handleQtyChange(-1)}
            disabled={soldOut}
            style={{ width: '35px', padding: '0.5rem', background: 'transparent', color: 'var(--cream)', border: 'none', cursor: 'pointer', opacity: soldOut ? 0.3 : 1 }}
          >−</button>
          <span style={{ flex: 1, textAlign: 'center', alignSelf: 'center', color: 'var(--ochre)', fontWeight: 'bold' }}>
            {qty}
          </span>
          <button 
            type="button"
            onClick={() => handleQtyChange(1)}
            disabled={soldOut}
            style={{ width: '35px', padding: '0.5rem', background: 'transparent', color: 'var(--cream)', border: 'none', cursor: 'pointer', opacity: soldOut ? 0.3 : 1 }}
          >+</button>
        </div>
        
        <button 
          type="button"
          className="btn-solid" 
          style={{ flex: 1, justifyContent: 'center' }}
          disabled={soldOut}
          onClick={() => onBuyClick(qty)}
        >
          {soldOut ? 'Sold Out' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
