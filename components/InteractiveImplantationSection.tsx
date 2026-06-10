"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Waves,
  Dumbbell,
  Baby,
  Laptop,
  PartyPopper,
  FileText,
  Tablet,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type HighlightId =
  | "tower-a"
  | "tower-b"
  | "tower-c"
  | "leisure"
  | "pool"
  | "gym"
  | "playground"
  | "coworking"
  | "party"
  | null;

interface Tower {
  id: HighlightId;
  label: string;
  floors: number;
  units: number;
  bedrooms: string;
  status: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Hotspot {
  id: HighlightId;
  label: string;
  description: string;
  icon: LucideIcon;
  x: number;
  y: number;
  gradient: string;
}

const towers: Tower[] = [
  {
    id: "tower-a",
    label: "Torre A",
    floors: 24,
    units: 192,
    bedrooms: "2 e 3 Dormitórios",
    status: "Em obras",
    x: 12,
    y: 18,
    w: 22,
    h: 34,
  },
  {
    id: "tower-b",
    label: "Torre B",
    floors: 20,
    units: 160,
    bedrooms: "2 e 3 Dormitórios",
    status: "Lançamento",
    x: 39,
    y: 14,
    w: 22,
    h: 30,
  },
  {
    id: "tower-c",
    label: "Torre C",
    floors: 18,
    units: 144,
    bedrooms: "2 Dormitórios",
    status: "Disponível",
    x: 66,
    y: 20,
    w: 20,
    h: 28,
  },
];

const hotspots: Hotspot[] = [
  {
    id: "pool",
    label: "Piscina",
    description: "Piscina adulto e infantil com deck molhado",
    icon: Waves,
    x: 28,
    y: 62,
    gradient: "from-cyan-500 to-blue-700",
  },
  {
    id: "gym",
    label: "Academia",
    description: "Fitness completo com vista para o parque",
    icon: Dumbbell,
    x: 48,
    y: 58,
    gradient: "from-slate-600 to-slate-900",
  },
  {
    id: "playground",
    label: "Playground",
    description: "Área kids com piso absorvente e brinquedos",
    icon: Baby,
    x: 68,
    y: 65,
    gradient: "from-emerald-500 to-green-700",
  },
  {
    id: "coworking",
    label: "Coworking",
    description: "Salas de reunião e estações de trabalho",
    icon: Laptop,
    x: 22,
    y: 78,
    gradient: "from-amber-600 to-orange-800",
  },
  {
    id: "party",
    label: "Salão de Festas",
    description: "Espaço gourmet com varanda e churrasqueira",
    icon: PartyPopper,
    x: 58,
    y: 78,
    gradient: "from-rose-500 to-red-800",
  },
];

const DEMO_SEQUENCE: HighlightId[] = [
  "tower-a",
  "tower-b",
  "tower-c",
  "leisure",
  "pool",
  "gym",
  "playground",
  "coworking",
  "party",
];

function BlueprintBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#121212" strokeWidth="0.5" />
          </pattern>
          <pattern id="blueprint-lines" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="30" fill="none" stroke="#FF6A00" strokeWidth="0.3" />
            <line x1="0" y1="40" x2="80" y2="40" stroke="#121212" strokeWidth="0.3" />
            <line x1="40" y1="0" x2="40" y2="80" stroke="#121212" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arch-grid)" />
        <rect width="100%" height="100%" fill="url(#blueprint-lines)" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-orange/[0.03] via-transparent to-black/[0.02]" />
    </div>
  );
}

