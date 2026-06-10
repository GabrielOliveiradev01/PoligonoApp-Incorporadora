"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  LayoutGrid,
  Building2,
  MapPin,
  Map,
  Video,
  type LucideIcon,
} from "lucide-react";

const floatingCards: {
  label: string;
  icon: LucideIcon;
  delay: number;
  x: string;
  y: string;
}[] = [
  { label: "Planta", icon: LayoutGrid, delay: 0, x: "10%", y: "20%" },
  { label: "Perspectiva", icon: Building2, delay: 0.2, x: "75%", y: "15%" },
  { label: "Localização", icon: MapPin, delay: 0.4, x: "85%", y: "45%" },
  { label: "Implantação", icon: Map, delay: 0.6, x: "5%", y: "55%" },
  { label: "Tour Virtual", icon: Video, delay: 0.8, x: "60%", y: "65%" },
];

function Skyline() {
  const buildings = [
    { w: 40, h: 120, x: 0 },
    { w: 55, h: 180, x: 45 },
    { w: 35, h: 90, x: 110 },
    { w: 70, h: 220, x: 155 },
    { w: 45, h: 140, x: 235 },
    { w: 60, h: 200, x: 290 },
    { w: 50, h: 160, x: 360 },
    { w: 80, h: 250, x: 420 },
    { w: 40, h: 110, x: 510 },
    { w: 55, h: 170, x: 560 },
    { w: 65, h: 190, x: 625 },
    { w: 45, h: 130, x: 700 },
  ];

  return (
    <svg
      viewBox="0 0 750 280"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#121212" />
        </linearGradient>
        <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF6A00" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {buildings.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={280 - b.h}
            width={b.w}
            height={b.h}
            fill="url(#buildingGrad)"
            rx="2"
          />
          {Array.from({ length: Math.floor(b.h / 25) }).map((_, row) =>
            Array.from({ length: Math.floor(b.w / 15) }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={b.x + 5 + col * 12}
                y={280 - b.h + 8 + row * 22}
                width={6}
                height={10}
                fill={(i + row + col) % 3 !== 0 ? "url(#windowGrad)" : "#1A1A1A"}
                rx="1"
              />
            ))
          )}
        </g>
      ))}
    </svg>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const skylineX = useTransform(mouseX, [-500, 500], [-15, 15]);
  const skylineY = useTransform(mouseY, [-500, 500], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-black overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black-soft to-black" />

      <motion.div
        style={{ x: skylineX, y: skylineY }}
        className="absolute bottom-0 left-0 right-0 h-[45vh] opacity-60"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="animate-drone h-full">
          <Skyline />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

      {floatingCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            className="absolute hidden lg:block z-10"
            style={{ left: card.x, top: card.y }}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + card.delay }}
            onHoverStart={() => setHoveredCard(i)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                scale: hoveredCard === i ? 1.15 : 1,
              }}
              transition={{
                y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3 },
              }}
              className="glass rounded-2xl p-4 cursor-pointer group"
            >
              <Icon className="w-6 h-6 text-orange mb-2" strokeWidth={1.5} />
              <div className="text-white text-sm font-medium">{card.label}</div>
              <motion.div
                className="absolute inset-0 rounded-2xl bg-orange/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === i ? 1 : 0 }}
              />
            </motion.div>
          </motion.div>
        );
      })}

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-orange font-semibold text-sm uppercase tracking-widest mb-6"
          >
            A plataforma que transforma empreendimentos em experiências de venda
          </motion.p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Transforme seus empreendimentos em{" "}
            <span className="text-gradient">experiências de venda inesquecíveis</span>.
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
            Apresente empreendimentos com plantas interativas, perspectivas em alta qualidade,
            mapas da região, vídeos, tour virtual e todas as informações que seu corretor
            precisa em um único aplicativo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contato" className="btn-primary">
              Solicitar Demonstração
            </a>
            <a href="#recursos" className="btn-secondary">
              Ver Apresentação
            </a>
          </div>
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
