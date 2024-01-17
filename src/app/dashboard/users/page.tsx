import { authConfig } from "@/lib/auth.config";
import { getAllUsers } from "@/lib/data";
import { Briefcase, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { DataTable as AdminDataTable } from "./components/admin/data-table";
import { Separator } from "@/components/ui/separator";
import { serviceColumns as adminServiceColumns } from "./components/admin/user-columns";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function UsersPage() {
  const session = await getServerSession(authConfig);
  const { role } = session?.user || {};
  const allServices = JSON.parse(await getAllUsers());

  return (
    <div>
      <div className=" space-y-6 p-5 pb-16 ">
        <div className="flex items-center justify-between space-y-0.5">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Users />
              Users
            </h2>
            <p className="text-muted-foreground">
              This page displays a list of users.
            </p>
          </div>

          <div className=""></div>
          <Link
            href="/dashboard/users/create"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Create User
          </Link>
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
