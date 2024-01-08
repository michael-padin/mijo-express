"use client";
import ProviderNotification from "@/app/providerpage/notification/page";
import ProviderProfile from "./ProviderProfile";

import { useSearchParams } from "next/navigation";

const ProviderBody = () => {
  const SearchParams = useSearchParams();

  // Function to check if the URL contains a specific string
  const checkURL = () => {
    if (SearchParams.has("/providerpage")) {
      return (
        <>
          <ProviderProfile />
        </>
      );
    } else if (SearchParams.has("providernotification")) {
      return (
        <>
          <ProviderNotification />
        </>
      );
    } else {
      return null; // Or return a different component or null if you don't want to render anything
    }
  };

  return (
    <div>
      {checkURL()} {/* Render components based on the URL */}
    </div>
  );
};

export default ProviderBody;
