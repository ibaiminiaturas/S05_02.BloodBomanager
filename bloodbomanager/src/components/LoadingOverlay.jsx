// src/components/LoadingOverlay.jsx
import React from 'react';

export default function LoadingOverlay({ message = "Cargando...", navbarHeight = 64 }) {
    return (
        <div
            className="fixed z-50 left-0 right-0 bottom-0 flex flex-col items-center  justify-start pt-48 bg-white/50 backdrop-blur-sm"
            style={{ top: navbarHeight }}
        >
            <svg
                className="animate-spin h-16 w-16 text-blue-600 mt-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                />
            </svg>
            <p className="text-4xl font-extrabold text-blue-700 mt-4 drop-shadow-lg">
                Cargando...
            </p>
        </div>
    );
}
