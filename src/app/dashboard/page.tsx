"use client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/customer/feed");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2Icon className="animate-spin" size={30} />
    </div>
  );
}
