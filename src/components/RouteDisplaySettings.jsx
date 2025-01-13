import * as Tabs from '@radix-ui/react-tabs';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useEffect, useState } from 'react';
import LedSignBoard from './LedSignBoard';

const RouteDisplaySettings = () => {
	const [routes, setRoutes] = useState([
		{
			id: 20,
			routeNumber: '300',
			source: 'mehdipatnam',
			destination: 'uppal',
			via: 'aramghar,lbnagar',
		},
		{
			id: 21,
			name: '300/A',
		},
	]);
	const [depots, setDepots] = useState([
		{
			id: 31,
			name: 'Mahabubnagar',
		},
		{
			id: 30,
			name: 'Uppal',
		},
	]);
	const [selectedDepot, setSelectedDepot] = useState({
		id: 31,
		name: 'Mahabubnagar',
	});
	const [selectedRoute, setSelectedRoute] = useState({
		id: 20,
		routeNumber: '300A',
		source: 'mehdipatnam',
		destination: 'uppal',
		via: 'via Aramghar, LB Nagar, Habsiguda',
		separation: '-',
	});

	const boards = ['front', 'side', 'rear', 'internal'];
	const fields = ['routeNumber', 'source', 'destination', 'via'];

	const displayOptions = {
		scrollTypes: ['Left to Right', 'Right to Left', 'Fixed', 'Flashing'],
		scrollSpeeds: 0,
		sizes: ['Full Screen', 'Upper Half', 'Lower Half'],
		bitModes: ['8 bit', '10 bit', '12 bit', '14 bit'],
		languages: ['English', 'Hindi', 'Marathi'],
	};

	const initialBoardConfig = {
		scrollType: 'Fixedw',
		scrollSpeed: 24,
		size: 'Full Screen',
		bitMode: '8 bit',
		languageId: 0,
		text: '',
		show: false,
	};

	const sideBoardConfig = {
		scrollType: 'Fixedw',
		scrollSpeed: 24,
		size: 'Full Screen',
		bitMode: '8 bit',
		languageId: 0,
		text: '',
		show: true,
	};

	const [displayConfig, setDisplayConfig] = useState({
		front: {
			routeNumber: { ...initialBoardConfig },
			source: { ...initialBoardConfig },
			destination: { ...initialBoardConfig },
			via: { ...initialBoardConfig },
		},
		side: {
			routeNumber: { ...initialBoardConfig, show: true },
			source: { ...initialBoardConfig, show: false },
			destination: { ...initialBoardConfig },
			via: { ...initialBoardConfig, show: true, scrollType: 'Fixeds' },
		},
		rear: {
			routeNumber: { ...initialBoardConfig },
			source: { ...initialBoardConfig },
			destination: { ...initialBoardConfig },
			via: { ...initialBoardConfig },
		},
		internal: {
			routeNumber: { ...initialBoardConfig },
			source: { ...initialBoardConfig },
			destination: { ...initialBoardConfig },
			via: { ...initialBoardConfig },
		},
	});

	const handleDisplayConfigChange = (board, field, configType, value) => {
		console.log('====================================');
		console.log(board, field, configType, value);
		console.log('====================================');
		setDisplayConfig((prev) => ({
			...prev,
			[board]: {
				...prev[board],
				[field]: {
					...prev[board][field],
					[configType]: value,
				},
			},
		}));
	};

	const handleScrollTypeChange = (board, value) => {
		setScrollTypes((prev) => ({ ...prev, [board]: value }));
	};

	const [selectedFields, setSelectedFields] = useState({
		front: 'routeNumber',
		side: 'routeNumber',
		rear: 'routeNumber',
		internal: 'routeNumber',
	});

	const [scrollTypes, setScrollTypes] = useState({
		front: initialBoardConfig.scrollType,
		side: initialBoardConfig.scrollType,
		rear: initialBoardConfig.scrollType,
		internal: initialBoardConfig.scrollType,
	});

	const saveDisplayConfig = () => {
		const payload = {
			routeId: selectedRoute.id,
			depotId: selectedDepot.id,
			displayConfig,
		};
		console.log('====================================');
		console.log(payload);
		console.log('====================================');
	};

	useEffect(() => {
		setDisplayConfig((prev) => {
			const newConfig = { ...prev };
			boards.forEach((board) => {
				newConfig[board].routeNumber.text = selectedRoute.routeNumber;
				newConfig[board].source.text = selectedRoute.source;
				newConfig[board].destination.text = selectedRoute.destination;
				newConfig[board].via.text = selectedRoute.via;
			});
			return newConfig;
		});

		console.log('====================================');
		console.log(displayConfig);
		console.log('====================================');
	}, [selectedRoute]);

	const DisplayConfigSection = ({ board, field }) => (
		<div className="">
			<div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900">
						Display Text
					</label>
					<input
						type="text"
						// defaultValue={selectedRoute[field]}
						defaultValue={displayConfig[board][field].text}
						onChange={(e) =>
							handleDisplayConfigChange(board, field, 'text', e.target.value)
						}
						placeholder={`Enter ${field} text`}
						className="border text-neutral-400 text-sm p-2 rounded-lg"
					/>
				</div>
				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900">
						Scroll Type
					</label>
					<select
						value={scrollTypes[board]}
						onChange={(e) =>
							handleDisplayConfigChange(
								board,
								field,
								'scrollType',
								e.target.value
							)
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
						type="number"
						defaultValue={displayConfig[board][field].scrollSpeed}
						onChange={(e) =>
							handleDisplayConfigChange(
								board,
								field,
								'scrollSpeed',
								e.target.value
							)
						}
						placeholder={`Enter ${field} text`}
						className="border text-neutral-400 text-sm p-2 rounded-lg"
					/>
					{/* <select
							value={displayConfig[board][field].scrollSpeed}
							onChange={(e) =>
								handleDisplayConfigChange(
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
						value={displayConfig[board][field].size}
						onChange={(e) =>
							handleDisplayConfigChange(board, field, 'size', e.target.value)
						}
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
						value={displayConfig[board][field].bitMode}
						onChange={(e) =>
							handleDisplayConfigChange(board, field, 'bitMode', e.target.value)
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
						value={displayConfig[board][field].language}
						onChange={(e) =>
							handleDisplayConfigChange(
								board,
								field,
								'language',
								e.target.value
							)
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
			</div>
		</div>
	);

	return (
		<div className="flex flex-col gap-4 px-6 py-6 shadow-sm bg-white w-full items-start rounded-lg border">
			<h1 className="text-lg text-neutral-800 font-bold">
				Route Display Settings
			</h1>
			<div className=" grid sm:grid-cols-2  md:grid-cols-4 w-full gap-4 ">
				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900" htmlFor="">
						Depot
					</label>
					<select
						name="depotId"
						className="border text-neutral-400 text-sm font-normal p-2 rounded-lg"
						required
						onChange={({ target }) => {
							console.log(target.value);
							setSelectedDepot(JSON.parse(target.value));
						}}
					>
						{depots.map((depot) => (
							<option key={depot.id} value={JSON.stringify(depot)}>
								{depot.name}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col gap-3">
					<label className="text-sm font-semibold text-neutral-900" htmlFor="">
						Route
					</label>
					<select
						name="depotId"
						className="border text-neutral-400 text-sm p-2 rounded-lg"
						required
						onChange={({ target }) =>
							setSelectedRoute(JSON.parse(target.value))
						}
					>
						{routes.map((route) => (
							<option key={route.id} value={JSON.stringify(route)}>
								{route.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<LedSignBoard side={displayConfig.side} />
		</div>
	);
};

export default RouteDisplaySettings;
