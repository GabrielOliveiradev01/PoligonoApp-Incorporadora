"use client";

import { motion } from "framer-motion";
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

const appScreens: {
  label: string;
  color: string;
  icon: LucideIcon;
}[] = [
  { label: "Plantas", color: "from-blue-500/20 to-blue-600/10", icon: LayoutGrid },
  { label: "Perspectivas", color: "from-purple-500/20 to-purple-600/10", icon: Building2 },
  { label: "Vídeos", color: "from-red-500/20 to-red-600/10", icon: Play },
  { label: "Tabela de Preços", color: "from-green-500/20 to-green-600/10", icon: Receipt },
  { label: "Implantação", color: "from-orange/20 to-orange/10", icon: Map },
  { label: "Diferenciais", color: "from-yellow-500/20 to-yellow-600/10", icon: Star },
];

function ScreenDisplay({ active }: { active: boolean }) {
  return (
    <motion.div
      className="relative perspective-1000 mx-auto w-full max-w-xl"
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

        <div className="bg-black rounded-xl overflow-hidden aspect-[16/10] relative">
          {/* Barra do app */}
          <div className="absolute top-0 left-0 right-0 h-9 bg-black/80 backdrop-blur-md flex items-center px-4 z-20 border-b border-white/5">
            <div className="w-2 h-2 rounded-full bg-orange mr-2" />
            <span className="text-white/70 text-[11px] font-medium tracking-wide">
              PoligonoApp · Empreendimento
            </span>
          </div>

          {/* Telas do app */}
          <div className="absolute inset-0 pt-9 overflow-hidden">
            <motion.div
              animate={active ? { y: [0, -420, -840, -1260, 0] } : { y: 0 }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            >
              {appScreens.map((screen) => {
                const Icon = screen.icon;
                return (
                  <div
                    key={screen.label}
                    className={`h-[140px] m-3 rounded-xl bg-gradient-to-br ${screen.color} flex items-center gap-4 px-6 border border-white/5`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">
                        Módulo
                      </p>
                      <p className="text-white font-semibold text-sm">{screen.label}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Reflexo de vidro */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute top-9 left-0 right-0 h-1/4 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-10" />
        </div>

        {/* Base do totem */}
        <div className="mx-auto mt-2 w-20 h-1.5 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg" />
        <div className="mx-auto w-32 h-1 bg-gray-800 rounded-full" />
      </div>
    </motion.div>
  );
}

export default function SolutionSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

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
            <ScreenDisplay active={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
