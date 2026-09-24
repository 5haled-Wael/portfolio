import { useEffect, useRef, useCallback } from "react";
import personalInfo from "../data/personalInfo";

const CARD_W = 130;
const CARD_H = 195;
const ROPE_REST = 180;
const GRAVITY = 0.5;
const DAMPING = 0.97;
const STIFFNESS = 0.18;
const BOUNCE = 0.6;
const TILT_SPRING = 0.3;
const TILT_DAMP = 0.5;
const MAX_TILT = 0.42;

const PendulumCard = () => {
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRef = useRef(null);

  const S = useRef({
    cardX: 0,
    cardY: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    angVel: 0,
    anchorX: 0,
    anchorY: 14,
    W: 0,
    H: 0,
    dragging: false,
    dragOffX: 0,
    dragOffY: 0,
    // velocity history buffer for smooth throw
    velBuf: [],
    rafId: null,
  });

  const resize = useCallback(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!scene || !canvas) return;
    const W = scene.offsetWidth;
    const H = scene.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    const s = S.current;
    s.W = W;
    s.H = H;
    s.anchorX = W / 2;
    if (!s.dragging) {
      s.cardX = s.anchorX;
      s.cardY = s.anchorY + ROPE_REST;
    }
  }, []);

  const ptr = (e) => {
    const rect = sceneRef.current.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const onDown = useCallback((e) => {
    const s = S.current;
    const p = ptr(e);
    const cx = s.cardX - CARD_W / 2;
    if (
      p.x >= cx &&
      p.x <= cx + CARD_W &&
      p.y >= s.cardY &&
      p.y <= s.cardY + CARD_H
    ) {
      s.dragging = true;
      s.dragOffX = p.x - s.cardX;
      s.dragOffY = p.y - s.cardY;
      s.velBuf = [];
      s.vx = 0;
      s.vy = 0;
      sceneRef.current.style.cursor = "grabbing";
    }
    e.preventDefault();
  }, []);

  const onMove = useCallback((e) => {
    const s = S.current;
    if (!s.dragging) return;
    const p = ptr(e);
    const newX = p.x - s.dragOffX;
    const newY = p.y - s.dragOffY;

    // push instantaneous delta into buffer (keep last 4 frames)
    s.velBuf.push({ vx: newX - s.cardX, vy: newY - s.cardY });
    if (s.velBuf.length > 4) s.velBuf.shift();

    s.cardX = newX;
    s.cardY = newY;
    e.preventDefault();
  }, []);

  const onUp = useCallback(() => {
    const s = S.current;
    if (!s.dragging) return;
    s.dragging = false;
    sceneRef.current.style.cursor = "grab";

    // weighted average of last 4 frames — recent frames weighted more
    if (s.velBuf.length > 0) {
      let wx = 0,
        wy = 0,
        total = 0;
      s.velBuf.forEach((v, i) => {
        const w = i + 1; // weight increases with recency
        wx += v.vx * w;
        wy += v.vy * w;
        total += w;
      });
      s.vx = (wx / total) * 1.5;
      s.vy = (wy / total) * 1.5;
    }
    s.velBuf = [];
  }, []);

  const stepPhysics = useCallback(() => {
    const s = S.current;
    if (s.dragging) return;

    const dx = s.cardX - s.anchorX;
    const dy = s.cardY - s.anchorY;
    const dist = Math.hypot(dx, dy) || 0.001;
    const stretch = dist - ROPE_REST;

    if (stretch > 0) {
      const tension = STIFFNESS * stretch;
      s.vx -= tension * (dx / dist);
      s.vy -= tension * (dy / dist);
    }

    s.vy += GRAVITY;
    s.vx *= DAMPING;
    s.vy *= DAMPING;
    s.cardX += s.vx;
    s.cardY += s.vy;

    const minX = CARD_W / 2 + 8;
    const maxX = s.W - CARD_W / 2 - 8;
    const minY = s.anchorY + 40;
    const maxY = s.H - CARD_H - 8;

    if (s.cardX < minX) {
      s.cardX = minX;
      s.vx *= -BOUNCE;
    }
    if (s.cardX > maxX) {
      s.cardX = maxX;
      s.vx *= -BOUNCE;
    }
    if (s.cardY < minY) {
      s.cardY = minY;
      s.vy *= -BOUNCE;
    }
    if (s.cardY > maxY) {
      s.cardY = maxY;
      s.vy *= -BOUNCE;
    }

    const ropeAngleFraction = dx / (ROPE_REST * 1.1);
    const target = Math.max(
      -MAX_TILT,
      Math.min(MAX_TILT, ropeAngleFraction * 0.55 + s.vx * 0.042),
    );
    s.angVel += (target - s.angle) * TILT_SPRING;
    s.angVel *= TILT_DAMP;
    s.angle += s.angVel;
  }, []);

  const drawRope = useCallback((ctx) => {
    const s = S.current;
    ctx.clearRect(0, 0, s.W, s.H);

    const dist = Math.hypot(s.cardX - s.anchorX, s.cardY - s.anchorY);
    const slack = Math.max(0, ROPE_REST - dist) * 0.5 + 8;

    const cp1x = s.anchorX + (s.cardX - s.anchorX) * 0.2;
    const cp1y = s.anchorY + slack * 1.2;
    const cp2x = s.anchorX + (s.cardX - s.anchorX) * 0.8;
    const cp2y = s.cardY - (s.cardY - s.anchorY) * 0.12 + slack * 0.4;

    // shadow
    ctx.beginPath();
    ctx.moveTo(s.anchorX + 1.5, s.anchorY + 2);
    ctx.bezierCurveTo(
      cp1x + 1.5,
      cp1y + 2,
      cp2x + 1.5,
      cp2y + 2,
      s.cardX + 1.5,
      s.cardY + 2,
    );
    ctx.strokeStyle = "rgba(0,0,0,0.20)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();

    // rope
    const grad = ctx.createLinearGradient(
      s.anchorX,
      s.anchorY,
      s.cardX,
      s.cardY,
    );
    grad.addColorStop(0, "rgba(215,200,255,0.96)");
    grad.addColorStop(0.45, "rgba(162,132,245,0.90)");
    grad.addColorStop(1, "rgba(110,80,210,0.74)");
    ctx.beginPath();
    ctx.moveTo(s.anchorX, s.anchorY);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, s.cardX, s.cardY);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.8;
    ctx.lineCap = "round";
    ctx.stroke();

    // anchor pin
    ctx.beginPath();
    ctx.arc(s.anchorX, s.anchorY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(220,205,255,0.88)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(s.anchorX, s.anchorY, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }, []);

  useEffect(() => {
    resize();
    const s = S.current;
    s.vx = 1.6;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loop = () => {
      stepPhysics();
      drawRope(ctx);
      if (cardRef.current) {
        cardRef.current.style.left = `${s.cardX - CARD_W / 2}px`;
        cardRef.current.style.top = `${s.cardY}px`;
        cardRef.current.style.transform = `rotate(${s.angle}rad)`;
      }
      s.rafId = requestAnimationFrame(loop);
    };

    s.rafId = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(s.rafId);
      window.removeEventListener("resize", resize);
    };
  }, [resize, stepPhysics, drawRope]);

  return (
    <div
      ref={sceneRef}
      className="relative h-[440px] w-full cursor-grab touch-none"
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />

      <div
        ref={cardRef}
        className="pointer-events-none absolute flex flex-col items-center gap-[7px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#1c1040] via-[#0d0820] to-[#130e30] p-[14px_10px_10px]"
        style={{
          width: CARD_W,
          transformOrigin: "top center",
          boxShadow:
            "0 14px 44px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div className="-mb-[2px] h-[13px] w-[13px] rounded-full border-2 border-white/20 bg-[#080614]" />

        <div className="h-[62px] w-[62px] overflow-hidden rounded-xl border-2 border-[#7b61ff]/40 shadow-[0_0_18px_rgba(123,97,255,0.28)]">
          <img
            src={personalInfo.image}
            alt={personalInfo.name}
            className="h-full w-full object-cover"
          />
        </div>

        <span className="text-center font-mono text-[11px] leading-[1.2] font-bold tracking-[0.4px] text-[#e2d9ff]">
          {personalInfo.name}
        </span>

        <span className="text-center font-mono text-[8.5px] tracking-[1.2px] text-[#06b6d4] uppercase">
          {personalInfo.title}
        </span>

        <div className="mt-0.5 h-[16px] w-full rounded bg-gradient-to-r from-[#7b61ff] via-[#06b6d4] to-[#49de80] opacity-85" />

        <div className="flex items-center gap-1.5">
          <div className="h-[6px] w-[6px] rounded-full bg-[#49de80] shadow-[0_0_6px_#49de80]" />
          <span className="font-mono text-[8px] text-white/40">ONLINE</span>
        </div>
      </div>
    </div>
  );
};

export default PendulumCard;
