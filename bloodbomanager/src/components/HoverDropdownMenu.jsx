import React, { useState } from 'react';

export default function HoverDropdownMenu({ trigger, children }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      style={{ position: 'relative', cursor: 'pointer', userSelect: 'none' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '0.5rem',
            zIndex: 100,
            minWidth: '150px',
          }}
        >
          {children}
        </div>
      )}
    </span>
  );
}
