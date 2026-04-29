import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';

export default function EditProfile() {
  const { id } = useParams();
  const { user: currentUser, updateUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    university: '',
    bio: '',
    badge: 'Beginner',
    skills_offered_raw: '',
    skills_wanted_raw: '',
  });
  const [pictureFile, setPictureFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (currentUser && currentUser.id !== parseInt(id)) {
      navigate(`/profile/${currentUser.id}/edit`);
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/users/${id}`);
        const p = res.data;
        setForm({
          name: p.name || '',
          university: p.university || '',
          bio: p.bio || '',
          badge: p.badge || 'Beginner',
          skills_offered_raw: (p.skills_offered || []).join(', '),
          skills_wanted_raw: (p.skills_wanted || []).join(', '),
        });
      } catch {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const skills_offered = form.skills_offered_raw.split(',').map(s => s.trim()).filter(Boolean);
    const skills_wanted = form.skills_wanted_raw.split(',').map(s => s.trim()).filter(Boolean);

    try {
      const res = await api.put(`/api/users/${id}`, {
        name: form.name,
        university: form.university,
        bio: form.bio,
        badge: form.badge,
        skills_offered,
        skills_wanted,
      });
      updateUser({ ...currentUser, name: form.name, badge: form.badge });

      if (pictureFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('picture', pictureFile);
        await api.post(`/api/users/${id}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUploading(false);
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate(`/profile/${id}`), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile.');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto' }}>
      <div className="form-container" style={{ margin: '0' }}>
        <h2>Edit Profile</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
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
          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setPictureFile(e.target.files[0])}
            />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={saving || uploading}>
              {saving || uploading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(`/profile/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
