import ProviderHeader from "@/components/Provider/ProviderHeader";
import ProviderNotification from "@/components/Provider/ProviderNotification";

export default function ProviderNotificationPage() {
  return (
    <div className="max-w-8xl flex h-screen flex-row bg-white">
      <div className="w-full bg-white">
        <ProviderHeader />
        <ProviderNotification />
      </div>
    </div>
  );
}
