import React, { useState, useEffect } from 'react';

const getRandom = (min, max) => Math.random() * (max - min) + min;

const generateKeyframes = (index) => {
    const x1 = getRandom(-5, -2);
    const x2 = getRandom(2, 5);
    const y1 = getRandom(-3, -1);
    const y2 = getRandom(1, 3);
    const rot1 = getRandom(-10, -5);
    const rot2 = getRandom(5, 10);

    return `
  @keyframes bounceRotate${index} {
    0%   { transform: translate(0, 0) rotate(0deg); }
    25%  { transform: translate(${x1}px, ${y1}px) rotate(${rot1}deg); }
    50%  { transform: translate(${x2}px, ${y2}px) rotate(${rot2}deg); }
    75%  { transform: translate(${x1}px, ${y2}px) rotate(${rot1}deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
  `;
};

const ExplosionParticle = ({ style, delay }) => (
    <span
        style={{
            position: 'absolute',
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'orange',
            boxShadow: '0 0 8px 3px red',
            opacity: 0,
            animation: `sparkle 0.6s ease-in-out ${delay}s forwards`,
            pointerEvents: 'none',
            ...style,
            zIndex: 10,
        }}
    />
);

const AnimatedTitle = ({ text }) => {
    const [hovered, setHovered] = useState(false);
    const [styles, setStyles] = useState([]);
    const [explosions, setExplosions] = useState([]);

    useEffect(() => {
        const newStyles = text.split('').map((_, i) => {
            const animationName = `bounceRotate${i}`;
            const keyframes = generateKeyframes(i);

            const styleSheet = document.styleSheets[0];
            if (![...styleSheet.cssRules].some(rule => rule.name === animationName)) {
                styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
            }

            return {
                animationName,
                animationDuration: `${getRandom(0.8, 1.2).toFixed(2)}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
            };
        });

        setStyles(newStyles);
    }, [text]);

    useEffect(() => {
        if (!hovered) {
            setExplosions([]);
            return;
        }

        let id;
        const addExplosion = () => {
            setExplosions((explosions) => {
                // Limitar a max 21 partículas para no saturar
                const maxParticles = 21;
                const newExplosion = {
                    left: getRandom(-20, 200),
                    top: getRandom(-20, 40),
                    delay: 0,
                    id: Date.now() + Math.random(),
                };

                const updated = [...explosions, newExplosion];
                if (updated.length > maxParticles) updated.shift();
                return updated;
            });
        };

        // Añadir la primera explosión al entrar hover
        addExplosion();

        // Luego añadir una nueva cada 100ms
        id = setInterval(addExplosion, 100);

        return () => clearInterval(id);
    }, [hovered]);

    return (
        <h1
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="text-2xl font-extrabold text-gray-800 whitespace-nowrap cursor-pointer select-none flex relative"
            style={{ userSelect: 'none' }}
        >
            {text.split('').map((letter, i) => (
                <span
                    key={i}
                    style={{
                        display: 'inline-block',
                        transition: 'transform 0.3s ease',
                        ...(hovered
                            ? {
                                animationName: styles[i]?.animationName,
                                animationDuration: styles[i]?.animationDuration,
                                animationTimingFunction: styles[i]?.animationTimingFunction,
                                animationIterationCount: styles[i]?.animationIterationCount,
                            }
                            : { transform: 'none', animation: 'none' }),
                    }}
                >
                    {letter}
                </span>
            ))}

            {/* Explosiones */}
            {explosions.map(({ left, top, delay, id }) => (
                <ExplosionParticle
                    key={id}
                    style={{ left, top }}
                    delay={delay}
                />
            ))}

            <style>{`
        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
      `}</style>
        </h1>
    );
};

export default AnimatedTitle;
