"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, MapPin, Clock } from "lucide-react";

const CENTER = { x: 200, y: 200 };

const pois = [
  { id: "escola", name: "Colégio Objetivo", time: "2 min", x: 88, y: 108 },
  { id: "shopping", name: "Shopping Iguatemi", time: "3 min", x: 318, y: 88 },
  { id: "hospital", name: "Hospital São Luiz", time: "4 min", x: 62, y: 248 },
  { id: "carrefour", name: "Carrefour", time: "5 min", x: 338, y: 268 },
  { id: "parque", name: "Parque Municipal", time: "6 min", x: 200, y: 348 },
];

const metrics = [
  { label: "da escola", time: "2 min" },
  { label: "do hospital", time: "4 min" },
  { label: "do shopping", time: "5 min" },
  { label: "do parque", time: "7 min" },
  { label: "do centro", time: "10 min" },
];

function CityMapBase() {
  return (
    <g>
      {/* Base urbana */}
      <rect width="400" height="400" fill="#e8e4df" />

      {/* Parques */}
      <ellipse cx="55" cy="320" rx="42" ry="28" fill="#b8d4b0" opacity="0.7" />
      <ellipse cx="340" cy="130" rx="35" ry="22" fill="#b8d4b0" opacity="0.55" />
      <path d="M 160 30 Q 200 50 240 30 L 250 70 Q 200 90 150 70 Z" fill="#c5dbb8" opacity="0.6" />

      {/* Blocos urbanos */}
      <rect x="120" y="40" width="60" height="45" fill="#d4cfc8" rx="2" />
      <rect x="250" y="130" width="55" height="40" fill="#d4cfc8" rx="2" />
      <rect x="40" y="160" width="50" height="55" fill="#d4cfc8" rx="2" />
      <rect x="300" y="200" width="65" height="50" fill="#d4cfc8" rx="2" />
      <rect x="130" y="280" width="70" height="45" fill="#d4cfc8" rx="2" />

      {/* Ruas principais */}
      <path
        d="M 0 200 L 400 200"
        stroke="#ffffff"
        strokeWidth="14"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M 200 0 L 200 400"
        stroke="#ffffff"
        strokeWidth="12"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M 0 120 Q 100 100 200 120 T 400 100"
        stroke="#ffffff"
        strokeWidth="8"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M 30 300 Q 150 280 280 310 T 400 290"
        stroke="#ffffff"
        strokeWidth="7"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 80 0 L 80 400"
        stroke="#f5f3f0"
        strokeWidth="5"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M 320 0 L 320 400"
        stroke="#f5f3f0"
        strokeWidth="5"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M 0 80 L 400 80"
        stroke="#f5f3f0"
        strokeWidth="4"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 0 320 L 400 320"
        stroke="#f5f3f0"
        strokeWidth="4"
        fill="none"
        opacity="0.7"
      />

      {/* Nomes de ruas */}
      <text x="205" y="195" fill="#9ca3af" fontSize="7" fontFamily="system-ui" opacity="0.8">
        Av. Central
      </text>
      <text
        x="195"
        y="215"
        fill="#9ca3af"
        fontSize="6"
        fontFamily="system-ui"
        opacity="0.7"
        transform="rotate(-90 195 215)"
      >
        Rua das Flores
      </text>
      <text x="25" y="118" fill="#9ca3af" fontSize="6" fontFamily="system-ui" opacity="0.6">
        Alameda Norte
      </text>
      <text x="240" y="305" fill="#9ca3af" fontSize="6" fontFamily="system-ui" opacity="0.6">
        Av. Sul
      </text>
    </g>
  );
}

function ConnectionLine({
  poi,
  visible,
  highlighted,
}: {
  poi: (typeof pois)[0];
  visible: boolean;
  highlighted: boolean;
}) {
  return (
    <motion.path
      d={`M ${CENTER.x} ${CENTER.y} L ${poi.x} ${poi.y}`}
      fill="none"
      stroke="#FF6A00"
      strokeWidth={highlighted ? 2 : 1.2}
      strokeOpacity={highlighted ? 0.85 : 0.35}
      strokeDasharray="4 3"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    />
  );
}

