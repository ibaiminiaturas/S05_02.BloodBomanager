import React from 'react';

export default function SuccessModal({ message, onClose }) {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: 'white', padding: '20px',
                borderRadius: '8px', maxWidth: '400px', width: '90%',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}>
                <h3>Éxito</h3>
                <p>{message}</p>
                <button
                    onClick={onClose}
                    style={{
                        marginTop: '1rem',
                        padding: '8px 16px',
                        border: 'none',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                    autoFocus
                >
                    OK
                </button>
            </div>
        </div>
    );
}
