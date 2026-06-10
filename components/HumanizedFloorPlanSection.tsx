"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Check,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Bed,
  ChefHat,
  Sofa,
  Sun,
  ArrowRight,
} from "lucide-react";

interface Room {
  id: string;
  label: string;
  description: string;
  area: string;
  cx: number;
  cy: number;
}

const rooms: Room[] = [
  {
    id: "suite",
    label: "Suíte Master",
    description: "Suíte ampla com closet integrado, banheiro privativo e iluminação natural.",
    area: "18,4 m²",
    cx: 78,
    cy: 28,
  },
  {
    id: "varanda",
    label: "Varanda Gourmet",
    description: "Varanda com churrasqueira, bancada gourmet e vista privilegiada.",
    area: "12,2 m²",
    cx: 78,
    cy: 72,
  },
  {
    id: "living",
    label: "Living Integrado",
    description: "Ambiente social amplo integrado à cozinha, ideal para receber.",
    area: "32,8 m²",
    cx: 38,
    cy: 38,
  },
  {
    id: "cozinha",
    label: "Cozinha",
    description: "Cozinha planejada com ilha central e acabamento premium.",
    area: "14,6 m²",
    cx: 38,
    cy: 68,
  },
];

const features = [
  "Zoom inteligente",
  "Navegação Touch",
  "Visualização em tela cheia",
  "Comparação de plantas",
  "Experiência otimizada para tablets e totens",
];

function FloorPlanSVG({
  mode,
  activeRoom,
}: {
  mode: "blueprint" | "humanized";
  activeRoom: string | null;
}) {
  const isBlueprint = mode === "blueprint";
  const stroke = isBlueprint ? "#2563eb" : "#c9c4bc";
  const strokeW = isBlueprint ? 0.35 : 0.25;
  const floorLiving = isBlueprint ? "none" : "#f5f0e8";
  const floorKitchen = isBlueprint ? "none" : "#faf7f2";
  const floorSuite = isBlueprint ? "none" : "#f0ebe3";
  const floorVaranda = isBlueprint ? "none" : "#e8f0e4";
  const floorHall = isBlueprint ? "none" : "#ebe6de";
  const furniture = isBlueprint ? "#93c5fd" : "#8b7355";
  const furnitureLight = isBlueprint ? "#bfdbfe" : "#a89070";

  const highlight = (id: string) =>
    activeRoom === id ? (isBlueprint ? "#FF6A00" : "rgba(255,106,0,0.18)") : undefined;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Paredes externas */}
      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        fill={isBlueprint ? "#eff6ff" : "#faf8f5"}
        stroke={stroke}
        strokeWidth={strokeW * 2}
        rx="0.5"
      />

      {/* Divisões */}
      <line x1="55" y1="8" x2="55" y2="92" stroke={stroke} strokeWidth={strokeW} />
      <line x1="8" y1="55" x2="92" y2="55" stroke={stroke} strokeWidth={strokeW} />
      <line x1="55" y1="55" x2="92" y2="55" stroke={stroke} strokeWidth={strokeW} />

      {/* Pisos por ambiente */}
      <rect x="9" y="9" width="45" height="45" fill={highlight("living") ?? floorLiving} />
      <rect x="9" y="56" width="45" height="35" fill={highlight("cozinha") ?? floorKitchen} />
      <rect x="56" y="9" width="35" height="45" fill={highlight("suite") ?? floorSuite} />
      <rect x="56" y="56" width="35" height="35" fill={highlight("varanda") ?? floorVaranda} />

      {/* Living — móveis humanizados */}
      {!isBlueprint && (
        <g opacity="0.85">
          <rect x="14" y="28" width="18" height="8" rx="1" fill={furniture} opacity="0.5" />
          <rect x="16" y="29" width="4" height="3" rx="0.5" fill={furnitureLight} />
          <rect x="22" y="29" width="4" height="3" rx="0.5" fill={furnitureLight} />
          <rect x="28" y="29" width="4" height="3" rx="0.5" fill={furnitureLight} />
          <rect x="36" y="22" width="12" height="2" rx="0.3" fill={furniture} opacity="0.4" />
          <ellipse cx="24" cy="42" rx="5" ry="3" fill={furniture} opacity="0.35" />
          <rect x="12" y="14" width="6" height="10" rx="0.3" fill="#c4b5a0" opacity="0.4" />
        </g>
      )}

      {/* Cozinha */}
      {!isBlueprint && (
        <g opacity="0.85">
          <rect x="12" y="60" width="38" height="4" rx="0.3" fill={furniture} opacity="0.45" />
          <rect x="28" y="62" width="10" height="8" rx="0.5" fill={furniture} opacity="0.35" />
          <circle cx="18" cy="72" r="2" fill="#94a3b8" opacity="0.5" />
          <circle cx="24" cy="72" r="2" fill="#94a3b8" opacity="0.5" />
        </g>
      )}

      {/* Suíte */}
      {!isBlueprint && (
        <g opacity="0.85">
          <rect x="62" y="22" width="22" height="14" rx="1" fill={furniture} opacity="0.4" />
          <rect x="64" y="24" width="5" height="4" rx="0.3" fill={furnitureLight} />
          <rect x="77" y="24" width="5" height="4" rx="0.3" fill={furnitureLight} />
          <rect x="72" y="14" width="10" height="6" rx="0.3" fill="#d4c9b8" opacity="0.5" />
        </g>
      )}

      {/* Varanda */}
      {!isBlueprint && (
        <g opacity="0.85">
          <rect x="60" y="60" width="28" height="3" rx="0.3" fill="#6b8f71" opacity="0.35" />
          <rect x="68" y="68" width="12" height="6" rx="0.5" fill={furniture} opacity="0.35" />
          <circle cx="62" cy="78" r="2.5" fill="#4ade80" opacity="0.4" />
          <circle cx="86" cy="62" r="2" fill="#4ade80" opacity="0.4" />
        </g>
      )}

      {/* Blueprint: cotas e labels técnicos */}
      {isBlueprint && (
        <g fill="#2563eb" fontSize="2.5" fontFamily="monospace" opacity="0.7">
          <text x="30" y="32">LIVING 32,8m²</text>
          <text x="22" y="74">COZINHA 14,6m²</text>
          <text x="62" y="32">SUÍTE 18,4m²</text>
          <text x="60" y="74">VARANDA 12,2m²</text>
          <line x1="8" y1="5" x2="92" y2="5" stroke="#2563eb" strokeWidth="0.2" />
          <text x="48" y="4" textAnchor="middle" fontSize="2">8,40m</text>
        </g>
      )}

      {/* Labels humanizados */}
      {!isBlueprint && (
        <g fill="#78716c" fontSize="2.2" fontFamily="system-ui" opacity="0.55">
          <text x="22" y="20">Living</text>
          <text x="20" y="58">Cozinha</text>
          <text x="66" y="20">Suíte</text>
          <text x="64" y="58">Varanda</text>
        </g>
      )}

      {/* Portas (arco) */}
      <path d="M 53 40 Q 55 40 55 42" fill="none" stroke={stroke} strokeWidth={strokeW} />
      <path d="M 53 70 Q 55 70 55 72" fill="none" stroke={stroke} strokeWidth={strokeW} />
      <path d="M 70 53 Q 70 55 72 55" fill="none" stroke={stroke} strokeWidth={strokeW} />
    </svg>
  );
}

