"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  inView,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    prefix: "+",
    end: 70,
    suffix: "%",
    label: "mais engajamento",
    sublabel: "Até",
  },
  {
    prefix: "+",
    end: 3,
    suffix: "x",
    label: "mais tempo de apresentação",
    sublabel: "Até",
  },
  {
    end: 100,
    suffix: "%",
    label: "do material em um só lugar",
    sublabel: "Centralização",
  },
];

export default function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="section-padding bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-2">
                {stat.sublabel}
              </p>
              <p className="text-5xl md:text-6xl font-bold text-white mb-3">
                <AnimatedCounter
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </p>
              <p className="text-white/60 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
