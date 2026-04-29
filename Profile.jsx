import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';

export default function CustomRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  const fetchRequests = async () => {
    try {
      const res = await api.get('/api/custom-requests');
      setRequests(res.data);
    } catch {
      setError('Failed to load skill requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');
    setSubmitting(true);
    try {
      const res = await api.post('/api/custom-requests', {
        title: form.title,
        description: form.description,
      });
      setRequests(prev => [res.data, ...prev]);
      setForm({ title: '', description: '' });
      setSubmitSuccess('Your skill request has been posted!');
    } catch (err) {
      setSubmitError(err.response?.data?.error || 'Failed to post request.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString();

  const badgeClass = (badge) => ({
    Beginner: 'badge-beginner',
    Intermediate: 'badge-intermediate',
    Expert: 'badge-expert',
  }[badge] || 'badge-beginner');

  return (
    <div>
      <div className="page-header">
        <h1>📋 Skill Request Board</h1>
        <p>Can't find the skill you need? Post a custom request and let the community help.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
        <div>
          <div className="form-container" style={{ margin: '0' }}>
            <h2>Post a Skill Request</h2>
            {submitError && <div className="alert alert-error">{submitError}</div>}
            {submitSuccess && <div className="alert alert-success">{submitSuccess}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Skill Needed *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Machine Learning, Piano, Spanish"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what you're looking for, your current level, goals, etc."
                />
              </div>
              <div className="form-actions">
                <button type="submit" disabled={submitting}>
                  {submitting ? 'Posting...' : '📢 Post Request'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Community Requests ({requests.length})
          </h2>
          {error && <div className="alert alert-error">{error}</div>}
          {loading ? (
            <div className="loading">Loading...</div>
          ) : requests.length === 0 ? (
            <div className="empty-state"><p>No skill requests yet. Be the first!</p></div>
          ) : (
            requests.map(req => (
              <div key={req.id} className="custom-request-card">
                <h4>🔍 {req.title}</h4>
                {req.description && <p>{req.description}</p>}
                <div className="custom-request-meta">
                  <span>👤 {req.user_name}</span>
                  <span className={`badge ${badgeClass(req.user_badge)}`}>{req.user_badge}</span>
                  <span>📅 {formatDate(req.created_at)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
