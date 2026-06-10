"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import InteractiveImplantationSection from "@/components/InteractiveImplantationSection";
import HumanizedFloorPlanSection from "@/components/HumanizedFloorPlanSection";
import RegionalMapSection from "@/components/RegionalMapSection";
import VirtualTourSection from "@/components/VirtualTourSection";

const galleryImages = [
  { id: 1, gradient: "from-slate-600 to-slate-800", label: "Fachada Principal" },
  { id: 2, gradient: "from-blue-600 to-blue-800", label: "Área de Lazer" },
  { id: 3, gradient: "from-emerald-600 to-emerald-800", label: "Suíte Master" },
  { id: 4, gradient: "from-amber-600 to-amber-800", label: "Living Integrado" },
  { id: 5, gradient: "from-rose-600 to-rose-800", label: "Terraço Gourmet" },
];

export default function FeaturesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);

  return (
    <section id="recursos" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-4">
            Recursos
          </p>
          <h2 className="section-title">
            Ferramentas que <span className="text-gradient">encantam</span> seus clientes
          </h2>
        </motion.div>

        {/* Galeria de Perspectivas */}
        <div className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Galeria de Perspectivas</h3>
              <p className="text-black/60 text-lg">
                Apresente imagens renderizadas de alta qualidade para encantar seus clientes.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-6"
            >
              {[...galleryImages, ...galleryImages].map((img, i) => (
                <motion.div
                  key={`${img.id}-${i}`}
                  className="flex-shrink-0 w-80 h-56 rounded-xl overflow-hidden relative cursor-pointer"
                  onHoverStart={() => setHoveredGallery(i)}
                  onHoverEnd={() => setHoveredGallery(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${img.gradient}`} />
                  <motion.div
                    className="absolute inset-0 bg-black/40 flex items-end p-4"
                    animate={{ opacity: hoveredGallery === i ? 0.7 : 0.3 }}
                  >
                    <span className="text-white font-medium">{img.label}</span>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 border-2 border-orange rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredGallery === i ? 1 : 0 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <InteractiveImplantationSection />

        <HumanizedFloorPlanSection />

        <RegionalMapSection />

        <VirtualTourSection />
      </div>
    </section>
  );
}
