import { Fuel, Gauge, MapPin, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge, getFuelTypeBadgeVariant } from "@/components/ui/badge";
import { formatMileage, formatPrice, formatPriceUsd } from "@/lib/utils";
import type { Car } from "@/types";

// ─────────────────────────────────────────────
//  Props
// ─────────────────────────────────────────────

interface CarCardProps {
  car: Car;
}

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function CarCard({ car }: CarCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-800 text-left transition-all hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
      onClick={() => navigate(`/cars/${car.id}`)}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-700">
        {car.image_url ? (
          <img
            src={car.image_url}
            alt={`${car.brand} ${car.model}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-slate-500">No image</span>
          </div>
        )}
        <div className="absolute right-2 top-2">
          <Badge variant={getFuelTypeBadgeVariant(car.fuel_type)}>{car.fuel_type}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <div>
          <h3 className="font-semibold text-white">
            {car.brand} {car.model}
          </h3>
          <p className="text-sm text-slate-400">{car.year}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="h-3.5 w-3.5" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" />
            <span>{car.engine_size || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{car.location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-auto border-t border-slate-700 pt-3">
          <p className="text-lg font-bold text-white">{formatPrice(car.price)}</p>
          {car.price_usd && (
            <p className="text-xs text-slate-400">≈ {formatPriceUsd(car.price_usd)}</p>
          )}
        </div>
      </div>
    </button>
  );
}
