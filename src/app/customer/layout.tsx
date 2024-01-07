/** @format */

"use client";

import React from "react";
import UserNav from "@/components/User/UserNav";

const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-8xl flex h-screen flex-row bg-white">
      <div className="w-1/5">
        <UserNav />
      </div>
      <div className="h-screen w-4/5 bg-white">{children}</div>
    </div>
  );
};

export default ProviderLayout;
