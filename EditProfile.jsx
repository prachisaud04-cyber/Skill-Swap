import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';

function Avatar({ name, picture, size = 42 }) {
  if (picture) {
    return <img src={picture} alt={name} className="request-avatar" style={{ width: size, height: size }} />;
  }
  return (
    <div className="request-avatar-placeholder" style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function SwapRequests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');

  const fetchSwaps = async () => {
    try {
      const res = await api.get('/api/swaps');
      setSwaps(res.data);
    } catch {
      setError('Failed to load swap requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  const handleAction = async (swapId, status) => {
    setActionError('');
    try {
      await api.put(`/api/swaps/${swapId}`, { status });
      fetchSwaps();
    } catch (err) {
      setActionError(err.response?.data?.error || 'Action failed.');
    }
  };

  if (loading) return <div className="loading">Loading requests...</div>;

  const incoming = swaps.filter(s => s.receiver_id === user.id);
  const outgoing = swaps.filter(s => s.sender_id === user.id);

  const statusClass = {
    pending: 'status-pending',
    accepted: 'status-accepted',
    rejected: 'status-rejected',
  };

  const formatDate = (d) => new Date(d).toLocaleDateString();

  return (
    <div>
      <div className="page-header">
        <h1>Skill Swap Requests</h1>
        <p>Manage your incoming and outgoing skill exchange requests.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {actionError && <div className="alert alert-error">{actionError}</div>}

      <div className="requests-section">
        <h2>📥 Incoming Requests ({incoming.length})</h2>
        {incoming.length === 0 ? (
          <div className="empty-state"><p>No incoming requests yet.</p></div>
        ) : (
          incoming.map(swap => (
            <div key={swap.id} className="request-card">
              <div className="request-info">
                <Avatar name={swap.sender_name} picture={swap.sender_picture} />
                <div className="request-details">
                  <h4>{swap.sender_name}</h4>
                  <p>Sent on {formatDate(swap.created_at)}</p>
                  {swap.message && <p style={{ fontStyle: 'italic' }}>"{swap.message}"</p>}
                </div>
              </div>
              <div className="request-actions">
                <span className={`status-badge ${statusClass[swap.status]}`}>{swap.status}</span>
                {swap.status === 'pending' && (
                  <>
                    <button className="btn-success btn-sm" onClick={() => handleAction(swap.id, 'accepted')}>
                      ✓ Accept
                    </button>
                    <button className="btn-danger btn-sm" onClick={() => handleAction(swap.id, 'rejected')}>
                      ✗ Reject
                    </button>
                  </>
                )}
                {swap.status === 'accepted' && (
                  <button className="btn-sm" onClick={() => navigate(`/chat/${swap.id}`)}>
                    💬 Chat
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="requests-section">
        <h2>📤 Outgoing Requests ({outgoing.length})</h2>
        {outgoing.length === 0 ? (
          <div className="empty-state"><p>You haven't sent any requests yet.</p></div>
        ) : (
          outgoing.map(swap => (
            <div key={swap.id} className="request-card">
              <div className="request-info">
                <Avatar name={swap.receiver_name} picture={swap.receiver_picture} />
                <div className="request-details">
                  <h4>To: {swap.receiver_name}</h4>
                  <p>Sent on {formatDate(swap.created_at)}</p>
                </div>
              </div>
              <div className="request-actions">
                <span className={`status-badge ${statusClass[swap.status]}`}>{swap.status}</span>
                {swap.status === 'accepted' && (
                  <button className="btn-sm" onClick={() => navigate(`/chat/${swap.id}`)}>
                    💬 Chat
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
