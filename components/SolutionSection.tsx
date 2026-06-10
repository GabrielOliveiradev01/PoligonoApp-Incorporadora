"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  LayoutGrid,
  Building2,
  Play,
  Receipt,
  Map,
  Star,
  type LucideIcon,
} from "lucide-react";

interface AppScreen {
  id: string;
  label: string;
  color: string;
  icon: LucideIcon;
  description: string;
}

const appScreens: AppScreen[] = [
  {
    id: "plantas",
    label: "Plantas",
    color: "from-blue-600/40 to-blue-900/60",
    icon: LayoutGrid,
    description: "Plantas humanizadas em alta resolução com zoom e navegação touch.",
  },
  {
    id: "perspectivas",
    label: "Perspectivas",
    color: "from-purple-600/40 to-purple-900/60",
    icon: Building2,
    description: "Galeria premium de renders e imagens do empreendimento.",
  },
  {
    id: "videos",
    label: "Vídeos",
    color: "from-red-600/40 to-red-900/60",
    icon: Play,
    description: "Vídeos institucionais e tours em alta definição.",
  },
  {
    id: "precos",
    label: "Tabela de Preços",
    color: "from-emerald-600/40 to-emerald-900/60",
    icon: Receipt,
    description: "Tabela atualizada com filtros por torre, metragem e disponibilidade.",
  },
  {
    id: "implantacao",
    label: "Implantação",
    color: "from-orange/40 to-orange-dark/60",
    icon: Map,
    description: "Mapa interativo com torres, unidades e áreas comuns.",
  },
  {
    id: "diferenciais",
    label: "Diferenciais",
    color: "from-amber-500/40 to-amber-800/60",
    icon: Star,
    description: "Destaques do empreendimento organizados para a apresentação.",
  },
];

