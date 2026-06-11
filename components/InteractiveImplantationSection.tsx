"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionActive } from "@/hooks/useMotionActive";
import { FileText, Monitor, ArrowRight } from "lucide-react";

type HighlightId = number | "centro" | null;

interface Bolotario {
  id: number;
  label: string;
  torre: string;
  floors: number;
  units: number;
  bedrooms: string;
  status: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const bolotarios: Bolotario[] = [
  { id: 1, label: "Bloco 1", torre: "Torre Norte A", floors: 24, units: 192, bedrooms: "2 e 3 dorms.", status: "Disponível", x: 10, y: 8, w: 16, h: 20 },
  { id: 2, label: "Bloco 2", torre: "Torre Norte B", floors: 22, units: 176, bedrooms: "2 e 3 dorms.", status: "Disponível", x: 30, y: 6, w: 16, h: 20 },
  { id: 3, label: "Bloco 3", torre: "Torre Norte C", floors: 20, units: 160, bedrooms: "2 dorms.", status: "Em obras", x: 50, y: 8, w: 16, h: 20 },
  { id: 4, label: "Bloco 4", torre: "Torre Oeste", floors: 18, units: 144, bedrooms: "2 e 3 dorms.", status: "Lançamento", x: 6, y: 34, w: 15, h: 18 },
  { id: 5, label: "Bloco 5", torre: "Torre Leste", floors: 18, units: 144, bedrooms: "2 dorms.", status: "Disponível", x: 79, y: 34, w: 15, h: 18 },
  { id: 6, label: "Bloco 6", torre: "Torre Sul A", floors: 16, units: 128, bedrooms: "2 dorms.", status: "Disponível", x: 12, y: 68, w: 15, h: 18 },
  { id: 7, label: "Bloco 7", torre: "Torre Sul B", floors: 16, units: 128, bedrooms: "2 e 3 dorms.", status: "Em obras", x: 32, y: 72, w: 15, h: 18 },
  { id: 8, label: "Bloco 8", torre: "Torre Sul C", floors: 14, units: 112, bedrooms: "2 dorms.", status: "Disponível", x: 52, y: 68, w: 15, h: 18 },
  { id: 9, label: "Bloco 9", torre: "Torre Sul D", floors: 14, units: 112, bedrooms: "2 dorms.", status: "Lançamento", x: 72, y: 72, w: 15, h: 18 },
];

const DEMO_SEQUENCE: HighlightId[] = [1, 2, 3, 4, "centro", 5, 6, 7, 8, 9];

function BlueprintBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="impl-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#121212" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#impl-grid)" />
      </svg>
    </div>
  );
}

