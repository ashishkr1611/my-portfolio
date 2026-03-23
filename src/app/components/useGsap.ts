import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  return ref;
}

export function useGsapOnMount(callback: (ctx: gsap.Context) => void, deps: unknown[] = []) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
