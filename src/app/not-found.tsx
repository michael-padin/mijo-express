import React from "react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-48">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-7xl font-bold text-primary">404</div>
          <div className="mt-10 text-3xl font-bold md:text-5xl lg:text-6xl xl:text-7xl">
            This page does not exist
          </div>
          <div className="mt-8 text-sm font-medium text-muted-foreground md:text-xl lg:text-2xl">
            The page you are looking for could not be found.
          </div>
        </div>
      </div>
    </div>
  );
}
