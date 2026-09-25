import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { StickyActions } from "./StickyActions";
import { useRevealRoot } from "@/hooks/use-reveal";

export function SiteLayout({ children }: { children: ReactNode }) {
  const ref = useRevealRoot<HTMLDivElement>();

  return (
    <div ref={ref} className="flex min-h-screen flex-col w-full max-w-full overflow-x-clip bg-white">
      <Header />
      <main className="flex-1 w-full max-w-full min-w-0 overflow-x-clip bg-white">{children}</main>
      <Footer />
      <StickyActions />
    </div>
  );
}
