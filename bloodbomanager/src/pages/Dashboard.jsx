// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';

import FlowModal from '../components/FlowModal';

<FlowModal
  title="Gestión de Equipos"
  content={
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-bold text-blue-700">🎽 Creación</h3>
      <p>Podés crear equipos desde cero, seleccionando:</p>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        <li>Nombre único</li>
        <li>Roster base</li>
        <li>Entrenador asignado</li>
        <li>Oro y valor inicial</li>
      </ul>

      <div className="border-t border-blue-200 my-4" />

      <h3 className="text-lg font-bold text-blue-700">🧰 Edición y gestión</h3>
      <ul className="list-disc pl-6 text-sm">
        <li>Editar nombre / valor</li>
        <li>Eliminar equipos</li>
        <li>Ver alineación actual</li>
      </ul>
    </div>
  }
  onClose={() => setShowModal(false)}
/>


export default function Dashboard() {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState(null);

  const manualContent = {
    Habilidades: (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-blue-700">📘 ¿Qué es?</h3>
        <p>Una sección accesible para todos los usuarios donde se listan todas las habilidades disponibles en el juego.</p>

        <h3 className="text-lg font-bold text-blue-700">📋 Funcionalidades</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Visualización de todas las habilidades disponibles.</li>
          <li>Cada habilidad incluye nombre y descripción.</li>
          <li>No requiere permisos especiales.</li>
        </ul>
      </div>
    ),

    Rosters: (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-blue-700">📚 Información de Rosters</h3>
        <p>Los rosters definen qué tipos de jugadores puede tener un equipo según su raza.</p>

        <h3 className="text-lg font-bold text-blue-700">📋 Detalles disponibles</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Atributos de los jugadores.</li>
          <li>Habilidades iniciales.</li>
          <li>Costo en oro y límites de cantidad por equipo.</li>
        </ul>
      </div>
    ),

    Entrenadores: (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-red-700">👑 Solo para Administradores</h3>
        <p>Desde esta sección podés gestionar a los usuarios que cumplen rol de entrenador.</p>

        <h3 className="text-lg font-bold text-blue-700">📋 Funcionalidades</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Listado de todos los entrenadores registrados.</li>
          <li>Eliminación de entrenadores desde la tabla.</li>
          <li>No se permite crear o editar entrenadores desde esta vista.</li>
        </ul>
      </div>
    ),

    Equipos: (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-blue-700">🏈 Gestión de Equipos</h3>
        <p>Desde aquí podés ver, crear o editar tus equipos. Si sos admin, podés ver todos. Si sos coach, solo los tuyos.</p>

        <div className="border-t border-gray-200 my-4" />

        <h3 className="text-lg font-bold text-blue-700">📋 Funcionalidades</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Visualización de alineación del equipo.</li>
          <li>Editar nombre del equipo (único) y valor del equipo.</li>
          <li>Eliminar equipo desde tabla de listado.</li>
        </ul>

        <div className="border-t border-gray-200 my-4" />

        <h3 className="text-lg font-bold text-blue-700">🆕 Crear nuevo equipo</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>Nombre:</strong> único en toda la app.</li>
          <li><strong>Entrenador:</strong> desplegable de usuarios (solo admin).</li>
          <li><strong>Roster:</strong> desplegable con razas.</li>
          <li><strong>Oro inicial:</strong> por defecto 1.000.000.</li>
          <li><strong>Valor del equipo:</strong> empieza en 0.</li>
        </ul>
      </div>
    ),

    Jugadores: (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-blue-700">🧍 Gestión de Jugadores</h3>
        <p>Agregá, editá o eliminá jugadores dentro de los equipos.</p>

        <div className="border-t border-gray-200 my-4" />

        <h3 className="text-lg font-bold text-blue-700">📋 Funcionalidades</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Seleccionar equipo desde un desplegable.</li>
          <li>Visualizar la tabla de jugadores existentes.</li>
          <li>Editar campos como:
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>SPP</strong> (puntos de estrella).</li>
              <li><strong>Lesiones</strong> (texto libre).</li>
            </ul>
          </li>
          <li>Eliminar jugadores desde la tabla.</li>
        </ul>

        <div className="border-t border-gray-200 my-4" />

        <h3 className="text-lg font-bold text-blue-700">🆕 Añadir jugador</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>Nombre:</strong> único en el equipo.</li>
          <li><strong>Número:</strong> único en el equipo.</li>
          <li><strong>Lesiones:</strong> campo opcional.</li>
          <li><strong>SPP:</strong> campo opcional.</li>
          <li><strong>Tipo de jugador:</strong> desplegable con tipos limitados por roster.</li>
        </ul>
      </div>
    ),

    Simular: ( // NUEVO
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-red-700">🧪 Solo para Administradores</h3>
      <p>Desde aquí podés simular un partido entre dos equipos de cualquier entrenador.</p>

      <h3 className="text-lg font-bold text-blue-700">📋 Funcionalidades</h3>
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li>Seleccionar dos equipos disponibles de toda la base de datos.</li>
        <li>Simular el resultado del partido: touchdowns, MVP, lesiones, etc.</li>
        <li>Registrar automáticamente los eventos del partido.</li>
        <li>Actualizar estadísticas de jugadores y equipos según el resultado.</li>
      </ul>

      <p className="text-sm text-gray-600 italic">
        Ideal para pruebas o torneos rápidos sin necesidad de ingresar resultados manualmente.
      </p>
    </div>
  ),

  };
  const cards = [

    {
      title: 'Entrenadores',
      description: 'Gestiona los entrenadores desde la vista de administración.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      ),
    },
    {
      title: 'Equipos',
      description: 'Crea y gestiona tus equipos, define su nombre, roster y alineación.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
      ),
    },
    {
      title: 'Jugadores',
      description: 'Agrega, edita o elimina jugadores de tu equipo con control total.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      ),
    },
    {
      title: 'Habilidades',
      description: 'Explora todas las habilidades del juego con sus nombres y descripciones.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c.667 0 2 .667 2 2 0 1.333-1.333 2-2 2s-2-.667-2-2c0-1.333 1.333-2 2-2z M12 14v6 M6 10v4 M18 10v4" />
      ),
    },
    {
      title: 'Rosters',
      description: 'Consulta los tipos de jugadores disponibles por roster.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      ),
    },

    {
    title: 'Simular',
    description: 'Elige dos equipos y simula un partido automáticamente.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
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
          {cards
            .filter(card => {
              if (card.title === 'Entrenadores' || card.title === 'Simular') {
                return user?.roles?.some(role => role.name === 'admin');
              }
              return true;
            })


            .map((card, idx) => (
              <div
                key={idx}
                onClick={() => setActiveModal(card.title)}
                className="flex items-start space-x-4 cursor-pointer hover:bg-blue-100 p-3 rounded transition"
              >
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

      {activeModal && (
        <FlowModal
          title={activeModal}
          content={manualContent[activeModal]}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
