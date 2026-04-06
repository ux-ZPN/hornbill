import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const BookingConfirmModal = ({ ticket, quantity, onConfirm, onCancel }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  const totalPrice = (ticket.price || 0) * quantity;

  return (
    <div className="auth-modal-overlay" onClick={() => !loading && onCancel()}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', padding: '2rem' }}>
        <button className="auth-modal-close" onClick={() => !loading && onCancel()}>&times;</button>
        <div className="auth-modal-header" style={{ display: 'block', textAlign: 'center', borderBottom: 'none', paddingBottom: '1rem' }}>
           <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Confirm Booking</h2>
           <p style={{ color: 'var(--cream-dark)', marginTop: '0.5rem' }}>Review your ticket selection below</p>
        </div>
        <div className="auth-modal-body">
           <div className="order-summary" style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
             {user && user.email && (
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                 <span style={{ color: 'var(--cream-dark)' }}>Account</span>
                 <span style={{ color: 'var(--cream)', opacity: 0.8 }}>{user.email}</span>
               </div>
             )}
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
               <span style={{ color: 'var(--cream-dark)' }}>Ticket</span>
               <span style={{ color: 'var(--ochre)', fontWeight: 'bold' }}>{ticket.name}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
               <span style={{ color: 'var(--cream-dark)' }}>Unit Price</span>
               <span style={{ color: 'var(--cream)' }}>₹{(ticket.price || 0).toLocaleString('en-IN')}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
               <span style={{ color: 'var(--cream-dark)' }}>Quantity</span>
               <span style={{ color: 'var(--cream)' }}>{quantity}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span style={{ color: 'var(--cream)' }}>Total Amount</span>
               <span style={{ color: 'var(--ochre)', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>
                 ₹{totalPrice.toLocaleString('en-IN')}
               </span>
             </div>
           </div>
           
           <div style={{ display: 'flex', gap: '1rem' }}>
             <button 
               className="btn-outline" 
               style={{ flex: 1, justifyContent: 'center', padding: '1rem' }}
               onClick={() => !loading && onCancel()}
               disabled={loading}
             >
               Cancel
             </button>
             <button 
               className="btn-solid" 
               style={{ flex: 2, justifyContent: 'center', padding: '1rem' }}
               onClick={handleConfirm}
               disabled={loading}
             >
               {loading ? 'Processing...' : 'Confirm & Pay'}
             </button>
           </div>
           <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--cream-dark)', marginTop: '1.5rem' }}>
             By confirming, you agree to our terms and conditions.
           </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmModal;
