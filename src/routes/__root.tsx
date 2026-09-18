import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="surface-navy flex min-h-screen items-center justify-center px-5">
      <div className="max-w-xl text-center">
        <p className="eyebrow justify-center text-accent">404 — Page not found</p>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-navy-foreground sm:text-4xl lg:text-5xl">
          Looks Like You Took a Wrong Turn.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-navy-muted">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
          >
            Back Home
          </Link>
          <Link
            to="/courses"
            className="inline-flex h-12 items-center justify-center rounded-md border border-navy-foreground/25 px-6 text-sm font-semibold text-navy-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="max-w-xl text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        {error && (
          <div className="mt-4 p-4 text-left bg-rose-50 border border-rose-200 rounded-xl text-xs font-mono text-rose-700 overflow-x-auto max-h-60">
            <p className="font-bold">{error.message || String(error)}</p>
            {error.stack && (
              <pre className="mt-2 whitespace-pre-wrap text-[11px] text-rose-600/80">
                {error.stack}
              </pre>
            )}
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DIGITECHADEMY — LEARN • GROW • ACHIEVE | Cyber Security • Digital Marketing • Programmatic Advertising" },
      {
        name: "description",
        content:
          "Learn practical skills. Build real-world confidence. Become career ready. DIGITECHADEMY delivers practical training in Cyber Security, Digital Marketing, and Programmatic Advertising.",
      },
      { name: "author", content: "DIGITECHADEMY" },
      { property: "og:site_name", content: "DIGITECHADEMY" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#081426" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "DIGITECHADEMY",
          description:
            "Cyber Security, Digital Marketing, and Programmatic Advertising training institute. Learn practical skills. Build real-world confidence. Become career ready.",
          telephone: "+91 81434 51426",
          email: "admissions@digitechademy.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "2nd Floor, Tech Park Avenue, Madhapur",
            addressLocality: "Hyderabad",
            postalCode: "500081",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
