import * as Tabs from '@radix-ui/react-tabs';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useEffect, useState } from 'react';
import LedSignBoard from './LedSignBoard';
import DisplaySettingsForm from './DisplaySettingsForm';

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
			routeNumber: '500',
			source: 'shamshabad',
			destination: 'mgbs',
			via: 'aramghar',
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
		scrollType: 'Fixed',
		scrollSpeed: 24,
		size: 'Full Screen',
		bitMode: '8 bit',
		languageId: 0,
		text: '',
		show: 'false',
	};

	const [displayConfig, setDisplayConfig] = useState({
		front: {
			routeNumber: { ...initialBoardConfig },
			source: { ...initialBoardConfig },
			destination: { ...initialBoardConfig },
			via: { ...initialBoardConfig },
		},
		side: {
			routeNumber: { ...initialBoardConfig },
			source: { ...initialBoardConfig },
			destination: { ...initialBoardConfig },
			via: { ...initialBoardConfig },
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
	}, [selectedRoute]);

	const onRouteChange = () => {
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
	};

	const onConfigChange = (board, field, key, value) => {
		console.log('====================================');
		console.log('====================================');
		setDisplayConfig((prev) => ({
			...prev,
			[board]: {
				...prev[board],
				[field]: {
					...prev[board][field],
					[key]: value,
				},
			},
		}));
	};

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
						onChange={({ target }) => {
							setSelectedRoute(JSON.parse(target.value));
							onRouteChange();
						}}
					>
						{routes.map((route) => (
							<option key={route.id} value={JSON.stringify(route)}>
								{route.routeNumber}
							</option>
						))}
					</select>
				</div>
			</div>

			<DisplaySettingsForm
				onFormUpdate={onConfigChange}
				config={displayConfig}
			/>
		</div>
	);
};

export default RouteDisplaySettings;