function ImplantationSVG({ activeId }: { activeId: HighlightId }) {
  const isTowerActive = (id: HighlightId) => activeId === id;
  const leisureActive = activeId === "leisure";

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="grass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5a8f6a" />
          <stop offset="100%" stopColor="#3d6b4f" />
        </linearGradient>
        <linearGradient id="path" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4b89a" />
          <stop offset="100%" stopColor="#a89878" />
        </linearGradient>
        <linearGradient id="pool-water" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <filter id="tower-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#FF6A00" floodOpacity="0.8" />
        </filter>
        <filter id="soft-shadow">
          <feDropShadow dx="0" dy="0.5" stdDeviation="0.8" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Terreno */}
      <rect x="2" y="2" width="96" height="96" rx="3" fill="url(#grass)" />
      <rect x="6" y="52" width="88" height="42" rx="2" fill="#4a7c59" opacity="0.5" />

      {/* Área de lazer */}
      <motion.rect
        x="14"
        y="54"
        width="72"
        height="36"
        rx="2"
        fill={leisureActive ? "#FF6A00" : "#6b9e7a"}
        opacity={leisureActive ? 0.35 : 0.25}
        animate={{ opacity: leisureActive ? [0.35, 0.5, 0.35] : 0.25 }}
        transition={{ duration: 1.5, repeat: leisureActive ? Infinity : 0 }}
      />

      {/* Piscina */}
      <ellipse
        cx="34"
        cy="66"
        rx="11"
        ry="7"
        fill="url(#pool-water)"
        opacity={activeId === "pool" ? 1 : 0.85}
        filter="url(#soft-shadow)"
      />
      <ellipse cx="34" cy="66" rx="8" ry="5" fill="#7dd3fc" opacity="0.4" />

      {/* Academia */}
      <rect
        x="44"
        y="58"
        width="14"
        height="10"
        rx="1"
        fill="#475569"
        opacity={activeId === "gym" ? 1 : 0.8}
        filter="url(#soft-shadow)"
      />

      {/* Playground */}
      <circle cx="72" cy="68" r="5" fill="#f59e0b" opacity={activeId === "playground" ? 1 : 0.7} />
      <rect x="69" y="66" width="6" height="1" fill="#d97706" rx="0.5" />

      {/* Coworking & Salão */}
      <rect x="18" y="78" width="16" height="8" rx="1" fill="#78716c" opacity={activeId === "coworking" ? 1 : 0.75} />
      <rect x="54" y="78" width="18" height="8" rx="1" fill="#a16207" opacity={activeId === "party" ? 1 : 0.75} />

      {/* Caminhos */}
      <path d="M 50 48 L 50 95 M 20 70 L 80 70" stroke="url(#path)" strokeWidth="2.5" fill="none" opacity="0.6" />
      <ellipse cx="50" cy="50" rx="8" ry="5" fill="url(#path)" opacity="0.5" />

      {/* Torres */}
      {towers.map((tower) => {
        const active = isTowerActive(tower.id);
        return (
          <g key={tower.id} filter={active ? "url(#tower-glow)" : "url(#soft-shadow)"}>
            <rect
              x={tower.x}
              y={tower.y}
              width={tower.w}
              height={tower.h}
              rx="1.5"
              fill={active ? "#FF6A00" : "#2d3748"}
              stroke={active ? "#FF8533" : "#1a202c"}
              strokeWidth={active ? 0.6 : 0.3}
            />
            {/* Detalhes do telhado */}
            <rect
              x={tower.x + 1}
              y={tower.y + 1}
              width={tower.w - 2}
              height={3}
              rx="0.5"
              fill={active ? "#FF8533" : "#4a5568"}
              opacity="0.8"
            />
            {/* Janelas */}
            {Array.from({ length: 3 }).map((_, row) =>
              Array.from({ length: 2 }).map((_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={tower.x + 4 + col * (tower.w / 2 - 2)}
                  y={tower.y + 6 + row * 8}
                  width={tower.w / 2 - 5}
                  height={4}
                  rx="0.3"
                  fill={active ? "#fff" : "#718096"}
                  opacity={active ? 0.9 : 0.5}
                />
              ))
            )}
          </g>
        );
      })}

      {/* Norte */}
      <g opacity="0.4">
        <polygon points="50,6 52,10 48,10" fill="#121212" />
        <text x="50" y="14" textAnchor="middle" fontSize="3" fill="#121212" fontFamily="system-ui">
          N
        </text>
      </g>
    </svg>
  );
}

