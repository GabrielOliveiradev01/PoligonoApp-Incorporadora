"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowDown } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Enviamos o projeto",
    description: "Upload de plantas, perspectivas, vídeos e implantação.",
    items: ["Plantas", "Perspectivas", "Vídeos", "Implantação"],
  },
  {
    number: "2",
    title: "Configuramos tudo",
    description: "Nossa equipe organiza e personaliza todo o material.",
    items: [],
  },
  {
    number: "3",
    title: "Publicamos seu aplicativo",
    description: "O aplicativo fica instalado no tablet ou totem.",
    items: [],
  },
  {
    number: "4",
    title: "Corretores começam a vender",
    description: "Experiências de venda que encantam e convertem.",
    items: [],
  },
];

export default function HowItWorksSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="como-funciona" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-4">
            Como funciona
          </p>
          <h2 className="section-title">
            Do material ao fechamento em{" "}
            <span className="text-gradient">4 passos</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 bg-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-orange/30 relative z-10">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-black/60 mb-4">{step.description}</p>

                {step.items.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {step.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs bg-gray-light px-3 py-1 rounded-full text-black/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {i < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowDown className="w-6 h-6 text-orange" strokeWidth={2} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
