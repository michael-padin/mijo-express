import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import React from "react";

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<StarFilledIcon key={i} color="gold" />);
    } else {
      stars.push(<StarIcon key={i} />);
    }
  }

  return <div className="flex">{stars}</div>;
};

export default StarRating;
