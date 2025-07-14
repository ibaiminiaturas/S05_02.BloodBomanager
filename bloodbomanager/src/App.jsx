import React from 'react';
import StatusChecker from './components/StatusChecker';

function App() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-4">Blood Bowl Frontend</h1>
      <StatusChecker />
    </div>
  );
}

export default App;