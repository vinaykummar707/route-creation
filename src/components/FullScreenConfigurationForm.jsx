import { useEffect, useState } from 'react';
import FullScreenBoard from './FullScreenBoard';

const ConfigurationForm = ({ route, onSettingsSave, initialData }) => {
	const [selectedOption, setSelectedOption] = useState('');

	const [formData, setFormData] = useState({
		text: 'Dummy',
		scrollType: 'Fixed',
		scrollSpeed: 0,
		position: 'Center',
	});

	const onFormDateChange = (field, value) => {
		setFormData((prev) => {
			const newData = { ...prev };

			newData[field] = value;
			return newData;
		});
	};
	
	const handleSelectionChange = (e) => setSelectedOption(e.target.value);

	useEffect(() => {
		let updatedText = '';
		if (selectedOption === 'routeNumber') {
			updatedText = route.routeNumber;
		} else if (selectedOption === 'sourceDestination') {
			updatedText = `${route.source} ${route.separation} ${route.destination}`;
		} else if (selectedOption === 'via') {
			updatedText = route.via;
		} else if (selectedOption === 'all') {
			updatedText = `${route.routeNumber} | ${route.source} ${route.separation} ${route.destination} | ${route.via}`;
		} else if (selectedOption === 'custom') {
			updatedText = ``;
		}
		onFormDateChange('text', updatedText);
	}, [selectedOption, route]);

	return (
		<div className="config-form w-full">
			<form className="grid grid-cols-3 gap-3">
				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900">
						Text Type
					</label>
					<select
						value={selectedOption}
						onChange={handleSelectionChange}
						className="border text-neutral-400 text-sm p-2 rounded-lg"
					>
						<option value="">Select an option</option>
						<option value="routeNumber">Route Number</option>
						<option value="sourceDestination">Source - Destination</option>
						<option value="via">Via</option>
						<option value="all">
							All (Route Number, Source-Destination, Via)
						</option>
						<option value="custom">Custom</option>
					</select>
				</div>

				{selectedOption === 'custom' && (
					<div className="flex flex-col gap-3">
						<label className="text-sm font-semibold text-neutral-900">
							Custom Text
						</label>
						<input
							value={formData.text}
							onChange={({ target }) => onFormDateChange('text', target.value)}
							className="border text-neutral-400 text-sm p-2 rounded-lg"
						/>
					</div>
				)}

				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900">
						Scroll Type
					</label>
					<select
						value={formData.scrollType}
						onChange={({ target }) =>
							onFormDateChange('scrollType', target.value)
						}
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
						Position
					</label>
					<select
						value={formData.position}
						onChange={({ target }) =>
							onFormDateChange('position', target.value)
						}
						className="border text-neutral-400 text-sm p-2 rounded-lg"
					>
						<option value="Left">Left</option>
						<option value="Right">Right</option>
						<option value="Center">Center</option>
					</select>
				</div>

				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900">
						Scroll Speed (seconds)
					</label>
					<input
						type="number"
						value={formData.scrollSpeed}
						onChange={({ target }) =>
							onFormDateChange('scrollSpeed', target.value)
						}
						min="0"
						placeholder="Enter speed"
						className="border text-neutral-400 text-sm p-2 rounded-lg"
					/>
				</div>
			</form>

			<div className="preview">
				<FullScreenBoard formData={formData} />
			</div>

			<button
				onClick={() => {
					onSettingsSave({ ...formData, boardFormatType: 'Fullscreen' });
				}}
				className="bg-neutral-900 text-sm p-2 text-white rounded-lg"
			>
				Update Display Settings
			</button>
		</div>
	);
};

export default ConfigurationForm;
