"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import InteractiveImplantationSection from "@/components/InteractiveImplantationSection";
import HumanizedFloorPlanSection from "@/components/HumanizedFloorPlanSection";
import RegionalMapSection from "@/components/RegionalMapSection";
import VirtualTourSection from "@/components/VirtualTourSection";

const galleryImages = [
  {
    id: 1,
    src: "/imagens/galeria-perspectivas/fachada.jpg",
    label: "Fachada principal",
  },
  {
    id: 2,
    src: "/imagens/galeria-perspectivas/area-de-lazer.webp",
    label: "Área de lazer",
  },
  {
    id: 3,
    src: "/imagens/galeria-perspectivas/suite-master.jpeg",
    label: "Suíte master",
  },
  {
    id: 4,
    src: "/imagens/galeria-perspectivas/living-integrado.jpg",
    label: "Living integrado",
  },
  {
    id: 5,
    src: "/imagens/galeria-perspectivas/terraco-gourmet.avif",
    label: "Terraço gourmet",
  },
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
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Galeria de perspectivas</h3>
              <p className="text-black/60 text-lg">
                Apresente imagens renderizadas de alta qualidade para encantar seus clientes.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <div className={`flex w-max animate-marquee ${inView ? "" : "anim-paused"}`}>
              {[...galleryImages, ...galleryImages].map((img, i) => (
                <div
                  key={`${img.id}-${i}`}
                  className="flex-shrink-0 w-80 h-56 mx-3 rounded-xl overflow-hidden relative cursor-pointer group"
                  onMouseEnter={() => setHoveredGallery(i)}
                  onMouseLeave={() => setHoveredGallery(null)}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="320px"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 transition-opacity duration-300 ${
                      hoveredGallery === i ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    <span className="text-white font-medium">{img.label}</span>
                  </div>
                  <div
                    className={`absolute inset-0 border-2 border-orange rounded-xl pointer-events-none transition-opacity duration-300 ${
                      hoveredGallery === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              ))}
            </div>
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
