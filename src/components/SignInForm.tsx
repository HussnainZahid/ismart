// src/components/SignInForm.tsx
export default function SignInForm() {
  return (
    <form className="flex flex-col gap-4 p-4 bg-white rounded shadow">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
      />
      <button className="bg-blue-600 text-white py-2 rounded">
        Sign In
      </button>
    </form>
  );
}
