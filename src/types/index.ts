// ─────────────────────────────────────────────
//  Authentication
// ─────────────────────────────────────────────

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RefreshResponse {
  access: string;
}

// ─────────────────────────────────────────────
//  Car
// ─────────────────────────────────────────────

export interface Car {
  id: number;
  external_id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: string;
  price_usd: string | null;
  color: string;
  fuel_type: string;
  transmission: string;
  body_type: string;
  drive_type: string;
  engine_size: string;
  doors: number | null;
  seats: number | null;
  location: string;
  image_url: string;
  image_urls: string[];
  inspection_date: string | null;
  scraped_at: string;
  url: string;
}

// ─────────────────────────────────────────────
//  API — Paginated Response
// ─────────────────────────────────────────────

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ─────────────────────────────────────────────
//  Cars List — Query Params
// ─────────────────────────────────────────────

export type CarOrdering =
  | "price"
  | "-price"
  | "year"
  | "-year"
  | "mileage"
  | "-mileage"
  | "-created_at";

export interface CarFilters {
  brand?: string;
  model?: string;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  mileage_max?: number;
  fuel_type?: string;
  transmission?: string;
  body_type?: string;
  color?: string;
  location?: string;
  ordering?: CarOrdering;
  page?: number;
  page_size?: number;
}