function MasterPlanSVG({ activeId }: { activeId: HighlightId }) {
  const centroActive = activeId === "centro";

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="terrain" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8ebe4" />
          <stop offset="100%" stopColor="#d4d9ce" />
        </linearGradient>
        <linearGradient id="grass-zone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b9e72" />
          <stop offset="100%" stopColor="#4a7c59" />
        </linearGradient>
        <linearGradient id="pool-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <filter id="block-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#FF6A00" floodOpacity="0.9" />
        </filter>
        <filter id="map-shadow">
          <feDropShadow dx="0" dy="0.4" stdDeviation="0.6" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Terreno */}
      <rect x="1" y="1" width="98" height="98" rx="2" fill="url(#terrain)" stroke="#b8bfb0" strokeWidth="0.4" />

      {/* Ruas / acessos */}
      <path
        d="M 0 50 L 22 50 L 28 44 L 72 44 L 78 50 L 100 50"
        fill="none"
        stroke="#c9c2b0"
        strokeWidth="3"
        opacity="0.7"
      />
      <path
        d="M 50 0 L 50 28 M 50 72 L 50 100"
        fill="none"
        stroke="#c9c2b0"
        strokeWidth="2.5"
        opacity="0.5"
      />
      <ellipse cx="50" cy="50" rx="5" ry="3" fill="#d4cbb8" opacity="0.6" />

      {/* Estacionamento */}
      <rect x="24" y="30" width="8" height="12" rx="0.5" fill="#b0b8c4" opacity="0.35" />
      <rect x="68" y="30" width="8" height="12" rx="0.5" fill="#b0b8c4" opacity="0.35" />
      {[0, 1, 2].map((i) => (
        <line key={`pl-${i}`} x1={25 + i * 2.5} y1="31" x2={25 + i * 2.5} y2="41" stroke="#8899aa" strokeWidth="0.3" opacity="0.5" />
      ))}

      {/* Área central de lazer */}
      <motion.rect
        x="28"
        y="30"
        width="44"
        height="40"
        rx="3"
        fill="url(#grass-zone)"
        stroke={centroActive ? "#FF6A00" : "#5a8f65"}
        strokeWidth={centroActive ? 0.8 : 0.4}
        filter={centroActive ? "url(#block-glow)" : undefined}
        animate={{ opacity: centroActive ? [0.85, 1, 0.85] : 0.9 }}
        transition={{ duration: 1.5, repeat: centroActive ? Infinity : 0 }}
      />

      {/* Piscina central */}
      <ellipse cx="42" cy="48" rx="9" ry="6" fill="url(#pool-fill)" opacity="0.9" filter="url(#map-shadow)" />
      <ellipse cx="42" cy="48" rx="6" ry="4" fill="#7dd3fc" opacity="0.35" />

      {/* Deck / praça */}
      <rect x="54" y="42" width="12" height="8" rx="1" fill="#c4a882" opacity="0.55" />
      <rect x="36" y="58" width="10" height="6" rx="0.5" fill="#8b7355" opacity="0.4" />

      {/* Árvores decorativas */}
      {[
        [26, 55], [74, 55], [30, 62], [70, 62], [50, 66],
      ].map(([cx, cy], i) => (
        <g key={i} opacity="0.55">
          <circle cx={cx} cy={cy} r="2.2" fill="#3d6b4f" />
          <circle cx={cx} cy={cy - 0.8} r="1.4" fill="#5a9e6a" />
        </g>
      ))}

      {/* Blocos / torres */}
      {bolotarios.map((b) => {
        const active = activeId === b.id;
        return (
          <g key={b.id} filter={active ? "url(#block-glow)" : "url(#map-shadow)"}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="1"
              fill={active ? "#FF6A00" : "#3d4f5f"}
              stroke={active ? "#FF8533" : "#2d3748"}
              strokeWidth={active ? 0.6 : 0.35}
            />
            {/* Cobertura */}
            <rect
              x={b.x + 0.8}
              y={b.y + 0.8}
              width={b.w - 1.6}
              height={2.5}
              rx="0.4"
              fill={active ? "#FF8533" : "#4a5568"}
              opacity="0.85"
            />
            {/* Janelas */}
            {Array.from({ length: 3 }).map((_, row) =>
              Array.from({ length: 2 }).map((_, col) => (
                <rect
                  key={`${b.id}-${row}-${col}`}
                  x={b.x + 2.5 + col * (b.w / 2 - 1.5)}
                  y={b.y + 4.5 + row * 4.5}
                  width={b.w / 2 - 3.5}
                  height={2.8}
                  rx="0.2"
                  fill={active ? "#fff" : "#718096"}
                  opacity={active ? 0.85 : 0.45}
                />
              ))
            )}
          </g>
        );
      })}

      {/* Bússola */}
      <g opacity="0.45" transform="translate(88, 8)">
        <circle r="4" fill="white" stroke="#121212" strokeWidth="0.3" />
        <polygon points="0,-3 1,1 -1,1" fill="#FF6A00" />
        <text y="6" textAnchor="middle" fontSize="2.5" fill="#121212" fontFamily="system-ui">N</text>
      </g>

      {/* Escala */}
      <g opacity="0.35" transform="translate(6, 92)">
        <line x1="0" y1="0" x2="12" y2="0" stroke="#121212" strokeWidth="0.5" />
        <text x="6" y="-1.5" textAnchor="middle" fontSize="2" fill="#121212" fontFamily="system-ui">50m</text>
      </g>
    </svg>
  );
}

