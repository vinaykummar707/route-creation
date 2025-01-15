import { useEffect, useState } from "react";
import { getDepos } from "../services/api";

const BusRoutes = ({ route, onRouteChange }) => {
  return (
    <div className="">
      <div className="flex flex-col gap-4 p-4 bg-white w-full items-start rounded-lg border">
        <h1 className="text-lg font-bold">Create Route</h1>
        <div className=" grid grid-cols-3  w-full gap-4 ">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-500" htmlFor="">
              Route Number
            </label>
            <input
              type="text"
              name="routeNumber"
              value={route.routeNumber}
              onChange={onRouteChange}
              className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-500" htmlFor="">
              Source
            </label>
            <input
              type="text"
              name="source"
              value={route.source}
              onChange={onRouteChange}
              className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-500" htmlFor="">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={route.destination}
              onChange={onRouteChange}
              className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-500" htmlFor="">
              separation
            </label>
            <input
              type="text"
              name="separation"
              value={route.separation}
              onChange={onRouteChange}
              className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-500" htmlFor="">
              Via
            </label>
            <input
              type="text"
              name="via"
              value={route.via}
              onChange={onRouteChange}
              className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusRoutes;
