import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Signup() {
  const { signup } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    bio: '',
    badge: 'Beginner',
    skills_offered_raw: '',
    skills_wanted_raw: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const skills_offered = form.skills_offered_raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const skills_wanted = form.skills_wanted_raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        university: form.university,
        bio: form.bio,
        badge: form.badge,
        skills_offered,
        skills_wanted,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container" style={{ maxWidth: '520px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/skillswap-logo.jpg" alt="SkillSwap" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
            <h2 style={{ margin: 0 }}>SkillSwap</h2>
          </div>
          <button className="btn-theme" onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
        </div>
        <h2>Create your account</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
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
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label>University</label>
            <input
              type="text"
              name="university"
              value={form.university}
              onChange={handleChange}
              placeholder="MIT, Stanford, etc."
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell others about yourself..."
            />
          </div>
          <div className="form-group">
            <label>Skill Level Badge</label>
            <select name="badge" value={form.badge} onChange={handleChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="form-group">
            <label>Skills I Offer (comma-separated)</label>
            <input
              type="text"
              name="skills_offered_raw"
              value={form.skills_offered_raw}
              onChange={handleChange}
              placeholder="Python, Guitar, Photography"
            />
          </div>
          <div className="form-group">
            <label>Skills I Want to Learn (comma-separated)</label>
            <input
              type="text"
              name="skills_wanted_raw"
              value={form.skills_wanted_raw}
              onChange={handleChange}
              placeholder="Spanish, Web Design, Cooking"
            />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
        <div className="form-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
