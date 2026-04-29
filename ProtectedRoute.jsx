import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';

export default function Chat() {
  const { swapId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [swap, setSwap] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [hasRated, setHasRated] = useState(false);
  const [selectedStar, setSelectedStar] = useState(0);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState('');
  const messagesEndRef = useRef(null);

  const fetchData = async () => {
    try {
      const swapsRes = await api.get('/api/swaps');
      const found = swapsRes.data.find(s => s.id === parseInt(swapId));
      if (!found) {
        setError('Swap not found or you are not part of it.');
        setLoading(false);
        return;
      }
      if (found.status !== 'accepted') {
        setError('This swap has not been accepted yet.');
        setLoading(false);
        return;
      }
      setSwap(found);

      const msgsRes = await api.get(`/api/messages/${swapId}`);
      setMessages(msgsRes.data);

      const ratingRes = await api.get(`/api/ratings/check/${swapId}`);
      setHasRated(ratingRes.data.hasRated);
    } catch (err) {
      setError('Failed to load chat.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [swapId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      const res = await api.post('/api/messages', {
        swap_id: parseInt(swapId),
        content: newMessage.trim(),
      });
      setMessages(prev => [...prev, res.data]);
      setNewMessage('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const handleRating = async () => {
    if (!selectedStar) return;
    setRatingSubmitting(true);
    try {
      const ratedId = swap.sender_id === user.id ? swap.receiver_id : swap.sender_id;
      await api.post('/api/ratings', {
        rated_id: ratedId,
        swap_id: parseInt(swapId),
        score: selectedStar,
      });
      setHasRated(true);
      setRatingSuccess('Rating submitted! Thank you.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit rating.');
    } finally {
      setRatingSubmitting(false);
    }
  };

  const formatTime = (d) => {
    const date = new Date(d);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="loading">Loading chat...</div>;
  if (error) return (
    <div>
      <div className="alert alert-error">{error}</div>
      <button className="btn-secondary" onClick={() => navigate('/swaps')}>← Back to Requests</button>
    </div>
  );
  if (!swap) return null;

  const otherName = swap.sender_id === user.id ? swap.receiver_name : swap.sender_name;

  return (
    <div className="chat-container">
      <div style={{ marginBottom: '16px' }}>
        <button className="btn-secondary btn-sm" onClick={() => navigate('/swaps')}>← Back</button>
      </div>

      <div className="chat-header">
        <span style={{ fontSize: '24px' }}>💬</span>
        <div>
          <h3>Chat with {otherName}</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Skill Swap #{swap.id}</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '32px' }}>
            No messages yet. Say hello! 👋
          </div>
        )}
        {messages.map(msg => {
          const isMine = msg.sender_id === user.id;
          return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
              {!isMine && <div className="message-sender">{msg.sender_name}</div>}
              <div className={`message-bubble ${isMine ? 'mine' : 'theirs'}`}>
                {msg.content}
                <div className="message-time">{formatTime(msg.created_at)}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={sending}
        />
        <button type="submit" disabled={sending || !newMessage.trim()}>
          {sending ? '...' : 'Send'}
        </button>
      </form>

      {!hasRated && (
        <div className="rating-form">
          <h4>⭐ Rate your experience with {otherName}</h4>
          <div className="star-input">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={star <= selectedStar ? 'selected' : ''}
                onClick={() => setSelectedStar(star)}
                title={`${star} star${star > 1 ? 's' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
          <button
            onClick={handleRating}
            disabled={!selectedStar || ratingSubmitting}
          >
            {ratingSubmitting ? 'Submitting...' : 'Submit Rating'}
          </button>
        </div>
      )}

      {ratingSuccess && <div className="alert alert-success" style={{ marginTop: '12px' }}>{ratingSuccess}</div>}
    </div>
  );
}
