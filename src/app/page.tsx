import "@ant-design/v5-patch-for-react-19";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Header />
        <HeroSection />
        <ServicesSection />
        <Footer />
      </main>
    </div>
  );
}
