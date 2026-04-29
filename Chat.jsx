import React, { useEffect, useState } from 'react';
import api from '../api/axios.js';
import UserCard from '../components/UserCard.jsx';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      (u.university && u.university.toLowerCase().includes(q)) ||
      (u.skills_offered && u.skills_offered.some(s => s.toLowerCase().includes(q))) ||
      (u.skills_wanted && u.skills_wanted.some(s => s.toLowerCase().includes(q))) ||
      (u.badge && u.badge.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <div className="page-header">
        <h1>Discover Skill Swappers</h1>
        <p>Find people to exchange skills with and grow together.</p>
      </div>

      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search by name, university, or skill..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: '32px' }}>🔍</p>
          <p>{search ? 'No users match your search.' : 'No other users yet. Invite friends!'}</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map(user => (
            <UserCard key={user.id} user={user} onSwapSent={fetchUsers} />
          ))}
        </div>
      )}
    </div>
  );
}
