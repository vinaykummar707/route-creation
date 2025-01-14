import { useEffect, useState } from "react";
import "./LedSignBoard.css";

const SideWithTwoHalfsBoard = ({
  topText = "Dummy",
  bottomText = "Dummy",
  sideText = "300",
  topScrollType = "Flicker",
  topScrollSpeed = 1,
  bottomScrollType = "Right To Left",
  bottomScrollSpeed = 10,
}) => {
  // const { routeNumber, source, destination, via } = config[selectedTab];

  const [topScrollEnabled, setTopScrollEnabled] = useState();
  const [bottomScrollEnabled, setBottomScrollEnabled] = useState();

  useEffect(() => {
    if (topScrollType === "Fixed" || topScrollType === "Flashing") {
      setTopScrollEnabled(false);
    } else {
      setTopScrollEnabled(true);
    }

    if (bottomScrollType === "Fixed" || bottomScrollType === "Flashing") {
      setBottomScrollEnabled(false);
    } else {
      setBottomScrollEnabled(true);
    }
  }, [topScrollType, bottomScrollType]);

  return (
    <div className="w-full mt-8">
      <div className="led-sign-board">
        <div className="left-half">
          <div className="led-display"> {sideText} </div>
        </div>
        <div className="right-half">
          <div className="top-section">
            <div
              className={`
                 ${topScrollType === "Fixed" && "marquee"}
                ${topScrollType === "Left To Right" && "marquee-left"}
                ${topScrollType === "Right To Left" && "marquee"}
                
                            ${topScrollType === "Flicker" && "flicker"} ${
                !topScrollEnabled ? "paused" : ""
              }`}
              style={{
                "--scroll-speed": `${topScrollSpeed}s`,
              }}
            >
              <span className="w-full">{topText}</span>
            </div>
          </div>
          <div className="bottom-section">
            <div
              className={`
                 ${bottomScrollType === "Fixed" && "marquee"}
                ${bottomScrollType === "Left To Right" && "marquee-left"}
                ${bottomScrollType === "Right To Left" && "marquee"}
                
                            ${bottomScrollType === "Flicker" && "flicker"} ${
                !bottomScrollEnabled ? "paused" : ""
              }`}
              style={{
                "--scroll-speed": `${bottomScrollSpeed}s`,
              }}
            >
              <span className="w-full">{bottomText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideWithTwoHalfsBoard;
