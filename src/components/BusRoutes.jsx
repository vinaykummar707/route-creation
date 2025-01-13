import { useEffect, useState } from 'react';
import { getDepos } from '../services/api';

const BusRoutes = () => {
	const [route, setRoute] = useState({
		routeNumber: '',
		source: '',
		destination: '',
		separation: '',
		via: '',
		depotId: '20',
	});

	useEffect(() => {
		// async () => {
		// 	const res = await getDepos();
		// 	console.log('====================================');
		// 	console.log(res);
		// 	console.log('====================================');
		// };
	});

	const handleRouteChange = (e) => {
		const { name, value } = e.target;
		setRoute((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const saveRoute = () => {
		const payload = {
			organizationId: 'a82198cb-1861-4d13-bda7-3af36a8ea32c',
			routeNumber: route.routeNumber,
			source: route.source,
			destination: route.destination,
			separation: route.separation,
			depotId: route.depotId,
			via: route.via,
		};
		createRouteApiCall(payload);
	};

	const createRouteApiCall = async (payload) => {
		console.log('====================================');
		console.log(payload);
		console.log('====================================');

		// const res = await fetch(
		// 	'https://navitronics-zovs.onrender.com/navitranix/route/create',
		// 	{
		// 		method: 'POST',
		// 		body: JSON.stringify(payload),
		// 		headers: {
		// 			Authorization:
		// 				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25JZCI6IjVlMDY0ZDA4LTFhMjMtNDA1My1hMWU5LTgzZGQwMTEzYTgyOCIsInN1YiI6IkFkbWluIiwiaWF0IjoxNzM2NjE1Njk4LCJleHAiOjE3MzY3MDIwOTh9.Rz9nOBxzvFEWAnXNrQg281sYp7dPDgqehinKwDvJYtc',
		// 		},
		// 	}
		// );
	};

	return (
		<div className="">
			<div className="flex flex-col gap-4 p-4 bg-white w-full items-start rounded-lg border">
				<h1 className="text-lg font-bold">Create Route</h1>
				<div className=" grid grid-cols-3  w-full gap-4 ">
					<div className="flex flex-col gap-1">
						<label className="text-sm text-neutral-500" htmlFor="">
							Depot
						</label>
						<select
							name="depotId"
							defaultValue={20}
							onChange={handleRouteChange}
							className=" w-full border px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
							required
						>
							<option value={20}>20</option>
						</select>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-sm text-neutral-500" htmlFor="">
							Route Number
						</label>
						<input
							type="text"
							name="routeNumber"
							value={route.routeNumber}
							onChange={handleRouteChange}
							className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
							required
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm text-neutral-500" htmlFor="">
							Source
						</label>
						<input
							type="text"
							name="source"
							value={route.source}
							onChange={handleRouteChange}
							className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
							required
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm text-neutral-500" htmlFor="">
							Destination
						</label>
						<input
							type="text"
							name="destination"
							value={route.destination}
							onChange={handleRouteChange}
							className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
							required
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm text-neutral-500" htmlFor="">
							separation
						</label>
						<input
							type="text"
							name="separation"
							value={route.separation}
							onChange={handleRouteChange}
							className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
							required
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm text-neutral-500" htmlFor="">
							Via
						</label>
						<input
							type="text"
							name="via"
							value={route.via}
							onChange={handleRouteChange}
							className="form-input w-full px-3 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
							required
						/>
					</div>
				</div>

				<button
					onClick={saveRoute}
					className="bg-neutral-900 text-sm p-2 text-white rounded-lg"
				>
					Save Route
				</button>
			</div>
		</div>
	);
};

export default BusRoutes;
