import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { transactionData } from "./components/data";
import {
  getCustomerServiceRequest,
  getProviderServiceRequest,
} from "@/lib/data";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { providerColumns } from "./components/provider/provider-columns";
import { Inbox } from "lucide-react";

export default async function SericeRequestPage() {
  const session = await getServerSession(authConfig);
  const { role } = session?.user || {};
  const serviceRequests =
    role === "customer" &&
    JSON.parse(await getCustomerServiceRequest(session?.user._id || ""));
  const providerServiceRequests =
    role === "service_provider" &&
    JSON.parse(await getProviderServiceRequest(session?.user._id || ""));
  const adminServiceRequests =
    role === "admin" &&
    JSON.parse(await getCustomerServiceRequest(session?.user._id || ""));

  return (
    <div className=" ">
      <div className=" space-y-6 p-10 pb-16 ">
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
        {role === "customer" && (
          <DataTable columns={columns} data={serviceRequests} />
        )}
        {role === "service_provider" && (
          <DataTable columns={providerColumns} data={providerServiceRequests} />
        )}
        {role === "admin" && (
          <DataTable columns={columns} data={serviceRequests} />
        )}
      </div>
    </div>
  );
}