function TowerCard({ tower }: { tower: Tower }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute z-30 w-52 bg-black/90 backdrop-blur-md border border-orange/30 rounded-xl p-4 shadow-2xl shadow-orange/20 pointer-events-none"
      style={{
        left: `${tower.x + tower.w / 2}%`,
        top: `${tower.y - 4}%`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <p className="text-orange text-xs font-bold uppercase tracking-widest mb-1">{tower.label}</p>
      <p className="text-white font-bold text-lg leading-tight mb-2">
        {tower.floors} Andares · {tower.units} Unidades
      </p>
      <p className="text-white/60 text-sm mb-3">{tower.bedrooms}</p>
      <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-orange/20 text-orange border border-orange/30">
        {tower.status}
      </span>
    </motion.div>
  );
}

function HotspotCard({ hotspot }: { hotspot: Hotspot }) {
  const Icon = hotspot.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute z-30 w-56 bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/20 pointer-events-none"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        transform: "translate(-50%, -110%)",
      }}
    >
      <div className={`h-28 bg-gradient-to-br ${hotspot.gradient} relative`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-white font-bold text-sm">{hotspot.label}</span>
        </div>
      </div>
      <p className="p-3 text-sm text-black/70 leading-snug">{hotspot.description}</p>
    </motion.div>
  );
}

