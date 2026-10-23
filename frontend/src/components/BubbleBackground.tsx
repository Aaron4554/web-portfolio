import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { BubbleContext } from "./bubbles-context";
import "./BubbleBackground.css";

type Circle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  m: number;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

function BubbleBackground({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inksRef = useRef(new Set<HTMLElement>());
  const wakeRef = useRef<() => void>(() => {});

  // Every <Ink> calls this with its overlay element.
  const register = useCallback((el: HTMLElement) => {
    inksRef.current.add(el);
    wakeRef.current();
    return () => {
      inksRef.current.delete(el);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const inks = inksRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let w = 0;
    let h = 0;
    let circles: Circle[] = [];
    let rgb = "26, 96, 193";
    let raf = 0;
    let last = 0;
    let disposed = false;

    const readColor = () => {
      const v = getComputedStyle(canvas).getPropertyValue("--orb").trim();
      if (v) rgb = v;
    };

    const measure = () => {
      const box = canvas.getBoundingClientRect();
      w = box.width;
      h = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      const base = clamp(Math.min(w, h) * 0.09, 28, 90);
      const count = clamp(Math.round((w * h) / 90000), 4, 9);
      circles = [];
      for (let tries = 0; circles.length < count && tries < 500; tries++) {
        const r = base * (0.6 + Math.random() * 0.8);
        const angle = Math.random() * Math.PI * 2;
        const speed = 40 + Math.random() * 50; // px per second
        const c: Circle = {
          x: r + Math.random() * Math.max(w - 2 * r, 0),
          y: r + Math.random() * Math.max(h - 2 * r, 0),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r,
          m: r * r,
        };
        const clear = circles.every(
          (o) => Math.hypot(o.x - c.x, o.y - c.y) > o.r + c.r + 4,
        );
        if (clear) circles.push(c);
      }
    };

    const keepInside = () => {
      for (const c of circles) {
        c.x = clamp(c.x, c.r, Math.max(w - c.r, c.r));
        c.y = clamp(c.y, c.r, Math.max(h - c.r, c.r));
      }
    };

    const step = (dt: number) => {
      for (const c of circles) {
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        if (c.x < c.r) {
          c.x = c.r;
          c.vx = Math.abs(c.vx);
        } else if (c.x > w - c.r) {
          c.x = w - c.r;
          c.vx = -Math.abs(c.vx);
        }
        if (c.y < c.r) {
          c.y = c.r;
          c.vy = Math.abs(c.vy);
        } else if (c.y > h - c.r) {
          c.y = h - c.r;
          c.vy = -Math.abs(c.vy);
        }
      }

      // Elastic collisions, with mass proportional to area.
      for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
          const a = circles[i];
          const b = circles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const min = a.r + b.r;
          if (dist === 0 || dist >= min) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          const total = a.m + b.m;
          const overlap = min - dist;
          a.x -= nx * overlap * (b.m / total);
          a.y -= ny * overlap * (b.m / total);
          b.x += nx * overlap * (a.m / total);
          b.y += ny * overlap * (a.m / total);

          const vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (vn > 0) continue; // already moving apart
          const impulse = (-2 * vn) / (1 / a.m + 1 / b.m);
          a.vx -= (impulse * nx) / a.m;
          a.vy -= (impulse * ny) / a.m;
          b.vx += (impulse * nx) / b.m;
          b.vy += (impulse * ny) / b.m;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgba(${rgb}, 0.92)`;
      for (const c of circles) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // For each on-screen Ink: turn the circles that touch it into CSS
    // gradients in its own coordinates. Reads first, then writes, so the
    // browser only lays out once per frame.
    const paintInk = () => {
      const visible: [HTMLElement, DOMRect][] = [];
      inks.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom >= -50 && r.top <= h + 50) visible.push([el, r]);
      });
      for (const [el, r] of visible) {
        const parts: string[] = [];
        for (const c of circles) {
          if (
            c.x + c.r < r.left ||
            c.x - c.r > r.right ||
            c.y + c.r < r.top ||
            c.y - c.r > r.bottom
          ) {
            continue;
          }
          parts.push(
            `radial-gradient(circle at ${(c.x - r.left).toFixed(1)}px ${(c.y - r.top).toFixed(1)}px, #fff ${c.r.toFixed(1)}px, transparent ${(c.r + 1).toFixed(1)}px)`,
          );
        }
        el.style.backgroundImage = parts.length ? parts.join(",") : "none";
      }
    };

    const render = () => {
      draw();
      paintInk();
    };

    const layout = () => {
      if (disposed) return;
      measure();
      if (w === 0 || h === 0) return;
      if (circles.length === 0) spawn();
      else keepInside();
      render();
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      step(dt);
      render();
    };

    const sync = () => {
      if (!motion.matches && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (motion.matches && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    // While the animation loop is stopped (reduced motion), repaint on
    // scroll and when new Ink elements appear.
    const repaintIfIdle = () => {
      if (!raf && !disposed) paintInk();
    };
    wakeRef.current = repaintIfIdle;

    const onMotionChange = () => {
      sync();
      render();
    };

    readColor();
    layout();
    sync();

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(canvas);

    // Re-read the circle color when the light/dark theme switches.
    const themeObserver = new MutationObserver(() => {
      readColor();
      render();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });

    window.addEventListener("scroll", repaintIfIdle, { passive: true });
    motion.addEventListener("change", onMotionChange);
    document.fonts?.ready.then(repaintIfIdle);

    return () => {
      disposed = true;
      wakeRef.current = () => {};
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("scroll", repaintIfIdle);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <BubbleContext.Provider value={register}>
      <canvas className="bubbles" ref={canvasRef} aria-hidden="true" />
      <div className="bubbles-content">{children}</div>
    </BubbleContext.Provider>
  );
}

export default BubbleBackground;
