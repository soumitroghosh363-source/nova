import { motion } from "framer-motion";
import { CategoryPanel } from "./CategoryPanel";
import { fadeUpDelay } from "../../lib/motion";

const CategoryExploration = () => {
  const categories = [
    { name: "Audio", slug: "audio" },
    { name: "Workspace", slug: "workspace" },
    { name: "Home", slug: "home" },
  ];
  return (
    <section className="px-6 py-28 md:px-10 md:py-40">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-headline mb-10">Shop by Category</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div key={category.slug} {...fadeUpDelay(index * 0.1)}>
              <CategoryPanel name={category.name} slug={category.slug} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { CategoryExploration };