function HotspotPin({
  hotspot,
  isActive,
  isAuto,
  onHover,
  onLeave,
}: {
  hotspot: Hotspot;
  isActive: boolean;
  isAuto: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = hotspot.icon;
  return (
    <motion.button
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={isActive || isAuto ? { scale: [1, 1.15, 1] } : { scale: 1 }}
      transition={{ duration: 1.2, repeat: isAuto ? Infinity : 0 }}
    >
      <div
        className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive || isAuto
            ? "bg-orange shadow-lg shadow-orange/50 ring-4 ring-orange/30"
            : "bg-white shadow-md ring-2 ring-orange/20 hover:bg-orange hover:ring-orange/40"
        }`}
      >
        <Icon
          className={`w-3.5 h-3.5 transition-colors ${isActive || isAuto ? "text-white" : "text-orange"}`}
          strokeWidth={2}
        />
        {(isActive || isAuto) && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-orange"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
    </motion.button>
  );
}

function TowerPin({
  tower,
  isActive,
  isAuto,
  onHover,
  onLeave,
}: {
  tower: Tower;
  isActive: boolean;
  isAuto: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.button
      className="absolute z-20"
      style={{
        left: `${tower.x}%`,
        top: `${tower.y}%`,
        width: `${tower.w}%`,
        height: `${tower.h}%`,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      aria-label={tower.label}
    >
      {(isActive || isAuto) && (
        <motion.div
          className="absolute inset-0 rounded-sm border-2 border-orange"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}

function TabletMockup({
  activeId,
  hoveredId,
  autoId,
  onTowerHover,
  onTowerLeave,
  onHotspotHover,
  onHotspotLeave,
}: {
  activeId: HighlightId;
  hoveredId: HighlightId;
  autoId: HighlightId;
  onTowerHover: (id: HighlightId) => void;
  onTowerLeave: () => void;
  onHotspotHover: (id: HighlightId) => void;
  onHotspotLeave: () => void;
}) {
  const displayId = hoveredId ?? autoId;
  const activeTower = towers.find((t) => t.id === displayId);
  const activeHotspot = hotspots.find((h) => h.id === displayId);

  return (
    <motion.div
      className="relative perspective-1000 mx-auto w-full max-w-md"
      animate={{ y: [0, -10, 0], rotateY: [-4, 4, -4] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute -inset-8 bg-orange/10 rounded-full blur-3xl -z-10" />

      {/* iPad frame */}
      <div className="relative bg-gradient-to-b from-gray-700 to-gray-900 rounded-[2rem] p-3 shadow-2xl shadow-black/40 border border-white/10">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full" />
        <div className="bg-black rounded-[1.5rem] overflow-hidden aspect-[4/3] relative">
          {/* Screen content */}
          <div className="absolute inset-0 p-3">
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#3d6b4f] shadow-inner">
              <ImplantationSVG activeId={displayId} />

              {towers.map((tower) => (
                <TowerPin
                  key={tower.id}
                  tower={tower}
                  isActive={hoveredId === tower.id}
                  isAuto={!hoveredId && autoId === tower.id}
                  onHover={() => onTowerHover(tower.id)}
                  onLeave={onTowerLeave}
                />
              ))}

              {hotspots.map((hotspot) => (
                <HotspotPin
                  key={hotspot.id}
                  hotspot={hotspot}
                  isActive={hoveredId === hotspot.id}
                  isAuto={!hoveredId && autoId === hotspot.id}
                  onHover={() => onHotspotHover(hotspot.id)}
                  onLeave={onHotspotLeave}
                />
              ))}

              <AnimatePresence>
                {activeTower &&
                  (hoveredId === activeTower.id ||
                    (!hoveredId && autoId === activeTower.id)) && (
                    <TowerCard key={activeTower.id} tower={activeTower} />
                  )}
              </AnimatePresence>

              <AnimatePresence>
                {activeHotspot && hoveredId === activeHotspot.id && (
                  <HotspotCard key={activeHotspot.id} hotspot={activeHotspot} />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* UI chrome */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-black/60 backdrop-blur-sm flex items-center px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-orange" />
            <span className="text-white/80 text-[10px] font-medium tracking-wide">
              PoligonoApp · Implantação
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function InteractiveImplantationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [hoveredId, setHoveredId] = useState<HighlightId>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const autoId = isPaused ? null : DEMO_SEQUENCE[autoIndex];

  const advanceDemo = useCallback(() => {
    setAutoIndex((prev) => (prev + 1) % DEMO_SEQUENCE.length);
  }, []);

  useEffect(() => {
    if (!inView || isPaused) return;
    const timer = setInterval(advanceDemo, 2200);
    return () => clearInterval(timer);
  }, [inView, isPaused, advanceDemo, autoIndex]);

  const handleHover = (id: HighlightId) => {
    setIsPaused(true);
    setHoveredId(id);
  };

  const handleLeave = () => {
    setHoveredId(null);
    setIsPaused(false);
  };

  return (
    <div className="mb-24 relative" ref={ref}>
      <BlueprintBackground />

      <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-4">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-4">
            Implantação Interativa
          </p>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Explore o empreendimento{" "}
            <span className="text-gradient">com apenas um toque</span>
          </h3>
          <p className="text-black/60 text-lg leading-relaxed mb-8">
            Explore torres, áreas comuns, acessos e diferenciais através de uma
            experiência interativa desenvolvida para impressionar clientes durante
            a apresentação.
          </p>

          <a href="#contato" className="btn-primary group mb-10 inline-flex gap-2">
            Ver Demonstração
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Antes x Depois */}
          <div className="border border-black/8 rounded-2xl p-5 bg-white/80 backdrop-blur-sm">
            <p className="text-sm font-semibold text-black/50 uppercase tracking-widest mb-4">
              Muito além de uma planta impressa
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gray-light p-4 border border-black/5 opacity-60">
                <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-black/40" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-black/50">PDF tradicional</p>
                <p className="text-xs text-black/35 mt-1">Estático, desatualizado</p>
              </div>
              <div className="rounded-xl bg-orange/5 p-4 border border-orange/20">
                <div className="w-10 h-10 bg-orange/15 rounded-lg flex items-center justify-center mb-3">
                  <Tablet className="w-5 h-5 text-orange" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-black/80">PoligonoApp interativo</p>
                <p className="text-xs text-orange mt-1">Torres, lazer e hotspots</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tablet 3D */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setHoveredId(null);
            setIsPaused(false);
          }}
        >
          <TabletMockup
            activeId={hoveredId ?? autoId}
            hoveredId={hoveredId}
            autoId={autoId}
            onTowerHover={handleHover}
            onTowerLeave={handleLeave}
            onHotspotHover={handleHover}
            onHotspotLeave={handleLeave}
          />

          {/* Legenda */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {hotspots.map((h) => {
              const Icon = h.icon;
              return (
                <span
                  key={h.id}
                  className="inline-flex items-center gap-1.5 text-xs text-black/50 bg-white/80 px-2.5 py-1 rounded-full border border-black/5"
                >
                  <Icon className="w-3 h-3 text-orange" strokeWidth={2} />
                  {h.label}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
