"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HERO_BG = "/imagens/imagem-de-fundo-pa.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <Image
          src={HERO_BG}
          alt="Painéis de LED em evento e campanha publicitária"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
            Locação de Painéis de LED Indoor, Outdoor e Caminhão de LED
          </h1>

          <p className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed">
            Transforme seu evento, empresa ou campanha publicitária com painéis de alta
            definição e caminhões de LED que geram impacto e atraem milhares de
            visualizações.
          </p>

          <a href="#contato" className="btn-primary inline-flex">
            Solicitar Demonstração
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-orange rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
