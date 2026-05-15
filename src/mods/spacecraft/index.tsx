import { useEffect } from "react";
import TopNav from "./sections/TopNav";
import Hero from "./sections/Hero";
import Receipts from "./sections/Receipts";
import Work from "./sections/Work";
import Skills from "./sections/Skills";
import Philosophies from "./sections/Philosophies";
import Footer from "./sections/Footer";

export default function SpacecraftMod() {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#fafaf9";
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fafaf9] text-zinc-900">
      <BackdropTexture />
      <TopNav />
      <main className="relative mx-auto max-w-[1104px] px-5 sm:px-8">
        <Hero />
        <Receipts />
        <Work />
        <Skills />
        <Philosophies />
        <Footer />
      </main>
    </div>
  );
}

function BackdropTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% -10%, rgba(99,102,241,0.06), transparent 60%), radial-gradient(900px 500px at 110% 10%, rgba(16,185,129,0.05), transparent 60%)",
      }}
    />
  );
}
