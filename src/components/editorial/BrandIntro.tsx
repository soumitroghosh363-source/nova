import { motion } from 'framer-motion'
import { fadeUp, fadeUpDelay } from '../../lib/motion'

const BrandIntro = () => {
  return (
     <section className="px-6 py-28 md:px-10 md:py-40">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2 {...fadeUp} className="text-headline">
          Objects designed
          <br />
          for everyday life.
        </motion.h2>

        <motion.p {...fadeUpDelay(0.15)} className="text-body text-muted mt-6">
          We believe good design shouldn't be precious. Every piece in the
          NOVA collection is chosen for how it feels in daily use — not just
          how it photographs.
        </motion.p>
      </div>
    </section>
  );
};

export { BrandIntro };
