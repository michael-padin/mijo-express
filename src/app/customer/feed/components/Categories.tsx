import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Categories = ({ categories }: any) => {
  return (
    <div className="">
      {categories?.map((category) => (
        <Link
          key={category._id}
          className={buttonVariants({ variant: "link" })}
          href={`${category.slug}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
