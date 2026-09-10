import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { placeholderImage } from "../../lib/placeholder";

interface CategoryPanelProps {
  name: string;
  slug: string;
  className?: string;
}

const CategoryPanel = ({ name, slug, className = "" }: CategoryPanelProps) => {
  return (
    <Link
      to={`/shop/${slug}`}
      className={`group block transition-transform duration-300 ease-out hover:-translate-y-1 ${className}`}
    >
      <div className="relative aspect-3/4 rounded-clay bg-surface border border-border overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={placeholderImage(`nova-category-${slug}`, 600, 800)}
            alt={`${name} category`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        <div className="absolute inset-0 bg-linear-to-t from-foreground/40 via-foreground/0 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

        <div className="absolute bottom-6 left-6">
          <span className="text-title text-background inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export { CategoryPanel };
