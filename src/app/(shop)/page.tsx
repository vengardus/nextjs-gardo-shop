import { HomeTemplate } from "@/components/templates/home/HomeTemplate";
import { initialData } from "@/seed/seed";

const products = initialData.products.slice(0,3)

export default function HomePage() {
  return (
    <HomeTemplate
      products={products}
    />
  );
}
