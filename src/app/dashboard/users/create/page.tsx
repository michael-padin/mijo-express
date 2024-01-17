import CreateUserForm from "../components/create/create-user";
import { Card, CardHeader } from "@/components/ui/card";

export default function CreateUserPage() {
  return (
    <div className=" space-y-6 p-5 pb-16 ">
      <div className="bg flex items-center justify-between space-y-0.5">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            Create User
          </h2>
          <p className="text-muted-foreground">Create user here</p>
        </div>

        <div className=""></div>
        {/* <Link
          href="/dashboard/users/create"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Create User
        </Link> */}
      </div>
      <div className="bg-background">
        <Card>
          <CardHeader>
            <CreateUserForm />
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
