import { motion } from "framer-motion";
import { fadeUp, fadeUpDelay } from "../../lib/motion";
import { ClayButton } from "../ui/ClayButton";
import { FloatingBadge } from "../ui/FloatingBadge";
import { placeholderImage } from "../../lib/placeholder";

const FeaturedProduct = () => {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-center">
        {/* Large dominant image — spans more columns than the text */}
        <motion.div {...fadeUp} className="md:col-span-7 relative">
          <div className="aspect-4/3 rounded-clay bg-surface border border-border overflow-hidden">
            <img
              src={placeholderImage("nova-orbit-speaker", 900, 675)}
              alt="The Orbit Speaker, ceramic housing, on a neutral background"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="absolute top-6 left-6">
            <FloatingBadge>Featured</FloatingBadge>
          </div>
        </motion.div>

        {/* Story block — smaller, sits beside the image */}
        <motion.div {...fadeUpDelay(0.15)} className="md:col-span-5">
          <p className="text-caption text-accent font-medium">Audio</p>
          <h2 className="text-headline mt-2">The Orbit Speaker</h2>
          <p className="text-body text-muted mt-4 max-w-sm">
            Hand-finished ceramic housing, warm analog sound, and a battery that
            lasts through the whole weekend. Designed to be seen, not hidden
            away.
          </p>
          <p className="text-title mt-6">$149</p>
          <div className="mt-6">
            <ClayButton>Explore</ClayButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { FeaturedProduct };
