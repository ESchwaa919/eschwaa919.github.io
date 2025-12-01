import { useEffect, useRef } from 'react';

interface AmbientBackgroundProps {
  particleCount?: number;
  showGrid?: boolean;
  showScanLine?: boolean;
  intensity?: 'subtle' | 'medium' | 'intense';
}

const AmbientBackground = ({
  particleCount = 30,
  showGrid = true,
  showScanLine = false,
  intensity = 'medium'
}: AmbientBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const opacityMap = {
    subtle: 0.3,
    medium: 0.5,
    intense: 0.8
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors = [
      'hsl(155, 100%, 45%)', // neon green
      'hsl(185, 100%, 50%)', // cyan
      'hsl(320, 85%, 55%)',  // magenta
    ];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const drawConnections = () => {
      const connectionDistance = 150;
      ctx.strokeStyle = `hsla(155, 100%, 45%, 0.05)`;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.1;
            ctx.strokeStyle = `hsla(155, 100%, 45%, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, particle.color.replace(')', `, ${particle.opacity * opacityMap[intensity]})`).replace('hsl', 'hsla'));
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity * opacityMap[intensity] * 2})`).replace('hsl', 'hsla');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      drawConnections();

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [particleCount, intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Animated Mesh Gradient - very subtle, doesn't compete with hero grid */}
      <div
        className="absolute inset-0 animate-mesh"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsla(155, 100%, 45%, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsla(320, 85%, 55%, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsla(185, 100%, 50%, 0.02) 0%, transparent 60%)
          `,
          backgroundSize: '100% 100%',
        }}
      />

      {/* Grid Pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsla(155, 100%, 45%, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsla(155, 100%, 45%, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.6 }}
      />

      {/* Scan Line Effect */}
      {showScanLine && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(transparent 50%, hsla(155, 100%, 45%, 0.02) 50%)',
            backgroundSize: '100% 4px',
          }}
        />
      )}

      {/* Vignette removed - let the cyber grid be the hero */}
    </div>
  );
};

export default AmbientBackground;
