import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HoloCardProps {
  children: ReactNode;
  className?: string;
}

export default function HoloCard({ children, className }: HoloCardProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative z-10 p-5">{children}</div>
    </div>
  );
}
