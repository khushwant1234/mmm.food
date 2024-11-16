"use client";
import React, { useEffect, useState } from 'react';

const Snowflake = ({ delay, left }) => (
    <div
        className="absolute w-1 h-1 bg-white rounded-full opacity-70"
        style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: '10s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            animationName: 'snowfall'
        }}
    />
);

const WinterWeather = () => {
    const [snowflakes, setSnowflakes] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        setMounted(true);
        // Set initial viewport height
        setViewportHeight(window.innerHeight);

        // Generate snowflakes
        setSnowflakes(
            Array.from({ length: 50 }, (_, i) => ({
                id: i,
                delay: Math.random() * 5,
                left: Math.random() * 100
            }))
        );

        // Handle resize
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full max-w-screen-2xl mx-auto overflow-hidden">
            {/* Responsive container with aspect ratio */}
            <div className="w-full relative">
                {/* Mobile: Full screen height, Laptop: 80vh with max-height */}
                <div className="relative w-full h-screen md:h-[100vh] md:max-h-[900px] min-h-[400px]">
                    {/* Winter sky gradient - bleak and cold */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-400 via-gray-500 to-slate-600" />

                    {/* Minimal, weak sun with cold light - responsive positioning */}
                    <div className="absolute right-[10%] top-[10%] md:right-[15%] md:top-[15%]">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200 opacity-40
              shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
                    </div>

                    {/* Cold atmosphere overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20" />

                    {/* Snowfall */}
                    {mounted && (
                        <div className="absolute inset-0">
                            <style jsx>{`
                @keyframes snowfall {
                  0% {
                    transform: translateY(-10px) translateX(-5px);
                    opacity: 0;
                  }
                  10% {
                    opacity: 0.7;
                  }
                  90% {
                    opacity: 0.7;
                  }
                  100% {
                    transform: translateY(${viewportHeight}px) translateX(5px);
                    opacity: 0;
                  }
                }
              `}</style>

                            {snowflakes.map(({ id, delay, left }) => (
                                <Snowflake key={id} delay={delay} left={left} />
                            ))}
                        </div>
                    )}

                    {/* Cold mist layers - responsive heights */}
                    <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-blue-900/10 to-transparent" />
                    <div className="absolute inset-x-0 top-1/3 h-24 md:h-32 bg-gradient-to-b from-gray-400/20 to-transparent" />
                </div>
            </div>
        </div>
    );
};

export default WinterWeather;