function POIPin({
  poi,
  visible,
  highlighted,
  onHover,
  onLeave,
}: {
  poi: (typeof pois)[0];
  visible: boolean;
  highlighted: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${(poi.x / 400) * 100}%`, top: `${(poi.y / 400) * 100}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative cursor-pointer group">
        {/* Pulso */}
        {visible && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full bg-orange/30"
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              style={{ width: 28, height: 28, margin: -6 }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-orange/20"
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              style={{ width: 28, height: 28, margin: -6 }}
            />
          </>
        )}

        <div
          className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg transition-all duration-300 ${
            highlighted
              ? "bg-orange text-white shadow-orange/40 scale-105"
              : "bg-white text-black/80 shadow-black/10 group-hover:bg-orange group-hover:text-white"
          }`}
        >
          <MapPin className="w-3 h-3 flex-shrink-0" strokeWidth={2.5} />
          <div className="text-left leading-tight">
            <p className="text-[10px] font-bold whitespace-nowrap">{poi.name}</p>
            <p className={`text-[9px] ${highlighted ? "text-white/80" : "text-orange"}`}>
              {poi.time}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RegionalMapSection() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });
  const [mapRef, mapInView] = useInView({
    triggerOnce: true,
    threshold: 0.55,
    rootMargin: "-40px 0px -40px 0px",
  });
  const [phase, setPhase] = useState(0);
  const [hoveredPoi, setHoveredPoi] = useState<string | null>(null);
  const [metricsVisible, setMetricsVisible] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (!mapInView) return;

    setAnimationStarted(true);
    setPhase(0);
    setMetricsVisible(0);

    const delays = [0, 400, 900, 1400, 1900, 2400, 2900];
    const timers = delays.map((delay, i) =>
      setTimeout(() => {
        setPhase(i);
        if (i >= 2) setMetricsVisible(Math.min(i - 1, metrics.length));
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [mapInView]);

  const buildingVisible = phase >= 1;
  const visiblePoiCount = Math.max(0, phase - 1);

  return (
    <div className="mb-24" ref={sectionRef}>
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Texto + métricas */}
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, x: -24 }}
          animate={sectionInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-4">
            Mapa da Região
          </p>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Localização que{" "}
            <span className="text-gradient">vende</span>
          </h3>
          <p className="text-black/60 text-lg leading-relaxed mb-8">
            Apresente escolas, hospitais, parques, comércios e acessos estratégicos
            através de um mapa interativo desenvolvido para valorizar cada
            empreendimento.
          </p>

          <div className="bg-gray-light rounded-2xl p-5 border border-black/5">
            <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">
              Distâncias em destaque
            </p>
            <ul className="space-y-3">
              {metrics.map((metric, i) => (
                <motion.li
                  key={metric.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={
                    metricsVisible > i
                      ? { opacity: 1, x: 0 }
                      : { opacity: animationStarted ? 0.2 : 0, x: 0 }
                  }
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      metricsVisible > i ? "bg-orange/15" : "bg-black/5"
                    }`}
                  >
                    <Clock
                      className={`w-4 h-4 ${metricsVisible > i ? "text-orange" : "text-black/20"}`}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`font-bold text-lg transition-colors ${
                        metricsVisible > i ? "text-orange" : "text-black/25"
                      }`}
                    >
                      {metric.time}
                    </span>
                    <span
                      className={`text-sm transition-colors ${
                        metricsVisible > i ? "text-black/70" : "text-black/25"
                      }`}
                    >
                      {metric.label}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Mapa */}
        <motion.div
          ref={mapRef}
          className="lg:col-span-8"
          initial={{ opacity: 0, x: 24 }}
          animate={mapInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/15 border border-black/8 bg-[#e8e4df]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/5 pointer-events-none z-10" />

            <div className="relative aspect-square max-h-[520px] w-full mx-auto">
              <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <CityMapBase />

                {/* Linhas de conexão */}
                <g>
                  {pois.map((poi, i) => (
                    <ConnectionLine
                      key={poi.id}
                      poi={poi}
                      visible={i < visiblePoiCount}
                      highlighted={hoveredPoi === poi.id}
                    />
                  ))}
                </g>

                {/* Empreendimento */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    buildingVisible
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                  style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
                >
                  <circle cx={CENTER.x} cy={CENTER.y} r="28" fill="#FF6A00" opacity="0.15" />
                  {buildingVisible && (
                    <motion.circle
                      cx={CENTER.x}
                      cy={CENTER.y}
                      r="22"
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth="2"
                      animate={{ r: [22, 30, 22], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  )}
                  <circle cx={CENTER.x} cy={CENTER.y} r="16" fill="#FF6A00" />
                  <circle cx={CENTER.x} cy={CENTER.y} r="12" fill="#FF8533" />
                </motion.g>
              </svg>

              {/* Empreendimento label */}
              <AnimatePresence>
                {buildingVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-30 -translate-x-1/2"
                    style={{ left: "50%", top: "42%" }}
                  >
                    <div className="flex items-center gap-2 bg-black/90 backdrop-blur-md text-white px-3 py-2 rounded-xl shadow-xl border border-orange/30">
                      <Building2 className="w-4 h-4 text-orange" strokeWidth={2} />
                      <div>
                        <p className="text-[11px] font-bold leading-tight">Seu Empreendimento</p>
                        <p className="text-[9px] text-white/50">Localização privilegiada</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* POI pins */}
              {pois.map((poi, i) => (
                <POIPin
                  key={poi.id}
                  poi={poi}
                  visible={i < visiblePoiCount}
                  highlighted={hoveredPoi === poi.id}
                  onHover={() => setHoveredPoi(poi.id)}
                  onLeave={() => setHoveredPoi(null)}
                />
              ))}
            </div>

            {/* Legenda inferior */}
            <div className="relative z-20 bg-black/80 backdrop-blur-md px-4 py-3 flex flex-wrap gap-x-4 gap-y-1 justify-center border-t border-white/10">
              {pois.map((poi, i) => (
                <motion.span
                  key={poi.id}
                  initial={{ opacity: 0 }}
                  animate={i < visiblePoiCount ? { opacity: 1 } : { opacity: 0.3 }}
                  className="text-[10px] text-white/70 flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                  {poi.name} · {poi.time}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
