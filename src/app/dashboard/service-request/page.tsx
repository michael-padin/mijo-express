import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CustomerDataTable } from "./components/data-table";
import { columns } from "./components/columns";
import {
  getAllServiceRequestsByRole,
  getCustomerServiceRequest,
  getProviderServiceRequest,
} from "@/lib/data";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { Inbox } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { AdminCustomerDatable } from "./components/admin/admin-customer-data-table";
import { ProviderDataTable } from "./components/provider/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { admineServiceRequestColumns } from "./components/admin/admin-customer-columns";
import { adminProviderColumns } from "./components/admin/admin-provider-columns";
import { providerColumns } from "./components/provider/provider-columns";
import { AdminProviderDatable } from "./components/admin/admin-provider-data-table";

export default async function SericeRequestPage() {
  const session = await getServerSession(authConfig);
  const { role } = session?.user || {};
  const serviceRequests =
    role === "customer" &&
    JSON.parse(await getCustomerServiceRequest(session?.user._id || ""));
  const providerServiceRequests =
    role === "service_provider" &&
    JSON.parse(await getProviderServiceRequest(session?.user._id || ""));
  const customersRequests =
    role === "admin" &&
    JSON.parse(await getAllServiceRequestsByRole("customer"));
  const providersRequests =
    role === "admin" &&
    JSON.parse(await getAllServiceRequestsByRole("service_provider"));

  return (
    <div className=" ">
      <div className=" space-y-6 p-5 pb-16 ">
        <div className="flex  justify-between space-y-0.5">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Inbox />
              Service Requests
            </h2>
            <p className="text-muted-foreground">
              This page displays a list of your service requests.
            </p>
          </div>
          <div>
            {role === "customer" && (
              <Link
                href="/dashboard/overview"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                New Request
              </Link>
            )}
          </div>
        </div>
        <Separator className="my-6" />
        <Card>
          <CardHeader>
            {role === "customer" && (
              <CustomerDataTable columns={columns} data={serviceRequests} />
            )}
            {role === "service_provider" && (
              <ProviderDataTable
                columns={providerColumns}
                data={providerServiceRequests}
              />
            )}
            {role === "admin" && (
              <Tabs defaultValue="customers" className="space-y-4">
                <TabsList className="grid grid-cols-2 lg:w-[400px] ">
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                  <TabsTrigger value="providers">Providers</TabsTrigger>
                </TabsList>
                <TabsContent value="customers">
                  <Card>
                    <CardHeader>
                      <AdminCustomerDatable
                        columns={admineServiceRequestColumns}
                        data={customersRequests}
                      />
                    </CardHeader>
                  </Card>
                </TabsContent>
                <TabsContent value="providers">
                  <Card>
                    <CardHeader>
                      <AdminProviderDatable
                        columns={adminProviderColumns}
                        data={providersRequests}
                      />
                    </CardHeader>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
