import { useEffect, useState } from 'react';
import './LedSignBoard.css';

const LedSignBoard = ({
	initialBusNumber,
	initialTopText,
	initialBottomText,
	upperHalfScrollSpeed,
	lowerHalfScrollSpeed,
	upperHalfScrollType,
	lowerHalfScrollType,
	side,
}) => {
	const { routeNumber, source, destination, via } = side;

	const [busNumber, setBusNumber] = useState();
	const [topText, setTopText] = useState();
	const [bottomText, setBottomText] = useState();
	const [topScrollSpeed, setTopScrollSpeed] = useState();
	const [bottomScrollSpeed, setBottomScrollSpeed] = useState();
	const [topScrollEnabled, setTopScrollEnabled] = useState(false);
	const [bottomScrollEnabled, setBottomScrollEnabled] = useState(false);

	useEffect(() => {
		console.log('====================================');
		console.log(routeNumber, source, destination, via);
		console.log('====================================');
		if (source.scrollType !== 'Fixed' && upperHalfScrollType !== 'Flashing') {
			setTopScrollEnabled(true);
		}
		if (via.scrollType !== 'Fixed' && lowerHalfScrollType !== 'Flashing') {
			setBottomScrollEnabled(true);
		}
		setBusNumber(routeNumber.text);
		setTopText(`${source.text} - ${destination.text}`);
		setBottomText(via.text);
		setTopScrollSpeed(source.scrollSpeed);
		setBottomScrollSpeed(via.scrollSpeed);
	}, [side]);

	// Convert speed value (1-10) to seconds (faster = fewer seconds)
	const convertSpeedToSeconds = (speed) => (10 - speed) * 2;

	// useEffect(() => {
	// 	if (upperHalfScrollType !== 'Fixed' && upperHalfScrollType !== 'Flashing') {
	// 		setTopScrollEnabled(true);
	// 	}
	// 	if (lowerHalfScrollType !== 'Fixed' && lowerHalfScrollType !== 'Flashing') {
	// 		setTopScrollEnabled(true);
	// 	}
	// }, [upperHalfScrollType, lowerHalfScrollType]);

	return (
		<div className="w-full mt-8">
			<div className="led-sign-board">
				{routeNumber.show && (
					<div className="left-half">
						<div className="led-display">{busNumber}</div>
					</div>
				)}
				<div className="right-half">
					{source.show && (
						<div className="top-section">
							<div
								className={`marquee ${!topScrollEnabled ? 'paused' : ''}`}
								style={{
									'--scroll-speed': `${topScrollSpeed}s`,
								}}
							>
								<span>{topText}</span>
							</div>
						</div>
					)}
					{via.show && (
						<div className="bottom-section">
							<div
								className={`marquee ${!bottomScrollEnabled ? 'paused' : ''}`}
								style={{
									'--scroll-speed': `${bottomScrollSpeed}s`,
								}}
							>
								<span>{bottomText}</span>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* <div className="controls">
                <div className="controls-row">
                    <div className="bus-number-section">
                        <h3>Bus Number</h3>
                        <div className="control-group">
                            <input
                                type="text"
                                value={busNumber}
                                onChange={(e) => setBusNumber(e.target.value)}
                                maxLength={4}
                            />
                        </div>
                    </div>
                    
                    <div className="message-controls">
                        <div className="control-section">
                            <h3>Top Message</h3>
                            <div className="control-group">
                                <label>Text:</label>
                                <input
                                    type="text"
                                    value={topText}
                                    onChange={(e) => setTopText(e.target.value)}
                                />
                            </div>
                            <div className="control-group">
                                <label>Speed:</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={topScrollSpeed}
                                    onChange={(e) => setTopScrollSpeed(Number(e.target.value))}
                                    disabled={!topScrollEnabled}
                                />
                                <span>{topScrollSpeed}</span>
                            </div>
                            <div className="control-group">
                                <label>Scroll:</label>
                                <input
                                    type="checkbox"
                                    checked={topScrollEnabled}
                                    onChange={(e) => setTopScrollEnabled(e.target.checked)}
                                />
                            </div>
                        </div>
                        
                        <div className="control-section">
                            <h3>Bottom Message</h3>
                            <div className="control-group">
                                <label>Text:</label>
                                <input
                                    type="text"
                                    value={bottomText}
                                    onChange={(e) => setBottomText(e.target.value)}
                                />
                            </div>
                            <div className="control-group">
                                <label>Speed:</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={bottomScrollSpeed}
                                    onChange={(e) => setBottomScrollSpeed(Number(e.target.value))}
                                    disabled={!bottomScrollEnabled}
                                />
                                <span>{bottomScrollSpeed}</span>
                            </div>
                            <div className="control-group">
                                <label>Scroll:</label>
                                <input
                                    type="checkbox"
                                    checked={bottomScrollEnabled}
                                    onChange={(e) => setBottomScrollEnabled(e.target.checked)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
		</div>
	);
};
export default LedSignBoard;
