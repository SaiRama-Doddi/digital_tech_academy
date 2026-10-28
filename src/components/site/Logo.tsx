import { Link } from "@tanstack/react-router";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import logoLight from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";

export function Logo({
  onDark = false,
  className,
  imgClassName,
}: {
  onDark?: boolean | undefined;
  className?: string | undefined;
  imgClassName?: string | undefined;
}) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex shrink-0 items-center transition-transform duration-200 select-none py-0.5",
        className,
      )}
    >
      <img
        src={onDark ? logoDark : logoLight}
        alt="Digitechademy"
        className={cn(
          "h-5 sm:h-5.5 md:h-6 w-auto max-w-[130px] sm:max-w-[150px] md:max-w-[165px] object-contain transition-transform duration-300 group-hover:scale-[1.02]",
          imgClassName,
        )}
      />
    </Link>
  );
}


