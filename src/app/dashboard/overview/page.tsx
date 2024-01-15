import Navbar from "@/components/common/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomerOverview from "@/components/overview/customer/customer-overview";
import ServiceProviderOverview from "@/components/overview/service-provider/service-provider-overview";
import AdminOverview from "@/components/overview/admin/admin-overview";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default async function OverviewPage() {
  const session = await getServerSession(authConfig);
  const { role } = session?.user || {};

  return (
    <>
      {role === "customer" && <CustomerOverview />}
      {role === "service_provider" && <ServiceProviderOverview />}
      {role === "admin" && <AdminOverview />}
    </>
  );
}
