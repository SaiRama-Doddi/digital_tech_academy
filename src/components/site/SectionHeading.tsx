import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string | undefined;
  title: string;
  description?: string | undefined;
  align?: "left" | "center" | undefined;
  onDark?: boolean | undefined;
  className?: string | undefined;
  as?: "h1" | "h2" | "h3" | undefined;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  onDark = false,
  className,
  as: Tag = "h2",
}: Props) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
      data-reveal
    >
      {eyebrow ? (
        <span className={cn("eyebrow", onDark ? "text-accent" : "text-accent-foreground/70")}>
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          <span className={onDark ? "text-accent" : "text-foreground/60"}>{eyebrow}</span>
        </span>
      ) : null}
      <Tag
        className={cn(
          "text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.7rem]",
          onDark ? "text-navy-foreground" : "text-foreground",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "text-base leading-relaxed sm:text-[1.05rem]",
            onDark ? "text-navy-muted" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
