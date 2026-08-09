import LoginForm from "../../../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          Login Admin
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}