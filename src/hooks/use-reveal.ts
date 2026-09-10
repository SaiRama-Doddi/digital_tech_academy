import { useEffect, useRef, useState } from "react";

/** Adds `is-visible` to every [data-reveal] element inside the ref once it scrolls into view. */
export function useRevealRoot<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (typeof IntersectionObserver === "undefined") {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            // Re-trigger transitions when scrolling up and down:
            // When an element scrolls completely outside the viewport, remove is-visible
            // so scrolling back to it smoothly triggers the entrance transition again.
            const rect = entry.boundingClientRect;
            const vh = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top > vh || rect.bottom < 0) {
              entry.target.classList.remove("is-visible");
            }
          }
        });
      },
      { rootMargin: "0px 0px -15px 0px", threshold: [0, 0.02] },
    );

    const observedSet = new WeakSet<HTMLElement>();

    const observeTargets = () => {
      const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
      const vh = window.innerHeight || document.documentElement.clientHeight;
      targets.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el);
          observer.observe(el);
        }
        const rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          el.classList.add("is-visible");
        }
      });
    };

    observeTargets();

    const mutationObserver = new MutationObserver(() => {
      observeTargets();
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return ref;
}

/** True when the element is in view (supports re-triggering on scroll up and down when once = false). */
export function useInView<T extends HTMLElement = HTMLDivElement>(once = false) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return { ref, inView };
}
