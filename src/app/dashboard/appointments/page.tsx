import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  getCustomerServiceRequest,
  getProviderAppointments,
  getProviderServiceRequest,
} from "@/lib/data";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { providerColumns } from "./components/provider/provider-columns";
import { DataTable } from "./components/provider/data-table";
import { Calendar } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";

export default async function AppointmentsPage() {
  const session = await getServerSession(authConfig);
  const { role } = session?.user || {};
  const serviceRequests =
    role === "customer" &&
    JSON.parse(await getCustomerServiceRequest(session?.user._id || ""));
  const providerAppointments =
    role === "service_provider" &&
    JSON.parse(await getProviderAppointments(session?.user._id || ""));
  const adminServiceRequests =
    role === "admin" &&
    JSON.parse(await getCustomerServiceRequest(session?.user._id || ""));

  return (
    <div className=" ">
      <div className=" space-y-6 p-10 pb-16 ">
        <div className="flex  justify-between space-y-0.5">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Calendar />
              Appointments
            </h2>
            <p className="text-muted-foreground">
              This page displays a list of your accepted appointments.
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
              <DataTable columns={[]} data={serviceRequests} />
            )}
            {role === "service_provider" && (
              <DataTable
                columns={providerColumns}
                data={providerAppointments}
              />
            )}
            {role === "admin" && (
              <DataTable columns={[]} data={serviceRequests} />
            )}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
