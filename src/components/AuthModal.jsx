import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import './AuthModal.css';

const AuthModal = ({ onClose, onSuccess }) => {
  const { signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOAuthLogin = async (provider) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (activeTab === 'signup' && password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      if (activeTab === 'login') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        setSuccess('Successfully logged in!');
        setTimeout(() => {
          if (onSuccess) onSuccess();
          else onClose();
        }, 1500);
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setSuccess('Signup successful! Please check your email.');
        setTimeout(() => {
          if (onSuccess) onSuccess();
          else onClose();
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>&times;</button>
        
        <div className="auth-modal-header">
          <div 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </div>
          <div 
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </div>
        </div>

        <div className="auth-modal-body">
          {error && <div className="auth-alert auth-error">{error}</div>}
          {success && <div className="auth-alert auth-success">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Enter your password"
                minLength="6"
              />
            </div>

            {activeTab === 'signup' && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                  placeholder="Confirm your password"
                  minLength="6"
                />
              </div>
            )}

            <button type="submit" className="btn-solid auth-submit" disabled={loading}>
              {loading ? 'Processing...' : activeTab === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button 
            type="button" 
            className="btn-outline auth-google" 
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
          >
            {activeTab === 'login' ? 'Login with Google' : 'Sign Up with Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
