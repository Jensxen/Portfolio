import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Dither from "@/components/Dither";
import "./index.css";
import ScrollVelocity from "./components/ScrollVelocity";
import { useRef } from "react";

export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    /* Added bg-black to prevent white flash during loading */
    <div
      ref={scrollRef}
      className="relative min-h-screen w-screen overflow-auto overflow-x-hidden bg-black"
    >
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

        {/* Positioned absolutely with pointer-events-none to allow Dither mouse interaction */}
        <section
          className="absolute top-20 left-0 right-0 overflow-hidden w-screen z-5 pointer-events-none"
          style={{ maxWidth: "100vw" }}
        >
          <ScrollVelocity
            scrollContainerRef={scrollRef as React.RefObject<HTMLElement>}
            texts={["Under Construction • ", "Work In Progress • "]}
            velocity={60}
            numCopies={8}
            damping={80}
            stiffness={200}
            /* Removed width constraints from parallax to let it overflow within container */
            parallaxClassName="overflow-hidden"
            /* Added leading-relaxed for better line height to accommodate descenders */
            scrollerClassName="text-white/90 text-4xl font-bold leading-relaxed"
          />
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
