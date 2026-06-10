"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LayoutGrid, Map, Images, Building, type LucideIcon } from "lucide-react";

const mockups: {
  label: string;
  icon: LucideIcon;
  x: string;
  y: string;
  delay: number;
}[] = [
  { label: "Planta", icon: LayoutGrid, x: "10%", y: "20%", delay: 0 },
  { label: "Mapa", icon: Map, x: "75%", y: "15%", delay: 0.3 },
  { label: "Galeria", icon: Images, x: "15%", y: "65%", delay: 0.6 },
  { label: "Implantação", icon: Building, x: "70%", y: "60%", delay: 0.9 },
];

export default function VisualImpactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-black">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #16213e 100%)
            `,
            backgroundSize: "400% 400%",
          }}
        />

        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 1440 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#121212" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect fill="url(#skyGrad)" width="1440" height="800" />
            {[200, 350, 500, 650, 800, 950, 1100].map((x, i) => (
              <rect
                key={x}
                x={x}
                y={400 - (i % 3) * 80 - 100}
                width={60 + (i % 4) * 20}
                height={200 + (i % 5) * 40}
                fill="#2A2A2A"
                opacity={0.6}
                rx="2"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/50" />

      {mockups.map((mockup) => {
        const Icon = mockup.icon;
        return (
          <motion.div
            key={mockup.label}
            className="absolute hidden md:block z-10"
            style={{ left: mockup.x, top: mockup.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1, y: [0, -12, 0] } : {}}
            transition={{
              opacity: { duration: 0.6, delay: mockup.delay },
              scale: { duration: 0.6, delay: mockup.delay },
              y: { duration: 5 + mockup.delay * 2, repeat: Infinity, ease: "easeInOut", delay: mockup.delay },
            }}
          >
            <div className="glass rounded-2xl p-5 w-36 backdrop-blur-lg">
              <Icon className="w-8 h-8 text-orange mb-2" strokeWidth={1.5} />
              <span className="text-white text-sm font-medium">{mockup.label}</span>
            </div>
          </motion.div>
        );
      })}

      <div className="relative z-20 max-w-4xl mx-auto text-center px-6 py-32">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
        >
          Cada empreendimento merece uma{" "}
          <span className="text-gradient">apresentação à altura</span>.
        </motion.h2>
      </div>
    </section>
  );
}
