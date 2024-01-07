/** @format */

"use client";

import ProviderHeader from "@/components/Provider/ProviderHeader";
import ProviderRequest from "@/components/Provider/ProviderRequest";

import { ProviderHistoryData } from "@/components/sampleData/Data";

export default function ProviderRequestPage() {
  return (
    <div className="max-w-8xl flex h-screen flex-row bg-white">
      <div className="w-full bg-white">
        <ProviderHeader />
        <ProviderRequest ProviderHistoryData={ProviderHistoryData} />
      </div>
    </div>
  );
}
