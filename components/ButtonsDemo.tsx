"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";

export default function ButtonsDemo() {
  const [loading, setLoading] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleLogin = async (email: string) => {
    setLoading(email);
    await signIn("credentials", {
      email: email,
      password: "password123",
      callbackUrl: "/properties",
    });
  };

  if (!session) {
    return (
      <>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => handleLogin("demo.user@nestrly.app")}
            disabled={!!loading}
            className="group w-full sm:w-[180px] min-h-[56px] max-h-[56px] bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
          >
            {loading === "demo.user@nestrly.app" ? (
              <Spinner loading={true} /> // 👈 Mostramos feedback visual
            ) : (
              <>
                Demo User
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-slate-400 italic">
          * Instant access without registration. Try the features now.
        </p>
      </>
    );
  } else {
    return null;
  }
}