function BolotarioPin({
  bolotario,
  isActive,
  isAuto,
  onHover,
  onLeave,
}: {
  bolotario: Bolotario;
  isActive: boolean;
  isAuto: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cx = bolotario.x + bolotario.w / 2;
  const cy = bolotario.y + bolotario.h / 2;
  const highlighted = isActive || isAuto;

  return (
    <button
      type="button"
      className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
        isAuto && !isActive ? "scale-110" : ""
      }`}
      style={{ left: `${cx}%`, top: `${cy}%` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      aria-label={`Bloco ${bolotario.id} — ${bolotario.torre}`}
    >
      <div
        className={`relative w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
          highlighted
            ? "bg-orange text-white shadow-lg shadow-orange/50 ring-4 ring-orange/25 scale-110"
            : "bg-white text-black shadow-md ring-2 ring-black/10 hover:bg-orange hover:text-white hover:ring-orange/30"
        }`}
      >
        {bolotario.id}
        {highlighted && (
          <span className="absolute inset-0 rounded-full border-2 border-orange opacity-50 scale-125" />
        )}
      </div>
    </button>
  );
}

function BolotarioCard({ bolotario }: { bolotario: Bolotario }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="absolute z-30 w-56 bg-black/92 backdrop-blur-md border border-orange/30 rounded-xl p-4 shadow-2xl shadow-orange/15 pointer-events-none"
      style={{
        left: `${bolotario.x + bolotario.w / 2}%`,
        top: `${bolotario.y}%`,
        transform: "translate(-50%, -108%)",
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-8 rounded-full bg-orange text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
          {bolotario.id}
        </span>
        <div>
          <p className="text-orange text-[10px] font-bold uppercase tracking-widest">{bolotario.label}</p>
          <p className="text-white font-semibold text-sm leading-tight">{bolotario.torre}</p>
        </div>
      </div>
      <p className="text-white/70 text-xs mb-2">
        {bolotario.floors} andares · {bolotario.units} unidades · {bolotario.bedrooms}
      </p>
      <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange/20 text-orange border border-orange/30">
        {bolotario.status}
      </span>
    </motion.div>
  );
}

function CentroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="absolute z-30 left-1/2 top-[38%] -translate-x-1/2 -translate-y-full w-52 bg-black/92 backdrop-blur-md border border-orange/30 rounded-xl p-4 shadow-2xl pointer-events-none"
    >
      <p className="text-orange text-[10px] font-bold uppercase tracking-widest mb-1">Área Central</p>
      <p className="text-white font-semibold text-sm mb-2">Clube & Lazer</p>
      <p className="text-white/60 text-xs leading-relaxed">
        Piscina, deck, praça de convivência e circulação entre os 9 blocos.
      </p>
    </motion.div>
  );
}

function ImplantationMapDisplay({
  displayId,
  hoveredId,
  autoId,
  onBolotarioHover,
  onBolotarioLeave,
  onCentroHover,
  onCentroLeave,
}: {
  displayId: HighlightId;
  hoveredId: HighlightId;
  autoId: HighlightId;
  onBolotarioHover: (id: number) => void;
  onBolotarioLeave: () => void;
  onCentroHover: () => void;
  onCentroLeave: () => void;
}) {
  const activeBolotario = typeof displayId === "number"
    ? bolotarios.find((b) => b.id === displayId)
    : undefined;
  const showBolotarioCard =
    activeBolotario &&
    (hoveredId === activeBolotario.id || (!hoveredId && autoId === activeBolotario.id));
  const showCentroCard =
    displayId === "centro" && (hoveredId === "centro" || (!hoveredId && autoId === "centro"));

  return (
    <motion.div
      className="relative mx-auto w-full max-w-3xl"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div
        className="absolute -inset-10 rounded-full blur-3xl -z-10"
        style={{ background: "radial-gradient(circle, rgba(255,106,0,0.12) 0%, transparent 70%)" }}
      />

      {/* Tela totem — mapa em destaque */}
      <div className="relative bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl shadow-black/30 border border-white/10">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full" />

        <div className="bg-[#eef0ea] rounded-xl overflow-hidden aspect-[4/3] relative">
          {/* Barra */}
          <div className="absolute top-0 left-0 right-0 h-9 bg-black/80 backdrop-blur-md flex items-center justify-between px-4 z-20 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange" />
              <span className="text-white/80 text-[11px] font-medium tracking-wide">
                PoligonoApp · Mapa de Implantação
              </span>
            </div>
            <span className="text-[10px] text-white/40 font-mono">9 BLOCOs</span>
          </div>

          {/* Mapa central */}
          <div className="absolute inset-0 pt-9 p-3">
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-black/10 shadow-inner bg-[#e8ebe4]">
              <MasterPlanSVG activeId={displayId} />

              {/* Hotspot área central */}
              <button
                className="absolute z-10 rounded-lg border-2 border-transparent hover:border-orange/40 transition-colors"
                style={{ left: "28%", top: "30%", width: "44%", height: "40%" }}
                onMouseEnter={onCentroHover}
                onMouseLeave={onCentroLeave}
                aria-label="Área central de lazer"
              />

              {bolotarios.map((b) => (
                <BolotarioPin
                  key={b.id}
                  bolotario={b}
                  isActive={hoveredId === b.id}
                  isAuto={!hoveredId && autoId === b.id}
                  onHover={() => onBolotarioHover(b.id)}
                  onLeave={onBolotarioLeave}
                />
              ))}

              <AnimatePresence>
                {showBolotarioCard && activeBolotario && (
                  <BolotarioCard key={activeBolotario.id} bolotario={activeBolotario} />
                )}
                {showCentroCard && <CentroCard key="centro" />}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-2 w-28 h-1.5 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg" />
        <div className="mx-auto w-44 h-1 bg-gray-800 rounded-full" />
      </div>

      {/* Legenda bolotários */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {bolotarios.map((b) => {
          const active = displayId === b.id;
          return (
            <span
              key={b.id}
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                active
                  ? "bg-orange text-white shadow-md shadow-orange/30 scale-110"
                  : "bg-white text-black/60 border border-black/10"
              }`}
            >
              {b.id}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function InteractiveImplantationSection() {
  const { ref, active: motionActive } = useMotionActive({ threshold: 0.15 });
  const inView = motionActive;
  const [hoveredId, setHoveredId] = useState<HighlightId>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const autoId: HighlightId = isPaused ? null : DEMO_SEQUENCE[autoIndex];
  const displayId = hoveredId ?? autoId;

  const advanceDemo = useCallback(() => {
    setAutoIndex((prev) => (prev + 1) % DEMO_SEQUENCE.length);
  }, []);

  useEffect(() => {
    if (!motionActive || isPaused) return;
    const timer = setInterval(advanceDemo, 2800);
    return () => clearInterval(timer);
  }, [motionActive, isPaused, advanceDemo]);

  return (
    <div className="mb-24 relative" ref={ref}>
      <BlueprintBackground />

      <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-4">
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
            Mapa central do{" "}
            <span className="text-gradient">empreendimento completo</span>
          </h3>
          <p className="text-black/60 text-lg leading-relaxed mb-8">
            Visualize todos os blocos do empreendimento em um mapa interativo com
            bolotários numerados de 1 a 9. Toque em cada torre para ver andares,
            unidades e disponibilidade em tempo real.
          </p>

          <a href="#contato" className="btn-primary group mb-10 inline-flex gap-2">
            Ver Demonstração
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

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
                <p className="text-xs text-black/35 mt-1">Estático, sem interação</p>
              </div>
              <div className="rounded-xl bg-orange/5 p-4 border border-orange/20">
                <div className="w-10 h-10 bg-orange/15 rounded-lg flex items-center justify-center mb-3">
                  <Monitor className="w-5 h-5 text-orange" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-black/80">Mapa interativo</p>
                <p className="text-xs text-orange mt-1">9 blocos com bolotários</p>
              </div>
            </div>
          </div>
        </motion.div>

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
          <ImplantationMapDisplay
            displayId={displayId}
            hoveredId={hoveredId}
            autoId={autoId}
            onBolotarioHover={(id) => setHoveredId(id)}
            onBolotarioLeave={() => setHoveredId(null)}
            onCentroHover={() => setHoveredId("centro")}
            onCentroLeave={() => setHoveredId(null)}
          />
        </motion.div>
      </div>
    </div>
  );
}
