"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    quote:
      "Os corretores passaram a apresentar nossos empreendimentos de forma muito mais profissional.",
    author: "Diretor Comercial",
    company: "Incorporadora parceira",
  },
  {
    quote:
      "Reduzimos drasticamente o envio de PDFs e materiais desatualizados.",
    author: "Gerente de Vendas",
    company: "Construtora parceira",
  },
];

export default function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="depoimentos" className="section-padding bg-gray-light" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-orange font-semibold text-sm uppercase tracking-widest mb-4">
            Depoimentos
          </p>
          <h2 className="section-title">
            Quem usa, <span className="text-gradient">recomenda</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-black/5 relative"
            >
              <div className="text-orange text-5xl font-serif leading-none mb-4">&ldquo;</div>
              <p className="text-lg md:text-xl text-black/80 leading-relaxed mb-8">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center">
                  <span className="text-orange font-bold text-lg">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-black/50 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
