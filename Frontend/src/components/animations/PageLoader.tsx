import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "@/assets/logo.png";

export const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit: morph into hero
        const exitTl = gsap.timeline({ onComplete });
        exitTl
          .to(progressRef.current, { opacity: 0, duration: 0.2 })
          .to(textRef.current, { y: -20, opacity: 0, duration: 0.3, ease: "power3.in" }, "<")
          .to(logoRef.current, { scale: 1.5, opacity: 0, duration: 0.4, ease: "power3.in" }, "-=0.2")
          .to(orbitalRef.current, { scale: 3, opacity: 0, duration: 0.6, ease: "power2.in" }, "-=0.4")
          .to(loaderRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, "-=0.2");
      },
    });

    // Orbital system entrance
    if (orbitalRef.current) {
      const rings = orbitalRef.current.querySelectorAll(".orbit-ring");
      const particles = orbitalRef.current.querySelectorAll(".orbit-particle");

      tl.fromTo(coreRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
      );
      tl.fromTo(rings,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
      tl.fromTo(particles,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.05, duration: 0.3, ease: "back.out(1.5)" },
        "-=0.3"
      );
    }

    // Logo & text
    tl.fromTo(logoRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.2"
    )
    .fromTo(textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
      "-=0.2"
    )
    .fromTo(progressRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
      "-=0.1"
    );

    // Progress
    const progressTween = gsap.to({ val: 0 }, {
      val: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: function () {
        setProgress(Math.round(this.targets()[0].val));
      },
    });
    tl.add(progressTween, "-=0.2");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center noise-grain"
      style={{ background: "hsl(222 98% 5%)" }}
    >
      {/* Orbital system */}
      <div ref={orbitalRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Core glow */}
        <div
          ref={coreRef}
          className="absolute w-6 h-6 rounded-full animate-core-pulse"
          style={{
            background: "radial-gradient(circle, hsl(180 100% 60%) 0%, hsl(180 100% 50% / 0.3) 60%, transparent 100%)",
            opacity: 0,
          }}
        />
        
        {/* Orbit rings */}
        {[60, 100, 150].map((size, i) => (
          <div
            key={i}
            className="orbit-ring absolute rounded-full border"
            style={{
              width: size,
              height: size,
              borderColor: `hsl(180 100% 50% / ${0.15 - i * 0.03})`,
              animation: `orbit ${6 + i * 3}s linear infinite${i % 2 ? ' reverse' : ''}`,
              opacity: 0,
            }}
          >
            {/* Orbiting particle */}
            <div
              className="orbit-particle absolute w-2 h-2 rounded-full"
              style={{
                top: -4,
                left: '50%',
                transform: 'translateX(-50%)',
                background: i === 0 ? 'hsl(180 100% 50%)' : i === 1 ? 'hsl(220 100% 70%)' : 'hsl(38 70% 60%)',
                boxShadow: `0 0 10px ${i === 0 ? 'hsl(180 100% 50% / 0.8)' : i === 1 ? 'hsl(220 100% 70% / 0.8)' : 'hsl(38 70% 60% / 0.8)'}`,
                opacity: 0,
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <img
          ref={logoRef}
          src={logo}
          alt="SAR-RANG"
          className="w-14 h-14 object-contain"
          style={{ opacity: 0 }}
        />
        <span
          ref={textRef}
          className="font-display text-lg font-bold tracking-[0.3em] text-foreground"
          style={{ opacity: 0 }}
        >
          SAR-RANG
        </span>

        {/* Progress bar */}
        <div className="w-40 relative" style={{ opacity: 0 }} ref={progressRef}>
          <div className="h-[1px] w-full bg-border/30 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, hsl(180 100% 50%), hsl(38 70% 60%))',
                boxShadow: '0 0 10px hsl(180 100% 50% / 0.5)',
              }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground mt-1.5 block text-center font-mono tracking-wider">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
