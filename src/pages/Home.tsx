import { BrandIntro } from "../components/editorial/BrandIntro";
import { CategoryExploration } from "../components/editorial/CategoryExploration";
import { FeaturedProduct } from "../components/editorial/FeaturedProduct";
import { Hero } from "../components/editorial/Hero";
import { NewArrivals } from "../components/editorial/NewArrivals";

const Home = () => {
  return (
    <div>
      <Hero />
      <BrandIntro />
      <FeaturedProduct />
      <CategoryExploration />
      <NewArrivals />
    </div>
  );
};

export { Home };
