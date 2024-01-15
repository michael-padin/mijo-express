import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Categories = ({ categories }: any) => {
  return (
    <div className="">
      {categories?.map((category: any) => (
        <Link
          key={category._id}
          className={buttonVariants({ variant: "link" })}
          href={`/dashboard/overview/categories/${category.slug}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
