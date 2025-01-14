import { useEffect, useState } from "react";
import "./LedSignBoard.css";

const SideWithSingleTextBoard = ({
  text = "Dummy",
  sideText = "300",
  scrollType = "Fixed",
  scrollSpeed = 0,
}) => {
  // const { routeNumber, source, destination, via } = config[selectedTab];

  const [scrollEnabled, setScrollEnabled] = useState(scrollSpeed);

  useEffect(() => {
    if (scrollType === "Fixed" || scrollType === "Flashing") {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }
  }, [scrollType]);

  return (
    <div className="w-full mt-8">
      <div className="led-sign-board">
        <div className="left-half">
          <div className="led-display"> {sideText} </div>
        </div>
        <div className="right-half">
          <div className="bottom-section">
            <div
              className={`
                 ${scrollType === "Fixed" && "marquee"}
                ${scrollType === "Left To Right" && "marquee-left"}
                ${scrollType === "Right To Left" && "marquee"}
                
                            ${scrollType === "Flicker" && "flicker"} ${
                !scrollEnabled ? "paused" : ""
              }`}
              style={{
                "--scroll-speed": `${scrollSpeed}s`,
              }}
            >
              <span className="w-full">{text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideWithSingleTextBoard;
