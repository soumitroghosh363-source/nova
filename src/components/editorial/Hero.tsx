import { motion } from "framer-motion";
import { ClayButton } from "../ui/ClayButton";
import { placeholderImage } from "../../lib/placeholder";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-6 pt-16 pb-24 md:px-10 md:pt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Text block */}
        <div className="w-full md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-display"
          >
            Live
            <br />
            Beautifully.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-body text-muted mt-6 max-w-sm"
          >
            Objects designed for everyday living — considered, tactile, built to
            last.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <ClayButton>Explore Collection</ClayButton>
          </motion.div>
        </div>

        {/* Image block */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
            y: {
              duration: 3,
              delay: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="w-full md:w-1/2 relative"
        >
          <div className="aspect-4/5 md:aspect-3/4 md:max-h-140 rounded-clay bg-surface border border-border overflow-hidden shadow-2xl shadow-foreground/10">
            <img
              src={placeholderImage("nova-hero", 800, 1000)}
              alt="Featured NOVA product, the Orbit Speaker, on a warm neutral background"
              className="w-full h-full object-cover bg-accent text-accent-foreground rounded-clay px-3 py-2 shadow-lg"
              loading="eager"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: prefersReducedMotion ? 0 : [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
              y: prefersReducedMotion
                ? { duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }
                : {
                    duration: 3,
                    delay: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
            }}
            className="absolute bottom-4 left-4 md:-bottom-6 md:-left-6 bg-accent text-accent-foreground rounded-clay px-5 py-4 shadow-lg"
          >
            <p className="text-caption opacity-80">From</p>
            <p className="text-title">$89</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { Hero };
