"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface DotShaderHaloProps {
  className?: string;
  dotSize?: number;
  spacing?: number;
  cursorRadius?: number;
  maxDisplacement?: number;
}

export default function DotShaderHalo({
  className = "",
  dotSize = 1.3,
  spacing = 22,
  cursorRadius = 140,
  maxDisplacement = 8,
}: DotShaderHaloProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);

  // Sync dark mode reactively
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(() => {
      checkDark();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Accessibility check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Cursor tracking state
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isActive: false,
      lastMoveTime: 0,
    };

    interface Dot {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      radialFactor: number; // 0 to 1 based on distance from center (for halo falloff)
    }

    let dots: Dot[] = [];

    // Resize and initialize dot grid
    const initGrid = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      dots = [];
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);

      const startX = (width - cols * spacing) / 2 + spacing / 2;
      const startY = (height - rows * spacing) / 2 + spacing / 2;

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadiusX = width * 0.52;
      const maxRadiusY = height * 0.52;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = startX + i * spacing;
          const baseY = startY + j * spacing;

          // Normalized elliptical distance from center
          const dx = (baseX - centerX) / maxRadiusX;
          const dy = (baseY - centerY) / maxRadiusY;
          const distNorm = Math.sqrt(dx * dx + dy * dy);

          // Smooth radial falloff (Halo effect): 1 at center, tapering smoothly to 0 at perimeter
          const radialFactor = Math.max(
            0,
            Math.min(1, Math.cos(Math.min(distNorm, 1) * (Math.PI / 2)))
          );

          // Only keep dots that fall within the halo perimeter
          if (radialFactor > 0.02) {
            dots.push({
              baseX,
              baseY,
              x: baseX,
              y: baseY,
              vx: 0,
              vy: 0,
              radialFactor,
            });
          }
        }
      }
    };

    initGrid();

    const resizeObserver = new ResizeObserver(() => {
      initGrid();
      if (prefersReducedMotion) renderStaticFrame();
    });
    resizeObserver.observe(container);

    // Track pointer movement relative to the container
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isActive = true;
      mouse.lastMoveTime = performance.now();
    };

    const handlePointerLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.isActive = false;
    };

    // Listen on the section or container for natural interactive feel
    const contactSection = container.closest("#contact") || container;
    contactSection.addEventListener("pointermove", handlePointerMove as EventListener);
    contactSection.addEventListener("pointerleave", handlePointerLeave as EventListener);

    // Static frame renderer for prefers-reduced-motion
    const renderStaticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const alpha = dot.radialFactor * (isDark ? 0.16 : 0.12);
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(29, 29, 31, ${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      renderStaticFrame();
      return () => {
        resizeObserver.disconnect();
        contactSection.removeEventListener("pointermove", handlePointerMove as EventListener);
        contactSection.removeEventListener("pointerleave", handlePointerLeave as EventListener);
      };
    }

    // Animation loop with physics, spring damping & low-power sleep
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Smooth cursor lerp
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.18;
        mouse.y += (mouse.targetY - mouse.y) * 0.18;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      }

      ctx.clearRect(0, 0, width, height);

      const time = currentTime * 0.0015;
      const spring = 0.12;
      const damping = 0.82;

      let isMoving = mouse.isActive;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Target position defaults to base
        let targetX = dot.baseX;
        let targetY = dot.baseY;

        // Subtle ambient breathing (gentle wave)
        const wave = Math.sin(time + dot.baseX * 0.015 + dot.baseY * 0.015) * 1.2;
        targetY += wave * dot.radialFactor;

        // Interactive cursor repulsion and scale
        let proximityScale = 1;
        let proximityGlow = 0;

        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < cursorRadius && dist > 0) {
          const force = (1 - dist / cursorRadius);
          const push = force * maxDisplacement;
          const angle = Math.atan2(dy, dx);

          targetX += Math.cos(angle) * push;
          targetY += Math.sin(angle) * push;

          proximityScale = 1 + force * 0.9; // Scale up to ~1.9x
          proximityGlow = force;
          isMoving = true;
        }

        // Spring physics towards target
        const ax = (targetX - dot.x) * spring;
        const ay = (targetY - dot.y) * spring;

        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;

        dot.x += dot.vx;
        dot.y += dot.vy;

        if (Math.abs(dot.vx) > 0.01 || Math.abs(dot.vy) > 0.01) {
          isMoving = true;
        }

        // Compute dot color and opacity with halo radial falloff
        const baseAlpha = isDark ? 0.14 : 0.11;
        const activeAlpha = isDark ? 0.8 : 0.7;
        const currentAlpha = (baseAlpha + proximityGlow * (activeAlpha - baseAlpha)) * dot.radialFactor;

        // Dynamic styling:
        // Dark Mode: crisp silver white with subtle Apple blue tint on proximity
        // Light Mode: crisp graphite neutral with subtle Apple blue (#0071E3) tint on proximity
        if (proximityGlow > 0.1) {
          if (isDark) {
            ctx.fillStyle = `rgba(180, 215, 255, ${currentAlpha})`;
          } else {
            ctx.fillStyle = `rgba(0, 113, 227, ${currentAlpha})`;
          }
        } else {
          if (isDark) {
            ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          } else {
            ctx.fillStyle = `rgba(29, 29, 31, ${currentAlpha})`;
          }
        }

        const currentRadius = dotSize * proximityScale * (0.6 + 0.4 * dot.radialFactor);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Pause animation when scrolled out of view to save battery/GPU
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      contactSection.removeEventListener("pointermove", handlePointerMove as EventListener);
      contactSection.removeEventListener("pointerleave", handlePointerLeave as EventListener);
    };
  }, [isDark, dotSize, spacing, cursorRadius, maxDisplacement]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

