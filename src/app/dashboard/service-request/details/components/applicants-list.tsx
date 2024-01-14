import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ApplicantsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>List of Applicants</CardTitle>
        <CardDescription>
          This is a list of applicants for this service request.
        </CardDescription>
        <Separator className="my-6" />
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
