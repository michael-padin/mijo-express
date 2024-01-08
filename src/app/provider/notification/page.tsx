import ProviderHeader from "@/components/provider/ProviderHeader";
import ProviderNotification from "@/components/provider/ProviderNotification";

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
