import { authConfig } from "@/lib/auth.config";
import { getAllServiceOffers, getServiceOfferByProvider } from "@/lib/data";
import { Briefcase } from "lucide-react";
import { getServerSession } from "next-auth";
import { DataTable } from "./components/data-table";
import { DataTable as AdminDataTable } from "./components/admin/data-table";
import { Separator } from "@/components/ui/separator";
import { serviceColumns } from "./components/service-columns";
import { serviceColumns as adminServiceColumns } from "./components/admin/service-columns";
import NewServiceForm from "./components/new-service-form";
import { Card, CardHeader } from "@/components/ui/card";

export default async function ServicesPage() {
  const session = await getServerSession(authConfig);
  const { role } = session?.user || {};
  const servicesByProvider = JSON.parse(
    await getServiceOfferByProvider(session?.user._id || "")
  );
  const allServices = JSON.parse(await getAllServiceOffers());

  return (
    <div>
      <div className=" space-y-6 p-5 pb-16 ">
        <div className="flex items-center justify-between space-y-0.5">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Briefcase />
              Services
            </h2>
            <p className="text-muted-foreground">
              This page displays a list of your services.
            </p>
          </div>

          <div className="">
            <NewServiceForm />
          </div>
        </div>
        <Separator className="my-6" />
        <Card>
          <CardHeader>
            {role === "service_provider" && (
              <DataTable columns={serviceColumns} data={servicesByProvider} />
            )}
            {role === "admin" && (
              <AdminDataTable
                columns={adminServiceColumns}
                data={allServices}
              />
            )}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