function ScreenPreview({ screen }: { screen: AppScreen }) {
  const Icon = screen.icon;

  return (
    <motion.div
      key={screen.id}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.35 }}
      className={`absolute inset-0 bg-gradient-to-br ${screen.color} p-4 flex flex-col`}
    >
      <div className="flex-1 rounded-lg bg-black/30 border border-white/10 p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-white font-bold text-sm">{screen.label}</p>
            <p className="text-white/50 text-[10px]">Módulo ativo</p>
          </div>
        </div>

        <p className="text-white/70 text-xs leading-relaxed mb-4">{screen.description}</p>

        {/* Preview visual por módulo */}
        <div className="flex-1 rounded-lg bg-black/25 border border-white/5 overflow-hidden relative">
          {screen.id === "plantas" && (
            <div className="absolute inset-3 border border-blue-400/30 rounded grid grid-cols-2 gap-2 p-2">
              <div className="border border-blue-300/20 rounded-sm" />
              <div className="border border-blue-300/20 rounded-sm" />
              <div className="col-span-2 border border-blue-300/20 rounded-sm h-8" />
            </div>
          )}
          {screen.id === "perspectivas" && (
            <div className="absolute inset-3 flex gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 rounded bg-purple-500/20 border border-purple-400/20" />
              ))}
            </div>
          )}
          {screen.id === "videos" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
            </div>
          )}
          {screen.id === "precos" && (
            <div className="absolute inset-3 space-y-1.5">
              {["Torre A", "Torre B", "Torre C"].map((t) => (
                <div key={t} className="flex justify-between text-[9px] text-white/60 px-2 py-1 bg-white/5 rounded">
                  <span>{t}</span>
                  <span className="text-emerald-400">Disponível</span>
                </div>
              ))}
            </div>
          )}
          {screen.id === "implantacao" && (
            <div className="absolute inset-3 flex items-end justify-center gap-2">
              {[40, 55, 35].map((h, i) => (
                <div
                  key={i}
                  className="w-8 bg-orange/60 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          )}
          {screen.id === "diferenciais" && (
            <div className="absolute inset-3 space-y-2">
              {["Piscina", "Academia", "Coworking"].map((d) => (
                <div key={d} className="flex items-center gap-2 text-[9px] text-white/70">
                  <Star className="w-3 h-3 text-amber-400" strokeWidth={2} />
                  {d}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const AUTO_ADVANCE_MS = 3500;

function ScreenDisplay({
  active,
  selectedId,
  onSelect,
  onHoverChange,
}: {
  active: boolean;
  selectedId: string;
  onSelect: (id: string) => void;
  onHoverChange: (hovered: boolean) => void;
}) {
  const selected = appScreens.find((s) => s.id === selectedId) ?? appScreens[0];

  return (
    <motion.div
      className="relative perspective-1000 mx-auto w-full max-w-2xl"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      animate={
        active
          ? {
              y: [0, -10, 0],
              rotateX: [6, 8, 6],
              rotateY: [-3, 3, -3],
            }
          : {}
      }
      transition={{
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="absolute -inset-12 rounded-full blur-3xl -z-10"
        style={{ background: "radial-gradient(circle, rgba(255,106,0,0.25) 0%, transparent 70%)" }}
      />

      <div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/40 rounded-full blur-xl -z-10"
        style={{ transform: "rotateX(80deg)" }}
      />

      <div className="relative bg-gradient-to-b from-gray-600 via-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl shadow-black/60 border border-white/10">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full" />

        <div className="bg-black rounded-xl overflow-hidden aspect-[16/10] relative flex flex-col">
          {/* Barra do app */}
          <div className="h-9 bg-black/90 backdrop-blur-md flex items-center px-4 z-20 border-b border-white/5 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-orange mr-2" />
            <span className="text-white/70 text-[11px] font-medium tracking-wide">
              PoligonoApp · {selected.label}
            </span>
          </div>

          {/* Corpo: conteúdo à esquerda + menus laterais */}
          <div className="flex flex-1 min-h-0">
            {/* Painel de conteúdo (esquerda) */}
            <div className="flex-1 relative overflow-hidden border-r border-white/5">
              <AnimatePresence mode="wait">
                <ScreenPreview key={selected.id} screen={selected} />
              </AnimatePresence>
            </div>

            {/* Menu lateral direito */}
            <div className="w-[72px] flex flex-col py-2 px-1.5 gap-1 bg-black/60 border-l border-white/5">
              {appScreens.map((screen) => {
                const Icon = screen.icon;
                const isActive = selectedId === screen.id;
                return (
                  <button
                    key={screen.id}
                    onClick={() => onSelect(screen.id)}
                    className={`relative flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-orange text-white shadow-md shadow-orange/30"
                        : "text-white/45 hover:bg-white/10 hover:text-white/80"
                    }`}
                    aria-label={screen.label}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="menu-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-full"
                      />
                    )}
                    <Icon className="w-4 h-4" strokeWidth={isActive ? 2 : 1.5} />
                    <span className="text-[8px] font-medium leading-tight text-center">
                      {screen.label.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reflexo de vidro */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none z-10" />
        </div>

        <div className="mx-auto mt-2 w-20 h-1.5 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg" />
        <div className="mx-auto w-32 h-1 bg-gray-800 rounded-full" />
      </div>
    </motion.div>
  );
}

export default function SolutionSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [selectedId, setSelectedId] = useState(appScreens[0].id);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCooldown, setClickCooldown] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const isPaused = isHovered || clickCooldown;

  const advanceToNext = useCallback(() => {
    setSelectedId((current) => {
      const index = appScreens.findIndex((s) => s.id === current);
      const next = (index + 1) % appScreens.length;
      return appScreens[next].id;
    });
  }, []);

  useEffect(() => {
    if (!inView || isPaused) return;

    const timer = setInterval(advanceToNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [inView, isPaused, advanceToNext]);

  useEffect(() => () => clearTimeout(resumeTimerRef.current), []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setClickCooldown(true);
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setClickCooldown(false), AUTO_ADVANCE_MS * 2);
  }, []);

  return (
    <section className="section-padding bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-4">
              Solução
            </p>
            <h2 className="section-title text-white mb-6">
              Tudo que o corretor precisa em um{" "}
              <span className="text-gradient">único aplicativo</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              A PoligonoApp centraliza todas as informações do empreendimento em uma
              experiência premium que encanta o cliente e acelera o fechamento.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <ScreenDisplay
              active={inView}
              selectedId={selectedId}
              onSelect={handleSelect}
              onHoverChange={setIsHovered}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
