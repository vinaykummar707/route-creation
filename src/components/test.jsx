import { memo, useEffect, useState } from "react";
import FullScreenBoard from "./FullScreenBoard";
import SideWithSingleTextBoard from "./SideWithSingleTextBoard";
import SideWithTwoTextsBoard from "./SideWithTwoHalfsBoard";

const Bus = memo(({ route, onUpdateDisplaySettings }) => {
  const boardFormatTypes = [
    "Fullscreen",
    "sideWithSingleText",
    "sideWithTwoTexts",
  ];

  useEffect(() => {
    console.log("rendered bus");
  }, []);

  const defaultConfig = (boardFormatType) => {
    switch (boardFormatType) {
      case "Fullscreen":
        return {
          boardFormatType: "Fullscreen",
          text: `${route.source} ${route.separation} ${route.destination}`,
          scrollType: "Fixed",
          scrollSpeed: 0,
          position: "center",
        };
      case "sideWithSingleText":
        return {
          boardFormatType: "sideWithSingleText",
          sideText: route.routeNumber,
          text: `${route.source} ${route.separation} ${route.destination}`,
          scrollType: "Fixed",
          scrollSpeed: 0,
          position: "center",
        };
      case "sideWithTwoTexts":
        return {
          boardFormatType: "sideWithTwoTexts",
          sideText: route.routeNumber,
          upperHalfText: `${route.source} ${route.separation} ${route.destination}`,
          upperHalfScrollType: "Fixed",
          upperHalfScrollSpeed: 0,
          upperHalfPosition: "center",
          lowerHalfText: route.via,
          lowerHalfScrollType: "Fixed",
          lowerHalfScrollSpeed: 0,
          lowerHalfPosition: "center",
        };
      default:
        return {};
    }
  };
  const BusBoardConfigurator = () => {
    const [config, setConfig] = useState({
      front: defaultConfig("Fullscreen"),
      side: defaultConfig("Fullscreen"),
      rear: defaultConfig("Fullscreen"),
      internal: defaultConfig("Fullscreen"),
    });

    const handleChange = (side, key, value) => {
      setConfig((prev) => {
        if (key === "boardFormatType") {
          return {
            ...prev,
            [side]: defaultConfig(value), // Reset config for the new board format type
          };
        }
        return {
          ...prev,
          [side]: {
            ...prev[side],
            [key]: value,
          },
        };
      });
    };

    return (
      <div className="flex flex-col gap-4 px-6 py-6 shadow-sm bg-white w-full items-start rounded-lg border">
        <h1 className="text-lg text-neutral-800 font-bold">
          Route Display Settings
        </h1>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {Object.keys(config).map((side) => (
            <div
              className="flex flex-col bg-gray-100 p-3 rounded-lg border gap-2"
              key={side}
            >
              <h3 className="text-md font-bold">
                {side.toUpperCase()} DISPLAY
              </h3>
              <select
                value={config[side].boardFormatType}
                onChange={(e) =>
                  handleChange(side, "boardFormatType", e.target.value)
                }
                className="border text-neutral-400 text-sm p-2 rounded-lg"
              >
                {boardFormatTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <DisplayForm
                config={config[side]}
                onConfigChange={(key, value) => handleChange(side, key, value)}
              />

              {config[side].boardFormatType === "Fullscreen" && (
                <FullScreenBoard formData={config[side]} />
              )}

              {config[side].boardFormatType === "sideWithSingleText" && (
                <SideWithSingleTextBoard formData={config[side]} />
              )}

              {config[side].boardFormatType === "sideWithTwoTexts" && (
                <SideWithTwoTextsBoard formData={config[side]} />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            onUpdateDisplaySettings(config);
          }}
          className="bg-neutral-900 text-sm p-2 text-white rounded-lg"
        >
          Update Display Settings
        </button>
        {/* <JsonOutput config={config} /> */}
      </div>
    );
  };
  const DisplayForm = ({ config, onConfigChange }) => {
    const { boardFormatType } = config;

    const updateConfig = (key, value) => {
      onConfigChange(key, value);
    };

    if (boardFormatType === "Fullscreen") {
      return (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Text"
              value={config.text || ""}
              onChange={(e) => updateConfig("text", e.target.value)}
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            />
            <select
              value={config.scrollType || "Fixed"}
              onChange={(e) => updateConfig("scrollType", e.target.value)}
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            >
              <option value="Fixed">Fixed</option>
              <option value="Left To Right">Left to Right</option>
              <option value="Right To Left">Right to Left</option>
              <option value="Flicker">Flicker</option>
            </select>
            <input
              type="number"
              placeholder="Scroll Speed"
              value={config.scrollSpeed || 0}
              onChange={(e) =>
                updateConfig("scrollSpeed", Number(e.target.value))
              }
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            />
            <select
              value={config.position || "center"}
              onChange={(e) => updateConfig("position", e.target.value)}
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            >
              <option value="Left">Left</option>
              <option value="Center">Center</option>
              <option value="Right">Right</option>
            </select>
          </div>
        </div>
      );
    } else if (boardFormatType === "sideWithSingleText") {
      return (
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Side Text"
            value={config.sideText || ""}
            onChange={(e) => updateConfig("sideText", e.target.value)}
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Text"
            value={config.text || ""}
            onChange={(e) => updateConfig("text", e.target.value)}
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          />
          <select
            value={config.scrollType || "Fixed"}
            onChange={(e) => updateConfig("scrollType", e.target.value)}
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          >
            <option value="Fixed">Fixed</option>
            <option value="Left To Right">Left to Right</option>
            <option value="Right To Left">Right to Left</option>
            <option value="Flicker">Flicker</option>
          </select>
          <input
            type="number"
            placeholder="Scroll Speed"
            value={config.scrollSpeed || 0}
            onChange={(e) =>
              updateConfig("scrollSpeed", Number(e.target.value))
            }
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          />
          <select
            value={config.position || "center"}
            onChange={(e) => updateConfig("position", e.target.value)}
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          >
            <option value="Left">Left</option>
            <option value="Center">Center</option>
            <option value="Right">Right</option>
          </select>
        </div>
      );
    } else if (boardFormatType === "sideWithTwoTexts") {
      return (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Side Text"
            value={config.sideText || ""}
            onChange={(e) => updateConfig("sideText", e.target.value)}
            className="border text-neutral-400 text-sm p-2 rounded-lg"
          />
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Upper Half Text"
              value={config.upperHalfText || ""}
              onChange={(e) => updateConfig("upperHalfText", e.target.value)}
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            />
            <select
              value={config.upperHalfScrollType || "Fixed"}
              onChange={(e) =>
                updateConfig("upperHalfScrollType", e.target.value)
              }
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            >
              <option value="Fixed">Fixed</option>
              <option value="Left To Right">Left to Right</option>
              <option value="Right To Left">Right to Left</option>
              <option value="Flicker">Flicker</option>
            </select>
            <input
              type="number"
              placeholder="Upper Half Scroll Speed"
              value={config.upperHalfScrollSpeed || 0}
              onChange={(e) =>
                updateConfig("upperHalfScrollSpeed", Number(e.target.value))
              }
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            />
            <select
              value={config.upperHalfPosition || "top"}
              onChange={(e) =>
                updateConfig("upperHalfPosition", e.target.value)
              }
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            >
              <option value="Left">Left</option>
              <option value="Center">Center</option>
              <option value="Right">Right</option>
            </select>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Lower Half Text"
              value={config.lowerHalfText || ""}
              onChange={(e) => updateConfig("lowerHalfText", e.target.value)}
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            />
            <select
              value={config.lowerHalfScrollType || "Fixed"}
              onChange={(e) =>
                updateConfig("lowerHalfScrollType", e.target.value)
              }
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            >
              <option value="Fixed">Fixed</option>
              <option value="Left To Right">Left to Right</option>
              <option value="Right To Left">Right to Left</option>
              <option value="Flicker">Flicker</option>
            </select>
            <input
              type="number"
              placeholder="Lower Half Scroll Speed"
              value={config.lowerHalfScrollSpeed || 0}
              onChange={(e) =>
                updateConfig("lowerHalfScrollSpeed", Number(e.target.value))
              }
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            />
            <select
              value={config.lowerHalfPosition || "bottom"}
              onChange={(e) =>
                updateConfig("lowerHalfPosition", e.target.value)
              }
              className="border text-neutral-400 text-sm p-2 rounded-lg"
            >
              <option value="Left">Left</option>
              <option value="Center">Center</option>
              <option value="Right">Right</option>
            </select>
          </div>
        </div>
      );
    }

    return null;
  };

  const JsonOutput = ({ config }) => {
    return (
      <div>
        <h2>Final Config JSON</h2>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>
    );
  };

  return <BusBoardConfigurator />;
});
Bus.displayName = "Bus";
export default Bus;
