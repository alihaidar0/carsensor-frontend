import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
//  Variants
// ─────────────────────────────────────────────

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-slate-700 text-slate-200",
        blue: "bg-blue-900 text-blue-200",
        green: "bg-green-900 text-green-200",
        yellow: "bg-yellow-900 text-yellow-200",
        red: "bg-red-900 text-red-200",
        purple: "bg-purple-900 text-purple-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// ─────────────────────────────────────────────
//  Props
// ─────────────────────────────────────────────

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

// ─────────────────────────────────────────────
//  Fuel type → badge variant map
// ─────────────────────────────────────────────

export function getFuelTypeBadgeVariant(
  fuelType: string,
): VariantProps<typeof badgeVariants>["variant"] {
  const map: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
    Hybrid: "green",
    Electric: "blue",
    Gasoline: "yellow",
    Diesel: "red",
    "Plug-in Hybrid": "purple",
  };
  return map[fuelType] ?? "default";
}

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function Badge({ variant, className, children }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
}
