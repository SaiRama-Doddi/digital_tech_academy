import {
  Activity,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  ClipboardList,
  FileSearch,
  FolderOpen,
  Hammer,
  Mic,
  MessageSquare,
  Rocket,
  TrendingUp,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Activity,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  ClipboardList,
  FileSearch,
  FolderOpen,
  Hammer,
  Mic,
  MessageSquareCheck: MessageSquare,
  Rocket,
  TrendingUp,
  Users,
  Wrench,
};

export function Icon({ name, className }: { name: string; className?: string | undefined }) {
  const Cmp = icons[name] ?? BadgeCheck;
  return <Cmp className={className} aria-hidden="true" />;
}
