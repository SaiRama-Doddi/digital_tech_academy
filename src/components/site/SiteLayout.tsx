import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { StickyActions } from "./StickyActions";
import { useRevealRoot } from "@/hooks/use-reveal";

export function SiteLayout({ children }: { children: ReactNode }) {
  const ref = useRevealRoot<HTMLDivElement>();

  return (
    <div ref={ref} className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyActions />
    </div>
  );
}
