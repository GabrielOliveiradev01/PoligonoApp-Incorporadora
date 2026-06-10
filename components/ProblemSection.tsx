"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FileX,
  Clock,
  Layers,
  Monitor,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";

const problems: { text: string; icon: LucideIcon }[] = [
  { text: "PDFs desorganizados", icon: FileX },
  { text: "Materiais desatualizados", icon: Clock },
  { text: "Falta de padronização", icon: Layers },
  { text: "Dificuldade para apresentar empreendimentos", icon: Monitor },
  { text: "Baixa conversão nas apresentações", icon: TrendingDown },
];

export default function ProblemSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding bg-gray-light">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Seu material de vendas está{" "}
            <span className="text-gradient">espalhado?</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Corretoras e incorporadoras enfrentam diariamente:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.text}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-black/5"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-red-500" strokeWidth={1.5} />
                </div>
                <p className="text-lg font-medium text-black/80">{problem.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
