/** @format */

"use client";

import ProviderHeader from "@/components/Provider/ProviderHeader";
import ProviderFeed from "@/components/Provider/ProviderFeed";
import { feedArray } from "@/components/sampleData/Data";

export default function ProviderPage() {
  return (
    <div className="max-w-8xl flex h-screen flex-col bg-white">
      <ProviderHeader />
      <ProviderFeed feedArray={feedArray} />
    </div>
  );
}
