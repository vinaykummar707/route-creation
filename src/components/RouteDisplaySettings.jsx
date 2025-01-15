import * as Tabs from '@radix-ui/react-tabs';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useEffect, useState } from 'react';
import LedSignBoard from './LedSignBoard';
import DisplaySettingsForm from './DisplaySettingsForm';
import ConfigurationForm from './FullScreenConfigurationForm';
import SideWithSingleTextBoardConfigurationForm from './SideWithSingleTextConfiguration';
import SideWithTwoHalfsBoard from './SideWithTwoHalfsBoard';
import axios from 'axios';

const RouteDisplaySettings = ({
	selectedRoute,
	languageSettings,
	onSettingsSave,
}) => {
	// const [routes, setRoutes] = useState([
	// 	{
	// 		id: 20,
	// 		routeNumber: '300',
	// 		source: 'mehdipatnam',
	// 		destination: 'uppal',
	// 		via: 'aramghar,lbnagar',
	// 		separation: '-',
	// 	},
	// 	{
	// 		id: 21,
	// 		routeNumber: '500',
	// 		source: 'shamshabad',
	// 		destination: 'mgbs',
	// 		via: 'aramghar',
	// 		separation: '-',
	// 	},
	// ]);
	// const [depots, setDepots] = useState([
	// 	{
	// 		id: 31,
	// 		name: 'Mahabubnagar',
	// 	},
	// 	{
	// 		id: 30,
	// 		name: 'Uppal',
	// 	},
	// ]);

	const [selectedBoardType, setSelectedBoardType] = useState('Fullscreen');

	const boards = ['front', 'side', 'rear', 'internal'];
	const [selectedTab, setSelectedTab] = useState('front');
	const displayOptions = {
		scrollTypes: ['Left to Right', 'Right to Left', 'Fixed', 'Flashing'],
		scrollSpeeds: 0,
		boardDisplayFormats: [
			'Full Screen',
			'SideWithSingleText',
			'SideWithTwoText',
		],
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
		front: {},
		side: {},
		rear: {},
		internal: {},
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

	// useEffect(() => {
	// 	setDisplayConfig((prev) => {
	// 		const newConfig = { ...prev };
	// 		boards.forEach((board) => {
	// 			newConfig[board].routeNumber.text = selectedRoute.routeNumber;
	// 			newConfig[board].source.text = selectedRoute.source;
	// 			newConfig[board].destination.text = selectedRoute.destination;
	// 			newConfig[board].via.text = selectedRoute.via;
	// 		});
	// 		return newConfig;
	// 	});
	// }, [selectedRoute]);

	const onConfigChange = (config) => {
		setDisplayConfig((prev) => {
			const newConfig = { ...prev };
			newConfig[selectedTab] = config;
			return newConfig;
		});
	};

	useEffect(() => {
		console.log(displayConfig, languageSettings);
	}, [displayConfig, languageSettings]);

	const languageMapping = {
		English: 'en', // ISO code for English
		Hindi: 'hi', // ISO code for Hindi
		Telugu: 'te', // ISO code for Telugu
	};

	async function translateText(text, srcLang, destLang) {
		const API_URL = 'https://api.devnagri.com/machine-translation/v2/translate';
		const API_KEY = 'devnagri_9b97bc1ad2ff11efbac242010aa00fc7'; // Replace with your actual API key

		try {
			const formData = new FormData();
			formData.append('key', API_KEY);
			formData.append('sentence', text);
			formData.append('src_lang', srcLang);
			formData.append('dest_lang', destLang);

			const response = await axios.post(API_URL, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response.status === 200) {
				return response.data.translated_text; // Return the translated text if success
			} else {
				console.error('Translation API Error:', response.data.msg);
				return text; // Fallback to original text in case of error
			}
		} catch (error) {
			console.error('API Request Failed:', error.message);
			return text; // Fallback to original text
		}
	}

	async function showFinalJson() {
		// Use an empty object to accumulate the final config
		const config = {};

		// Iterate over the languageSettings to fetch the translated configurations
		const configPromises = languageSettings.map(async (language) => {
			const targetLanguage = languageMapping[language.language]; // Map language to ISO code

			if (!targetLanguage) {
				console.error(`No mapping found for language: ${language.language}`);
				return null; // Skip if no mapping is found
			}

			const translatedConfig = {};

			for (const key of Object.keys(displayConfig)) {
				const originalText = displayConfig[key]?.text;
				let translatedText = originalText;

				if (originalText && targetLanguage !== 'en') {
					// Call translation API only if the target language is not English
					translatedText = await translateText(
						originalText,
						'en',
						targetLanguage
					);
				}

				translatedConfig[key] = {
					...displayConfig[key],
					...(originalText && { text: translatedText }), // Only update text if it's present
					fontSize: language.fontSize,
					fontWeight: language.fontWeight,
				};
			}

			// Merge the translated config directly into the final config object
			if (translatedConfig) {
				config[language.language] = translatedConfig;
			}
		});

		// Wait for all promises to resolve and then log the final config
		await Promise.all(configPromises);

		console.log(config); // The final config will be in the correct format now
	}

	return (
		<div className="flex flex-col gap-4 px-6 py-6 shadow-sm bg-white w-full items-start rounded-lg border">
			<h1 className="text-lg text-neutral-800 font-bold">
				Route Display Settings
			</h1>
			{/* <div className=" grid sm:grid-cols-2  md:grid-cols-4 w-full gap-4 ">
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
			</div> */}

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
						{(selectedBoardType === 'Full Screen' ||
							displayConfig[selectedTab]['boardFormatType'] ===
								'Fullscreen') && (
							<ConfigurationForm
								initialData={displayConfig[selectedTab]}
								onSettingsSave={onConfigChange}
								route={selectedRoute}
							/>
						)}
					</div>
				</Tabs.Content>
			</Tabs.Root>

			{/* <ConfigurationForm route={selectedRoute} />
			<SideWithSingleTextBoardConfigurationForm route={selectedRoute} />
			<SideWithTwoHalfsBoard /> */}

			<button onClick={showFinalJson}>show json</button>
		</div>
	);
};

export default RouteDisplaySettings;
