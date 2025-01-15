import * as Tabs from "@radix-ui/react-tabs";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useEffect, useState } from "react";
import LedSignBoard from "./LedSignBoard";
import DisplaySettingsForm from "./DisplaySettingsForm";
import ConfigurationForm from "./FullScreenConfigurationForm";
import SideWithSingleTextBoardConfigurationForm from "./SideWithSingleTextConfiguration";
import SideWithTwoHalfsBoard from "./SideWithTwoHalfsBoard";
import axios from "axios";

const RouteDisplaySettings = ({ route, displayConfig, handleConfigChange }) => {
  const [selectedBoardType, setSelectedBoardType] = useState("Fullscreen");

  const boards = ["front", "side", "rear", "internal"];
  const [selectedTab, setSelectedTab] = useState("front");
  const displayOptions = {
    scrollTypes: ["Left to Right", "Right to Left", "Fixed", "Flashing"],
    scrollSpeeds: 0,
    boardDisplayFormats: ["Fullscreen"],
  };




  return (
    <div className="flex flex-col gap-4 px-6 py-6 shadow-sm bg-white w-full items-start rounded-lg border">
      <h1 className="text-lg text-neutral-800 font-bold">
        Route Display Settings
      </h1>

      <Tabs.Root
        onValueChange={(v) => setSelectedTab(v)}
        defaultValue={selectedTab}
        className=" w-full"
      >
        <div className="border-b border-gray-200 mb-6">
          <Tabs.List className="flex space-x-8" aria-label="Display Boards">
            {boards.map((board) => (
              <Tabs.Trigger
                key={board}
                value={board}
                className="px-1 py-2 text-sm bg-white font-medium text-gray-500 hover:text-gray-800 focus:outline-none data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium"
              >
                <div className="flex items-center space-x-2">
                  <span>
                    {board.charAt(0).toUpperCase() + board.slice(1)} Display
                  </span>
                </div>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
        <Tabs.Content value={selectedTab}>
          <div className="flex mt-4 flex-col gap-3">
            <label
              className="text-sm font-semibold text-neutral-900"
              htmlFor=""
            >
              Select Board Format
            </label>
            <select
              name="depotId"
              className="border text-neutral-400 text-sm font-normal p-2 rounded-lg"
              required
              onChange={({ target }) => {
                setSelectedBoardType(target.value);
              }}
            >
              {displayOptions.boardDisplayFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            {selectedBoardType === "Fullscreen" && (
              <ConfigurationForm
                handleSave={handleConfigChange}
                route={route}
                selectedTab={selectedTab}
                displayConfig={displayConfig}
              />
            )}
          </div>
        </Tabs.Content>
      </Tabs.Root>

      {/* <ConfigurationForm route={selectedRoute} />
			<SideWithSingleTextBoardConfigurationForm route={selectedRoute} />
			<SideWithTwoHalfsBoard /> */}

     
    </div>
  );
};

export default RouteDisplaySettings;
