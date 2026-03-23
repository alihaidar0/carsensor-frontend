import api from "@/lib/api";
import type { Car, CarFilters, PaginatedResponse } from "@/types";

// ─────────────────────────────────────────────
//  Cars API
// ─────────────────────────────────────────────

export async function getCars(filters: CarFilters = {}): Promise<PaginatedResponse<Car>> {
  const params = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== "" && value !== null,
    ),
  );
  const response = await api.get<PaginatedResponse<Car>>("/api/v1/cars/", {
    params,
  });
  return response.data;
}

export async function getCar(id: number): Promise<Car> {
  const response = await api.get<Car>(`/api/v1/cars/${id}/`);
  return response.data;
}
