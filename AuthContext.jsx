import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import StarRating from '../components/StarRating.jsx';
import api from '../api/axios.js';

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [swapSent, setSwapSent] = useState(false);
  const [swapSending, setSwapSending] = useState(false);
  const [swapError, setSwapError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/users/${id}`);
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleRequestSwap = async () => {
    setSwapSending(true);
    setSwapError('');
    try {
      await api.post('/api/swaps', { receiver_id: parseInt(id), message: '' });
      setSwapSent(true);
    } catch (err) {
      setSwapError(err.response?.data?.error || 'Failed to send request');
    } finally {
      setSwapSending(false);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!profile) return null;

  const isOwn = currentUser && currentUser.id === profile.id;
  const badgeClass = {
    Beginner: 'badge-beginner',
    Intermediate: 'badge-intermediate',
    Expert: 'badge-expert',
  }[profile.badge] || 'badge-beginner';

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          {profile.profile_picture ? (
            <img src={profile.profile_picture} alt={profile.name} className="profile-avatar" />
          ) : (
            <div className="profile-avatar-placeholder">{profile.name.charAt(0).toUpperCase()}</div>
          )}
          <div className="profile-meta">
            <h2>{profile.name}</h2>
            <p className="university">🎓 {profile.university || 'No university listed'}</p>
            <span className={`badge ${badgeClass}`}>{profile.badge || 'Beginner'}</span>
            <div style={{ marginTop: '8px' }}>
              <StarRating rating={profile.avg_rating} count={profile.rating_count} />
            </div>
          </div>
        </div>

        {profile.bio && (
          <div>
            <p className="profile-bio">{profile.bio}</p>
          </div>
        )}

        <hr className="divider" />

        {profile.skills_offered && profile.skills_offered.length > 0 && (
          <div className="profile-section">
            <h4>Skills Offered</h4>
            <div className="skills-tags">
              {profile.skills_offered.map((skill, i) => (
                <span key={i} className="skill-tag">✅ {skill}</span>
              ))}
            </div>
          </div>
        )}

        {profile.skills_wanted && profile.skills_wanted.length > 0 && (
          <div className="profile-section">
            <h4>Skills Wanted</h4>
            <div className="skills-tags">
              {profile.skills_wanted.map((skill, i) => (
                <span key={i} className="skill-tag">🔍 {skill}</span>
              ))}
            </div>
          </div>
        )}

        {swapError && <div className="alert alert-error">{swapError}</div>}

        <div className="profile-actions">
          {isOwn ? (
            <button onClick={() => navigate(`/profile/${id}/edit`)}>
              ✏️ Edit Profile
            </button>
          ) : (
            <button
              onClick={handleRequestSwap}
              disabled={swapSending || swapSent}
            >
              {swapSent ? '✓ Request Sent' : swapSending ? 'Sending...' : '🔄 Request Skill Swap'}
            </button>
          )}
          <button className="btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
