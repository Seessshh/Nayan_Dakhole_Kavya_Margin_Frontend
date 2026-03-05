import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css'; // Make sure to import the CSS file

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Matched to backend requirements
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Pass the state to your auth context
      await login(email.trim(), password.trim());
      navigate('/', { replace: true });
    } catch (err) {
      setError(String(err?.message || err || 'Invalid email or password.'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      {/* Decorative Geometric/Cloud Background Elements */}
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>

      <div className="login-card">
        <div className="login-header">
          <h2>Kavya Margin</h2>
          <p>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={onSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email"
              placeholder="admin@kavyamargin.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}