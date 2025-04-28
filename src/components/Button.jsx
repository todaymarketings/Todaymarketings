import { useState, useEffect } from "react";

export default function HomeButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [particleEffects, setParticleEffects] = useState([]);

  // Animation for the neon glow effect and particles
  useEffect(() => {
    let animationFrame;
    let startTime;
    let lastParticleTime = 0;

    const animateEffects = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Handle glow pulsing
      if (isHovered) {
        // Pulsing effect when hovered
        const intensity = 0.5 + Math.sin(elapsed / 300) * 0.5;
        setGlowIntensity(intensity);

        // Generate particles occasionally
        if (timestamp - lastParticleTime > 200) {
          lastParticleTime = timestamp;
          const randomX = Math.floor(Math.random() * 100);

          setParticleEffects((prev) => [
            ...prev
              .filter((p) => p.life > 0)
              .map((p) => ({
                ...p,
                life: p.life - 1,
                y: p.y - 1.5,
                opacity: p.opacity * 0.95,
              })),
            {
              id: Date.now(),
              x: randomX,
              y: Math.random() * 20 + 20,
              size: Math.random() * 3 + 1,
              opacity: Math.random() * 0.4 + 0.4,
              life: 30,
            },
          ]);
        }
      } else {
        // Fade out when not hovered
        setGlowIntensity((prev) => Math.max(0, prev - 0.05));
        setParticleEffects((prev) =>
          prev
            .filter((p) => p.life > 0)
            .map((p) => ({
              ...p,
              life: p.life - 2,
              y: p.y - 1.5,
              opacity: p.opacity * 0.9,
            }))
        );
        if (glowIntensity <= 0 && particleEffects.length === 0) return;
      }

      animationFrame = requestAnimationFrame(animateEffects);
    };

    animationFrame = requestAnimationFrame(animateEffects);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered, glowIntensity, particleEffects.length]);

  return (
    <div className="flex justify-center items-center p-4">
      <a
        href="#home"
        className="flex items-stretch no-underline transition-all duration-300 ease-in-out relative"
        style={{
          filter: `drop-shadow(0 ${4 + glowIntensity * 3}px ${
            6 + glowIntensity * 4
          }px rgba(0, 0, 0, 0.3)) ${
            isHovered
              ? `drop-shadow(0 0 ${8 + glowIntensity * 8}px rgba(0, 120, 231, ${
                  0.3 * glowIntensity
                }))`
              : ""
          }`,
          transform: isHovered ? `translateY(-${3 + glowIntensity}px)` : "none",
          height: "48px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Energy particles */}
        {particleEffects.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              bottom: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: "white",
              opacity: particle.opacity,
              filter: `blur(${particle.size / 2}px)`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(100, 200, 255, 0.8)`,
              zIndex: 30,
            }}
          />
        ))}

        {/* Middle parallelogram text section with angled left side */}
        <div
          className="relative flex items-center justify-center text-white font-bold text-lg tracking-wider overflow-hidden"
          style={{
            height: "48px",
            padding: "0 30px",
            background: isHovered
              ? `linear-gradient(to right, rgb(${0 + glowIntensity * 30}, ${
                  120 + glowIntensity * 15
                }, ${231}), rgb(${0 + glowIntensity * 10}, ${
                  80 + glowIntensity * 20
                }, ${180}))`
              : "linear-gradient(to bottom, #0066cc, #004080)",
            clipPath: "polygon(15% 0, 100% 0, 90% 100%, 0% 100%)",
            zIndex: 20,
            transition: "background 0.3s ease",
            boxShadow: isHovered
              ? `inset 0 0 ${10 + glowIntensity * 15}px rgba(0, 160, 255, ${
                  0.4 + glowIntensity * 0.6
                })`
              : "none",
          }}
        >
          {/* Animated light streaks */}
          {isHovered && (
            <>
              <div
                className="absolute"
                style={{
                  width: "3px",
                  height: "200%",
                  background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, ${
                    0.7 * glowIntensity
                  }), transparent)`,
                  transform: `translateX(${
                    -30 + glowIntensity * 150
                  }%) rotate(-30deg)`,
                  opacity: glowIntensity,
                  left: "30%",
                  top: -20,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: "2px",
                  height: "200%",
                  background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, ${
                    0.5 * glowIntensity
                  }), transparent)`,
                  transform: `translateX(${
                    -80 + glowIntensity * 200
                  }%) rotate(-30deg)`,
                  opacity: glowIntensity,
                  left: "60%",
                  top: -20,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: "1px",
                  height: "200%",
                  background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, ${
                    0.6 * glowIntensity
                  }), transparent)`,
                  transform: `translateX(${
                    -60 + glowIntensity * 180
                  }%) rotate(-30deg)`,
                  opacity: glowIntensity,
                  left: "40%",
                  top: -20,
                }}
              />
            </>
          )}

          {/* Radial highlight */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              width: "120%",
              height: "120%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
              transform: "translate(-50%, -50%) scale(0)",
              opacity: 0,
              transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
              ...(isHovered && {
                transform: "translate(-50%, -50%) scale(1)",
                opacity: glowIntensity * 0.8,
              }),
            }}
          />

          <div
            className="absolute top-0 left-0 right-0 h-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
              opacity: isHovered ? 0.4 + glowIntensity * 0.3 : 0.2,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Animated border */}
          {isHovered && (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 75%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "animateBorder 2s linear infinite",
                opacity: glowIntensity * 0.5,
              }}
            />
          )}

          <span
            style={{
              position: "relative",
              zIndex: 25,
              textShadow: isHovered
                ? `0 0 ${3 + glowIntensity * 5}px rgba(255, 255, 255, ${
                    0.4 * glowIntensity
                  }), 0 1px 1px rgba(0, 0, 0, 0.4)`
                : "0 1px 1px rgba(0, 0, 0, 0.4)",
              transform: isHovered
                ? `scale(${1.03 + glowIntensity * 0.02})`
                : "scale(1)",
              transition: "transform 0.3s ease, text-shadow 0.3s ease",
            }}
          >
            HOME PAGE
          </span>
        </div>

        {/* Right angled stripes */}
        <div
          className="flex h-full relative"
          style={{ marginLeft: "-1px", zIndex: 10 }}
        >
          <div
            className="h-full relative overflow-hidden"
            style={{
              width: "12px",
              background: isHovered
                ? `rgb(${0 + glowIntensity * 20}, ${76 + glowIntensity * 20}, ${
                    153 + glowIntensity * 20
                  })`
                : "#004080",
              transform: "skewX(-20deg)",
              zIndex: 11,
              transition: "background 0.3s ease",
              boxShadow: isHovered
                ? `inset 0 0 ${5 + glowIntensity * 10}px rgba(0, 160, 255, ${
                    0.3 * glowIntensity
                  })`
                : "none",
            }}
          >
            {isHovered && (
              <div
                className="absolute"
                style={{
                  top: 0,
                  left: 0,
                  width: "200%",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.2))",
                  transform: `translateY(${-100 + glowIntensity * 200}%)`,
                  opacity: glowIntensity * 0.8,
                }}
              />
            )}
          </div>
          <div
            className="h-full relative overflow-hidden"
            style={{
              width: "12px",
              background: isHovered
                ? `rgb(${0 + glowIntensity * 15}, ${55 + glowIntensity * 15}, ${
                    122 + glowIntensity * 15
                  })`
                : "#002850",
              transform: "skewX(-20deg)",
              marginLeft: "3px",
              zIndex: 10,
              transition: "background 0.3s ease",
            }}
          >
            {isHovered && (
              <div
                className="absolute"
                style={{
                  top: 0,
                  left: 0,
                  width: "200%",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.1))",
                  transform: `translateY(${50 - glowIntensity * 200}%)`,
                  opacity: glowIntensity * 0.6,
                }}
              />
            )}
          </div>
        </div>
      </a>

      <style jsx>{`
        @keyframes animateBorder {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: 0 0;
          }
        }
      `}</style>
    </div>
  );
}
