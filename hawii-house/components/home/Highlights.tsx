import React from "react";
import {
  Home,
  Utensils,
  HeartHandshake,
  Sparkles,
  Shield,
  Users,
  LucideIcon,
} from "lucide-react";
import { HighlightItem } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/Card";

interface HighlightsProps {
  items: HighlightItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Utensils,
  HeartHandshake,
  Sparkles,
  Shield,
  Users,
};

export function Highlights({ items }: HighlightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, idx) => {
        const IconComponent =
          (item.icon && ICON_MAP[item.icon]) || HeartHandshake;

        return (
          <Card key={idx} tone="surface" className="h-full flex flex-col justify-between">
            <CardContent className="flex flex-col space-y-4">
              {/* Icon Tile: --accent background with --foreground icon */}
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0 text-foreground shadow-sm">
                <IconComponent className="w-6 h-6 stroke-[1.75]" />
              </div>

              <h3 className="text-xl font-serif font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="text-sm md:text-base text-muted leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
