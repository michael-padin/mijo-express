import StarRating from "./star-rating";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstTwoLetters } from "@/lib/utils";

type IReview = {
  _id: string;
  providerId: string;
  customerId: string;
  customerName?: string;
  customerProfileImg?: string;
  customerAddress?: string;
  comment?: string;
  rating: number;
  createdAt?: Date;
};

type ReviewCardProps = {
  reviewInfo: IReview;
};

const ReviewCard = ({ reviewInfo }: ReviewCardProps) => {
  const {
    customerName,
    customerProfileImg,
    customerAddress,
    comment,
    rating,
    createdAt,
  } = reviewInfo;
  return (
    <div className="">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`${customerProfileImg}`} alt="@shadcn" />
          <AvatarFallback>
            {capitalizeFirstTwoLetters(customerName || "N/A")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="|">
            <p className="font-medium">{customerName}</p>
            <time
              dateTime={createdAt?.toString()}
              className="block text-xs text-gray-500 dark:text-gray-400"
            >
              {customerAddress}
            </time>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="inline-flex items-center gap-1 text-sm">
          <StarRating rating={rating} />
          <span className="font-semibold">{rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-muted-foreground">{comment}</p>
        <Separator className="my-4" />
      </div>
    </div>
  );
};

export default ReviewCard;
