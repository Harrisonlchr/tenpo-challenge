import { authStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router";
import { Button } from "@/components/ui/button";

export const ProtectedRoute = () => {
  const { token, logout } = authStore((state) => state);

  return token ? (
    <div className="flex flex-col h-screen">
      <header className="p-4 flex justify-between items-center">
        <Button onClick={() => logout()}>
          Salir
        </Button>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};
