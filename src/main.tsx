import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Dither from "@/components/Dither";
import "./index.css";
import ScrollVelocity from "./components/ScrollVelocity";
import { useRef } from "react";

export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    /* Added w-screen to force container to exact viewport width */
    <div
      ref={scrollRef}
      className="relative min-h-screen w-screen overflow-auto overflow-x-hidden"
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

        {/* Added specific width constraint and pointer-events-none to prevent interaction */}
        <section 
          className="mb-8 overflow-hidden w-screen -mx-8 pointer-events-none"
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
            scrollerClassName="text-white/90 text-4xl font-bold"
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