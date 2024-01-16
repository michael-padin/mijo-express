import { authConfig } from "@/lib/auth.config";
import { getServiceOfferByProvider } from "@/lib/data";
import { Briefcase } from "lucide-react";
import { getServerSession } from "next-auth";
import { DataTable } from "./components/data-table";
import { Separator } from "@/components/ui/separator";
import { serviceColumns } from "./components/service-columns";
import { Button } from "@/components/ui/button";
import NewServiceForm from "./components/new-service-form";

export default async function ServicesPage() {
  const session = await getServerSession(authConfig);
  const services = JSON.parse(
    await getServiceOfferByProvider(session?.user._id || "")
  );

  return (
    <div>
      <div className=" space-y-6 p-10 pb-16 ">
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
        <DataTable columns={serviceColumns} data={services} />
      </div>
    </div>
  );
}
