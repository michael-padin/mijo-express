import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type AppReviewCardProps = {
  profileImg: string;
  fullName: string;
  address: string;
  description: string;
  createdAt: Date;
};

export default function AppReviewCard({
  profileImg,
  fullName,
  address,
  description,
  createdAt,
}: AppReviewCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col">
          <div className="h-full">
            <div className="mt-4 flex items-center gap-2">
              <Avatar>
                <AvatarImage src={profileImg} alt="@shadcn" />
                <AvatarFallback>
                  {fullName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="">
                <div className="font-medium dark:text-white">
                  <p>
                    {fullName}
                    <time
                      dateTime={createdAt.toString()}
                      className="block text-xs text-gray-500 dark:text-gray-400"
                    >
                      {address}
                    </time>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-4 ">
            <div className="h-24">
              <span className="text-xs text-muted-foreground">Review</span>
              <p className="text-sm ">{`${description}`}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
