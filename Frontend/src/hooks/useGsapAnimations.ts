import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal elements on scroll with stagger
 */
export const useScrollReveal = (selector: string, options?: {
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: options?.y ?? 60 });

    const ctx = gsap.context(() => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.8,
        stagger: options?.stagger ?? 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: options?.start ?? "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector]);

  return containerRef;
};

/**
 * Parallax effect on scroll
 */
export const useParallax = (speed: number = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
};

/**
 * Text split and reveal animation
 */
export const useTextReveal = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const text = ref.current.textContent || "";
    const words = text.split(" ");

    ref.current.innerHTML = words
      .map(
        (word) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:4px;"><span style="display:inline-block;transform:translateY(110%)">${word}</span></span>`
      )
      .join(" ");

    const innerSpans = ref.current.querySelectorAll(
      "span > span"
    );

    const ctx = gsap.context(() => {
      gsap.to(innerSpans, {
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Magnetic hover effect for buttons/elements
 */
export const useMagnetic = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return ref;
};

/**
 * Scale-in on scroll for cards
 */
export const useScaleIn = (stagger = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.children;
    if (!children.length) return;

    gsap.set(children, { opacity: 0, scale: 0.85, y: 40 });

    const ctx = gsap.context(() => {
      gsap.to(children, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        stagger,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [stagger]);

  return ref;
};
