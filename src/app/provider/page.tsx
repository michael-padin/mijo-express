"use client";

import ProviderFeed from "@/components/provider/ProviderFeed";
import ProviderHeader from "@/components/customer/UserHeader";

export default function ProviderPage() {
  return (
    <div className="max-w-8xl flex h-screen flex-col bg-white">
      <ProviderHeader />
      {/* <ProviderFeed feedArray={feedArray} /> */}
    </div>
  );
}
