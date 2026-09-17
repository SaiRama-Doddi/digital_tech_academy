import {
  Activity,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  ClipboardList,
  FileSearch,
  FolderOpen,
  GraduationCap,
  Hammer,
  Lock,
  Mic,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Target,
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
  Briefcase,
  Building2,
  ClipboardList,
  FileSearch,
  FolderOpen,
  GraduationCap,
  Hammer,
  Lock,
  Mic,
  MessageSquareCheck: MessageSquare,
  Rocket,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wrench,
};

export function Icon({ name, className }: { name: string; className?: string | undefined }) {
  const Cmp = icons[name] ?? BadgeCheck;
  return <Cmp className={className} aria-hidden="true" />;
}
