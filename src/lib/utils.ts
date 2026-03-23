import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ─────────────────────────────────────────────
//  Tailwind class merger
// ─────────────────────────────────────────────

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─────────────────────────────────────────────
//  Price formatting
// ─────────────────────────────────────────────

export function formatPrice(price: string | null | undefined): string {
  if (!price) return "N/A";
  const num = Number.parseFloat(price);
  if (Number.isNaN(num)) return "N/A";
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatPriceUsd(price: string | null | undefined): string {
  if (!price) return "";
  const num = Number.parseFloat(price);
  if (Number.isNaN(num)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
}

// ─────────────────────────────────────────────
//  Mileage formatting
// ─────────────────────────────────────────────

export function formatMileage(mileage: number | null | undefined): string {
  if (mileage === null || mileage === undefined) return "N/A";
  return new Intl.NumberFormat("en-US").format(mileage) + " km";
}

// ─────────────────────────────────────────────
//  Date formatting
// ─────────────────────────────────────────────

export function formatDate(date: string | null | undefined): string {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

// ─────────────────────────────────────────────
//  Truncate text
// ─────────────────────────────────────────────

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}
