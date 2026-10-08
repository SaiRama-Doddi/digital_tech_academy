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
          : "items-start text-left w-full max-w-none",
        className,
      )}
      data-reveal
    >
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2",
            onDark ? "text-sky-400" : "text-blue-700",
          )}
        >
          <span
            className={cn("h-px w-5 sm:w-6", onDark ? "bg-sky-400" : "bg-blue-600")}
            aria-hidden="true"
          />
          <span>{eyebrow}</span>
        </span>
      ) : null}
      <Tag
        className={cn(
          "font-extrabold tracking-tight leading-[1.2]",
          "text-2xl sm:text-3xl lg:text-4xl",
          align === "center" ? "text-center" : "text-left",
          onDark ? "text-white" : "text-slate-900",
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "text-sm sm:text-base leading-relaxed font-normal w-full max-w-4xl",
            align === "center" ? "mx-auto text-center" : "text-left",
            onDark ? "text-slate-300" : "text-slate-600",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
