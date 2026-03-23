import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { CarFilters, CarOrdering } from "@/types";

// ─────────────────────────────────────────────
//  Options
// ─────────────────────────────────────────────

const FUEL_TYPE_OPTIONS = [
  { value: "Gasoline", label: "Gasoline" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Electric", label: "Electric" },
  { value: "Diesel", label: "Diesel" },
  { value: "Plug-in Hybrid", label: "Plug-in Hybrid" },
];

const TRANSMISSION_OPTIONS = [
  { value: "AT", label: "Automatic (AT)" },
  { value: "MT", label: "Manual (MT)" },
  { value: "CVT", label: "CVT" },
];

const BODY_TYPE_OPTIONS = [
  { value: "Sedan", label: "Sedan" },
  { value: "SUV", label: "SUV" },
  { value: "Minivan", label: "Minivan" },
  { value: "Hatchback", label: "Hatchback" },
  { value: "Wagon", label: "Wagon" },
  { value: "Coupe", label: "Coupe" },
  { value: "Truck", label: "Truck" },
];

const ORDERING_OPTIONS: { value: CarOrdering; label: string }[] = [
  { value: "-created_at", label: "Newest first" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-year", label: "Year: Newest" },
  { value: "year", label: "Year: Oldest" },
  { value: "mileage", label: "Mileage: Low to High" },
];

// ─────────────────────────────────────────────
//  Props
// ─────────────────────────────────────────────

interface FiltersPanelProps {
  filters: CarFilters;
  onChange: (filters: CarFilters) => void;
  onReset: () => void;
}

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function FiltersPanel({ filters, onChange, onReset }: FiltersPanelProps) {
  function handleChange(key: keyof CarFilters, value: string | number | undefined) {
    onChange({ ...filters, [key]: value || undefined, page: 1 });
  }

  return (
    <aside className="flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-800 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <X className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Sort */}
      <Select
        label="Sort by"
        options={ORDERING_OPTIONS}
        placeholder="Default"
        value={filters.ordering ?? ""}
        onChange={(e) => handleChange("ordering", e.target.value as CarOrdering)}
      />

      {/* Brand */}
      <Input
        label="Brand"
        placeholder="e.g. Toyota"
        value={filters.brand ?? ""}
        onChange={(e) => handleChange("brand", e.target.value)}
      />

      {/* Model */}
      <Input
        label="Model"
        placeholder="e.g. Prius"
        value={filters.model ?? ""}
        onChange={(e) => handleChange("model", e.target.value)}
      />

      {/* Year range */}
      <div className="flex gap-2">
        <Input
          label="Year from"
          type="number"
          placeholder="2015"
          value={filters.year_min ?? ""}
          onChange={(e) =>
            handleChange("year_min", e.target.value ? Number(e.target.value) : undefined)
          }
        />
        <Input
          label="Year to"
          type="number"
          placeholder="2024"
          value={filters.year_max ?? ""}
          onChange={(e) =>
            handleChange("year_max", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </div>

      {/* Price range */}
      <div className="flex gap-2">
        <Input
          label="Price min (¥)"
          type="number"
          placeholder="500000"
          value={filters.price_min ?? ""}
          onChange={(e) =>
            handleChange("price_min", e.target.value ? Number(e.target.value) : undefined)
          }
        />
        <Input
          label="Price max (¥)"
          type="number"
          placeholder="3000000"
          value={filters.price_max ?? ""}
          onChange={(e) =>
            handleChange("price_max", e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </div>

      {/* Mileage max */}
      <Input
        label="Max mileage (km)"
        type="number"
        placeholder="100000"
        value={filters.mileage_max ?? ""}
        onChange={(e) =>
          handleChange("mileage_max", e.target.value ? Number(e.target.value) : undefined)
        }
      />

      {/* Fuel type */}
      <Select
        label="Fuel type"
        options={FUEL_TYPE_OPTIONS}
        placeholder="Any"
        value={filters.fuel_type ?? ""}
        onChange={(e) => handleChange("fuel_type", e.target.value)}
      />

      {/* Transmission */}
      <Select
        label="Transmission"
        options={TRANSMISSION_OPTIONS}
        placeholder="Any"
        value={filters.transmission ?? ""}
        onChange={(e) => handleChange("transmission", e.target.value)}
      />

      {/* Body type */}
      <Select
        label="Body type"
        options={BODY_TYPE_OPTIONS}
        placeholder="Any"
        value={filters.body_type ?? ""}
        onChange={(e) => handleChange("body_type", e.target.value)}
      />

      {/* Location */}
      <Input
        label="Location"
        placeholder="e.g. Tokyo"
        value={filters.location ?? ""}
        onChange={(e) => handleChange("location", e.target.value)}
      />
    </aside>
  );
}
