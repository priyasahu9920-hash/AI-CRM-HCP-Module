import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInteraction } from '../store/interactionSlice';
import { Save } from 'lucide-react';

const LogInteractionForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    hcp_name: '',
    date: new Date().toISOString().split('T')[0],
    interaction_type: 'Meeting',
    notes: '',
    sentiment: 'Positive',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInteraction(formData));
    setFormData({ ...formData, notes: '' }); // reset notes
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Doctor / HCP Name</label>
          <input 
            required 
            type="text" 
            className="form-input" 
            placeholder="Dr. Smith"
            value={formData.hcp_name}
            onChange={e => setFormData({...formData, hcp_name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input 
            required 
            type="date" 
            className="form-input" 
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value})}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Interaction Type</label>
          <select 
            className="form-input" 
            value={formData.interaction_type}
            onChange={e => setFormData({...formData, interaction_type: e.target.value})}
          >
            <option>Meeting</option>
            <option>Call</option>
            <option>Email</option>
          </select>
        </div>
        <div className="form-group">
          <label>Sentiment</label>
          <select 
            className="form-input" 
            value={formData.sentiment}
            onChange={e => setFormData({...formData, sentiment: e.target.value})}
          >
            <option>Positive</option>
            <option>Neutral</option>
            <option>Negative</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Discussion Notes</label>
        <textarea 
          required 
          className="form-input" 
          rows="3" 
          placeholder="Details of the conversation..."
          value={formData.notes}
          onChange={e => setFormData({...formData, notes: e.target.value})}
        ></textarea>
      </div>

      <button type="submit" className="btn" style={{ width: '100%', marginTop: '0.5rem' }}>
        <Save size={18} /> Save Interaction
      </button>
    </form>
  );
};

export default LogInteractionForm;
