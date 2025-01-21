import React from "react";

const RouteListItem = () => {
  return (
    <div className="flex  p-4 border rounded-xl justify-between  bg-neutral-100  items-center">
      <div className="">
        <div className="flex flex-col space-y-0.5">
          <h1 className="text-sm font-semibold">Koraput - Deomali</h1>
          <p className="text-neutral-400 text-xs font-light">
            Via: Behrampur, Jayorer
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="text-xs bg-neutral-900 text-white px-3 h-9 rounded-xl">
          View Route
        </button>
        {/* <button className="text-xs border border-neutral-300 px-3 h-9 rounded-xl">
          Start Simulation
        </button> */}
        <button className="text-xs font-medium border border-neutral-300 bg-white px-3 h-9 rounded-xl">
          Edit Route
        </button>
        {/* <button className="text-xs font-medium text-red-600 hover:bg-red-50 border border-red-600 px-3 h-9 rounded-xl">
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default RouteListItem;
