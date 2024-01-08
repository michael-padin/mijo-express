/** @format */

"use client";

import ProviderHeader from "@/components/provider/ProviderHeader";
import ProviderRequest from "@/components/provider/ProviderRequest";

export default function ProviderRequestPage() {
  return (
    <div className="max-w-8xl flex h-screen flex-row bg-white">
      <div className="w-full bg-white">
        <ProviderHeader />
        {/* <ProviderRequest ProviderHistoryData={ProviderHistoryData} /> */}
      </div>
    </div>
  );
}
