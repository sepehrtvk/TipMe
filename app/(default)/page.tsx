export const metadata = {
  title: "تیپ می - پراخت انعام",
  description: "پرداخت آنلاین انعام",
  other: { enamad: "546467" },
};

import Hero from "@/components/hero";
import Features from "@/components/features";
import FeaturesBlocks from "@/components/features-blocks";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
    </>
  );
}
