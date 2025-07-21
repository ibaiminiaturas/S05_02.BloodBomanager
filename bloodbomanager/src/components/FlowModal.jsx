import { useEffect } from 'react';

export default function FlowModal({ title, content, onClose }) {
    // Opcional: sonido al abrir (modo máximo flow)
    useEffect(() => {
        const audio = new Audio('/sounds/pop.mp3'); // opcional, agrega en /public/sounds
        audio.volume = 0.2;
        audio.play().catch(() => { });
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
            {/* Fondo blur animado */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-white/40 to-blue-100/20 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
                onClick={onClose}
            />

            {/* CARD-MODAL */}
            <div className="relative z-10 w-full max-w-3xl bg-white/80 border border-blue-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-8 animate-slide-fade-in overflow-hidden backdrop-blur-lg">
                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-blue-100 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl animate-pop">🎯</div>
                        <h2 className="text-2xl sm:text-3xl font-black text-blue-800 tracking-tight hover:tracking-widest transition-all duration-300 cursor-default">
                            {title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-blue-400 hover:text-red-500 text-3xl font-bold transition transform hover:scale-125"
                    >
                        &times;
                    </button>
                </div>

                {/* CONTENT */}
                <div className="space-y-8 overflow-y-auto max-h-[70vh] pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent">
                    {content}
                </div>

                {/* FOOTER ✨ */}
                <div className="mt-10 border-t border-blue-200 pt-4 text-center text-sm text-blue-700 italic animate-fade-in delay-500">
                    ⚡ “Los campeones no nacen, se editan en esta app.” ⚡
                </div>
            </div>
        </div>
    );
}
