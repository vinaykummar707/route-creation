import React from "react";
import RouteListItem from "./RouteListItem";

const RoutesPage = () => {
  return (
    <div className="h-screen w-screen bg-brown-200 flex flex-col">
      <div className="h-[55px] bg-white border-b"></div>
      <div className="flex-1 p-4 flex flex-col items-center">
        <div className="w-[800px] flex flex-col space-y-2">
          {[1, 3, 4].map((route) => (
            <RouteListItem key={route} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
