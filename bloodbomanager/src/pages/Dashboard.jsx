// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../utils/AuthContext.jsx';

export default function Dashboard() {
  const { user } = useAuth();

  const cards = [
    {
      title: 'Habilidades',
      description: 'Explora todas las habilidades del juego con sus nombres y descripciones para dominar cada jugada.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c.667 0 2 .667 2 2 0 1.333-1.333 2-2 2s-2-.667-2-2c0-1.333 1.333-2 2-2z M12 14v6 M6 10v4 M18 10v4"
        />
      ),
    },
    {
      title: 'Rosters',
      description: 'Consulta los tipos de jugadores disponibles por roster. Cada equipo tiene su propia estrategia.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      ),
    },
    {
      title: 'Entrenadores',
      description: 'Crea y gestiona tus entrenadores. Cada entrenador puede dirigir uno o varios equipos.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      ),
    },
    {
      title: 'Equipos',
      description: 'Construye tus equipos eligiendo roster, jugadores y habilidades para dominar el torneo.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7h18M3 12h18M3 17h18"
        />
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {user ? (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Bienvenido, {user.name}! 🩸🏈
          </h1>
          <p className="text-gray-600 italic text-lg">
            "Recuerda: en Blood Bowl, si no puedes ganar... ¡haz que el otro tampoco pueda!" 💥
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-600">Cargando usuario...</p>
      )}

      <div className="bg-blue-50 rounded-xl shadow-md p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          ¿Qué puedes hacer desde aquí?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    {card.icon}
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-1">{card.title}</h4>
                <p className="text-gray-700 leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-gray-600 italic font-semibold tracking-wide">
          ¡Prepárate para el caos en el campo y demuestra quién manda en Blood Bowl! 🏆⚡
        </p>
      </div>
    </div>
  );
}
