import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Who goes there?</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
