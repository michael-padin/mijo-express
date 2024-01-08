import ProviderNav from "@/components/provider/ProviderNav";
import React from "react";

const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-8xl flex h-screen flex-row bg-white">
      <div className="w-1/5">
        <ProviderNav />
      </div>
      <div className="w-4/5 bg-white">{children}</div>
    </div>
  );
};

export default ProviderLayout;
