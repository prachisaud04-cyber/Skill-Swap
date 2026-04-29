import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/skillswap-logo.jpg" alt="SkillSwap" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
            <h2 style={{ margin: 0 }}>SkillSwap</h2>
          </div>
          <button className="btn-theme" onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
        </div>
        <h2>Welcome back</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="form-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
        <div style={{ marginTop: '20px', padding: '14px 16px', background: 'var(--border)', borderRadius: '10px', fontSize: '13px' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>🎭 Demo Accounts</div>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div>📧 <strong>alex.chen@demo.com</strong> — Expert (React, Node.js)</div>
            <div>📧 <strong>priya.sharma@demo.com</strong> — Expert (ML, Python)</div>
            <div>📧 <strong>marcus.j@demo.com</strong> — Intermediate (UI/UX, Figma)</div>
            <div>📧 <strong>james.park@demo.com</strong> — Expert (iOS, Android)</div>
            <div style={{ marginTop: '6px' }}>🔑 Password for all: <strong>demo1234</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
