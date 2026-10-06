import { AuthForm } from "@/components/auth/AuthForm";

interface LoginPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next, error } = await searchParams;

  return (
    <AuthForm
      mode="login"
      nextPath={next ?? "/"}
      initialError={error === "confirmation" ? "That confirmation link is invalid or expired. Request a new signup email and try again." : undefined}
    />
  );
}
