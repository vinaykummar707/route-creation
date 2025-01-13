import { useState } from 'react';

const RouteLanguageSettings = () => {
	const [routes, setRoutes] = useState([
		{
			id: 20,
			name: '300',
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
		name: '300',
	});

	const languageOptions = {
		languages: [
			'English',
			'Hindi',
			'Marathi',
			'Gujarati',
			'Tamil',
			'Telugu',
			'Kannada',
			'Malayalam',
		],
		fontFamilies: ['Arial', 'Times New Roman', 'Helvetica', 'Courier New'],
		fontSize: 20,
		fontWeights: ['normal', 'medium', 'semi-bold', 'bold'],
	};

	const [languageConfig, setLanguageConfig] = useState([
		{
			language: 'Marathi',
			fontFamily: 'Arial',
			fontSize: 16,
			fontWeight: 'medium',
		},
		{
			language: 'Hindi',
			fontFamily: 'Arial',
			fontSize: 16,
			fontWeight: '400',
		},
		{
			language: 'Marathi',
			fontFamily: 'Arial',
			fontSize: 16,
			fontWeight: '400',
		},
	]);

	const handleLanguageConfigChange = (index, field, value) => {
		setLanguageConfig((prev) => {
			const newConfig = [...prev];
			newConfig[index] = {
				...newConfig[index],
				[field]: value,
			};
			return newConfig;
		});
	};

	const saveLanguageSettings = () => {
		const payload = {
			routeId: selectedRoute.id,
			depotId: selectedDepot.id,
			languageConfig,
		};
		console.log('====================================');
		console.log(payload);
		console.log('====================================');
	};

	return (
		<div className="">
			<div className="flex flex-col gap-8 p-4 bg-white w-full items-start rounded-lg border">
				<h1 className="text-lg text-neutral-800 font-bold">
					Route Language Settings
				</h1>
				<div className=" grid sm:grid-cols-2  md:grid-cols-4 w-full gap-4 ">
					<div className="flex flex-col gap-3">
						<label
							className="text-sm font-semibold text-neutral-900"
							htmlFor=""
						>
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
						<label
							className="text-sm font-semibold text-neutral-900"
							htmlFor=""
						>
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

				{languageConfig.map((config, index) => (
					<div
						key={index}
						className=" grid sm:grid-cols-2  md:grid-cols-4  w-full gap-4 "
					>
						<div className="flex flex-col gap-3">
							<label
								className="text-sm font-semibold text-neutral-900"
								htmlFor=""
							>
								{`Language ${index + 1}`}
							</label>
							<select
								name="language"
								defaultValue={config.language}
								className="border text-neutral-400 text-sm p-2 rounded-lg"
								required
								onChange={(e) =>
									handleLanguageConfigChange(index, 'language', e.target.value)
								}
							>
								{languageOptions.languages.map((language) => (
									<option key={language} value={language}>
										{language}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col gap-3">
							<label
								className="text-sm font-semibold text-neutral-900"
								htmlFor=""
							>
								Font
							</label>
							<select
								name="fontFamily"
								defaultValue={config.fontFamily}
								className="border text-neutral-400 text-sm p-2 rounded-lg"
								required
								onChange={(e) =>
									handleLanguageConfigChange(
										index,
										'fontFamily',
										e.target.value
									)
								}
							>
								{languageOptions.fontFamilies.map((font) => (
									<option key={font} value={font}>
										{font}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col gap-3">
							<label
								className="text-sm font-semibold text-neutral-900"
								htmlFor=""
							>
								Font Weight
							</label>
							<select
								name="fontWeight"
								defaultValue={config.fontWeight}
								className="border text-neutral-400 text-sm p-2 rounded-lg"
								required
								onChange={(e) =>
									handleLanguageConfigChange(
										index,
										'fontWeight',
										e.target.value
									)
								}
							>
								{languageOptions.fontWeights.map((weight) => (
									<option key={weight} value={weight}>
										{weight}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col gap-3">
							<label
								className="text-sm font-semibold text-neutral-900"
								htmlFor=""
							>
								Font Size
							</label>
							<input
								name="fontSize"
								type="number"
								value={config.fontSize}
								className="border text-neutral-400 text-sm p-2 rounded-lg"
								onChange={(e) =>
									handleLanguageConfigChange(index, 'fontSize', e.target.value)
								}
							/>
						</div>
					</div>
				))}

				<button
					onClick={saveLanguageSettings}
					className="bg-neutral-900 text-sm p-2 text-white rounded-lg"
				>
					Save Language Settings
				</button>
			</div>
		</div>
	);
};

export default RouteLanguageSettings;
