import * as Tabs from "@radix-ui/react-tabs";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useEffect, useState } from "react";
import LedSignBoard from "./LedSignBoard";
import FullScreenBoard from "./FullScreenBoard";
import SideWithSingleTextBoard from "./SideWithSingleTextBoard";
import SideWithTwoHalfsBoard from "./SideWithTwoHalfsBoard";
const DisplaySettingsForm = ({ config, onFormUpdate }) => {
  const editableConfig = config;
  const boards = ["front", "side", "rear", "internal"];
  const fields = ["routeNumber", "source", "via"];
  const displayOptions = {
    scrollTypes: ["Left to Right", "Right to Left", "Fixed", "Flashing"],
    scrollSpeeds: 0,
    sizes: ["Full Screen", "Upper Half", "Lower Half", "side"],
    bitModes: ["8 bit", "10 bit", "12 bit", "14 bit"],
    languages: ["English", "Hindi", "Marathi"],
    show: ["true", "false"],
  };

  const [selectedTab, setSelectedTab] = useState("front");
  const [selectedField, setSelectedField] = useState("routeNumber");

  useEffect(() => {
    // console.log("rendered");
  });

  const DisplayConfigSection = ({ board, field }) => (
    <div className="">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* <div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900">
						Display Text
					</label>
					<input
						type="text"
						value={editableConfig[selectedTab][selectedField]['text']}
						onChange={(e) => onFormUpdate(board, field, 'text', e.target.value)}
						placeholder={`Enter ${field} text`}
						className="border text-neutral-400 text-sm p-2 rounded-lg"
					/>
				</div> */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-neutral-900">
            Scroll Type
          </label>
          <select
            defaultValue={config[selectedTab][selectedField]["scrollType"]}
            onChange={(e) =>
              onFormUpdate(board, field, "scrollType", e.target.value)
            }
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          >
            {displayOptions.scrollTypes.map((type) => (
              <option key={type} value={type} className="text-gray-900">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-neutral-900">
            Scroll Speed
          </label>

          <input
            defaultValue={config[selectedTab][selectedField]["scrollSpeed"]}
            type="number"
            onChange={(e) =>
              onFormUpdate(board, field, "scrollSpeed", e.target.value)
            }
            placeholder={`Enter ${field} text`}
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          />
          {/* <select
							value={displayConfig[board][field].scrollSpeed}
							onChange={(e) =>
								onFormUpdate(
									board,
									field,
									'scrollSpeed',
									e.target.value
								)
							}
							className="border text-neutral-400 text-sm p-2 rounded-lg"
						>
							{displayOptions.scrollSpeeds.map((speed) => (
								<option key={speed} value={speed} className="text-gray-900">
									{speed}
								</option>
							))}
						</select> */}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-neutral-900">Size</label>
          <select
            defaultValue={config[selectedTab][selectedField]["size"]}
            onChange={(e) => onFormUpdate(board, field, "size", e.target.value)}
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          >
            {displayOptions.sizes.map((size) => (
              <option key={size} value={size} className="text-gray-900">
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-neutral-900">
            Bit Mode
          </label>
          <select
            defaultValue={config[selectedTab][selectedField]["bitMode"]}
            onChange={(e) =>
              onFormUpdate(board, field, "bitMode", e.target.value)
            }
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          >
            {displayOptions.bitModes.map((mode) => (
              <option key={mode} value={mode} className="text-gray-900">
                {mode}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-neutral-900">
            Language
          </label>
          <select
            defaultValue={config[selectedTab][selectedField]["language"]}
            onChange={(e) =>
              onFormUpdate(board, field, "language", e.target.value)
            }
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          >
            {displayOptions.languages.map((lang) => (
              <option key={lang} value={lang} className="text-gray-900">
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-neutral-900">
            Show/Hide
          </label>
          <select
            defaultValue={config[selectedTab][selectedField]["show"]}
            onChange={(e) => onFormUpdate(board, field, "show", e.target.value)}
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          >
            {displayOptions.show.map((mode) => (
              <option key={mode} value={mode} className="text-gray-900">
                {mode}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
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

        {boards.map((board) => (
          <Tabs.Content key={board} value={board} className="outline-none ">
            {/* <div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-4">
									{board.charAt(0).toUpperCase() + board.slice(1)} Board
									Configuration
								</h3>
							</div> */}

            <div className="w-full">
              <RadioGroup.Root
                // value={selectedFields[board]}
                defaultValue={selectedField}
                onValueChange={(value) => setSelectedField(value)}
                className="flex flex-wrap gap-4 mb-6"
              >
                {fields.map((field) => (
                  <div key={field} className="flex items-center">
                    <RadioGroup.Item
                      value={field}
                      id={`${board}-${field}`}
                      className="w-4 h-4 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white" />
                    </RadioGroup.Item>
                    <label
                      htmlFor={`${board}-${field}`}
                      className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>
            <DisplayConfigSection board={selectedTab} field={selectedField} />
            {/* <FullScreenBoard
              text="300A - MHD - UPL"
              scrollType="Left To Right"
              scrollSpeed={5}
            />
            <FullScreenBoard
              text="300A - MHD - UPL"
              scrollType="Right To Left"
              scrollSpeed={5}
            />
            <FullScreenBoard
              text="300A - MHD - UPL"
              scrollType="Flicker"
              scrollSpeed={0.5}
            />
            <FullScreenBoard
              text="300A - MHD - UPL"
              scrollType="Fixed"
              scrollSpeed={5}
            /> */}
            <FullScreenBoard
              text="MEHDIPATNAM - UPPAL"
              scrollType="Fixed"
              scrollSpeed={5}
            />
            <SideWithSingleTextBoard
              sideText="300"
              text="MEHDIPATNAM - UPPAL"
              scrollType="Fixed"
              scrollSpeed={5}
            />

            <SideWithTwoHalfsBoard
              bottomScrollType="Fixed"
              bottomText="Via Aramghar, LB Nagar"
              topScrollType="Fixed"
              topText="Mehdipatnam - uppal"
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {/* <button
				onClick={saveDisplayConfig}
				className="bg-neutral-900 text-sm p-2 text-white rounded-lg"
			>
				Save Language Settings
			</button> */}
    </div>
  );
};

export default DisplaySettingsForm;
