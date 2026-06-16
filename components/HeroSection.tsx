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
          alt="Corretor apresentando empreendimento com o PoligonoApp em totem digital"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
            Transforme seu empreendimento em uma{" "}
            <span className="text-gradient">experiência interativa</span>.
          </h1>

          <p className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed">
            Aplicativos touch que permitem às incorporadoras apresentar plantas, perspectivas,
            implantação, localização e tours virtuais em tablets, TVs e totens.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contato" className="btn-primary">
              Solicitar demonstração
            </a>
            <a href="#recursos" className="btn-secondary">
              Ver apresentação
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce-scroll">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-orange rounded-full" />
        </div>
      </div>
    </section>
  );
}
