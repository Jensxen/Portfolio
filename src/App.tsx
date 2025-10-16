import Dither from "@/components/Dither";
import ScrollVelocity from "./components/ScrollVelocity";
import { useRef } from "react";

export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={scrollRef} className="relative min-h-screen">
      {/* Full-viewport Dither background */}
      <div className="fixed inset-0 z-0">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      {/* Your page content */}
      <main className="relative z-10 p-8">
        <h1 className="text-3xl font-bold mb-4"></h1>
        {/* ScrollVelocity added here — it will react to scrolls of the outer container */}
        <section className="mb-8">
          <ScrollVelocity
            scrollContainerRef={scrollRef as React.RefObject<HTMLElement>}
            texts={["Design", "Code", "Animate", "Ship"]}
            velocity={120}
            numCopies={6}
            damping={50}
            stiffness={400}
            parallaxClassName="w-full"
            scrollerClassName="text-white/90"
          />
        </section>
        ...
      </main>
    </div>
  );
}
