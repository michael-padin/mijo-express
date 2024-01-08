"use client";

import ProviderHeader from "@/components/provider/ProviderHeader";
import ProviderNav from "@/components/provider/ProviderNav";

export default function ProviderSetting() {
  return (
    <div className="max-w-8xl flex h-screen flex-row bg-white">
      <div className="w-1/5">
        <ProviderNav />
      </div>
      <div className="w-4/5 bg-white">
        <ProviderHeader />
      </div>
    </div>
  );
}
