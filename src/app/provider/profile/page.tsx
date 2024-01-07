/** @format */

"use client";

import ProviderHeader from "@/components/Provider/ProviderHeader";
import ProviderProfile from "@/components/Provider/ProviderProfile";

export default function ProviderProfilePage() {
  return (
    <div className="max-w-8xl flex h-screen flex-col bg-white">
      <ProviderHeader />
      <ProviderProfile />
    </div>
  );
}
