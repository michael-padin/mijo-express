"use client";

import ProviderPhoto from "./ProviderPhoto";
import ProviderInfo from "./ProviderInfo";

export default function ProviderProfile() {
  return (
    <div className="h-[calc(100vh-80px)] w-full overflow-hidden">
      <ProviderPhoto />
      <ProviderInfo />
    </div>
  );
}
