import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function Preloader({ onFinish }) {
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    // Animate progress bar
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 18;
      });
    }, 180);

    // Fade out preloader
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 1400);

    // Complete preloader callback
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 1800);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#07090e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fade ? 0 : 1,
      transition: 'opacity 0.4s ease-in-out, visibility 0.4s ease-in-out',
      pointerEvents: fade ? 'none' : 'auto'
    }}>
      {/* Background Radial Glow */}
      <div style={{
        position: 'absolute',
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(249, 115, 22, 0.1) 60%, transparent 80%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      {/* Emblem & Logo */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          position: 'relative',
          padding: '12px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.3)'
        }}>
          <img
            src="/logo.png"
            alt="Zymeal Logo"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              objectFit: 'cover'
            }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.2rem',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            margin: 0
          }}>
            Zy<span style={{ color: '#10b981' }}>meal</span>
          </h2>
          <div style={{
            fontSize: '0.72rem',
            color: '#f97316',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 800,
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            gap: '6px'
          }}>
            <Sparkles size={12} color="#f97316" />
            GOURMET KITCHENS • INDIA
          </div>
        </div>

        {/* Progress Loading Bar */}
        <div style={{
          width: '200px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginTop: '16px',
          position: 'relative'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #10b981, #f97316)',
            borderRadius: '10px',
            transition: 'width 0.2s ease-out'
          }} />
        </div>

        <p style={{
          fontSize: '0.82rem',
          color: '#94a3b8',
          margin: 0,
          fontWeight: 500
        }}>
          Preparing your Zymeal culinary experience...
        </p>
      </div>
    </div>
  );
}
