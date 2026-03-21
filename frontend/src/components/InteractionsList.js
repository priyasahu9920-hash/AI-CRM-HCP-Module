import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar, UserRound, MessageSquare, Target } from 'lucide-react';

const InteractionsList = () => {
  const { data: interactions, status } = useSelector(state => state.interactions);

  if (status === 'loading') return <div>Loading interactions...</div>;
  if (!interactions.length) return <div style={{ color: '#94a3b8' }}>No interactions logged yet. Use the form or chat below.</div>;

  // sort by newest first (assuming larger ID represents newer in SQLite id sequence, or we can just reverse)
  const sorted = [...interactions].reverse();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem', maxHeight: '500px' }}>
      {sorted.map(interaction => (
        <div key={interaction.id} className="interaction-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <UserRound size={18} /> {interaction.hcp_name}
            </h3>
            <span className={`badge ${interaction.sentiment?.toLowerCase() || 'neutral'}`}>
              {interaction.sentiment || 'Neutral'}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={14} /> {interaction.date}
            </span>
            <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>
              {interaction.interaction_type}
            </span>
          </div>
          
          <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#e2e8f0', display: 'flex', gap: '0.5rem' }}>
            <MessageSquare size={16} color="#94a3b8" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>{interaction.notes}</div>
          </div>

          {(interaction.summary || interaction.follow_up) && (
             <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', fontSize: '0.85rem' }}>
                {interaction.summary && <div style={{ marginBottom: '0.4rem' }}><strong>Summary:</strong> {interaction.summary}</div>}
                {interaction.follow_up && (
                  <div style={{ display: 'flex', gap: '0.5rem', color: '#c084fc' }}>
                    <Target size={14} style={{ marginTop: '2px' }}/> 
                    <span><strong>Follow-up:</strong> {interaction.follow_up}</span>
                  </div>
                )}
             </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InteractionsList;
