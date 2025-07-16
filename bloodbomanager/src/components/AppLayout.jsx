// src/components/AppLayout.jsx
import React from 'react';
import Navbar from './Navbar';

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {/* Padding top para que el contenido no quede oculto bajo navbar de 64px */}
      <main className="pt-20">
        {children}
      </main>
    </>
  );
};

export default AppLayout;
