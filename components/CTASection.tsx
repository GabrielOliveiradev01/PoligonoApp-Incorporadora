"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CTASection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="contato" className="section-padding bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Sua incorporadora está pronta para vender de forma mais{" "}
            <span className="text-gradient">inteligente?</span>
          </h2>

          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Transforme seus empreendimentos em experiências de venda que encantam
            corretores e clientes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:contato@poligonoapp.com.br" className="btn-primary">
              Solicitar Demonstração
            </a>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Falar com Especialista
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
