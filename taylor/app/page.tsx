import { HomeContact } from "@/components/home/HomeContact";
import { HomeFooter } from "@/components/home/HomeFooter";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeEducationOverview } from "@/components/home/HomeEducationOverview";
import { PortfolioGrid } from "@/components/home/PortfolioGrid";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-800 antialiased">
      <HomeHero />
      <PortfolioGrid />
      <HomeEducationOverview />
      <HomeContact />
      <HomeFooter />
    </main>
  );
}
