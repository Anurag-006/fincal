import HeroSection      from "../components/story/HeroSection";
import LearnSection     from "../components/story/LearnSection";
import CompoundingScene from "../components/story/CompoundingScene";
import WakeUpSection    from "../components/story/WakeUpSection";

export default function HomePage() {
  return (
    <main style={{ background:"var(--bg)" }}>
      <HeroSection />
      <LearnSection />
      <CompoundingScene />
      <WakeUpSection />
    </main>
  );
}
