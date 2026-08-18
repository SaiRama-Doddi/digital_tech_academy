import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const btnVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-accent",
        accent:
          "bg-accent text-accent-foreground hover:brightness-110 hover:shadow-accent",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:border-accent hover:text-accent",
        onDark:
          "border border-navy-foreground/25 bg-navy-foreground/5 text-navy-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground",
        ghost: "text-foreground hover:text-accent",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof btnVariants>;

export function Btn({ className, variant, size, ...props }: ComponentProps<"button"> & Variants) {
  return <button className={cn(btnVariants({ variant, size }), className)} {...props} />;
}

export function BtnLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(btnVariants({ variant, size }), className)} {...props} />;
}

export function BtnAnchor({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"a"> & Variants) {
  return <a className={cn(btnVariants({ variant, size }), className)} {...props} />;
}
