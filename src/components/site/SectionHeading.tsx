import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: React.ReactNode | undefined;
  title: React.ReactNode;
  description?: React.ReactNode | undefined;
  align?: "left" | "center" | undefined;
  onDark?: boolean | undefined;
  className?: string | undefined;
  titleClassName?: string | undefined;
  as?: "h1" | "h2" | "h3" | undefined;
  descriptionClassName?: string | undefined;
  singleLine?: boolean | undefined;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className,
  titleClassName,
  as: Tag = "h2",
  descriptionClassName,
  singleLine = true,
}: Props) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 sm:gap-3",
        align === "center"
          ? "mx-auto items-center text-center max-w-5xl lg:max-w-6xl xl:max-w-7xl"
          : "items-start text-left max-w-5xl lg:max-w-6xl xl:max-w-7xl",
        className,
      )}
      data-reveal
    >
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow text-[11px] sm:text-xs inline-flex items-center gap-2",
            onDark ? "text-accent" : "text-accent-foreground/70"
          )}
        >
          <span className="h-px w-5 sm:w-6 bg-accent" aria-hidden="true" />
          <span className={onDark ? "text-accent" : "text-foreground/60"}>{eyebrow}</span>
        </span>
      ) : null}
      <Tag
        className={cn(
          "font-extrabold tracking-tight leading-[1.2]",
          singleLine
            ? "text-xl sm:text-[1.35rem] md:text-[1.8rem] lg:text-[2.25rem] xl:text-[2.6rem] whitespace-normal sm:whitespace-nowrap"
            : "text-xl sm:text-3xl lg:text-[2.6rem] leading-[1.25] sm:leading-[1.2]",
          align === "center" ? "text-center" : "text-left",
          onDark ? "text-navy-foreground" : "text-foreground",
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "text-xs sm:text-base leading-relaxed font-normal max-w-3xl",
            align === "center" ? "mx-auto text-center" : "text-left",
            onDark ? "text-navy-muted" : "text-muted-foreground",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
