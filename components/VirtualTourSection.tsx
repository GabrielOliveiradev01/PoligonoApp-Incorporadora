"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Check,
  Play,
  Waves,
  Dumbbell,
  PartyPopper,
  Sofa,
} from "lucide-react";

const tourScenes = [
  {
    id: "living",
    label: "Apartamento Decorado",
    indicator: "Apartamento Decorado",
    gradient: "from-amber-900/80 via-stone-800/60 to-amber-950/90",
    accent: "#d4a574",
    description: "Sala integrada · 360°",
  },
  {
    id: "varanda",
    label: "Varanda Gourmet",
    indicator: "Varanda Gourmet",
    gradient: "from-sky-900/70 via-slate-800/50 to-orange-900/80",
    accent: "#FF6A00",
    description: "Vista panorâmica · 360°",
  },
  {
    id: "pool",
    label: "Piscina",
    indicator: "Piscina",
    gradient: "from-cyan-800/80 via-blue-900/60 to-teal-900/90",
    accent: "#38bdf8",
    description: "Área de lazer · 360°",
  },
  {
    id: "facade",
    label: "Fachada",
    indicator: "Fachada",
    gradient: "from-slate-900/90 via-gray-800/70 to-orange-950/80",
    accent: "#FF6A00",
    description: "Empreendimento · 360°",
  },
];

const indicators = [
  { id: "pool", label: "Piscina", icon: Waves },
  { id: "gym", label: "Academia", icon: Dumbbell },
  { id: "party", label: "Salão de Festas", icon: PartyPopper },
  { id: "living", label: "Apartamento Decorado", icon: Sofa },
];

const features = [
  "Tour Virtual 360°",
  "Ambientes Decorados",
  "Áreas Comuns",
  "Navegação Touch",
  "Compatível com Tablets e Totens",
  "Experiência Imersiva",
];

function SceneVisual({ sceneId }: { sceneId: string }) {
  if (sceneId === "living") {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/20 to-stone-900/40" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-stone-900/60 to-transparent" />
        <div className="absolute bottom-[18%] left-[8%] w-[55%] h-[12%] bg-stone-700/50 rounded-lg blur-[1px]" />
        <div className="absolute bottom-[32%] right-[10%] w-[35%] h-[20%] bg-amber-800/30 rounded" />
        <div className="absolute top-[25%] left-[15%] w-[25%] h-[35%] bg-amber-950/40 rounded-sm" />
        <div className="absolute top-[20%] right-[20%] w-16 h-16 rounded-full bg-orange/20 blur-xl" />
      </div>
    );
  }
  if (sceneId === "varanda") {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/30 to-slate-900/50" />
        <div className="absolute top-[15%] left-0 right-0 h-[30%] bg-gradient-to-b from-sky-300/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-stone-800/40" />
        <div className="absolute bottom-[22%] left-[12%] right-[12%] h-[8%] bg-stone-600/50 rounded" />
        <div className="absolute bottom-[35%] right-[15%] w-[30%] h-[15%] bg-orange/25 rounded-lg" />
      </div>
    );
  }
  if (sceneId === "pool") {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/25 to-blue-900/50" />
        <div className="absolute bottom-[20%] left-[5%] right-[5%] h-[35%] bg-cyan-500/35 rounded-[40%] blur-[2px]" />
        <div className="absolute bottom-[28%] left-[15%] right-[15%] h-[18%] bg-sky-400/30 rounded-full" />
        <div className="absolute top-[30%] left-[20%] w-[60%] h-[8%] bg-emerald-700/30 rounded-full" />
        <motion.div
          className="absolute bottom-[32%] left-[20%] right-[20%] h-1 bg-white/20 rounded-full"
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    );
  }
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-slate-800/40 to-orange-900/30" />
      {[20, 45, 70].map((x, i) => (
        <div
          key={x}
          className="absolute bottom-0 bg-slate-700/60 rounded-t-sm"
          style={{
            left: `${x - 8}%`,
            width: `${14 + i * 4}%`,
            height: `${35 + i * 12}%`,
          }}
        />
      ))}
      <div className="absolute bottom-[40%] left-[25%] w-[50%] h-[3%] bg-orange/40 rounded-full blur-sm" />
    </div>
  );
}

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: (i * 17 + 7) % 100,
    y: (i * 23 + 11) % 100,
    size: 2 + (i % 3),
    delay: i * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-orange/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4 + p.delay, repeat: Infinity, delay: p.delay }}
        />
      ))}
    </div>
  );
}

