import { useQuery } from "@tanstack/react-query";
import { Car, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getCars } from "@/features/cars/api";
import { CarCard } from "@/features/cars/CarCard";
import { FiltersPanel } from "@/features/cars/FiltersPanel";
import type { CarFilters } from "@/types";

// ─────────────────────────────────────────────
//  Default filters
// ─────────────────────────────────────────────

const DEFAULT_FILTERS: CarFilters = {
  page: 1,
  page_size: 20,
  ordering: "-created_at",
};

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function CarsPage() {
  const [filters, setFilters] = useState<CarFilters>(DEFAULT_FILTERS);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cars", filters],
    queryFn: () => getCars(filters),
  });

  const currentPage = filters.page ?? 1;
  const totalPages = data ? Math.ceil(data.count / (filters.page_size ?? 20)) : 0;

  function handleFiltersChange(newFilters: CarFilters) {
    setFilters(newFilters);
  }

  function handleReset() {
    setFilters(DEFAULT_FILTERS);
  }

  function handlePageChange(page: number) {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Filters sidebar */}
      <div className="w-full lg:w-72 lg:shrink-0">
        <FiltersPanel filters={filters} onChange={handleFiltersChange} onReset={handleReset} />
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">
            {isLoading
              ? "Loading..."
              : isError
                ? "Error loading cars"
                : `${data?.count.toLocaleString()} cars found`}
          </h1>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((key) => (
              <div key={key} className="h-80 animate-pulse rounded-xl bg-slate-800" />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-700 bg-slate-800 py-16">
            <Car className="h-12 w-12 text-slate-600" />
            <p className="text-slate-400">Failed to load cars. Please try again.</p>
            <Button onClick={() => setFilters({ ...filters })}>Retry</Button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && data?.results.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-700 bg-slate-800 py-16">
            <Car className="h-12 w-12 text-slate-600" />
            <p className="text-slate-400">No cars found. Try adjusting your filters.</p>
            <Button onClick={handleReset}>Reset filters</Button>
          </div>
        )}

        {/* Cars grid */}
        {!isLoading && !isError && data && data.results.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {data.results.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-slate-400">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
