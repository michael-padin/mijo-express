import { authConfig } from "@/lib/auth.config";
import { getAllUsers } from "@/lib/data";
import { Briefcase } from "lucide-react";
import { getServerSession } from "next-auth";
import { DataTable as AdminDataTable } from "./components/admin/data-table";
import { Separator } from "@/components/ui/separator";
import { serviceColumns as adminServiceColumns } from "./components/admin/user-columns";
import { Card, CardHeader } from "@/components/ui/card";

export default async function Users() {
  const session = await getServerSession(authConfig);
  const { role } = session?.user || {};
  const allServices = JSON.parse(await getAllUsers());

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

          <div className="">{/* <NewServiceForm /> */}</div>
        </div>
        <Separator className="my-6" />
        <Card>
          <CardHeader>
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