function ScreenDisplay({
  sceneIndex,
  entered,
  hovering,
  indicatorsVisible,
  activeIndicator,
}: {
  sceneIndex: number;
  entered: boolean;
  hovering: boolean;
  indicatorsVisible: boolean;
  activeIndicator: string;
}) {
  const scene = tourScenes[sceneIndex];

  return (
    <motion.div
      className="relative perspective-1000 mx-auto w-full max-w-2xl"
      initial={{ opacity: 0, y: 60 }}
      animate={
        entered
          ? {
              opacity: 1,
              y: hovering ? -6 : [0, -10, 0],
              rotateX: hovering ? 4 : [6, 8, 6],
              rotateY: hovering ? 0 : [-3, 3, -3],
              scale: hovering ? 1.04 : 1,
            }
          : { opacity: 0, y: 60 }
      }
      transition={{
        y: hovering ? { duration: 0.3 } : { duration: 5, repeat: Infinity, ease: "easeInOut" },
        rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.35 },
        opacity: { duration: 0.8 },
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute -inset-16 rounded-full blur-3xl -z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={entered ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{ background: "radial-gradient(circle, rgba(255,106,0,0.35) 0%, transparent 70%)" }}
      />

      <div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/30 rounded-full blur-xl -z-10"
        style={{ transform: "rotateX(80deg)" }}
      />

      {/* Moldura da tela / totem */}
      <div className="relative bg-gradient-to-b from-gray-600 via-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl shadow-black/60 border border-white/10">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full" />

        <div className="bg-black rounded-xl overflow-hidden aspect-[16/10] relative">
          {/* Barra do app */}
          <div className="absolute top-0 left-0 right-0 h-9 bg-black/75 backdrop-blur-md flex items-center justify-between px-4 z-20 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange" />
              <span className="text-white/70 text-[11px] font-medium tracking-wide">
                PoligonoApp · Tour Virtual 360°
              </span>
            </div>
            <span className="text-[10px] text-white/40 font-mono">LIVE</span>
          </div>

          {/* Cena 360° */}
          <div className="absolute inset-0 pt-9 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1, x: [0, -20, 20, 0] }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6 },
                  x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                }}
                className={`absolute inset-[-8%] w-[116%] h-[116%] bg-gradient-to-br ${scene.gradient}`}
              >
                <SceneVisual sceneId={scene.id} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles na tela */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="bg-black/55 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
              <p className="text-[10px] text-orange font-bold uppercase tracking-wider">
                {scene.description}
              </p>
              <p className="text-sm text-white font-semibold">{scene.label}</p>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-10">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <motion.div
                className="w-9 h-9 rounded-full border-2 border-orange/70 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="absolute text-[9px] text-white/70 font-bold">360°</span>
            </div>
          </div>

          {/* Reflexo de vidro */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none z-20" />
          <div className="absolute top-9 left-0 right-0 h-1/4 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-20" />

          {/* Hover CTA */}
          <AnimatePresence>
            {hovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/45 backdrop-blur-[3px] z-30 flex items-center justify-center pt-9"
              >
                <motion.button
                  initial={{ scale: 0.9, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  className="flex items-center gap-3 bg-orange text-white font-semibold text-base px-7 py-3.5 rounded-full shadow-xl shadow-orange/40"
                >
                  <span className="relative flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-white/40"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  </span>
                  Iniciar Tour 360°
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Base do totem */}
        <div className="mx-auto mt-2 w-24 h-2 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg" />
        <div className="mx-auto w-40 h-1.5 bg-gray-800 rounded-full" />
      </div>

      <AnimatePresence>
        {indicatorsVisible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {indicators.map((ind, i) => {
              const Icon = ind.icon;
              const isActive = activeIndicator === ind.id;
              return (
                <motion.span
                  key={ind.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "bg-orange text-white border-orange shadow-md shadow-orange/30"
                      : "bg-white/10 text-white/60 border-white/15"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                  {ind.label}
                </motion.span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function VirtualTourSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [entered, setEntered] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [indicatorsVisible, setIndicatorsVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setEntered(true), 200);
    const t2 = setTimeout(() => setIndicatorsVisible(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  useEffect(() => {
    if (!entered) return;
    const timer = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % tourScenes.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [entered]);

  const sceneToIndicator: Record<string, string> = {
    living: "living",
    varanda: "living",
    pool: "pool",
    facade: "party",
  };

  const activeIndicator = sceneToIndicator[tourScenes[sceneIndex].id] ?? "living";

  return (
    <div className="relative overflow-hidden rounded-3xl mb-0" ref={ref}>
      {/* Fundo cinematográfico */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black-soft to-black" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange/15 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-orange/10 rounded-full blur-[80px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-orange/10 rounded-full" />
      <Particles />

      <div className="relative section-padding !py-20 md:!py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-4">
              Tour Virtual
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Leve seus clientes para{" "}
              <span className="text-gradient">dentro do empreendimento</span>
            </h3>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Proporcione uma experiência imersiva onde o cliente explora ambientes,
              áreas comuns e diferenciais do empreendimento através de tours virtuais
              em 360°.
            </p>

            <ul className="space-y-3">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -16 }}
                  animate={entered ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-orange/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-orange" strokeWidth={2.5} />
                  </div>
                  <span className="text-white/75 text-sm font-medium">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Tela */}
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <ScreenDisplay
              sceneIndex={sceneIndex}
              entered={entered}
              hovering={hovering}
              indicatorsVisible={indicatorsVisible}
              activeIndicator={activeIndicator}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
