import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./lib/useLenis";
import { buildCameraTimeline } from "./three/cameraRig";
import { Scene } from "./three/Scene";
import { Nav } from "./components/Nav";
import { Cursor } from "./components/Cursor";
import { IntroOverlay } from "./components/IntroOverlay";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Contact } from "./sections/Contact";
import type Lenis from "@studio-freight/lenis";

export default function App() {
  useLenis();
  const [ready, setReady] = useState(false);

  // Scroll is locked until the intro hands over.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (!ready) lenis?.stop();
    else lenis?.start();
  }, [ready]);

  const handleIntroDone = useCallback(() => setReady(true), []);

  // Master scroll-scrubbed camera/avatar choreography — built after intro.
  useEffect(() => {
    if (!ready) return;
    const tl = buildCameraTimeline();
    ScrollTrigger.refresh();
    return () => {
      tl?.scrollTrigger?.kill();
      tl?.kill();
    };
  }, [ready]);

  return (
    <>
      {/* Fixed full-viewport 3D background layer */}
      <Scene />

      <Nav />

      {/* Scrolling content layer over the scene */}
      <main className="content-layer">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Cinematic overlays — always on */}
      <div className="vignette" />
      <div className="grain" />
      <IntroOverlay onDone={handleIntroDone} />
      <Cursor />
    </>
  );
}
