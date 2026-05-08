"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/app/lib/utils"; // Utilitaire classique pour fusionner les classes

const FILTERS = [
  { id: "all", label: "Toutes les routes" },
  { id: "day", label: "Trains de jour" },
  { id: "night", label: "Trains de nuit" },
  // ... tes autres filtres
];

export default function RouteFilters() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex gap-3 items-center">
      {FILTERS.map((filter) => {
        const isSelected = activeFilter === filter.id;

        return (
          <Button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            variant={isSelected ? "default" : "outline"} // Default = Noir, Outline = Bordure grise
            className={cn(
              "rounded-full px-5 h-9 text-xs font-medium transition-all",
              isSelected
                ? "bg-slate-900 text-white hover:bg-slate-800" // Noir profond
                : "border-slate-200 text-slate-600 hover:bg-slate-50", // Look gris clair
            )}
          >
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}