function RoomHotspot({
  room,
  isActive,
  onSelect,
  size = "md",
}: {
  room: Room;
  isActive: boolean;
  onSelect: (id: string) => void;
  size?: "sm" | "md";
}) {
  const pin = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  const dot = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";

  return (
    <button
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${room.cx}%`, top: `${room.cy}%` }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(isActive ? "" : room.id);
      }}
      aria-label={room.label}
    >
      <div
        className={`${pin} rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive
            ? "bg-orange shadow-lg shadow-orange/40 ring-4 ring-orange/25 scale-110"
            : "bg-white shadow-md ring-2 ring-orange/20 group-hover:bg-orange group-hover:ring-orange/40"
        }`}
      >
        <span className={`${dot} rounded-full ${isActive ? "bg-white" : "bg-orange group-hover:bg-white"}`} />
      </div>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-black/90 backdrop-blur-md text-white rounded-xl p-3 shadow-xl pointer-events-none z-30"
        >
          <p className="text-orange text-[10px] font-bold uppercase tracking-wider mb-0.5">{room.label}</p>
          <p className="text-[11px] text-white/70 leading-snug mb-1">{room.description}</p>
          <p className="text-[10px] text-white/40">{room.area}</p>
        </motion.div>
      )}
    </button>
  );
}

function FloorPlanModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  useEffect(() => {
    if (!open) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setActiveRoom(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  };

  const onPointerUp = () => setDragging(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div>
              <p className="text-orange text-xs font-bold uppercase tracking-widest">PoligonoApp</p>
              <p className="text-white font-semibold">Planta Interativa · 3 Dormitórios · 98m²</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-orange/20 transition-colors"
                aria-label="Aumentar zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-orange/20 transition-colors"
                aria-label="Diminuir zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-500/30 transition-colors ml-2"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing relative"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-150"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              <div className="relative w-[min(90vw,700px)] aspect-square bg-[#faf8f5] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                <FloorPlanSVG mode="humanized" activeRoom={activeRoom} />
                {rooms.map((room) => (
                  <RoomHotspot
                    key={room.id}
                    room={room}
                    isActive={activeRoom === room.id}
                    onSelect={(id) => setActiveRoom(id || null)}
                    size="md"
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 flex-wrap justify-center px-4">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(activeRoom === room.id ? null : room.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activeRoom === room.id
                      ? "bg-orange text-white border-orange"
                      : "bg-white/10 text-white/70 border-white/20 hover:border-orange/50"
                  }`}
                >
                  {room.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TabletPreview({
  humanized,
  showButton,
  onExplore,
  activeRoom,
  onRoomSelect,
}: {
  humanized: boolean;
  showButton: boolean;
  onExplore: () => void;
  activeRoom: string | null;
  onRoomSelect: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y });
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -12,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
    });
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative perspective-1000 mx-auto w-full max-w-lg"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setTilt({ x: 8, y: -6 });
      }}
      initial={{ rotateX: 8, rotateY: -6 }}
      animate={{
        rotateX: hovering ? tilt.x : 8,
        rotateY: hovering ? tilt.y : -6,
        y: hovering ? -4 : 0,
        scale: hovering ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute -inset-6 bg-orange/8 rounded-full blur-3xl -z-10" />
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/20 rounded-full blur-xl -z-10"
        style={{ transform: "rotateX(80deg)" }}
      />

      <div className="relative bg-gradient-to-b from-gray-600 to-gray-900 rounded-[1.75rem] p-2.5 shadow-2xl shadow-black/50 border border-white/10">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-500 rounded-full" />
        <div className="bg-black rounded-[1.25rem] overflow-hidden aspect-[4/3] relative">
          <div className="absolute top-0 left-0 right-0 h-7 bg-black/70 backdrop-blur-sm flex items-center px-3 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-orange mr-2" />
            <span className="text-white/70 text-[9px] font-medium tracking-wide">
              PoligonoApp · Planta 98m²
            </span>
          </div>

          <div className="absolute inset-0 pt-7 p-2">
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#faf8f5]">
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: humanized ? 0 : 1 }}
                transition={{ duration: 0.8 }}
              >
                <FloorPlanSVG mode="blueprint" activeRoom={activeRoom} />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: humanized ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <FloorPlanSVG mode="humanized" activeRoom={activeRoom} />
              </motion.div>

              {humanized &&
                rooms.map((room) => (
                  <RoomHotspot
                    key={room.id}
                    room={room}
                    isActive={activeRoom === room.id}
                    onSelect={onRoomSelect}
                    size="sm"
                  />
                ))}

              {hovering && humanized && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                  style={{
                    background: `radial-gradient(circle 120px at ${glow.x}% ${glow.y}%, rgba(255,106,0,0.15) 0%, transparent 70%)`,
                  }}
                />
              )}
            </div>
          </div>

          <AnimatePresence>
            {showButton && humanized && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                onClick={onExplore}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-orange text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg shadow-orange/30 hover:bg-orange-dark transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Explorar Ambientes
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

const roomIcons = [
  { icon: Bed, label: "Suíte Master" },
  { icon: Sun, label: "Varanda Gourmet" },
  { icon: Sofa, label: "Living Integrado" },
  { icon: ChefHat, label: "Cozinha" },
];

export default function HumanizedFloorPlanSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });
  const [humanized, setHumanized] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setHumanized(true), 1200);
    const t2 = setTimeout(() => setShowButton(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  return (
    <>
      <div className="mb-24 relative" ref={ref}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="floor-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#121212" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floor-grid)" />
          </svg>
        </div>

        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Tablet */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <TabletPreview
              humanized={humanized}
              showButton={showButton}
              onExplore={() => setModalOpen(true)}
              activeRoom={activeRoom}
              onRoomSelect={(id) => setActiveRoom(id || null)}
            />

            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {roomIcons.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-[11px] text-black/45 bg-white px-2.5 py-1 rounded-full border border-black/5"
                >
                  <Icon className="w-3 h-3 text-orange" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-4">
              Plantas Humanizadas
            </p>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Plantas que{" "}
              <span className="text-gradient">ajudam a vender</span>
            </h3>
            <p className="text-black/60 text-lg leading-relaxed mb-8">
              Apresente layouts, ambientes e diferenciais com uma experiência visual
              desenvolvida para impressionar clientes durante a apresentação do
              empreendimento.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-orange" strokeWidth={2.5} />
                  </div>
                  <span className="text-black/70 text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setModalOpen(true)}
              className="btn-outline-dark group inline-flex gap-2"
            >
              Visualizar Planta Interativa
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      <FloorPlanModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
