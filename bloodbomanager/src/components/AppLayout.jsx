// src/components/AppLayout.jsx
import React from 'react';
import Navbar from './Navbar';

export default function AppLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}