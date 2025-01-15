import { useEffect, useState } from 'react';
import BusRoutes from './BusRoutes';
import RouteDisplaySettings from './RouteDisplaySettings';
import RouteLanguageSettings from './RouteLanguageSettings';

const EntryPage = () => {
	const [languageSettings, setLanguageSettings] = useState();
	const [routeSettings, setRouteSettings] = useState();
	const [displaySettings, setDisplaySettings] = useState();

	const onLanguageSave = (value) => setLanguageSettings(value);
	const onRouteSave = (value) => setRouteSettings(value);
	const onDisplaySettingsSave = (value) => setDisplaySettings(value);

	useEffect(() => {
		console.log(languageSettings);
		console.log(routeSettings);
		console.log(displaySettings);
	});

	return (
		<>
			<BusRoutes onBusSave={onRouteSave} />
			<RouteLanguageSettings onLanguageSave={onLanguageSave} />
			<RouteDisplaySettings
				onSettingsSave={onDisplaySettingsSave}
				languageSettings={languageSettings}
				selectedRoute={routeSettings}
			/>
		</>
	);
};

export default EntryPage;
