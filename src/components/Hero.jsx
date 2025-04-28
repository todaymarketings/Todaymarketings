import { useState, useEffect, useRef } from "react";
// import heroimage from "../assets/heroimage.jpg";
import heroimage from "../assets/heroimage.svg";
import SplashCursor from "../components/SplashCursor.jsx";

export default function Hero() {
  const words = ["Solutions", "Campaigns"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentWord = words[currentIndex];
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // HomeButton state variables
  const [isHovered, setIsHovered] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [particleEffects, setParticleEffects] = useState([]);

  // Fix: Change from +2 to +1 to cycle through all words properly
  const nextIndex = (currentIndex + 1) % words.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);

      // Wait for exit animation to complete before changing the word
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, nextIndex]);

  // HomeButton animation for the neon glow effect and particles
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

  // Particles animation for the background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const particleCount = 80;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              0.2 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }

      animationRef.current = requestAnimationFrame(drawParticles);
    };

    // Initialize
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    initParticles();
    drawParticles();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section
      className="text-white relative overflow-hidden py-16"
      style={{
        background: "linear-gradient(to left, #D80032, #A5001E, #3D0C11)",
        borderRadius: "44rem 18rem 83rem 44rem",
        boxShadow: "inset 0 0 70px rgba(216, 0, 50, 0.6)",
      }}
    >
      {/* Tech Particles Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight gradient-text">
              All-in-One AI Marketing Platform for{" "}
              <span className="word-animation-wrapper">
                <span className="word-animation-container">
                  <span
                    className={`word-animation ${
                      isAnimating ? "word-exit" : "word-active"
                    }`}
                  >
                    {currentWord}
                  </span>
                </span>
              </span>
            </h1>
            <p className="mt-4 text-lg text-red-100">
              AI simplifies campaigns, targets customers, and automates tasks
              for amazing ROI with TodayMarketings.
            </p>
            <div className="mt-8 flex">
              {/* Integrated HomeButton */}
              <div className="flex justify-start items-center">
                <a
                  href="/Signin"
                  className="flex items-stretch no-underline transition-all duration-300 ease-in-out relative"
                  style={{
                    filter: `drop-shadow(0 ${4 + glowIntensity * 3}px ${
                      6 + glowIntensity * 4
                    }px rgba(0, 0, 0, 0.3)) ${
                      isHovered
                        ? `drop-shadow(0 0 ${
                            8 + glowIntensity * 8
                          }px rgba(231, 0, 50, ${0.3 * glowIntensity}))`
                        : ""
                    }`,
                    transform: isHovered
                      ? `translateY(-${3 + glowIntensity}px)`
                      : "none",
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
                        boxShadow: `0 0 ${
                          particle.size * 2
                        }px rgba(255, 150, 150, 0.8)`,
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
                        ? `linear-gradient(to right, rgb(${
                            216 + glowIntensity * 15
                          }, ${0 + glowIntensity * 20}, ${
                            32 + glowIntensity * 10
                          }), rgb(${165 + glowIntensity * 10}, ${
                            0 + glowIntensity * 10
                          }, ${30 + glowIntensity * 10}))`
                        : "linear-gradient(to bottom, #D80032, #A5001E)",
                      clipPath: "polygon(15% 0, 100% 0, 90% 100%, 0% 100%)",
                      zIndex: 20,
                      transition: "background 0.3s ease",
                      boxShadow: isHovered
                        ? `inset 0 0 ${
                            10 + glowIntensity * 15
                          }px rgba(255, 0, 50, ${0.4 + glowIntensity * 0.6})`
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
                        transition:
                          "transform 0.5s ease-out, opacity 0.5s ease-out",
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
                          ? `0 0 ${
                              3 + glowIntensity * 5
                            }px rgba(255, 255, 255, ${
                              0.4 * glowIntensity
                            }), 0 1px 1px rgba(0, 0, 0, 0.4)`
                          : "0 1px 1px rgba(0, 0, 0, 0.4)",
                        transform: isHovered
                          ? `scale(${1.03 + glowIntensity * 0.02})`
                          : "scale(1)",
                        transition:
                          "transform 0.3s ease, text-shadow 0.3s ease",
                      }}
                    >
                      Try Demo
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
                          ? `rgb(${165 + glowIntensity * 20}, ${
                              0 + glowIntensity * 5
                            }, ${30 + glowIntensity * 5})`
                          : "#A5001E",
                        transform: "skewX(-20deg)",
                        zIndex: 11,
                        transition: "background 0.3s ease",
                        boxShadow: isHovered
                          ? `inset 0 0 ${
                              5 + glowIntensity * 10
                            }px rgba(255, 0, 50, ${0.3 * glowIntensity})`
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
                            transform: `translateY(${
                              -100 + glowIntensity * 200
                            }%)`,
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
                          ? `rgb(${61 + glowIntensity * 15}, ${
                              12 + glowIntensity * 3
                            }, ${17 + glowIntensity * 3})`
                          : "#3D0C11",
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
                            transform: `translateY(${
                              50 - glowIntensity * 200
                            }%)`,
                            opacity: glowIntensity * 0.6,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </a>
              </div>

              <div className="flex justify-start items-center">
                <a
                  href="#ai-roi-simulator"
                  className="flex items-stretch no-underline transition-all duration-300 ease-in-out relative"
                  style={{
                    scrollBehavior: "smooth",
                    filter: `drop-shadow(0 ${4 + glowIntensity * 3}px ${
                      6 + glowIntensity * 4
                    }px rgba(0, 0, 0, 0.3)) ${
                      isHovered
                        ? `drop-shadow(0 0 ${
                            8 + glowIntensity * 8
                          }px rgba(231, 0, 50, ${0.3 * glowIntensity}))`
                        : ""
                    }`,
                    transform: isHovered
                      ? `translateY(-${3 + glowIntensity}px)`
                      : "none",
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
                        boxShadow: `0 0 ${
                          particle.size * 2
                        }px rgba(255, 150, 150, 0.8)`,
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
                        ? `linear-gradient(to right, rgb(${
                            216 + glowIntensity * 15
                          }, ${0 + glowIntensity * 20}, ${
                            32 + glowIntensity * 10
                          }), rgb(${165 + glowIntensity * 10}, ${
                            0 + glowIntensity * 10
                          }, ${30 + glowIntensity * 10}))`
                        : "linear-gradient(to bottom, #D80032, #A5001E)",
                      clipPath: "polygon(15% 0, 100% 0, 90% 100%, 0% 100%)",
                      zIndex: 20,
                      transition: "background 0.3s ease",
                      boxShadow: isHovered
                        ? `inset 0 0 ${
                            10 + glowIntensity * 15
                          }px rgba(255, 0, 50, ${0.4 + glowIntensity * 0.6})`
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
                        transition:
                          "transform 0.5s ease-out, opacity 0.5s ease-out",
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
                          ? `0 0 ${
                              3 + glowIntensity * 5
                            }px rgba(255, 255, 255, ${
                              0.4 * glowIntensity
                            }), 0 1px 1px rgba(0, 0, 0, 0.4)`
                          : "0 1px 1px rgba(0, 0, 0, 0.4)",
                        transform: isHovered
                          ? `scale(${1.03 + glowIntensity * 0.02})`
                          : "scale(1)",
                        transition:
                          "transform 0.3s ease, text-shadow 0.3s ease",
                      }}
                    >
                      Try AI Templates
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
                          ? `rgb(${165 + glowIntensity * 20}, ${
                              0 + glowIntensity * 5
                            }, ${30 + glowIntensity * 5})`
                          : "#A5001E",
                        transform: "skewX(-20deg)",
                        zIndex: 11,
                        transition: "background 0.3s ease",
                        boxShadow: isHovered
                          ? `inset 0 0 ${
                              5 + glowIntensity * 10
                            }px rgba(255, 0, 50, ${0.3 * glowIntensity})`
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
                            transform: `translateY(${
                              -100 + glowIntensity * 200
                            }%)`,
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
                          ? `rgb(${61 + glowIntensity * 15}, ${
                              12 + glowIntensity * 3
                            }, ${17 + glowIntensity * 3})`
                          : "#3D0C11",
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
                            transform: `translateY(${
                              50 - glowIntensity * 200
                            }%)`,
                            opacity: glowIntensity * 0.6,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Modified image container with 45-degree rotation and square dimensions */}
            <div
              className="bg-white/10 p-5 rounded-lg shadow-xl backdrop-blur-sm"
              style={{
                transform: "rotate(45deg)",
                width: "439px",
                padding: "20px",
              }}
            >
              {/* Image container with 20px padding */}
              <div
                className="rounded flex items-center justify-center overflow-hidden"
                style={{
                  width: "400px",
                  height: "400px",
                  padding: "20px",
                  background: "rgba(61, 12, 17, 0.3)",
                }}
              >
                {/* Square image */}
                <div className="w-full h-full">
                  <img
                    src={heroimage.src}
                    alt="Hero"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: "rgba(255, 0, 0, 0.1)" }} // Red with 40% opacity
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for improved text animation and gradient text */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #ff6b8b, #ffccd5, #ff8fab);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .word-animation-wrapper {
          display: inline-flex;
          align-items: baseline;
          vertical-align: baseline;
          height: auto;
          position: relative;
        }

        .word-animation-container {
          display: inline-block;
          overflow: hidden;
          min-width: 250px;
          height: 1em;
          position: relative;
          vertical-align: baseline;
        }

        .word-animation {
          display: inline-block;
          width: 100%;
          position: absolute;
          left: 0;
          transition: all 0.5s ease-in-out;
          background: linear-gradient(135deg, #ff8fab, #ff5c8a);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: bold;
          text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
          white-space: nowrap;
          padding-right: 4px;
          height: 4rem;
        }

        .word-active {
          transform: translateY(0);
          opacity: 1;
        }

        .word-exit {
          transform: translateY(-120%);
          opacity: 0;
        }

        @keyframes animateBorder {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: 0 0;
          }
        }
      `}</style>
      {/* <SplashCursor client:load /> */}
    </section>
  );
}
