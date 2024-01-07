import React from "react";
import { Card, CardContent } from "../ui/card";

import Placeholder from "../../assets/placeholder.jpg";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface IProviderInfo {
  profileImg: string;
  providerImgPreview: string;
  name: string;
  serviceTitle: string;
  price: number;
  id: string;
}

type ProviderCardProps = {
  provider: IProviderInfo;
};

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const { name, price, profileImg, providerImgPreview, serviceTitle } =
    provider;
  return (
    <Card className="w-[280px] overflow-hidden">
      <div className="w-full">
        <Image
          src={Placeholder}
          alt="mijo express logo"
          width={300}
          height={300}
          placeholder="blur"
          blurDataURL="data:image/jpeg"
        />
      </div>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="mt-4 flex items-center gap-2">
            <Avatar>
              <AvatarImage src="#" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>{name}</h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-sm font-semibold">{serviceTitle}</h1>
            <p className="text-sm font-semibold">{price.toString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;
