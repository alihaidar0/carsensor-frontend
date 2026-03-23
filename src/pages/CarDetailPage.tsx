import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, getFuelTypeBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCar } from "@/features/cars/api";
import { formatDate, formatMileage, formatPrice, formatPriceUsd } from "@/lib/utils";

// ─────────────────────────────────────────────
//  Spec Row
// ─────────────────────────────────────────────

function SpecRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex justify-between border-b border-slate-700 py-2.5 text-sm last:border-0">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCar(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-800" />
        <div className="h-96 animate-pulse rounded-xl bg-slate-800" />
        <div className="h-64 animate-pulse rounded-xl bg-slate-800" />
      </div>
    );
  }

  if (isError || !car) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-700 bg-slate-800 py-16">
        <p className="text-slate-400">Failed to load car details.</p>
        <Button onClick={() => navigate("/cars")}>Back to list</Button>
      </div>
    );
  }

  const images = car.image_urls?.length > 0 ? car.image_urls : [car.image_url].filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" className="w-fit" onClick={() => navigate("/cars")}>
        <ArrowLeft className="h-4 w-4" />
        Back to list
      </Button>

      {/* Title */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {car.brand} {car.model}
          </h1>
          <p className="mt-1 text-slate-400">{car.year}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{formatPrice(car.price)}</p>
          {car.price_usd && (
            <p className="text-sm text-slate-400">≈ {formatPriceUsd(car.price_usd)}</p>
          )}
        </div>
      </div>

      {/* Image gallery */}
      {images.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-xl bg-slate-800">
            <img
              src={images[activeImage]}
              alt={`${car.brand} ${car.model}`}
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((url, index) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={[
                    "h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                    activeImage === index
                      ? "border-blue-500"
                      : "border-transparent opacity-60 hover:opacity-100",
                  ].join(" ")}
                >
                  <img src={url} alt={`View ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant={getFuelTypeBadgeVariant(car.fuel_type)}>{car.fuel_type}</Badge>
        <Badge variant="default">{car.transmission}</Badge>
        <Badge variant="default">{car.body_type}</Badge>
        {car.drive_type && <Badge variant="default">{car.drive_type}</Badge>}
      </div>

      {/* Specs table */}
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
        <h2 className="mb-3 font-semibold text-white">Specifications</h2>
        <SpecRow label="Brand" value={car.brand} />
        <SpecRow label="Model" value={car.model} />
        <SpecRow label="Year" value={car.year} />
        <SpecRow label="Mileage" value={formatMileage(car.mileage)} />
        <SpecRow label="Fuel type" value={car.fuel_type} />
        <SpecRow label="Transmission" value={car.transmission} />
        <SpecRow label="Body type" value={car.body_type} />
        <SpecRow label="Drive type" value={car.drive_type} />
        <SpecRow label="Engine size" value={car.engine_size} />
        <SpecRow label="Doors" value={car.doors} />
        <SpecRow label="Seats" value={car.seats} />
        <SpecRow label="Color" value={car.color} />
        <SpecRow label="Location" value={car.location} />
        <SpecRow label="Inspection" value={formatDate(car.inspection_date)} />
        <SpecRow label="Listed on" value={formatDate(car.scraped_at)} />
      </div>

      {/* Original listing link */}
      {car.url && (
        <button
          type="button"
          onClick={() => window.open(car.url, "_blank", "noopener,noreferrer")}
          className="flex w-fit items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          <ExternalLink className="h-4 w-4" />
          View original listing on carsensor.net
        </button>
      )}
    </div>
  );
}
