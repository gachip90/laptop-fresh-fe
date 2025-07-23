import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Header />
      <div className="min-h-screen max-w-7xl mx-auto px-4">{children}</div>
      <Footer />
    </div>
  );
}
