import { useState, useEffect } from 'react';
import { DailyLog } from './components/DailyLog';
import { Dashboard } from './components/Dashboard';
import { Journal } from './components/Journal';
import { Navigation } from './components/Navigation';
import { ToastContainer } from './components/Toast';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'daily-log' | 'journal'>('dashboard');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setCurrentPage('dashboard');
            break;
          case '2':
            e.preventDefault();
            setCurrentPage('daily-log');
            break;
          case '3':
            e.preventDefault();
            setCurrentPage('journal');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-luxury-black">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <ToastContainer />

      <div className="fade-in">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'daily-log' && <DailyLog />}
        {currentPage === 'journal' && <Journal />}
      </div>
    </div>
  );
}

export default App;
