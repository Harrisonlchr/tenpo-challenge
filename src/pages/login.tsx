import { LoginForm } from "@/components/login-form";
import { authStore } from "@/store/auth-store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Login() {
  const { token } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
