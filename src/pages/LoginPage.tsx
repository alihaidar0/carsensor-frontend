import { zodResolver } from "@hookform/resolvers/zod";
import { Car } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/features/auth/api";
import { useAuthStore } from "@/store/auth.store";

// ─────────────────────────────────────────────
//  Schema
// ─────────────────────────────────────────────

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function LoginPage() {
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await login(data);
      setTokens(response.access, response.refresh, response.user);
      navigate("/cars");
    } catch {
      setError("root", {
        message: "Invalid username or password",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
            <Car className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">CarSensor</h1>
            <p className="mt-1 text-sm text-slate-400">Sign in to browse the inventory</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Input
              label="Username"
              placeholder="admin"
              autoComplete="username"
              error={errors.username?.message}
              {...register("username")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />

            {errors.root && (
              <p className="rounded-md bg-red-900/30 px-3 py-2 text-sm text-red-400">
                {errors.root.message}
              </p>
            )}

            <Button type="submit" loading={isSubmitting} className="mt-2 w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
