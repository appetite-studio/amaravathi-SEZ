import {
  Briefcase,
  Building2,
  Calendar,
  Files,
  GraduationCap,
  Home,
  IdCard,
  Map,
  MessagesSquare,
  Plane,
  Receipt,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Building2,
  IdCard,
  Home,
  Users,
  Receipt,
  GraduationCap,
  Calendar,
  Scale,
  Files,
  Map,
  Briefcase,
  Plane,
  MessagesSquare,
};

export function ToolIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Building2;
  return <Icon className={className} strokeWidth={1.4} />;
}
