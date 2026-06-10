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
            className="flex justify-center perspective-1000"
          >
            <motion.div
              animate={inView ? { rotateY: [0, 15, -15, 0] } : {}}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="preserve-3d relative"
            >
              <div className="w-64 h-[520px] bg-gradient-to-b from-gray-800 to-black rounded-[3rem] p-3 shadow-2xl shadow-orange/20 border border-white/10">
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-10" />

                  <motion.div
                    animate={{ y: [0, -300, -600, -900, -1200, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="pt-10"
                  >
                    {appScreens.map((screen) => {
                      const Icon = screen.icon;
                      return (
                        <div
                          key={screen.label}
                          className={`h-[200px] m-3 rounded-2xl bg-gradient-to-br ${screen.color} flex flex-col items-center justify-center border border-white/5`}
                        >
                          <Icon className="w-10 h-10 text-white/80 mb-2" strokeWidth={1.5} />
                          <span className="text-white/80 text-sm font-medium">{screen.label}</span>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>

              <div className="absolute -inset-8 bg-orange/5 rounded-full blur-3xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
