import { Car, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button type="button" className="flex items-center gap-2" onClick={() => navigate("/cars")}>
          <Car className="h-6 w-6 text-blue-500" />
          <span className="text-lg font-bold text-white">CarSensor</span>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user && <span className="hidden text-sm text-slate-400 sm:block">{user.username}</span>}
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:block">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
