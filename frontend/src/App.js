import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInteractions } from './store/interactionSlice';
import AIChatAssistant from './components/AIChatAssistant';
import LogInteractionForm from './components/LogInteractionForm';
import InteractionsList from './components/InteractionsList';
import { Stethoscope } from 'lucide-react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInteractions());
  }, [dispatch]);

  return (
    <div className="app-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Stethoscope size={28} color="#60a5fa" />
          <h1>AI CRM - HCP Module</h1>
        </div>
        <div className="badge positive">v1.0.0 Connected</div>
      </header>
      
      <main className="main-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', overflowY: 'auto', paddingRight: '0.5rem' }}>
          <section className="glass-panel">
            <h2 style={{ marginBottom: '1.5rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Manual Entry
            </h2>
            <LogInteractionForm />
          </section>
          
          <section className="glass-panel" style={{ flex: 1 }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#c084fc' }}>Recent Interactions</h2>
            <InteractionsList />
          </section>
        </div>

        <aside className="glass-panel" style={{ height: 'calc(100vh - 120px)' }}>
          <AIChatAssistant />
        </aside>
      </main>
    </div>
  );
}

export default App;