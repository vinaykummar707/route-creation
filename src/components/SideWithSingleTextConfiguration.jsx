import { useEffect, useState } from 'react';
import SideWithSingleTextBoard from './SideWithSingleTextBoard';

const SideWithSingleTextBoardConfigurationForm = ({ route }) => {
	const [text, setText] = useState('');
	const [sideText, setSideText] = useState('');
	const [scrollType, setScrollType] = useState('Fixed');
	const [scrollSpeed, setScrollSpeed] = useState(0);
	const [selectedTextOption, setSelectedTextOption] = useState('');
	const [selectedSideTextOption, setSelectedSideTextOption] = useState('');

	const handleScrollTypeChange = (e) => setScrollType(e.target.value);
	const handleScrollSpeedChange = (e) => setScrollSpeed(Number(e.target.value));
	const handleTextSelectionChange = (e) =>
		setSelectedTextOption(e.target.value);
	const handleSideTextSelectionChange = (e) =>
		setSelectedSideTextOption(e.target.value);

	// Update `text` based on selected dropdown option
	useEffect(() => {
		let updatedText = '';
		if (selectedTextOption === 'routeNumber') {
			updatedText = route.routeNumber;
		} else if (selectedTextOption === 'sourceDestination') {
			updatedText = `${route.source} ${route.separation} ${route.destination}`;
		} else if (selectedTextOption === 'via') {
			updatedText = route.via;
		} else if (selectedTextOption === 'all') {
			updatedText = `${route.routeNumber} | ${route.source} ${route.separation} ${route.destination} | ${route.via}`;
		}
		setText(updatedText);
	}, [selectedTextOption, route]);

	// Update `sideText` based on selected dropdown option
	useEffect(() => {
		let updatedSideText = '';
		if (selectedSideTextOption === 'routeNumber') {
			updatedSideText = route.routeNumber;
		} else if (selectedSideTextOption === 'sourceDestination') {
			updatedSideText = `${route.source} ${route.separation} ${route.destination}`;
		} else if (selectedSideTextOption === 'via') {
			updatedSideText = route.via;
		}
		setSideText(updatedSideText);
	}, [selectedSideTextOption, route]);

	return (
		<div className="config-form w-full">
			<form className="grid grid-cols-3 gap-3">
				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900">
						Main Text:
					</label>
					<select
						value={selectedTextOption}
						onChange={handleTextSelectionChange}
						className="border text-neutral-400 text-sm p-2 rounded-lg"
					>
						<option value="">Select an option</option>
						<option value="routeNumber">Route Number</option>
						<option value="sourceDestination">Source - Destination</option>
						<option value="via">Via</option>
						<option value="all">
							All (Route Number, Source-Destination, Via)
						</option>
					</select>
				</div>
				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900">
						Side Text:
					</label>
					<select
						value={selectedSideTextOption}
						onChange={handleSideTextSelectionChange}
						className="border text-neutral-400 text-sm p-2 rounded-lg"
					>
						<option value="">Select an option</option>
						<option value="routeNumber">Route Number</option>
						<option value="sourceDestination">Source - Destination</option>
						<option value="via">Via</option>
					</select>
				</div>
				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900">
						Scroll Type:
					</label>
					<select
						value={scrollType}
						onChange={handleScrollTypeChange}
						className="border text-neutral-400 text-sm p-2 rounded-lg"
					>
						<option value="Fixed">Fixed</option>
						<option value="Left To Right">Left To Right</option>
						<option value="Right To Left">Right To Left</option>
						<option value="Flicker">Flicker</option>
					</select>
				</div>
				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900">
						Scroll Speed (seconds):
					</label>
					<input
						type="number"
						value={scrollSpeed}
						onChange={handleScrollSpeedChange}
						className="border text-neutral-400 text-sm p-2 rounded-lg"
						min="0"
						placeholder="Enter speed"
					/>
				</div>
			</form>

			{/* <div>
				<button
					type="button"
					onClick={() => {
						const config = {
							text,
							sideText,
							scrollType,
							scrollSpeed,
						};
						console.log('Configuration JSON:', JSON.stringify(config, null, 2));
						alert(`Configuration JSON:\n${JSON.stringify(config, null, 2)}`);
					}}
				>
					Generate JSON
				</button>
			</div> */}

			<div className="preview">
				<SideWithSingleTextBoard
					text={text}
					sideText={sideText}
					scrollType={scrollType}
					scrollSpeed={scrollSpeed}
				/>
			</div>
		</div>
	);
};
export default SideWithSingleTextBoardConfigurationForm;
