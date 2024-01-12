import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2Icon className="animate-spin text-primary" size={30} />
    </div>
  );
}
