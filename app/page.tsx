import { TopNav } from "@/components/marketing/TopNav";
import { Hero } from "@/components/marketing/Hero";
import { CorePromise } from "@/components/marketing/CorePromise";
import { ProductStoryFlow } from "@/components/marketing/ProductStoryFlow";
import { DifferentiationMastery } from "@/components/marketing/DifferentiationMastery";
import { TrustSafety } from "@/components/marketing/TrustSafety";
import { WhoItsFor } from "@/components/marketing/WhoItsFor";
import { FinalCta } from "@/components/marketing/FinalCta";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main id="main-content">
        <Hero />
        <CorePromise />
        <ProductStoryFlow />
        <DifferentiationMastery />
        <TrustSafety />
        <WhoItsFor />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
